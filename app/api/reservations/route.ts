import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patientName, phone, doctorId, reservationDate, timeSlot, symptoms, userId, password } = body;

    // 필수 필드 검증
    if (!patientName || !phone || !doctorId || !reservationDate || !timeSlot) {
      return new NextResponse("필수 정보가 누락되었습니다 (이름, 전화번호, 의사, 예약일, 예약시간)", { status: 400 });
    }

    // 의사 존재 여부 확인
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
        isActive: true,
      },
      include: {
        department: true,
      },
    });

    if (!doctor) {
      return new NextResponse("해당 의사를 찾을 수 없습니다", { status: 404 });
    }

    // 예약 시간대 중복 체크
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        doctorId,
        reservationDate: new Date(reservationDate),
        timeSlot,
        status: {
          in: ["pending", "confirmed"] as ReservationStatus[],
        },
      },
    });

    if (existingReservation) {
      return new NextResponse("해당 시간대에 이미 예약이 존재합니다", { status: 409 });
    }

    // 예약 생성
    const reservation = await prisma.reservation.create({
      data: {
        patientName,
        phone,
        reservationDate: new Date(reservationDate),
        timeSlot,
        symptoms: symptoms || "",
        status: "pending" as ReservationStatus,
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        department: {
          connect: {
            id: doctor.departmentId,
          },
        },
        user: userId
          ? {
              connect: {
                id: userId,
              },
            }
          : undefined,
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

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("[RESERVATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
