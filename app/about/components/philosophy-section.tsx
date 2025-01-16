"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Target, Clock, UserCheck, Stethoscope, Shield } from "lucide-react";

const philosophies = [
  {
    icon: Heart,
    title: "환자 중심의 맞춤형 치료",
    description: "각 환자의 상태와 특성을 고려한 개별화된 치료 계획을 수립합니다.",
  },
  {
    icon: Target,
    title: "정확한 진단과 치료",
    description:
      "한의학과 양의학의 장점을 결합하여 한의학의 사상체질의학으로 정확한 체질(태음인,소음인,태양인,소양인, 한자와 열자)를 감별하고 양의학의 X-ray, CT, MRI 등 영상의학과 혈액검사 소견 등을 종합하여 정확한 진단과 효과적인 치료를 제공합니다.",
  },
  {
    icon: Clock,
    title: "지속적인 건강관리",
    description: "치료 후에도 지속적인 관리와 상담을 통해 건강한 삶을 유지하도록 돕습니다.",
  },
  {
    icon: UserCheck,
    title: "전문성 추구",
    description: "끊임없는 연구와 학습으로 최신 의료 지식과 기술을 습득합니다.",
  },
  {
    icon: Stethoscope,
    title: "통합적 접근",
    description: "몸과 마음의 균형을 고려한 전인적 치료를 지향합니다.",
  },
  {
    icon: Shield,
    title: "안전성 중시",
    description: "검증된 치료법과 안전한 시술로 환자의 건강을 보호합니다.",
  },
];

export function PhilosophySection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">진료철학</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            소리청은 오랜 임상 경험을 바탕으로 정확한 진단과 효과적인 치료를 제공하며,
            <br />
            환자 중심의 맞춤형 치료를 통해 최상의 치료 결과를 추구합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary/20">
                <div className="flex flex-col items-start">
                  <div className="p-3 rounded-xl bg-primary/5 mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
