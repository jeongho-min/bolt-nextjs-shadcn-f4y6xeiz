"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaffCard } from "./staff-card";
import { StaffFilter } from "./staff-filter";
import { doctors, departments } from "./staff-data";

export function StaffSection() {
  const [activeDepartment, setActiveDepartment] = useState("전체");

  const filteredDoctors = doctors.filter(
    doctor => activeDepartment === "전체" || doctor.department === activeDepartment
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">전문 의료진 소개</h2>
          <p className="text-gray-600">최고의 실력과 정성으로 진료합니다</p>
        </motion.div>

        <StaffFilter
          departments={departments}
          activeDepartment={activeDepartment}
          onDepartmentChange={setActiveDepartment}
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor) => (
              <StaffCard key={doctor.id} {...doctor} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}