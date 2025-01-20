"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import Image from "next/image";

const specialEquipment = [
  {
    title: "Raphael 707-K",
    description: "드롭·플렉션·오토플렉션·견인·감압·승하강 기능을 통합한 척추 치료기",
    features: [
      "컴프레셔 없는 모터 센서 드롭 시스템",
      "Auto/Semi Auto 드롭 전환 기능",
      "트랙션과 플렉션 동시 적용 가능",
      "펠빅 레버로 레터럴 플렉션 조절",
      "메모리 기능으로 세팅값 저장",
    ],
    effects: ["임상 기반 척추 교정", "디스크 감압 치료", "칵스테크닉 기반 플렉션", "간헐적 견인 치료", "통합적 척추 관리"],
    image: "/facility/01M707.webp",
  },
  {
    title: "Cryo-Master",
    description: "국내 최초의 CO₂ 방식 극저온 치료 장비",
    features: ["CO₂ 방식의 첨단 극저온 치료", "포인트 케어 가능", "4초 이내 -78℃ 도달", "블루라이트 가이드", "실시간 피부온도 측정"],
    effects: ["진통 효과", "항염 효과", "혈관 운동 반사", "근육 이완"],
    image: "/facility/cyro-master.webp",
  },
  {
    title: "ARTUS-903K",
    description: "전동식 정형용 무릎 관절 운동 장치",
    features: ["-10° ~ 140° 운동 범위", "적응/집중 운동 모드", "5단계 속도 조절", "터치스크린 조작", "경량 설계"],
    effects: ["관절 가동성 향상", "근력 강화", "재활 치료", "수술 후 회복"],
    image: "/facility/artus-903k.webp",
  },
  {
    title: "ESWT-1000",
    description: "체외충격파를 이용한 비수술적 근골격계 치료기",
    features: ["정밀한 충격파 전달 시스템", "터치스크린 제어", "다양한 강도 조절", "실시간 치료 모니터링", "인체공학적 핸드피스"],
    effects: ["통증 완화", "조직 재생 촉진", "염증 감소", "혈류량 개선", "유착 제거"],
    image: "/facility/eswt-1000.webp",
  },
  {
    title: "Raphael SASO-PR (01M7-P)",
    description: "케이블의 내구성과 편심회전운동 기술을 적용한 진동 마사지기",
    features: [
      "사용이 간편하고 실용적이며 뛰어난 안정성",
      "조절 다이얼을 이용한 진동 강도 조절",
      "다양한 마사지 용도에 알맞은 어플리케이터 선택 가능",
      "저소음의 안정적인 테이블",
      "프리미엄 디자인과 내구성",
    ],
    effects: ["근육 이완", "통증 완화", "혈액 순환 개선", "피로 회복", "전신 마사지"],
    image: "/facility/01M7-P.webp",
  },
  {
    title: "OMS-1",
    description: "한방 치료의 과학화와 세계화를 목표로 개발된 전동 테이블",
    features: ["간결한 디자인", "뛰어난 안정성", "우수한 내구성"],
    effects: ["한방 치료의 효율성 증대", "치료사의 편의성 향상", "환자의 편안함 증대"],
    image: "/facility/OMS-1.webp",
  },
];

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    y: -3,
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">의료장비</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">최신 의료장비를 통해 정확한 진단과 효과적인 치료를 제공합니다</p>
        </motion.div>

        {/* 특수 의료장비 섹션 */}
        <motion.div className="mb-24" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "50px" }}>
          <div className="grid grid-cols-1 gap-8">
            {specialEquipment.map((item, index) => (
              <motion.div key={item.title} variants={cardAnimation} whileHover="hover" viewport={{ once: true }} className="will-change-transform">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative w-full lg:w-2/5 h-[300px] lg:h-[400px] bg-gray-50">
                      <motion.div className="absolute inset-0 flex items-center justify-center p-8" variants={imageAnimation}>
                        <div className="relative w-full h-full">
                          <Image src={item.image} alt={item.title} fill className="object-contain" priority={index < 2} />
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex-1 p-8">
                      <div className="max-w-xl">
                        <h4 className="text-2xl font-bold mb-2 text-primary">{item.title}</h4>
                        <p className="text-gray-600 mb-6 text-lg">{item.description}</p>
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                              <ArrowRight className="w-5 h-5 text-primary" />
                              주요 기능
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.features.map((feature) => (
                                <Badge
                                  key={feature}
                                  variant="secondary"
                                  className="font-normal px-4 py-2 text-sm bg-primary/5 hover:bg-primary/10 transition-colors"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                              <Activity className="w-5 h-5 text-primary" />
                              치료 효과
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.effects.map((effect) => (
                                <Badge
                                  key={effect}
                                  variant="outline"
                                  className="font-normal px-4 py-2 text-sm border-primary/30 hover:bg-primary/5 transition-colors"
                                >
                                  {effect}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
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
