import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const password = searchParams.get("password");

    // 로그인된 사용자의 경우
    if (session?.user) {
      const reservations = await prisma.reservation.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          doctor: {
            include: {
              department: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            reservationDate: "desc",
          },
        ],
      });

      if (reservations.length === 0) {
        return NextResponse.json({ error: "예약 내역이 없습니다." }, { status: 404 });
      }

      return NextResponse.json(reservations);
    }

    // 비회원의 경우
    if (!phone || !password) {
      return NextResponse.json({ error: "전화번호와 비밀번호를 모두 입력해주세요." }, { status: 400 });
    }
    console.log("🚀 ~ GET ~ password:", password);
    console.log("🚀 ~ GET ~ phone:", phone);

    const nonMemberReservations = await prisma.nonMemberReservation.findMany({
      where: {
        phone: phone,
        reservationPassword: password,
      },
      include: {
        doctor: {
          include: {
            department: true,
          },
        },
      },
      orderBy: {
        reservationDate: "desc",
      },
    });

    if (nonMemberReservations.length === 0) {
      return NextResponse.json({ error: "예약 내역을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(nonMemberReservations);
  } catch (error) {
    console.error("Reservation search error:", error);
    return NextResponse.json({ error: "예약 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}
