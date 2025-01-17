import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const doctors = await prisma.doctor.findMany({
      include: {
        department: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("의사 조회 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, departmentId, position, specialties, biography, imageUrl } = body;

    if (!name || !departmentId) {
      return new NextResponse("이름과 소속과는 필수입니다.", { status: 400 });
    }

    // 부서가 존재하는지 확인
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return new NextResponse("존재하지 않는 부서입니다.", { status: 400 });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        departmentId,
        position,
        specialties,
        biography,
        imageUrl,
      },
      include: {
        department: true,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("의사 생성 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
