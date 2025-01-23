import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, memo } = body;

    const reservation = await prisma.nonMemberReservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return new NextResponse("예약을 찾을 수 없습니다.", { status: 404 });
    }

    const updatedReservation = await prisma.nonMemberReservation.update({
      where: { id },
      data: {
        ...(status && { status: status as ReservationStatus }),
        ...(memo !== undefined && { memo }),
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("Error updating non-member reservation:", error);
    return new NextResponse("예약 업데이트 중 오류가 발생했습니다.", { status: 500 });
  }
}
