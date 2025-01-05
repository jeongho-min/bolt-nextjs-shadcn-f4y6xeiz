"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const facilities = [
  {
    title: "진료실",
    description: "편안한 환경에서 정확한 진단을 위한 전문 진료공간",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
  },
  {
    title: "치료실",
    description: "다양한 치료를 위한 전문 치료공간",
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?auto=format&fit=crop&q=80"
  },
  {
    title: "한약 조제실",
    description: "정확하고 체계적인 한약 조제 시스템",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80"
  },
  {
    title: "물리치료실",
    description: "전문 치료사의 체계적인 재활치료",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80"
  },
  {
    title: "입원실",
    description: "쾌적하고 안락한 환경의 입원실",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
  },
  {
    title: "휴게실",
    description: "환자와 보호자를 위한 편안한 휴식공간",
    image: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&q=80"
  }
];

export function FacilitiesList() {
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
          <h2 className="text-3xl font-bold mb-4">주요 시설</h2>
          <p className="text-gray-600">
            환자 중심의 편안하고 쾌적한 의료 환경을 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {facility.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {facility.description}
                    </p>
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