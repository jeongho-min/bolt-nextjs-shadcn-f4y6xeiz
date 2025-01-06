import { Ear, Brain, Activity, AlertCircle } from "lucide-react";
import type { Disease } from "./types";

export const diseases: Disease[] = [
  {
    id: "tinnitus",
    title: "이명",
    icon: Ear,
    shortDescription: "귀에서 들리는 소리로 인한 불편함",
    description: `이명은 외부의 소리 자극이 없는 상태에서 귀나 머릿속에서 들리는 소리를 의미합니다.
    
    주요 증상:
    • 윙윙거리는 소리
    • 매미 우는 소리
    • 쇳소리, 물소리 등
    
    치료 방법:
    • 한약 치료
    • 침 치료
    • 약침 치료
    • 추나 요법`,
  },
  {
    id: "sudden-hearing-loss",
    title: "돌발성난청",
    icon: AlertCircle,
    shortDescription: "갑작스러운 청력 저하",
    description: "...",
  },
  {
    id: "dizziness",
    title: "어지럼증",
    icon: Activity,
    shortDescription: "균형감각 상실과 어지러움",
    description: "...",
  },
  {
    id: "bppv",
    title: "이석증",
    icon: Ear,
    shortDescription: "자세 변화시 심한 어지러움",
    description: "...",
  },
  {
    id: "meniere",
    title: "메니에르",
    icon: Ear,
    shortDescription: "어지럼증과 청력 변동",
    description: "...",
  },
  {
    id: "vestibular-neuritis",
    title: "전정신경염",
    icon: Brain,
    shortDescription: "급성 어지럼증",
    description: "...",
  },
  {
    id: "ear-fullness",
    title: "귀먹먹함",
    icon: Ear,
    shortDescription: "귀가 막힌 듯한 느낌",
    description: "...",
  },
  {
    id: "headache",
    title: "두통",
    icon: Brain,
    shortDescription: "다양한 원인의 두통",
    description: "...",
  },
];
