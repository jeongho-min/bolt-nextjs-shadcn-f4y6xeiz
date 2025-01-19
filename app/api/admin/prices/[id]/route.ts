import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

// 가격표 항목 조회
export async function GET(request: Request, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const priceItem = await prisma.priceItem.findUnique({
      where: { id: params.id },
    });

    if (!priceItem) {
      return new NextResponse("가격표 항목을 찾을 수 없습니다.", { status: 404 });
    }

    return NextResponse.json(priceItem);
  } catch (error) {
    console.error("[PRICE_ITEM_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// 가격표 항목 수정
export async function PUT(request: Request, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, specification, priceType, priceMin, priceMax, priceText, order, categoryId } = body;

    if (!name || !priceType || !categoryId) {
      return new NextResponse("필수 필드가 누락되었습니다.", { status: 400 });
    }

    // 카테고리 존재 여부 확인
    const category = await prisma.priceCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return new NextResponse("존재하지 않는 카테고리입니다.", { status: 400 });
    }

    const priceItem = await prisma.priceItem.update({
      where: { id: params.id },
      data: {
        name,
        description,
        specification,
        priceType,
        priceMin,
        priceMax,
        priceText,
        order: order || 0,
        categoryId,
      },
    });

    return NextResponse.json(priceItem);
  } catch (error) {
    console.error("[PRICE_ITEM_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// 가격표 항목 생성
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { name, description, specification, priceType, priceMin, priceMax, priceText, order } = json;

    const item = await prisma.priceItem.create({
      data: {
        categoryId: params.id,
        name,
        description,
        specification,
        priceType,
        priceMin,
        priceMax,
        priceText,
        order: order || 0,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating price item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// 가격표 항목 삭제 (소프트 삭제)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const item = await prisma.priceItem.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error deleting price item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
