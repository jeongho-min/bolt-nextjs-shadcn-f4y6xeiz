"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const facilities = [
  {
    title: "제1진료실",
    description: "한방병원 대표원장 한의학박사 민용태 원장",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
  },
  {
    title: "제3진료실",
    description: "양방 가정의학과 전문의 김광형 원장",
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?auto=format&fit=crop&q=80",
  },
  {
    title: "치료실",
    description: "침, 뜸, 부항, 약침, 추나요법, 물리치료",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80",
  },
  {
    title: "물리치료실",
    description: "도수치료, 재활치료",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80",
  },
  {
    title: "한방요법실",
    description: "피부미용 맛사지실",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
  },
  {
    title: "X-RAY실",
    description: "정확한 진단을 위한 영상 검사실",
    image: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&q=80",
  },
  {
    title: "입원실",
    description: "66병상 완비",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
  },
  {
    title: "황토찜질방",
    description: "건강한 치료를 위한 황토 찜질 시설",
    image: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&q=80",
  },
  {
    title: "반신욕기",
    description: "효과적인 치료를 위한 반신욕 시설",
    image: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&q=80",
  },
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
          <p className="text-gray-600">환자 중심의 편안하고 쾌적한 의료 환경을 제공합니다</p>
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
                  <Image src={facility.image} alt={facility.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
                    <p className="text-white/90 text-sm">{facility.description}</p>
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
