"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Ear, Brain, Syringe, Stethoscope, Scale, Heart, Baby, User, Activity, Image as ImageIcon } from "lucide-react";

const departments = {
  korean: [
    {
      name: "이비인후과",
      icon: Ear,
      description: "이명, 어지럼증, 돌발성난청, 메니에르, 이석증",
    },
    {
      name: "내과",
      icon: Stethoscope,
      description: "소화기, 호흡기, 순환기, 비뇨기 질환",
    },
    {
      name: "침구과",
      icon: Syringe,
      description: "관절 척추질환, 경추/요추 디스크 질환, 오십견, 재활치료",
    },
    {
      name: "재활의학과",
      icon: Activity,
      description: "척추 관절 질환, 교통사고 후유증, 스포츠 손상",
    },
    {
      name: "사상체질과",
      icon: Scale,
      description: "체질 감별 후 맞춤 처방 및 치료",
    },
    {
      name: "정신신경과",
      icon: Brain,
      description: "불면증, 우울증, 스트레스, 두통",
    },
    {
      name: "부인과",
      icon: User,
      description: "갱년기 증후군, 생리불순, 여성 질환",
    },
    {
      name: "소아과",
      icon: Baby,
      description: "성장 발달, 소아 질환, 면역력 강화",
    },
  ],
  western: [
    {
      name: "가정의학과",
      icon: Heart,
      description: "일반 검진, 만성 질환 관리",
    },
    {
      name: "내과",
      icon: Stethoscope,
      description: "소화기, 호흡기, 순환기 질환",
    },
    {
      name: "영상의학과",
      icon: ImageIcon,
      description: "X-ray 검사, 초음파 검사",
    },
    {
      name: "재활의학과",
      icon: Activity,
      description: "물리치료, 재활치료, 통증 치료",
    },
  ],
};

export function DepartmentList() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* 한방 진료과목 */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">한방 진료과목</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.korean.map((department, index) => (
                <motion.div
                  key={department.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <div className="p-6 flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <department.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{department.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{department.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 양방 진료과목 */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">양방 진료과목</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.western.map((department, index) => (
                <motion.div
                  key={department.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <div className="p-6 flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <department.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{department.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{department.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
