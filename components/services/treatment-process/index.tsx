"use client";

import { motion } from "framer-motion";
import { ProcessCard } from "./process-card";
import { processes } from "./data";

export function TreatmentProcess() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">진료 과정</h2>
          <p className="text-gray-600">
            체계적인 진료 과정으로 최상의 치료 결과를 제공합니다
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {processes.map((process, index) => (
            <ProcessCard
              key={process.title}
              {...process}
              index={index}
              total={processes.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}