"use client";

import { cases } from "@/app/cases/data";
import { CaseCard } from "@/components/cases/case-card";
import { CaseFilter } from "@/components/cases/case-filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DepartmentList } from "./components/departments/department-list";
import { ServicesHero } from "./components/hero";

const ITEMS_PER_PAGE = 9;
const CASE_CATEGORIES = ["전체", ...Array.from(new Set(cases.map((item) => item.category)))];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCases = cases.filter((caseItem) => activeCategory === "전체" || caseItem.category === activeCategory);
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);

  // 페이지 변경 시 스크롤을 섹션 상단으로 이동
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("cases-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginatedCases = filteredCases.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // 카테고리가 변경되면 첫 페이지로 이동
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen">
      <ServicesHero />
      <DepartmentList />
      {/* <TreatmentProcess /> */}
      <div id="cases-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">치료 사례</span>
          </h2>
          <CaseFilter categories={CASE_CATEGORIES} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCases.map((caseItem) => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => handlePageChange(page)} className="min-w-[40px]">
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
