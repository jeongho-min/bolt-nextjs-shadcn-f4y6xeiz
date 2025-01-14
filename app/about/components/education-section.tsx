"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const educationData = {
  education: [
    "금호고등학교 졸업",
    "원광대학교 한의과대학 졸업(1985년)",
    "원광대학교 대학원 한의학석사 취득(1988년)",
    "원광대학교 대학원 한의학박사 취득(1991년)",
    "전남대학교 경영대학원 최고경영자과정 수료",
  ],
  professor: ["전 원광대학교 한의과대학 겸임교수", "전 동신대학교 한의과대학 교수 및 겸임교수", "전 순천대학교 한약자원학과 외래교수"],
  experience: [
    "대한 방제학회 정회원",
    "대한 약침학회 정회원",
    "대한 침구학회 정회원",
    "대한한의사협회 통증제형 인정의",
    "KBS 제1라디오 <건강 365일 한방상담> 연사 10년 이상 역임",
    "KBS 제1 TV <무엇이든지 물어보세요>한방 건강 프로 다수 출연",
    "민용태한의원 개원(1988.3~2006.12)",
    "대우재단부속 대우한의원 개원(2007.4~2009.5)",
    "소리청한의원 개원(2009.8~)",
    "소리청한의원 네트워크 대표원장 역임",
    "소리청 일곡에스한방병원으로 확장 이전 개원 대표원장 재임중(2024.12~)",
  ],
};

export function EducationSection() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">학력 및 경력</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "학력", items: educationData.education },
            { title: "교수 경력", items: educationData.professor },
            { title: "경력 및 자격", items: educationData.experience },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b">{section.title}</h3>
                <ul className="space-y-2.5 text-[15px]">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-start leading-relaxed">
                      <span className="text-primary/60 mr-2.5 mt-1 text-xs">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
