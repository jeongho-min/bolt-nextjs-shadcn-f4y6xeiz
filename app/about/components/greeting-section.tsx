"use client";

import { motion } from "framer-motion";

export function GreetingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-8">원장 인사말</h2>
                <div className="space-y-6">
                  <p className="text-gray-600">안녕하세요. 소리청 일곡에스한방병원 원장입니다.</p>
                  <p className="text-gray-600">
                    저희 병원은 전통 한의학의 정성과 현대 의료 시스템의 편리함을 결합하여 환자분들께 최상의 의료 서비스를 제공하고자 노력하고 있습니다.
                  </p>
                  <p className="text-gray-600">앞으로도 끊임없는 연구와 노력으로 여러분의 건강한 삶을 위해 최선을 다하겠습니다.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-lg font-medium">소리청 일곡에스한방병원</p>
                <p className="text-primary font-medium">대표원장 한의학박사 민용태</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img src="/min_yongtea_image.jpg" alt="원장 프로필" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
