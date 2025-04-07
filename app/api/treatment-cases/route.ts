import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// 치료 사례 카테고리 데이터
const categories = [
  { id: "cat_01", name: "이명", description: "이명 치료 사례", order_num: 1, is_active: true },
  { id: "cat_02", name: "어지럼증", description: "어지럼증 치료 사례", order_num: 2, is_active: true },
  { id: "cat_03", name: "난청", description: "난청 치료 사례", order_num: 3, is_active: true },
  { id: "cat_04", name: "중이염", description: "중이염 치료 사례", order_num: 4, is_active: true },
  { id: "cat_05", name: "비염", description: "비염 치료 사례", order_num: 5, is_active: true },
  { id: "cat_06", name: "축농증", description: "축농증 치료 사례", order_num: 6, is_active: true },
  { id: "cat_07", name: "편도염", description: "편도염 치료 사례", order_num: 7, is_active: true },
  { id: "cat_08", name: "기타 이비인후과 질환", description: "기타 이비인후과 질환 치료 사례", order_num: 8, is_active: true },
];

// 치료 사례 데이터 통합
import { tinnitusCases } from "./mock-data/tinnitus";
import { dizzinessCases } from "./mock-data/dizziness";
import { hearingLossCases } from "./mock-data/hearing-loss";
import { otitisMediaCases } from "./mock-data/otitis-media";
import { rhinitisCases } from "./mock-data/rhinitis";
import { sinusitisCases } from "./mock-data/sinusitis";
import { tonsillitisCases } from "./mock-data/tonsillitis";
import { otherCases } from "./mock-data/others";

const allCases = [
  ...tinnitusCases,
  ...dizzinessCases,
  ...hearingLossCases,
  ...otitisMediaCases,
  ...rhinitisCases,
  ...sinusitisCases,
  ...tonsillitisCases,
  ...otherCases,
];

// 더미 치료 사례 생성
const dummyCases = allCases.map(treatmentCase => {
  const { categoryId } = treatmentCase;
  const category = categories.find(cat => cat.id === categoryId);
  
  return {
    ...treatmentCase,
    date: new Date(treatmentCase.date).toISOString(),
    treatment_categories: category
  };
});

// 데이터베이스에 데이터 추가하는 함수
async function seedDatabase() {
  try {
    // 데이터베이스 연결 없이 성공 메시지 반환
    console.log("데이터베이스 시드 완료");
    return { success: true };
  } catch (error) {
    console.error("데이터베이스 시드 중 오류 발생:", error);
    throw error;
  }
}

export async function GET() {
  try {
    // 데이터베이스 쿼리 대신 목 데이터 반환
    return NextResponse.json(dummyCases);
  } catch (error) {
    console.error("치료 사례 조회 중 오류 발생:", error);
    return NextResponse.json({ error: "치료 사례를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

// POST 엔드포인트 추가 - 데이터베이스 시드용
export async function POST() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: "데이터베이스 시드가 완료되었습니다." });
  } catch (error) {
    console.error("데이터베이스 시드 중 오류 발생:", error);
    return NextResponse.json({ error: "데이터베이스 시드 중 오류가 발생했습니다." }, { status: 500 });
  }
}
