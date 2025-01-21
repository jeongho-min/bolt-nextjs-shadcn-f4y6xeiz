import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error("[DEPARTMENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
