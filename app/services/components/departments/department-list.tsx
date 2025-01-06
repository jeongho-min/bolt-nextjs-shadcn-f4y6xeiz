"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Ear, Brain, Syringe, Stethoscope, Scale } from "lucide-react";

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
    description: "소화기, 호흡기, 순환기, 비뇨기 질환",
  },
  {
    name: "사상체질의학과",
    icon: Scale,
    description: "체질 감별 후 맞춤 처방 및 치료",
  },
];

export function DepartmentList() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">진료과목</h2>
          <p className="text-lg text-gray-600">각 분야 전문의가 정성을 다해 진료합니다</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {departments.map((department, index) => (
            <motion.div
              key={department.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-xl bg-primary/10 mb-4">
                    <department.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{department.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{department.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
