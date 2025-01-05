"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export function GreetingSection() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1622253694242-abeb37a33e97?auto=format&fit=crop&q=80"
                  alt="원장 프로필"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">원장 인사말</h2>
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    안녕하세요. 소리철 일곡에스한방병원 원장입니다.
                    저희 병원은 전통 한의학의 정성과 현대 의료 시스템의 편리함을 결합하여
                    환자분들께 최상의 의료 서비스를 제공하고자 노력하고 있습니다.
                  </p>
                  <p className="leading-relaxed">
                    앞으로도 끊임없는 연구와 노력으로 여러분의 건강한 삶을 위해
                    최선을 다하겠습니다.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">학력 및 경력</h3>
                <div className="grid gap-6">
                  <div>
                    <h4 className="font-medium text-primary mb-2">학력</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>서울대학교 한의과대학 졸업</li>
                      <li>경희대학교 한의학 박사</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-2">자격</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>대한한의사협회 정회원</li>
                      <li>한방내과 전문의</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-2">경력</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>15년 이상의 임상 경험</li>
                      <li>대학병원 한방내과 과장 역임</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <p className="font-medium text-black text-lg">소리철 일곡에스한방병원</p>
                <p className="text-primary font-medium">원장 김태호</p>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  );
}