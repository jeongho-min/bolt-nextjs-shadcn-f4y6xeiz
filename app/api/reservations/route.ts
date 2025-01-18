import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const body = await request.json();
    const { doctorId, departmentId, reservationDate, timeSlot, symptoms } = body;

    // 필수 필드 검증
    if (!doctorId || !departmentId || !reservationDate || !timeSlot || !symptoms) {
      return NextResponse.json({ error: "모든 필수 정보를 입력해주세요." }, { status: 400 });
    }

    // 의사와 진료과 존재 여부 확인
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId, isActive: true },
      include: { department: true },
    });

    if (!doctor) {
      return NextResponse.json({ error: "선택하신 의사를 찾을 수 없습니다." }, { status: 404 });
    }

    if (doctor.departmentId !== departmentId) {
      console.log("진료과 불일치:", {
        요청된_진료과: departmentId,
        의사의_진료과: doctor.departmentId,
      });
      return NextResponse.json({ error: "선택하신 진료과와 의사가 일치하지 않습니다." }, { status: 400 });
    }

    // 예약 생성
    const reservation = await prisma.reservation.create({
      data: {
        userId: session.user.id,
        doctorId,
        departmentId,
        patientName: session.user.name || "",
        phone: session.user.phone || "",
        symptoms,
        reservationDate: new Date(reservationDate),
        timeSlot,
        status: ReservationStatus.pending,
      },
      include: {
        doctor: {
          include: {
            department: true,
          },
        },
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Reservation creation error:", error);
    return NextResponse.json({ error: "예약 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
