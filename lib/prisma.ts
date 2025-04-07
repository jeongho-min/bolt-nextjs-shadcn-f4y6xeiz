import { PrismaClient } from "@prisma/client";

// 모킹된 Prisma 클라이언트 생성
const createMockPrismaClient = () => {
  // 모든 Prisma 모델에 대한 기본 CRUD 작업을 모킹합니다
  const createBasicCrudMethods = () => ({
    findUnique: async () => ({}),
    findFirst: async () => ({}),
    findMany: async () => [],
    create: async (data: any) => data.data || {},
    update: async (data: any) => data.data || {},
    upsert: async (data: any) => data.create || data.update || {},
    delete: async () => ({}),
    deleteMany: async () => ({ count: 0 }),
    count: async () => 0,
  });

  // 모든 Prisma 모델을 위한 모킹된 모델들
  const mockModels = {
    hospitalInfo: createBasicCrudMethods(),
    department_info: createBasicCrudMethods(),
    department: createBasicCrudMethods(),
    departments: createBasicCrudMethods(),
    disease: createBasicCrudMethods(),
    doctor: createBasicCrudMethods(),
    doctors: createBasicCrudMethods(),
    schedule: createBasicCrudMethods(),
    reservation: createBasicCrudMethods(),
    reservations: createBasicCrudMethods(),
    nonMemberReservation: createBasicCrudMethods(),
    medicalSubject: createBasicCrudMethods(),
    treatment_cases: createBasicCrudMethods(),
    treatment_categories: createBasicCrudMethods(),
    notice: createBasicCrudMethods(),
    popupNotice: createBasicCrudMethods(),
    user: createBasicCrudMethods(),
    users: createBasicCrudMethods(),
    account: createBasicCrudMethods(),
    session: createBasicCrudMethods(),
    verificationToken: createBasicCrudMethods(),
    holiday: createBasicCrudMethods(),
    price: createBasicCrudMethods(),
    // 기타 모든 모델 추가...
  };

  // 실제 PrismaClient가 제공하는 추가 메서드들
  return {
    ...mockModels,
    $connect: async () => {},
    $disconnect: async () => {},
    $transaction: async (callback: any) => callback(mockModels),
  } as unknown as PrismaClient; // 타입 단언
};

// 실제 Prisma 클라이언트 또는 목(mock) 클라이언트 생성
const createPrismaClient = () => {
  // 개발 환경이 아니거나 실제 데이터베이스 연결이 필요한 경우
  if (process.env.USE_REAL_DB === "true") {
    try {
      return new PrismaClient();
    } catch (error) {
      console.error("Failed to create Prisma client:", error);
      return createMockPrismaClient();
    }
  }
  
  // 기본적으로 모킹된 클라이언트 반환
  console.log("Using mock Prisma client");
  return createMockPrismaClient();
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
