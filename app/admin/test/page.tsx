"use client";

import { BrandLoader } from "@/components/ui/brand-loader";

export default function Test() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">브랜드 로더 테스트</h1>

        {/* 기본 스타일 */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">기본 스타일</h2>
          <div className="flex items-center justify-center h-[200px] border rounded-lg">
            <BrandLoader variant="default" />
          </div>
        </div>

        {/* 미니멀 스타일 */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">미니멀 스타일</h2>
          <div className="flex items-center justify-center h-[200px] border rounded-lg">
            <BrandLoader variant="minimal" />
          </div>
        </div>

        {/* 웨이브 스타일 */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">웨이브 스타일</h2>
          <div className="flex items-center justify-center h-[200px] border rounded-lg">
            <BrandLoader variant="wave" />
          </div>
        </div>

        {/* 바운스 스타일 */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">바운스 스타일</h2>
          <div className="flex items-center justify-center h-[200px] border rounded-lg">
            <BrandLoader variant="bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
