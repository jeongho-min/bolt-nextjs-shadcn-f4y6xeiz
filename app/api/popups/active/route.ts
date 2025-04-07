import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 더미 팝업 데이터
    const dummyActivePopups = [
      {
        id: "popup-1",
        title: "병원 휴무 안내",
        content: "5월 1일은 근로자의 날로 휴무입니다.",
        imageUrl: "https://picsum.photos/800/600",
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
        isActive: true,
        priority: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: "user-1"
      },
      {
        id: "popup-2",
        title: "코로나19 예방접종 안내",
        content: "코로나19 예방접종은 예약제로 운영됩니다.",
        imageUrl: "https://picsum.photos/800/600",
        startDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
        isActive: true,
        priority: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: "user-1"
      }
    ];

    return new NextResponse(JSON.stringify(dummyActivePopups), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("[ACTIVE_POPUPS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
