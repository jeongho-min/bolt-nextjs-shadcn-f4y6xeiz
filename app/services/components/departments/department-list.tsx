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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">진료과목</span>
          </h2>
          <p className="text-gray-600 text-sm">각 분야 전문의가 정성을 다해 진료합니다</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {departments.map((department, index) => (
            <motion.div
              key={department.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-white h-full rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <department.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{department.name}</h3>
                  </div>
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
