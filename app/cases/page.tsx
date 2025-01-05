"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CaseCard } from "@/components/cases/case-card";
import { CaseFilter } from "@/components/cases/case-filter";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["전체", "이명", "돌발성난청", "어지럼증", "이석증", "메니에르", "전정신경염", "기타"];

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <div className="min-h-screen bg-[#F5F8FF] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            소리청 <span className="text-primary">치료사례</span>
          </h1>
          <p className="text-gray-600">
            소리청 네트워크의 중상별 치료사례를 보실 수 있습니다.
          </p>
        </div>

        <CaseFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <CaseCard
            category="인천·부천점"
            title="10년전 사고로 큰 소리를 듣고 나서 부터 이명 발생."
            description="10년전 사고로 큰 소리를 듣고 나서 부터 이명 발생, 그 후 10월 6일 다시 재발, 풍선시술 후 호전"
            date="24.12.03"
          />
          <CaseCard
            category="인천·부천점"
            title="10년전 사고로 큰 소리를 듣고 나서 부터 이명 발생."
            description="10년전 사고로 큰 소리를 듣고 나서 부터 이명 발생, 그 후 10월 6일 다시 재발, 풍선시술 후 호전"
            date="24.12.03"
          />
          <CaseCard
            category="부산·사하점"
            title="우측 귀에서 횡하는 소리가 하루종일 납니다"
            description="특별한 원인없이 2주 전부터 우측 귀에서 횡하는 소리가 하루종일 납니다. 이비인후과 검사상 특이소견 없다고 합니다."
            date="24.11.28"
          />
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}