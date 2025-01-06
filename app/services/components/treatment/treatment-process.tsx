"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ClipboardList, Stethoscope, Beaker, HeartPulse } from "lucide-react";

const treatmentSteps = [
  {
    icon: ClipboardList,
    title: "초진 문진",
    description: "자세한 상담을 통해 증상과 병력을 정확히 파악합니다.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80",
    alt: "한의원 상담 이미지",
  },
  {
    icon: Stethoscope,
    title: "정밀 진찰",
    description: "한의학적 진단과 현대 의학적 검사를 통해 정확한 진단을 진행합니다.",
    image: "https://plus.unsplash.com/premium_photo-1661766752153-9f0c3fad728f?auto=format&fit=crop&q=80",
    alt: "한의원 진찰 이미지",
  },
  {
    icon: Beaker,
    title: "맞춤 치료",
    description: "진단 결과를 바탕으로 개인별 맞춤 치료 계획을 수립하고 시행합니다.",
    image: "https://images.unsplash.com/photo-1577897113292-3b95936e5206?auto=format&fit=crop&q=80",
    alt: "침술 치료 이미지",
  },
  {
    icon: HeartPulse,
    title: "경과 관찰",
    description: "치료 효과를 지속적으로 모니터링하고 필요시 치료 계획을 조정합니다.",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80",
    alt: "한의원 상담실 이미지",
  },
];

export function TreatmentProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">진료 과정</h2>
          <p className="text-lg text-gray-600">체계적이고 전문적인 진료 과정으로 최상의 치료 결과를 제공합니다</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {treatmentSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image src={step.image} alt={step.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-primary/5 mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="relative">
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      {index < treatmentSteps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-12 w-6 h-0.5 bg-gray-300" />}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
