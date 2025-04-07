import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 더미 데이터 반환
    const dummyDepartments = [
      {
        id: "dept-1",
        name: "이비인후과",
        description: "귀, 코, 목 질환을 진단하고 치료합니다.",
        is_active: true,
        order_num: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "dept-2",
        name: "한방 내과",
        description: "한방 치료를 통해 내부 질환을 치료합니다.",
        is_active: true,
        order_num: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "dept-3",
        name: "한방신경정신과",
        description: "한방 치료를 통해 신경 및 정신 질환을 치료합니다.",
        is_active: true,
        order_num: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(dummyDepartments);
  } catch (error) {
    console.error("진료과목 정보 조회 중 오류 발생:", error);
    return NextResponse.json({ error: "진료과목 정보를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}
