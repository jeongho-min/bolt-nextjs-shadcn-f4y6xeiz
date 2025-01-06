import { Ear, Brain, Syringe, Stethoscope, Scale } from "lucide-react";
import type { Department } from "./types";

export const departments: Department[] = [
  {
    icon: Ear,
    title: "이비인후과",
    description: "이명, 어지럼증, 돌발성난청, 메니에르, 이석증",
    specialties: ["이명", "어지럼증", "돌발성난청", "메니에르", "이석증"],
  },
  {
    icon: Brain,
    title: "신경과",
    description: "두통, 편두통, 어지럼증, 치매",
    specialties: ["두통", "편두통", "어지럼증", "치매"],
  },
  {
    icon: Syringe,
    title: "침구과",
    description: "관절 척추질환, 경추/요추 디스크 질환, 오십견, 재활치료",
    specialties: ["관절 척추질환", "경추/요추 디스크", "오십견", "재활치료"],
  },
  {
    icon: Stethoscope,
    title: "내과",
    description: "소화기, 호흡기, 순환기, 비뇨기 질환",
    specialties: ["소화기 질환", "호흡기 질환", "순환기 질환", "비뇨기 질환"],
  },
  {
    icon: Scale,
    title: "사상체질의학과",
    description: "체질 감별 후 맞춤 처방 및 치료",
    specialties: ["체질 감별", "맞춤 처방", "체질 치료"],
  },
];
