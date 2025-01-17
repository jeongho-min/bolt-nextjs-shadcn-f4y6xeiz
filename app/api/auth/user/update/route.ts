import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone } = body;

    // 필수 필드 검증
    if (!name || !email || !phone) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 이메일 중복 확인 (현재 사용자의 이메일은 제외)
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return new NextResponse("Email already exists", { status: 409 });
      }
    }

    // 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USER_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
