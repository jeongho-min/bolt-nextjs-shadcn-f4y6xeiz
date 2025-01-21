import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Popup id is required", { status: 400 });
    }

    const popup = await prisma.popupNotice.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error("[POPUP_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, content, category, imageUrl, startDate, endDate, isActive, priority, width, height, position } = body;

    if (!params.id) {
      return new NextResponse("Popup id is required", { status: 400 });
    }

    const popup = await prisma.popupNotice.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        category,
        imageUrl,
        startDate,
        endDate,
        isActive,
        priority,
        width,
        height,
        position,
      },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error("[POPUP_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Popup id is required", { status: 400 });
    }

    const popup = await prisma.popupNotice.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error("[POPUP_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { isActive } = await req.json();

    const popup = await prisma.popupNotice.update({
      where: { id: params.id },
      data: { isActive },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error("[POPUP_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
