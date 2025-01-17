import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        doctor: {
          include: {
            department: true,
          },
        },
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("[RESERVATION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { status, memo } = body;

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    const updatedReservation = await prisma.reservation.update({
      where: {
        id: params.id,
      },
      data: {
        ...(status && { status }),
        ...(memo !== undefined && { memo }),
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("[RESERVATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    await prisma.reservation.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[RESERVATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
