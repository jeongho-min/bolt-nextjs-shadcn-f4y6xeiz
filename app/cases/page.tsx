"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CaseCard } from "@/components/cases/case-card";
import { CaseFilter } from "@/components/cases/case-filter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cases } from "./data";

const categories = ["전체", "이명", "돌발성난청", "어지럼증", "이석증", "메니에르", "전정신경염", "기타"];
const ITEMS_PER_PAGE = 9;

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCases = activeCategory === "전체" ? cases : cases.filter((c) => c.category === activeCategory);

  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // 카테고리가 변경될 때 페이지를 1로 리셋
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FF] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            소리청 <span className="text-primary">치료사례</span>
          </h1>
          <p className="text-gray-600">소리청 네트워크의 증상별 치료사례를 보실 수 있습니다.</p>
        </div>

        <CaseFilter categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {paginatedCases.map((case_) => (
            <CaseCard key={case_.id} category={case_.category} title={case_.title} description={case_.description} date={case_.date} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
