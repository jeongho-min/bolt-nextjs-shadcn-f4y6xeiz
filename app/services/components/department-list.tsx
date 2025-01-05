"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Brain, 
  Baby, 
  Bone, 
  Activity,
  Heart,
  UserCircle2
} from "lucide-react";

const departments = [
  {
    icon: Stethoscope,
    title: "내과",
    description: "소화기 질환, 호흡기 질환, 순환기 질환 등",
    specialties: ["소화불량", "위장질환", "변비/설사", "호흡기 질환"]
  },
  {
    icon: Brain,
    title: "신경과",
    description: "두통, 어지럼증, 안면마비, 중풍 등",
    specialties: ["두통", "어지럼증", "안면마비", "뇌졸중 후유증"]
  },
  {
    icon: Heart,
    title: "심장내과",
    description: "고혈압, 부정맥, 협심증 등",
    specialties: ["고혈압", "부정맥", "협심증", "심장질환"]
  },
  {
    icon: Baby,
    title: "소아과",
    description: "소아 성장, 소화기 질환, 호흡기 질환 등",
    specialties: ["성장발달", "소아비만", "소아천식", "소아변비"]
  },
  {
    icon: Bone,
    title: "정형외과",
    description: "관절통, 요통, 디스크, 척추질환 등",
    specialties: ["허리통증", "목통증", "관절통", "척추질환"]
  },
  {
    icon: Activity,
    title: "재활의학과",
    description: "재활치료, 통증치료, 물리치료 등",
    specialties: ["재활치료", "통증관리", "물리치료", "운동치료"]
  }
];

export function DepartmentList() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">전문 진료과목</h2>
          <p className="text-gray-600">
            각 분야 전문의가 정성을 다해 진료합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <dept.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{dept.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="flex flex-wrap gap-2">
                  {dept.specialties.map((specialty) => (
                    <Badge 
                      key={specialty} 
                      variant="secondary"
                      className="font-normal"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}