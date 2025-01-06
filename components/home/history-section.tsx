"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const symptoms = [
  { id: "이명", label: "이명", image: "/sub/sec1_ic1.png", hoverImage: "/sub/sec1_ic1_on.png" },
  { id: "돌발성난청", label: "돌발성난청", image: "/sub/sec1_ic2.png", hoverImage: "/sub/sec1_ic2_on.png" },
  { id: "어지럼증", label: "어지럼증", image: "/sub/sec1_ic3.png", hoverImage: "/sub/sec1_ic3_on.png" },
  { id: "이석증", label: "이석증", image: "/sub/sec1_ic4.png", hoverImage: "/sub/sec1_ic4_on.png" },
  { id: "메니에르", label: "메니에르", image: "/sub/sec1_ic5.png", hoverImage: "/sub/sec1_ic5_on.png" },
  { id: "전정신경염", label: "전정신경염", image: "/sub/sec1_ic6.png", hoverImage: "/sub/sec1_ic6_on.png" },
  { id: "귀먹먹", label: "귀먹먹", image: "/sub/sec1_ic7.png", hoverImage: "/sub/sec1_ic7_on.png" },
  { id: "두통", label: "두통", image: "/sub/sec1_ic8.png", hoverImage: "/sub/sec1_ic8_on.png" },
];

export function HistorySection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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
              className="relative group"
              onMouseEnter={() => setHoveredId(symptom.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <Image
                  src={hoveredId === symptom.id ? symptom.hoverImage : symptom.image}
                  alt={symptom.label}
                  fill
                  className="object-contain p-4 transition-all duration-300"
                />
              </motion.div>
              <p className="text-center mt-4 font-medium text-gray-700">{symptom.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
