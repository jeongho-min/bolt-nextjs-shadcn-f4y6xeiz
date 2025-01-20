import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const popups = await prisma.popupNotice.findMany({
      orderBy: {
        priority: "desc",
      },
    });

    return NextResponse.json(popups);
  } catch (error) {
    console.error("[POPUPS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, content, category, imageUrl, startDate, endDate, isActive, priority, width, height, position } = body;

    const popup = await prisma.popupNotice.create({
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
        userId: session.user.id,
      },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error("[POPUPS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
