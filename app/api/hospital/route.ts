import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 데이터베이스 연결 대신 더미 데이터 반환
    const dummyHospital = {
      id: "hospital-1",
      name: "소리청 일곡에스한방병원",
      representative: "대표원장",
      businessNumber: "123-45-67890",
      address: "광주광역시 일곡동 123번지",
      addressDetail: "2층",
      parkingInfo: "지하 주차장 이용 가능",
      mainPhone: "062-123-4567",
      specialtyPhone: "062-456-7890",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(dummyHospital);
  } catch (error) {
    console.error("[HOSPITAL_GET]", error);
    return new NextResponse("내부 서버 오류", { status: 500 });
  }
}
