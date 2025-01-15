"use client";

import { cases } from "@/app/cases/data";
import { CaseCard } from "@/components/cases/case-card";
import { CaseFilter } from "@/components/cases/case-filter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DepartmentList } from "./components/departments/department-list";
import { ServicesHero } from "./components/hero";

const ITEMS_PER_PAGE = 9;
const CASE_CATEGORIES = ["전체", ...Array.from(new Set(cases.map((item) => item.category)))];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCases = cases.filter((caseItem) => activeCategory === "전체" || caseItem.category === activeCategory);
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("cases-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginatedCases = filteredCases.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen">
      <ServicesHero />
      <DepartmentList />
      <div id="cases-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">치료 사례</span>
          </h2>
          <CaseFilter categories={CASE_CATEGORIES} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedCases.map((caseItem) => (
                <motion.div key={caseItem.id} variants={itemVariants}>
                  <CaseCard {...caseItem} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 flex justify-center items-center gap-2">
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
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
