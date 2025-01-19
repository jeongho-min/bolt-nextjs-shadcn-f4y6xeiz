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
      where: { id: params.id },
      include: {
        department: true,
        subjects: {
          include: {
            subject: true,
          },
        },
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

    // isActive만 업데이트하는 경우
    if (body.hasOwnProperty("isActive")) {
      const doctor = await prisma.doctor.update({
        where: { id: params.id },
        data: { isActive: body.isActive },
        include: {
          department: true,
          subjects: {
            include: {
              subject: true,
            },
          },
        },
      });

      return NextResponse.json(doctor);
    }

    // 전체 정보 업데이트하는 경우
    const { name, departmentId, position, specialties, biography, imageUrl, subjectIds = [] } = body;

    if (!name || !departmentId) {
      return new NextResponse("이름과 소속과는 필수입니다.", { status: 400 });
    }

    // 전문분야 배열을 쉼표로 구분된 문자열로 변환
    const specialtiesString = Array.isArray(specialties) ? specialties.join(", ") : specialties;

    // 부서가 존재하는지 확인
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        subjects: true,
      },
    });

    if (!department) {
      return new NextResponse("존재하지 않는 부서입니다.", { status: 400 });
    }

    // 선택된 진료과목이 해당 부서의 진료과목인지 확인
    const invalidSubjects = subjectIds.filter((subjectId: string) => !department.subjects.some((subject) => subject.id === subjectId));

    if (invalidSubjects.length > 0) {
      return new NextResponse("선택한 진료과목 중 해당 부서에 속하지 않는 과목이 있습니다.", { status: 400 });
    }

    // 기존 진료과목 관계 삭제
    await prisma.doctorSubject.deleteMany({
      where: { doctorId: params.id },
    });

    // 의사 정보 업데이트
    const doctor = await prisma.doctor.update({
      where: { id: params.id },
      data: {
        name,
        departmentId,
        position,
        specialties: specialtiesString,
        biography,
        imageUrl,
        subjects: {
          create: subjectIds.map((subjectId: string) => ({
            subject: {
              connect: {
                id: subjectId,
              },
            },
          })),
        },
      },
      include: {
        department: true,
        subjects: {
          include: {
            subject: true,
          },
        },
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

    // 진료과목 관계 삭제
    await prisma.doctorSubject.deleteMany({
      where: { doctorId: params.id },
    });

    // 의사 삭제
    await prisma.doctor.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("의사 삭제 에러:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
