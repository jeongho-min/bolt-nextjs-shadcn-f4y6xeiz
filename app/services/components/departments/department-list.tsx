"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useDepartmentInfo } from "@/app/contexts/department-info-context";
import type { DepartmentInfo } from "@/app/contexts/department-info-context";

export function DepartmentList() {
  const { departments, isLoading, error } = useDepartmentInfo();

  // 한방/양방 진료과목 분리
  const koreanDepartments = departments.filter((dept) => dept.type === "KOREAN");
  const westernDepartments = departments.filter((dept) => dept.type === "WESTERN");

  const renderDepartment = (department: DepartmentInfo, index: number) => {
    const IconComponent = dynamic<any>(
      () =>
        import("lucide-react").then((mod) => {
          const Icon = (mod as any)[department.icon];
          return Icon || mod.HelpCircle;
        }),
      { loading: () => <HelpCircle className="w-6 h-6 text-primary" /> }
    );

    return (
      <motion.div
        key={department.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="group hover:shadow-lg transition-all duration-300">
          <div className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{department.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{department.description}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <p>로딩 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* 한방 진료과목 */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">한방 진료과목</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{koreanDepartments.map((department, index) => renderDepartment(department, index))}</div>
          </div>

          {/* 양방 진료과목 */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">양방 진료과목</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{westernDepartments.map((department, index) => renderDepartment(department, index))}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
