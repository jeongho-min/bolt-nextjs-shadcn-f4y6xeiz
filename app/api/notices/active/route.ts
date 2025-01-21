import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const activeNotices = await prisma.notice.findMany({
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
          isImportant: "desc", // 중요 공지 우선
        },
        {
          createdAt: "desc", // 최신순
        },
      ],
      include: {
        attachments: true, // 첨부파일 포함
      },
      take: 5, // 최근 5개만 가져오기
    });

    return new NextResponse(JSON.stringify(activeNotices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("[ACTIVE_NOTICES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
