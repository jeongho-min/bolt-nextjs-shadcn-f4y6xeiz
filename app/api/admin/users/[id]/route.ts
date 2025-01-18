import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return new NextResponse("회원을 찾을 수 없습니다.", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("회원 조회 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { role, name, phone } = body;

    // 자기 자신의 권한은 변경할 수 없음
    if (role && session.user.id === params.id) {
      return new NextResponse("자신의 권한은 변경할 수 없습니다.", { status: 400 });
    }

    const updateData: any = {};
    if (role) updateData.role = role;
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: updateData,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("회원 수정 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 자기 자신은 삭제할 수 없음
    if (session.user.id === params.id) {
      return new NextResponse("자신의 계정은 삭제할 수 없습니다.", { status: 400 });
    }

    // 예약이 있는지 확인
    const hasReservations = await prisma.reservation.findFirst({
      where: {
        userId: params.id,
      },
    });

    if (hasReservations) {
      return new NextResponse("이 회원과 연관된 예약이 있어 삭제할 수 없습니다.", { status: 400 });
    }

    await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("회원 삭제 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
