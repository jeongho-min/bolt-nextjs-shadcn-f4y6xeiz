import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const hospital = await prisma.hospitalInfo.findFirst();

    if (!hospital) {
      return new NextResponse("병원 정보를 찾을 수 없습니다.", { status: 404 });
    }

    return NextResponse.json(hospital);
  } catch (error) {
    console.error("[HOSPITAL_GET]", error);
    return new NextResponse("내부 서버 오류", { status: 500 });
  }
}
