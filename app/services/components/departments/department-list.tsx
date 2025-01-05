"use client";

import { motion } from "framer-motion";
import { DepartmentCard } from "./department-card";
import { departments } from "./data";

export function DepartmentList() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">전문 진료과목</h2>
          <p className="text-gray-600">
            각 분야 전문의가 정성을 다해 진료합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department, index) => (
            <motion.div
              key={department.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <DepartmentCard {...department} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}