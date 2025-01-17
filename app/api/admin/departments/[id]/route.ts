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

    const department = await prisma.department.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!department) {
      return new NextResponse("부서를 찾을 수 없습니다.", { status: 404 });
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error("부서 조회 에러:", error);
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
    const { name, description, isActive } = body;

    const department = await prisma.department.update({
      where: {
        id: params.id,
      },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error("부서 수정 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 부서와 연관된 데이터가 있는지 확인
    const hasRelatedData = await prisma.doctor.findFirst({
      where: {
        departmentId: params.id,
      },
    });

    if (hasRelatedData) {
      return new NextResponse("이 부서에 소속된 의사가 있어 삭제할 수 없습니다.", { status: 400 });
    }

    await prisma.department.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("부서 삭제 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
