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

    const hospitalInfo = await prisma.hospitalInfo.findFirst();
    return NextResponse.json(hospitalInfo);
  } catch (error) {
    console.error("[HOSPITAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const hospitalInfo = await prisma.hospitalInfo.create({
      data: body,
    });

    return NextResponse.json(hospitalInfo);
  } catch (error) {
    console.error("[HOSPITAL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const hospitalInfo = await prisma.hospitalInfo.findFirst();

    if (!hospitalInfo) {
      return new NextResponse("Hospital info not found", { status: 404 });
    }

    const updatedHospitalInfo = await prisma.hospitalInfo.update({
      where: {
        id: hospitalInfo.id,
      },
      data: body,
    });

    return NextResponse.json(updatedHospitalInfo);
  } catch (error) {
    console.error("[HOSPITAL_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
