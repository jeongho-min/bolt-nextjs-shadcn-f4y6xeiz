"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const symptoms = [
  {
    id: "이명",
    label: "이명",
    image: "/sub/sec1_ic1.png",
    hoverImage: "/sub/sec1_ic1_on.png",
    description: "귀에서 들리는 소리로 인해 일상생활이 불편한 증상입니다. 소리청의 맞춤형 한방치료로 이명 증상을 개선할 수 있습니다.",
  },
  {
    id: "돌발성난청",
    label: "돌발성난청",
    image: "/sub/sec1_ic2.png",
    hoverImage: "/sub/sec1_ic2_on.png",
    description: "갑자기 발생하는 청력 저하로, 조기 발견과 치료가 매우 중요합니다. 한약과 침 치료를 통해 청력 회복을 도와드립니다.",
  },
  {
    id: "어지럼증",
    label: "어지럼증",
    image: "/sub/sec1_ic3.png",
    hoverImage: "/sub/sec1_ic3_on.png",
    description: "빙빙 도는 느낌이나 균형감각 상실로 인한 불편함을 해소하기 위해 전문적인 한방치료를 제공합니다.",
  },
  {
    id: "이석증",
    label: "이석증",
    image: "/sub/sec1_ic4.png",
    hoverImage: "/sub/sec1_ic4_on.png",
    description: "내이의 이석이 비정상적으로 움직여 발생하는 어지럼증으로, 맞춤형 치료로 증상을 개선합니다.",
  },
  {
    id: "메니에르",
    label: "메니에르",
    image: "/sub/sec1_ic5.png",
    hoverImage: "/sub/sec1_ic5_on.png",
    description: "어지럼증, 난청, 이명이 복합적으로 나타나는 질환으로, 체계적인 한방치료로 증상을 관리합니다.",
  },
  {
    id: "전정신경염",
    label: "전정신경염",
    image: "/sub/sec1_ic6.png",
    hoverImage: "/sub/sec1_ic6_on.png",
    description: "전정신경의 염증으로 인한 심한 어지럼증을 한약과 침 치료로 개선하여 일상생활로의 복귀를 돕습니다.",
  },
  {
    id: "귀먹먹",
    label: "귀먹먹",
    image: "/sub/sec1_ic7.png",
    hoverImage: "/sub/sec1_ic7_on.png",
    description: "귀가 막힌 듯한 불편한 증상을 개선하기 위해 원인을 파악하고 맞춤형 치료를 제공합니다.",
  },
  {
    id: "두통",
    label: "두통",
    image: "/sub/sec1_ic8.png",
    hoverImage: "/sub/sec1_ic8_on.png",
    description: "다양한 원인으로 발생하는 두통에 대해 정확한 진단과 함께 효과적인 한방치료를 실시합니다.",
  },
];

export function HistorySection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">SINCE 2004</h2>
          </motion.div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            2004년 전국 소리청 네트워크구성을 시작으로{" "}
            <span className="text-primary font-medium">이명, 돌발성난청, 어지럼증, 이석증, 메니에르, 전정신경염</span> 등을 20여년간 연구와 치료 중심의 의학을
            실천하고 있습니다.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 max-w-7xl mx-auto"
          >
            {symptoms.map((symptom, index) => (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group transition-all duration-300 ${hoveredId && hoveredId !== symptom.id ? "opacity-30" : ""}`}
                onMouseEnter={() => setHoveredId(symptom.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={hoveredId === symptom.id ? symptom.hoverImage : symptom.image}
                    alt={symptom.label}
                    fill
                    priority
                    className="object-contain p-4 transition-all duration-300"
                  />
                </motion.div>
                <p className="text-center mt-4 font-medium text-gray-700">{symptom.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="h-16 mt-4" />
          <AnimatePresence>
            {hoveredId && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-full -mt-16"
              >
                <div className="max-w-2xl mx-auto">
                  <motion.div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100" layoutId="description-card">
                    <p className="text-gray-700 leading-relaxed text-center text-sm">{symptoms.find((s) => s.id === hoveredId)?.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
