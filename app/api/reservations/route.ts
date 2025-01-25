import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";
import axios from "axios";

export const dynamic = "force-dynamic";

// 카카오 비즈니스 채널 설정
const KAKAO_API_KEY = process.env.KAKAO_ADMIN_KEY;
const KAKAO_BIZMSG_SENDER = process.env.KAKAO_BIZMSG_SENDER;
const KAKAO_TEMPLATE_CODE = process.env.KAKAO_TEMPLATE_CODE;

// 알림톡 발송 함수
async function sendKakaoNotification(phoneNumber: string, reservationData: any) {
  try {
    const response = await axios.post(
      "https://api.bizm.kakao.com/alimtalk/v2/sender/send",
      {
        messages: [
          {
            templateCode: KAKAO_TEMPLATE_CODE,
            phoneNumber: phoneNumber,
            templateParams: {
              예약자명: reservationData.name,
              예약일시: `${reservationData.date} ${reservationData.timeSlot}`,
              진료과목: reservationData.department,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${KAKAO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("카카오 알림톡 발송 실패:", error);
    throw error;
  }
}

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

    // 카카오 알림톡 발송
    if (session.user.phone) {
      await sendKakaoNotification(session.user.phone, {
        date: reservation.reservationDate.toISOString().split("T")[0],
        name: session.user.name || "",
        department: doctor.department.name || "",
        timeSlot: reservation.timeSlot,
      });
    }

    return NextResponse.json({
      success: true,
      message: "예약이 완료되었습니다.",
      data: reservation,
    });
  } catch (error) {
    console.error("예약 처리 중 오류 발생:", error);
    return NextResponse.json(
      {
        success: false,
        message: "예약 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
