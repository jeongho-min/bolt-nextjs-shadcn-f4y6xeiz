"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Target, Clock, UserCheck, Stethoscope, Shield } from "lucide-react";

const philosophies = [
  {
    icon: Heart,
    title: "환자 중심의 맞춤형 치료",
    description: "각 환자의 상태와 특성을 고려한 개별화된 치료 계획을 수립합니다."
  },
  {
    icon: Target,
    title: "정확한 진단과 치료",
    description: "현대 의학과 전통 한의학을 결합한 정확하고 효과적인 진단과 치료를 제공합니다."
  },
  {
    icon: Clock,
    title: "지속적인 건강관리",
    description: "치료 후에도 지속적인 관리와 상담을 통해 건강한 삶을 유지하도록 돕습니다."
  },
  {
    icon: UserCheck,
    title: "전문성 추구",
    description: "끊임없는 연구와 학습으로 최신 의료 지식과 기술을 습득합니다."
  },
  {
    icon: Stethoscope,
    title: "통합적 접근",
    description: "몸과 마음의 균형을 고려한 전인적 치료를 지향합니다."
  },
  {
    icon: Shield,
    title: "안전성 중시",
    description: "검증된 치료법과 안전한 시술로 환자의 건강을 보호합니다."
  }
];

export function PhilosophySection() {
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
          <h2 className="text-3xl font-bold mb-4">진료철학</h2>
          <p className="text-gray-600">환자를 최우선으로 생각하는 소리청의 가치입니다</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}