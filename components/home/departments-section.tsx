"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Stethoscope, // 내과
  Ear, // 이비인후과
  Syringe, // 침구과
  Brain, // 신경과
  Scale, // 사상체질과
} from "lucide-react";

const departments = [
  {
    name: "이비인후과",
    icon: Ear,
    description: "이명, 어지럼증, 돌발성난청, 메니에르, 이석증",
  },
  {
    name: "신경과",
    icon: Brain,
    description: "두통, 편두통, 어지럼증, 치매",
  },
  {
    name: "침구과",
    icon: Syringe,
    description: "관절 척추질환, 경추/요추 디스크 질환, 오십견, 재활치료",
  },
  {
    name: "내과",
    icon: Stethoscope,
    description: "소화기, 호흡기, 순환기, 비뇨기 질환, 간담 질환",
  },
  {
    name: "사상체질의학과",
    icon: Scale,
    description: "체질 감별 후 맞춤 처방 및 치료",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DepartmentsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">전문 진료과목</h2>
          <p className="text-gray-600">체계적이고 전문적인 진료를 제공합니다</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {departments.map((dept) => (
            <motion.div key={dept.name} variants={item}>
              <Card className="h-full p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
                <div className="flex flex-col h-full">
                  <div className="mb-4 p-3 rounded-xl bg-primary/5 inline-block mx-auto">
                    <dept.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{dept.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{dept.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
