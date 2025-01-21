import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, reservationPassword, reservationDate, timeSlot, symptoms } = body;

    // 필수 필드 검증
    if (!name || !phone || !reservationPassword || !reservationDate || !timeSlot || !symptoms) {
      return NextResponse.json({ error: "모든 필수 정보를 입력해주세요." }, { status: 400 });
    }

    // 예약 생성
    const reservation = await prisma.nonMemberReservation.create({
      data: {
        patientName: name,
        phone,
        reservationPassword,
        symptoms,
        reservationDate: new Date(reservationDate),
        timeSlot,
        status: ReservationStatus.pending,
        doctor: { connect: undefined },
        department: { connect: undefined },
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Non-member reservation creation error:", error);
    return NextResponse.json({ error: "예약 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
