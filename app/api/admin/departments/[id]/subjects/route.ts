import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 부서의 진료과목 목록 조회
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subjects = await prisma.medicalSubject.findMany({
      where: {
        departmentId: params.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("[SUBJECTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// 부서에 진료과목 추가
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const subject = await prisma.medicalSubject.create({
      data: {
        name,
        departmentId: params.id,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    console.error("[SUBJECTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// 부서의 진료과목 삭제
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    if (!subjectId) {
      return new NextResponse("Missing subject ID", { status: 400 });
    }

    // 진료과목이 해당 부서에 속하는지 확인
    const subject = await prisma.medicalSubject.findUnique({
      where: {
        id: subjectId,
        departmentId: params.id,
      },
    });

    if (!subject) {
      return new NextResponse("Subject not found", { status: 404 });
    }

    // 진료과목과 연결된 의사 관계 삭제
    await prisma.doctorSubject.deleteMany({
      where: {
        subjectId,
      },
    });

    // 진료과목 삭제
    await prisma.medicalSubject.delete({
      where: {
        id: subjectId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[SUBJECTS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    if (!subjectId) {
      return new NextResponse("Missing subject ID", { status: 400 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 진료과목이 해당 부서에 속하는지 확인
    const existingSubject = await prisma.medicalSubject.findUnique({
      where: {
        id: subjectId,
        departmentId: params.id,
      },
    });

    if (!existingSubject) {
      return new NextResponse("Subject not found", { status: 404 });
    }

    // 진료과목 수정
    const updatedSubject = await prisma.medicalSubject.update({
      where: {
        id: subjectId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedSubject);
  } catch (error) {
    console.error("[SUBJECTS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
