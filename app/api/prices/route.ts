import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface PriceCategory {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
  items: Array<{
    id: string;
    name: string;
    specification: string | null;
    priceType: "FIXED" | "RANGE" | "TEXT";
    priceMin: number | null;
    priceMax: number | null;
    priceText: string | null;
    order: number;
  }>;
  children: PriceCategory[];
}

export async function GET() {
  try {
    // 먼저 모든 카테고리를 가져옵니다
    const categories = await prisma.priceCategory.findMany({
      where: {
        isActive: true,
      },
      include: {
        items: {
          where: {
            isActive: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    // 카테고리를 계층 구조로 변환
    const buildHierarchy = (parentId: string | null = null, level: number = 0): PriceCategory[] => {
      return categories
        .filter((category) => category.parentId === parentId)
        .map((category) => ({
          id: category.id,
          name: category.name,
          parentId: category.parentId,
          level,
          items: category.items.map((item) => ({
            id: item.id,
            name: item.name,
            specification: item.specification,
            priceType: item.priceType as "FIXED" | "RANGE" | "TEXT",
            priceMin: item.priceMin,
            priceMax: item.priceMax,
            priceText: item.priceText,
            order: item.order,
          })),
          children: buildHierarchy(category.id, level + 1),
        }));
    };

    // 루트 카테고리부터 시작하여 계층 구조 생성
    const hierarchicalCategories = buildHierarchy();

    return NextResponse.json(hierarchicalCategories);
  } catch (error) {
    console.error("가격표를 가져오는 중 오류가 발생했습니다:", error);
    return new NextResponse("가격표를 가져오는데 실패했습니다.", { status: 500 });
  }
}
