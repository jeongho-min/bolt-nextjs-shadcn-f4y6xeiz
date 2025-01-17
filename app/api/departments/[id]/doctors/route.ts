import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        departmentId: params.id,
        isActive: true,
      },
      include: {
        department: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("[DEPARTMENT_DOCTORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
