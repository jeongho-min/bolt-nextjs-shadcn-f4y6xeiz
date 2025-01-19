import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 가격표 카테고리 및 항목 목록 조회
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const items = await prisma.priceItem.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[PRICES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// 새로운 가격표 카테고리 생성
export async function POST(request: Request) {
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

    const item = await prisma.priceItem.create({
      data: {
        name,
        description,
        specification,
        priceType,
        priceMin,
        priceMax,
        priceText,
        order: order || 0,
        isActive: true,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("[PRICES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
