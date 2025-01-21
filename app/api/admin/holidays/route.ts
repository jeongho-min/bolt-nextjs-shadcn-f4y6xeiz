import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const holidays = await prisma.holiday.findMany({
      orderBy: [
        {
          type: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(holidays);
  } catch (error) {
    console.error("[HOLIDAYS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, type, regularType, dayOfWeek, weekOfMonth, dayOfMonth, monthOfYear, startDate, endDate } = body;

    if (!title || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const holiday = await prisma.holiday.create({
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
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(holiday);
  } catch (error) {
    console.error("[HOLIDAY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
