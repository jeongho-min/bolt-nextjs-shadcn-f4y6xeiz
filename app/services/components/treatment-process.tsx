"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ClipboardCheck, Stethoscope, FileText, Pill, CalendarCheck } from "lucide-react";

const processes = [
  {
    icon: ClipboardCheck,
    title: "접수",
    description: "간단한 문진표 작성과 함께 진료 접수를 진행합니다.",
  },
  {
    icon: Stethoscope,
    title: "진찰",
    description: "전문의가 상담과 진찰을 통해 정확한 진단을 내립니다.",
  },
  {
    icon: FileText,
    title: "치료계획",
    description: "환자의 상태에 맞는 최적의 치료 계획을 수립합니다.",
  },
  {
    icon: Pill,
    title: "치료",
    description: "한약, 침, 뜸 등 다양한 치료법으로 건강을 회복합니다.",
  },
  {
    icon: CalendarCheck,
    title: "관리",
    description: "정기적인 상담과 관리로 건강한 삶을 유지합니다.",
  },
];

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
          <p className="text-gray-600">체계적인 진료 과정으로 최상의 치료 결과를 제공합니다</p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {processes.map((process, index) => (
            <motion.div
              key={process.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-1"
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <process.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="relative">
                  <h3 className="text-lg font-bold mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                  {index < processes.length - 1 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
