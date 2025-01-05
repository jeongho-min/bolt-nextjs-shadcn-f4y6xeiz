"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Microscope, 
  Thermometer,
  Activity,
  Zap
} from "lucide-react";

const equipment = [
  {
    icon: Microscope,
    title: "진단기기",
    items: [
      "디지털 X-ray",
      "초음파 진단기",
      "체성분 분석기",
      "혈압측정기"
    ]
  },
  {
    icon: Activity,
    title: "치료기기",
    items: [
      "초음파 치료기",
      "저주파 치료기",
      "간섭파 치료기",
      "광선 치료기"
    ]
  },
  {
    icon: Thermometer,
    title: "한방치료기기",
    items: [
      "전기침 치료기",
      "적외선 조사기",
      "부항기",
      "약침 치료기"
    ]
  },
  {
    icon: Zap,
    title: "재활치료기기",
    items: [
      "재활운동기구",
      "보행 훈련기",
      "근력 강화기",
      "균형 훈련기"
    ]
  }
];

export function EquipmentSection() {
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
          <h2 className="text-3xl font-bold mb-4">의료장비</h2>
          <p className="text-gray-600">
            최신 의료장비를 통해 정확한 진단과 효과적인 치료를 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.items.map((equipment) => (
                    <Badge 
                      key={equipment} 
                      variant="secondary"
                      className="font-normal"
                    >
                      {equipment}
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