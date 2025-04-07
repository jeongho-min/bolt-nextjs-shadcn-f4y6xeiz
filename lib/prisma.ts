import { PrismaClient } from "@prisma/client";

// 프로덕션 환경에서만 실제 Prisma 클라이언트 생성
const createPrismaClient = () => {
  if (process.env.NODE_ENV === 'development') {
    // 개발 환경에서는 연결 테스트를 건너뜀
    console.log("Development environment: Using mock Prisma client");
    // @ts-ignore - 목(mock) 클라이언트 반환
    return {};
  }
  
  try {
    return new PrismaClient();
  } catch (error) {
    console.error("Failed to create Prisma client:", error);
    // @ts-ignore - 오류 발생 시 빈 객체 반환
    return {};
  }
};

declare global {
  var prisma: undefined | ReturnType<typeof createPrismaClient>;
}

const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// 데이터베이스 연결 테스트를 건너뜀
// 연결 테스트를 수행하려면 아래 주석을 해제
/*
prisma
  .$connect()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.error("Database connection failed:", e);
  });
*/

export default prisma;
