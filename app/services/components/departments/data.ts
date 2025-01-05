import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Baby, 
  Bone, 
  Activity 
} from "lucide-react";
import type { Department } from "./types";

export const departments: Department[] = [
  {
    icon: Stethoscope,
    title: "내과",
    description: "소화기 질환, 호흡기 질환, 순환기 질환 등",
    specialties: ["소화불량", "위장질환", "변비/설사", "호흡기 질환"]
  },
  {
    icon: Brain,
    title: "신경과",
    description: "두통, 어지럼증, 안면마비, 중풍 등",
    specialties: ["두통", "어지럼증", "안면마비", "뇌졸중 후유증"]
  },
  {
    icon: Heart,
    title: "심장내과",
    description: "고혈압, 부정맥, 협심증 등",
    specialties: ["고혈압", "부정맥", "협심증", "심장질환"]
  },
  {
    icon: Baby,
    title: "소아과",
    description: "소아 성장, 소화기 질환, 호흡기 질환 등",
    specialties: ["성장발달", "소아비만", "소아천식", "소아변비"]
  },
  {
    icon: Bone,
    title: "정형외과",
    description: "관절통, 요통, 디스크, 척추질환 등",
    specialties: ["허리통증", "목통증", "관절통", "척추질환"]
  },
  {
    icon: Activity,
    title: "재활의학과",
    description: "재활치료, 통증치료, 물리치료 등",
    specialties: ["재활치료", "통증관리", "물리치료", "운동치료"]
  }
];