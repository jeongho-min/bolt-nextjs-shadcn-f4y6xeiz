import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const departments = await prisma.department_info.findMany({
      where: { is_active: true },
      orderBy: { order_num: "asc" },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error("진료과목 정보 조회 중 오류 발생:", error);
    return NextResponse.json({ error: "진료과목 정보를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}
