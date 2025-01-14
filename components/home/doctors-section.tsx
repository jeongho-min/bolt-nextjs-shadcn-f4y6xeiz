"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  education: string[];
  career: string[];
  specialty?: string[];
}

const doctors: Doctor[] = [
  {
    id: "min-yongtae",
    name: "민용태",
    role: "대표원장",
    department: "한방과",
    image: "/민용태_원장_수정.jpg",
    education: ["원광대학교 대학원 한의학박사 취득(1991년)", "전남대학교 정형외과학 최고경영자과정 수료"],
    career: [
      "전 원광대학교 한의과대학 겸임교수",
      "전 동신대학교 한의과대학 교수 및 겸임교수",
      "전 순천대학교 한약자원학과 외래교수",
      "대우재단부속 대우한의원 개원(2007.4~2009.5)",
      "소리청한의원 네트워크 대표원장 역임",
    ],
    specialty: ["이명, 난청, 어지럼증", "안면마비, 두통"],
  },
  {
    id: "kim-gwanghyung",
    name: "김광형",
    role: "양방원장",
    department: "양방과",
    image: "김광형_원장_수정.jpg",
    education: ["조선대학교 의과대학 졸업(1977)", "가정의학과 전문의 취득(1987)", "중국 연변대학 침구과 연수(1986~1987)", "IMS, TPI 연수(2006)"],
    career: ["김광형의원 개원(1983)", "온누리 가정의원 개원(2002)", "現 소리청 일곡에스한방병원 양방원장(2024.12~)"],
    // 한방에서 양방 전문의
    specialty: ["소화기 질환", "만성질환"],
  },
];

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="bg-white h-full rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden">
      <div className="relative h-[300px]">
        <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">
            {doctor.name} {doctor.role}
          </h3>
          <p className="text-white/90 text-sm font-medium">{doctor.department}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h4 className="text-base font-semibold text-primary">학력 및 경력</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {doctor.education.map((edu, index) => (
                <li key={`edu-${index}`} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{edu}</span>
                </li>
              ))}
              {doctor.career.map((career, index) => (
                <li key={`career-${index}`} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{career}</span>
                </li>
              ))}
            </ul>
          </div>

          {doctor.specialty && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-primary" />
                <h4 className="text-base font-semibold text-primary">전문 진료 분야</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {doctor.specialty.map((spec, index) => (
                  <li key={`spec-${index}`} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function DoctorsSection() {
  return (
    <section className="relative py-20">
      {/* 배경 디자인 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">의료진 소개</span>
          </h2>
          <p className="text-gray-600 text-sm">정성과 신뢰로 여러분의 건강을 책임지겠습니다</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/about" className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm">
            자세히 보기
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
