import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const holiday = await prisma.holiday.findUnique({
      where: {
        id: params.id,
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!holiday) {
      return new NextResponse("Holiday not found", { status: 404 });
    }

    return NextResponse.json(holiday);
  } catch (error) {
    console.error("[HOLIDAY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, type, regularType, dayOfWeek, weekOfMonth, dayOfMonth, monthOfYear, startDate, endDate, isActive } = body;

    if (!title || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const holiday = await prisma.holiday.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        type,
        regularType,
        dayOfWeek,
        weekOfMonth,
        dayOfMonth,
        monthOfYear,
        startDate,
        endDate,
        isActive,
      },
    });

    return NextResponse.json(holiday);
  } catch (error) {
    console.error("[HOLIDAY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const holiday = await prisma.holiday.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(holiday);
  } catch (error) {
    console.error("[HOLIDAY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
