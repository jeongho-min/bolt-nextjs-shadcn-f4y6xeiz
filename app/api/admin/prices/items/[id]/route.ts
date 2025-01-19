import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { order } = body;

    if (typeof order !== "number") {
      return new NextResponse("순서 값이 올바르지 않습니다.", { status: 400 });
    }

    const priceItem = await prisma.priceItem.findUnique({
      where: { id: params.id },
    });

    if (!priceItem) {
      return new NextResponse("가격표 항목을 찾을 수 없습니다.", { status: 404 });
    }

    const updatedItem = await prisma.priceItem.update({
      where: { id: params.id },
      data: { order },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("[PRICE_ITEM_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
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

    await prisma.priceItem.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[PRICE_ITEM_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
