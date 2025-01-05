"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Baby, 
  Bone, 
  Activity 
} from "lucide-react";
import { ReviewsSection } from "@/components/reviews/reviews-section";

const departments = [
  { name: "내과", icon: Stethoscope, description: "소화기, 호흡기, 순환기 질환" },
  { name: "신경과", icon: Brain, description: "두통, 어지럼증, 치매" },
  { name: "심장내과", icon: Heart, description: "고혈압, 부정맥, 협심증" },
  { name: "소아과", icon: Baby, description: "소아 질환, 예방접종" },
  { name: "정형외과", icon: Bone, description: "관절, 척추 질환" },
  { name: "재활의학과", icon: Activity, description: "재활치료, 물리치료" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {departments.map((dept) => (
              <motion.div key={dept.name} variants={item}>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <dept.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-gray-600">{dept.description}</p>
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