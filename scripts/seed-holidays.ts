import prisma from "@/lib/prisma";

async function main() {
  try {
    // 정기 휴일: 매주 일요일
    await prisma.holiday.create({
      data: {
        title: "일요일 정기 휴무",
        description: "매주 일요일은 정기 휴무일입니다.",
        isActive: true,
      },
    });

    // 정기 휴일: 공휴일
    await prisma.holiday.create({
      data: {
        title: "법정공휴일 휴무",
        description: "법정공휴일은 휴무입니다.",
        isActive: true,
      },
    });

    // 점심시간
    await prisma.holiday.create({
      data: {
        title: "점심시간",
        description: "평일 점심시간입니다.",
        isActive: true,
      },
    });

    console.log("기본 휴일 데이터가 생성되었습니다.");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
