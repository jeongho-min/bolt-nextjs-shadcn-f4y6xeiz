import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { order } = await req.json();
    if (typeof order !== "number") {
      return new NextResponse("Invalid order value", { status: 400 });
    }

    const category = await prisma.priceCategory.findUnique({
      where: { id: params.id },
      include: { parent: true },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // 같은 부모를 가진 카테고리들 중에서 순서를 변경
    await prisma.priceCategory.update({
      where: { id: params.id },
      data: { order },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PRICE_CATEGORY_ORDER_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
