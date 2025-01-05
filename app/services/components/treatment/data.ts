import { ClipboardCheck, Stethoscope, FileText, Pill, CalendarCheck } from "lucide-react";
import type { TreatmentStep } from "./types";

export const treatmentSteps: TreatmentStep[] = [
  {
    icon: ClipboardCheck,
    title: "접수",
    description: "간단한 문진표 작성과 함께 진료 접수를 진행합니다.",
  },
  {
    icon: Stethoscope,
    title: "진찰",
    description: "전문의가 상담과 진찰을 통해 정확한 진단을 내립니다.",
  },
  {
    icon: FileText,
    title: "치료계획",
    description: "환자의 상태에 맞는 최적의 치료 계획을 수립합니다.",
  },
  {
    icon: Pill,
    title: "치료",
    description: "한약, 침, 뜸 등 다양한 치료법으로 건강을 회복합니다.",
  },
  {
    icon: CalendarCheck,
    title: "관리",
    description: "정기적인 상담과 관리로 건강한 삶을 유지합니다.",
  },
];
