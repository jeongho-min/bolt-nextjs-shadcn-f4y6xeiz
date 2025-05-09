import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

// 카테고리 정보 조회
export async function GET(request: Request, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const category = await prisma.priceCategory.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return new NextResponse("카테고리를 찾을 수 없습니다.", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("[PRICE_CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// 카테고리 수정
export async function PATCH(request: Request, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, order, parentId } = body;

    if (!name) {
      return new NextResponse("카테고리명은 필수입니다.", { status: 400 });
    }

    // 부모 카테고리가 있는 경우 존재 여부 확인
    if (parentId) {
      const parentCategory = await prisma.priceCategory.findUnique({
        where: { id: parentId },
      });

      if (!parentCategory) {
        return new NextResponse("존재하지 않는 상위 카테고리입니다.", { status: 400 });
      }

      // 순환 참조 방지
      if (parentId === params.id) {
        return new NextResponse("자기 자신을 상위 카테고리로 지정할 수 없습니다.", { status: 400 });
      }

      // 하위 카테고리를 상위 카테고리로 지정하는 것 방지
      const childCategories = await prisma.priceCategory.findMany({
        where: { parentId: params.id },
      });

      const isChildCategory = (categoryId: string, parentId: string): Promise<boolean> => {
        return prisma.priceCategory
          .findMany({
            where: { parentId: categoryId },
          })
          .then((categories) => {
            return categories.some((category) => category.id === parentId || isChildCategory(category.id, parentId));
          });
      };

      const isChild = await isChildCategory(params.id, parentId);
      if (isChild) {
        return new NextResponse("하위 카테고리를 상위 카테고리로 지정할 수 없습니다.", { status: 400 });
      }
    }

    const category = await prisma.priceCategory.update({
      where: { id: params.id },
      data: {
        name,
        order: order || 0,
        parentId: parentId || null,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[PRICE_CATEGORY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // 1. 먼저 하위 카테고리들을 재귀적으로 찾아서 삭제
    const deleteSubCategories = async (categoryId: string) => {
      const subCategories = await prisma.priceCategory.findMany({
        where: { parentId: categoryId },
      });

      for (const subCategory of subCategories) {
        // 재귀적으로 하위 카테고리의 하위 카테고리들을 삭제
        await deleteSubCategories(subCategory.id);

        // 해당 카테고리의 가격표 항목들을 삭제
        await prisma.priceItem.deleteMany({
          where: { categoryId: subCategory.id },
        });

        // 카테고리 자체를 삭제
        await prisma.priceCategory.delete({
          where: { id: subCategory.id },
        });
      }
    };

    // 2. 삭제하려는 카테고리의 하위 카테고리들을 먼저 삭제
    await deleteSubCategories(params.id);

    // 3. 삭제하려는 카테고리의 가격표 항목들을 삭제
    await prisma.priceItem.deleteMany({
      where: { categoryId: params.id },
    });

    // 4. 마지막으로 카테고리 자체를 삭제
    await prisma.priceCategory.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new NextResponse("카테고리 삭제 중 오류가 발생했습니다.", { status: 500 });
  }
}
