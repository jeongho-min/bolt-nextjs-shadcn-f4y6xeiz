import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const reservationId = params.id;
    if (!reservationId) {
      return NextResponse.json({ error: "예약 ID가 필요합니다." }, { status: 400 });
    }

    // 예약 정보 조회
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      return NextResponse.json({ error: "예약을 찾을 수 없습니다." }, { status: 404 });
    }

    // 예약한 사용자와 현재 사용자가 일치하는지 확인
    if (reservation.userId !== session.user.id) {
      return NextResponse.json({ error: "예약을 취소할 권한이 없습니다." }, { status: 403 });
    }

    // 이미 취소되었거나 완료된 예약인지 확인
    if (reservation.status === "cancelled") {
      return NextResponse.json({ error: "이미 취소된 예약입니다." }, { status: 400 });
    }
    if (reservation.status === "completed") {
      return NextResponse.json({ error: "이미 완료된 예약은 취소할 수 없습니다." }, { status: 400 });
    }

    // 예약 취소 처리
    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: { status: "cancelled" },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("Reservation cancellation error:", error);
    return NextResponse.json({ error: "예약 취소 중 오류가 발생했습니다." }, { status: 500 });
  }
}
