"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import type { Disease } from "./types";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Brain } from "lucide-react";

interface DiseasePanelProps {
  disease: Disease | null;
  onClose: () => void;
}

export function DiseasePanel({ disease, onClose }: DiseasePanelProps) {
  if (!disease) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            mass: 1,
            duration: 0.6,
          }}
          className="fixed top-0 right-0 h-full w-full md:w-3/4 lg:w-3/4 bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto">
            {/* 헤더 */}
            <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">{disease.title}</h2>
                <p className="text-base text-gray-500">{disease.titleEn}</p>
              </div>
              <button onClick={onClose} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 컨텐츠 */}
            <div className="p-8 space-y-16">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-6">이명이란?</h3>
                    <p className="text-xl font-medium text-primary mb-4">외부의 소리 자극이 없는 이명</p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      이명은 외부로부터 소리의 자극이 없는데도 귓속이나 머릿 속에서 느끼는 소리로 특정한 질환이라기보다는 하나의 증상입니다. 일시적인 이명은
                      흔한 증상이고 대부분 문제가 되지 않지만 심한 경우에는 일상생활에 심각한 영향을 끼칠 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <p className="text-xl font-medium text-primary mb-3">{disease.description}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{disease.definition}</p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-50">
                  <Image src="/diseases/이명/이명_4-1.png" alt="이명의 동반증상" fill className="object-contain" priority />
                </div>
              </div>

              {/* 증상 */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-8">주요 증상</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <HeartPulse className="w-7 h-7 text-primary" />
                        </div>
                        <h4 className="text-2xl font-bold text-primary">신체적 증상</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {disease.symptoms.physical.map((symptom) => (
                          <Badge key={symptom} variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Brain className="w-7 h-7 text-primary" />
                        </div>
                        <h4 className="text-2xl font-bold text-primary">정신적 증상</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {disease.symptoms.mental.map((symptom) => (
                          <Badge key={symptom} variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 이명의 악순환 */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-8">이명의 악순환</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[400px]">
                    <Image src="/diseases/이명/이명_1.png" alt="이명의 악순환" fill className="object-contain" priority />
                  </div>
                  <div>
                    <p className="text-gray-600 text-lg leading-relaxed space-y-4">
                      <span className="block mb-4">
                        <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">이명이 장기간 지속</span>되면 뇌가{" "}
                        <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">중요한 소리</span>로 분류해
                        <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">오히려 이명 소리를 탐색</span>하게 되고,
                      </span>
                      <span className="block mb-4">
                        이명을 인지할 때의 불쾌함과 불안은 감정 뇌를 자극하고 교감신경을 활성화시켜 스트레스 반응을 유발합니다.
                      </span>
                      <span className="block">이런 스트레스는 이명에 대해 더 예민하고 집중하게 해 이명으로 인한 고통을 가중 시킵니다.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 귀에서 들리는 소리의 분류 */}
              <div>
                <h3 className="text-3xl font-bold mb-8">귀에서 들리는 소리의 분류</h3>
                <div className="space-y-8">
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      이명에 의해 들려오는 소리는 다양합니다. 환자마다 다 다르다고 볼 수 있습니다. 그러나 어떤 종류의 소리가 발생하더라도 환자들이 괴로운 것은
                      마찬가지 입니다. 이명 환자들은 이런 소리에 의해 불안감과, 어지럼증, 수면장애와 같은 2차적 문제까지 겪고 있습니다.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="relative h-[350px]">
                        <Image src="/diseases/이명/이명_2-1.png" alt="귀에서 들리는 소리의 분류 1" fill className="object-contain" priority />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="relative h-[350px]">
                        <Image src="/diseases/이명/이명_2-2.png" alt="귀에서 들리는 소리의 분류 2" fill className="object-contain" priority />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 통계 */}
              {disease.statistics && (
                <div>
                  <h3 className="text-3xl font-bold mb-8">이명 통계</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-gray-50 p-8 rounded-xl">
                      <div className="relative h-[400px]">
                        <Image src="/diseases/이명/이명_3.png" alt="이명 통계" fill className="object-contain" priority />
                      </div>
                    </div>
                    <div className="bg-primary/5 p-8 rounded-xl">
                      <h4 className="text-2xl font-bold mb-4">{disease.statistics.title}</h4>
                      <p className="text-gray-600 text-lg leading-relaxed">{disease.statistics.description}</p>
                      {disease.statistics.source && <p className="text-gray-500 text-base mt-4">출처: {disease.statistics.source}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* 원인 */}
              <div>
                <h3 className="text-3xl font-bold mb-8">발생 원인</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {disease.causes.map((cause) => (
                    <div key={cause.title} className="bg-gray-50 p-8 rounded-xl">
                      <h4 className="text-xl font-medium text-primary mb-4">{cause.title}</h4>
                      <p className="text-gray-600 text-lg leading-relaxed">{cause.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 치료 */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-8">치료 방법</h3>
                <div className="space-y-8">
                  {/* 이미지 섹션 */}
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="text-2xl font-bold text-primary mb-6">일곡에스한방병원 진료 방법</h4>
                    <div className="relative h-[500px]">
                      <Image src="/diseases/이명/이명_5.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
                    </div>
                  </div>

                  {/* 치료 방법 설명 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">1</span>
                        </div>
                        <h4 className="text-xl font-bold text-primary">한약 치료</h4>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        한약치료를 통해 신체 오장육부의 기능을 촉진시켜 청력세포를 생성합니다. 생성된 청력세포는 약해진 기혈흐름을 바로잡습니다.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">2</span>
                        </div>
                        <h4 className="text-xl font-bold text-primary">침 치료</h4>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        침 치료를 통해 귀나 눈 질환의 80% 이상의 자각증상 호전 및 소실을 도우며 약 12주의 기간이 필요합니다.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">3</span>
                        </div>
                        <h4 className="text-xl font-bold text-primary">약침 치료</h4>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청 한의원의 이명 치료법입니다. 국소적인 통증 제어 뿐
                        아니라 면역력을 높여 탁월한 치료효과를 보입니다.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">4</span>
                        </div>
                        <h4 className="text-xl font-bold text-primary">추나 치료</h4>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        자세가 바르지 않고 척추에 문제가 있거나 턱관절에 문제가 있으면 신경이 과잉 흥분되어 청력이 떨어지고 귀질환이 오기 쉽습니다. 통합 교정
                        치료를 통해 구조적인 문제를 해결하며 귀 질환을 예방합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
