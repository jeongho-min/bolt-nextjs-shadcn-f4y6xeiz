import { ClipboardCheck, Stethoscope } from "lucide-react";
import type { Department, TreatmentStep } from "./types";

export const departments: Department[] = [
  {
    icon: Stethoscope,
    title: "내과",
    description: "소화기 질환, 호흡기 질환, 순환기 질환 등",
    specialties: ["소화불량", "위장질환", "변비/설사", "호흡기 질환"],
  },
  // ... 나머지 departments 데이터
];

export const treatmentSteps: TreatmentStep[] = [
  {
    icon: ClipboardCheck,
    title: "접수",
    description: "간단한 문진표 작성과 함께 진료 접수를 진행합니다.",
  },
  // ... 나머지 treatmentSteps 데이터
];
