"use client";

import { motion } from "framer-motion";
import { TreatmentCard } from "./treatment-card";
import { treatmentSteps } from "./data";

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
          {treatmentSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-1"
            >
              <TreatmentCard 
                {...step} 
                isLast={index === treatmentSteps.length - 1} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}