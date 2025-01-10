"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Stethoscope, Microscope, Thermometer, Activity, Zap, Star, ArrowRight } from "lucide-react";

const equipment = [
  {
    icon: Microscope,
    title: "진단기기",
    items: ["디지털 X-ray", "초음파 진단기", "체성분 분석기", "혈압측정기"],
  },
  {
    icon: Activity,
    title: "치료기기",
    items: ["초음파 치료기", "저주파 치료기", "간섭파 치료기", "광선 치료기"],
  },
  {
    icon: Thermometer,
    title: "한방치료기기",
    items: ["전기침 치료기", "적외선 조사기", "부항기", "약침 치료기"],
  },
  {
    icon: Zap,
    title: "재활치료기기",
    items: ["재활운동기구", "보행 훈련기", "근력 강화기", "균형 훈련기"],
  },
];

const specialEquipment = [
  {
    title: "Cryo-Master",
    description: "국내 최초의 CO₂ 방식 극저온 치료 장비",
    features: ["CO₂ 방식의 첨단 극저온 치료", "포인트 케어 가능", "4초 이내 -78℃ 도달", "블루라이트 가이드", "실시간 피부온도 측정"],
    effects: ["진통 효과", "항염 효과", "혈관 운동 반사", "근육 이완"],
    image: "/facility/cyro-master.png",
  },
  {
    title: "ARTUS-903K",
    description: "전동식 정형용 무릎 관절 운동 장치",
    features: ["-10° ~ 140° 운동 범위", "적응/집중 운동 모드", "5단계 속도 조절", "터치스크린 조작", "경량 설계"],
    effects: ["관절 가동성 향상", "근력 강화", "재활 치료", "수술 후 회복"],
    image: "/facility/artus-903k.png",
  },
  {
    title: "ESWT-1000",
    description: "체외충격파를 이용한 비수술적 근골격계 치료기",
    features: ["정밀한 충격파 전달 시스템", "터치스크린 제어", "다양한 강도 조절", "실시간 치료 모니터링", "인체공학적 핸드피스"],
    effects: ["통증 완화", "조직 재생 촉진", "염증 감소", "혈류량 개선", "유착 제거"],
    image: "/facility/eswt-1000.png",
  },
  {
    title: "ARTUS-701ES",
    description: "어깨 관절 전용 지속적 수동 운동(CPM) 치료기",
    features: ["어깨 관절 맞춤형 설계", "정밀한 각도 조절", "점진적 운동 범위 확장", "안전한 수동 운동 제공", "인체공학적 구조"],
    effects: ["관절 운동 범위 회복", "염증 완화", "근육 이완 및 재건", "수술 후 회복 가속화", "통증 감소"],
    image: "/facility/artus-701es.png",
  },
];

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export function EquipmentSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">의료장비</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">최신 의료장비를 통해 정확한 진단과 효과적인 치료를 제공합니다</p>
        </motion.div>

        {/* 특수 의료장비 섹션 */}
        <motion.div className="mb-24" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <div className="grid grid-cols-1 gap-8">
            {specialEquipment.map((item, index) => (
              <motion.div key={item.title} variants={cardAnimation} whileHover="hover" viewport={{ once: true }}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative w-full lg:w-2/5 h-[300px] lg:h-[400px] bg-gray-50">
                      <motion.div className="absolute inset-0 flex items-center justify-center p-8" variants={imageAnimation}>
                        <div className="relative w-full h-full">
                          <Image src={item.image} alt={item.title} fill className="object-contain" priority />
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex-1 p-8">
                      <motion.div
                        className="max-w-xl"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <h4 className="text-2xl font-bold mb-2 text-primary">{item.title}</h4>
                        <p className="text-gray-600 mb-6 text-lg">{item.description}</p>
                        <div className="space-y-6">
                          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
                            <h5 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                              <ArrowRight className="w-5 h-5 text-primary" />
                              주요 기능
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.features.map((feature, idx) => (
                                <motion.div
                                  key={feature}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                                >
                                  <Badge variant="secondary" className="font-normal px-4 py-2 text-sm bg-primary/5 hover:bg-primary/10 transition-colors">
                                    {feature}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
                            <h5 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                              <Activity className="w-5 h-5 text-primary" />
                              치료 효과
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.effects.map((effect, idx) => (
                                <motion.div
                                  key={effect}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                                >
                                  <Badge variant="outline" className="font-normal px-4 py-2 text-sm border-primary/30 hover:bg-primary/5 transition-colors">
                                    {effect}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
