"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Stethoscope, // 내과
  Ear, // 안이비인후과
  Syringe, // Needle 대신 Syringe 사용
  Activity, // 재활의학과
  Scale, // 사상체질과
  Brain, // 신경정신과
  Sparkles, // 피부과
  Baby, // 소아과
} from "lucide-react";
import { ReviewsSection } from "@/components/reviews/reviews-section";

const departments = [
  {
    name: "내과",
    icon: Stethoscope,
    description: "소화기 질환, 호흡기 질환, 순환기 질환",
  },
  {
    name: "안이비인후과",
    icon: Ear,
    description: "귀, 코, 목 질환, 어지럼증, 난청",
  },
  {
    name: "침구과",
    icon: Syringe,
    description: "통증 치료, 척추 질환, 관절 질환",
  },
  {
    name: "재활의학과",
    icon: Activity,
    description: "재활치료, 물리치료, 후유증 관리",
  },
  {
    name: "사상체질과",
    icon: Scale,
    description: "체질 감별, 체질 치료, 체질 개선",
  },
  {
    name: "신경정신과",
    icon: Brain,
    description: "불면증, 우울증, 스트레스, 두통",
  },
  {
    name: "피부과",
    icon: Sparkles,
    description: "피부 질환, 아토피, 여드름",
  },
  {
    name: "소아과",
    icon: Baby,
    description: "소아 질환, 성장 발달, 면역력 강화",
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
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">전문 진료과목</h2>
            <p className="text-gray-600">최고의 의료진이 함께합니다</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {departments.map((dept) => (
              <motion.div key={dept.name} variants={item}>
                <Card className="h-full p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <dept.icon className="w-10 h-10 mx-auto text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{dept.name}</h3>
                    <p className="text-gray-600 text-sm flex-1">{dept.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <ReviewsSection />
    </>
  );
}
