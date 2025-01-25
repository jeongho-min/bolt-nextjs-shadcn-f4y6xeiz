"use client";

import { motion } from "framer-motion";
import { ReviewCard } from "./review-card";
import { useTreatmentCases } from "@/app/contexts/treatment-case-context";

export function ReviewSection() {
  const { cases, isLoading, error } = useTreatmentCases();

  // 데이터를 4번 복제하고 각각 고유한 key를 부여합니다
  const duplicatedCases = [...cases, ...cases, ...cases, ...cases]
    .filter((item) => item.id)
    .map((item, index) => ({
      ...item,
      uniqueKey: `${item.id}_${Math.floor(index / cases.length)}`, // 복제본 번호를 추가하여 고유한 key 생성
    }));

  // 전체 아이템 개수에 따라 duration 계산
  // 각 아이템당 20초의 기본 시간을 할당하고, 최소 120초를 보장
  const scrollDuration = Math.max(duplicatedCases.length * 2, 120);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 text-center">
          <p>로딩 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">진료 사례</h2>
          <p className="text-gray-600">소리청 일곡에스한방병원의 치료 사례를 소개합니다</p>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden py-4">
        <motion.div
          className="flex gap-8"
          animate={{ x: "-50%" }}
          transition={{
            duration: scrollDuration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {duplicatedCases.map((treatmentCase) => (
            <ReviewCard
              key={treatmentCase.uniqueKey}
              id={treatmentCase.id}
              title={treatmentCase.title}
              description={treatmentCase.description}
              date={new Date(treatmentCase.date)}
              category={treatmentCase.treatment_categories.name}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
