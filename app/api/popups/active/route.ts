import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();

    const activePopups = await prisma.popupNotice.findMany({
      where: {
        isActive: true,
        startDate: {
          lte: now, // 현재 시간보다 이전에 시작
        },
        endDate: {
          gte: now, // 현재 시간보다 이후에 종료
        },
      },
      orderBy: [
        {
          priority: "desc", // 우선순위 높은 순
        },
        {
          createdAt: "desc", // 최신순
        },
      ],
    });

    return new NextResponse(JSON.stringify(activePopups), {
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
