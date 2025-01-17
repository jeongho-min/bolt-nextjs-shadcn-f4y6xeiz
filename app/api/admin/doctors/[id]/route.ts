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

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: params.id,
      },
      include: {
        department: true,
      },
    });

    if (!doctor) {
      return new NextResponse("의사를 찾을 수 없습니다.", { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("의사 조회 에러:", error);
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
    const { name, departmentId, position, specialties, biography, imageUrl, isActive } = body;

    if (departmentId) {
      // 부서가 존재하는지 확인
      const department = await prisma.department.findUnique({
        where: { id: departmentId },
      });

      if (!department) {
        return new NextResponse("존재하지 않는 부서입니다.", { status: 400 });
      }
    }

    const doctor = await prisma.doctor.update({
      where: {
        id: params.id,
      },
      data: {
        ...(name && { name }),
        ...(departmentId && { departmentId }),
        ...(position !== undefined && { position }),
        ...(specialties !== undefined && { specialties }),
        ...(biography !== undefined && { biography }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        department: true,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("의사 수정 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 예약이 있는지 확인
    const hasReservations = await prisma.reservation.findFirst({
      where: {
        doctorId: params.id,
      },
    });

    if (hasReservations) {
      return new NextResponse("이 의사와 연관된 예약이 있어 삭제할 수 없습니다.", { status: 400 });
    }

    await prisma.doctor.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("의사 삭제 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
