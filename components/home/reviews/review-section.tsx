"use client";

import { motion } from "framer-motion";
import { ReviewCard } from "./review-card";
import { reviews } from "./review-data";

export function ReviewSection() {
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

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
          <h2 className="text-3xl font-bold mb-4">진료 후기</h2>
          <p className="text-gray-600">소리철 일곡에스한방병원을 믿고 찾아주신 환자분들의 소중한 후기입니다</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50/50 to-transparent z-10" />

        <div className="overflow-hidden mx-4">
          <div className="flex animate-marquee">
            {duplicatedReviews.map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="w-[320px] flex-shrink-0 px-6">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
