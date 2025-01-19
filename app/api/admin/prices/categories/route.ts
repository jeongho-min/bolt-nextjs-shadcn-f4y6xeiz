import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
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
    }

    const category = await prisma.priceCategory.create({
      data: {
        name,
        order: order || 0,
        isActive: true,
        parentId: parentId || null,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[PRICE_CATEGORY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const categories = await prisma.priceCategory.findMany({
      include: {
        items: true,
        children: {
          include: {
            items: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[PRICE_CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return new NextResponse("카테고리 ID가 필요합니다.", { status: 400 });
    }

    // 하위 카테고리가 있는지 확인
    const hasChildren = await prisma.priceCategory.findFirst({
      where: { parentId: categoryId },
    });

    if (hasChildren) {
      return new NextResponse("하위 카테고리가 있는 카테고리는 삭제할 수 없습니다.", { status: 400 });
    }

    // 카테고리에 속한 가격표 항목이 있는지 확인
    const hasItems = await prisma.priceItem.findFirst({
      where: { categoryId },
    });

    if (hasItems) {
      return new NextResponse("가격표 항목이 있는 카테고리는 삭제할 수 없습니다.", { status: 400 });
    }

    // 카테고리 삭제
    await prisma.priceCategory.delete({
      where: { id: categoryId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PRICE_CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
