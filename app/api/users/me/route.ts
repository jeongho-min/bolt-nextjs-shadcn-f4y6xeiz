import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 사용자와 관련된 예약 정보 삭제
    await prisma.reservation.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    // 사용자 계정 삭제
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[USER_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
