import { Ear, Brain, Activity, AlertCircle } from "lucide-react";
import type { Disease } from "./types";

export const diseases: Disease[] = [
  {
    id: "tinnitus",
    title: "이명",
    titleEn: "TINNITUS",
    description: "외부의 소리 자극이 없는 이명",
    definition:
      "이명은 외부로부터 소리의 자극이 없는데도 귓속이나 머릿 속에서 느끼는 소리로 특정한 질환이라기보다는 하나의 증상입니다. 일시적인 이명은 흔한 증상이고 대부분 문제가 되지 않지만 심한 경우에는 일상생활에 심각한 영향을 끼칠 수 있습니다.",
    symptoms: {
      physical: ["두통", "난청", "어지럼증", "귀먹먹"],
      mental: ["불안감", "우울증", "신경쇠약", "노이로제", "불면증"],
    },
    causes: [
      {
        title: "기허(氣虛) 이명",
        description:
          "큰 병을 앓았거나 만성적인 피로가 누적돼 원기가 쇠약해져도 이명이 발생합니다. 사지가 무력하며 얼굴 색은 누렇게 변합니다. 쉽게 피로하고 식욕이 없는 것이 특징입니다.",
      },
      {
        title: "혈허(血虛) 이명",
        description:
          "수술이나 출산으로 피를 많이 흘려 귀쪽으로 혈액이 원활하게 공급되지 않아 생깁니다. 혈색이 없거나 심장이 뛰고 어지럼증을 느끼는 등 빈혈증세가 나타나기도 합니다.",
      },
      {
        title: "간화(肝火) 이명",
        description:
          "화를 잘 내거나 스트레스를 잘 받는 사람에게 오며 정신적인 충격을 받았을 때도 올 수 있습니다. 화를 내게 되면 간기가 울체돼 귀쪽으로 화가 상충해 발생하며, 얼굴이 붉어지며 수면장애를 동반하기도 합니다.",
      },
      {
        title: "신허(腎虛) 이명",
        description:
          "신장의 기운이 약해지거나 교란돼 발생하는 이명으로 주로 과로, 불면, 노화 등이 원입니다. 20~30대의 젊은 층에서는 많지 않은 편이나 40~50대 이후에서는 이명의 가장 큰 원인을 차지합니다.",
      },
    ],
    treatments: [
      {
        title: "한약 치료",
        description: "한약치료를 통해 신체 오장육부의 기능을 촉진시켜 청력세포를 생성합니다. 생성된 청력세포는 약해진 기혈흐름을 바로잡습니다.",
      },
      {
        title: "침 치료",
        description: "침 치료를 통해 귀나 눈 질환의 80% 이상의 자각증상 호전 및 소실을 도우며 약 12주의 기간이 필요합니다.",
      },
      {
        title: "약침 치료",
        description:
          "한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청 한의원의 이명 치료법입니다. 국소적인 통증 제어 뿐 아니라 면역력을 높여 탁월한 치료효과를 보입니다.",
      },
      {
        title: "추나 치료",
        description:
          "자세가 바르지 않고 척추에 문제가 있거나 턱관절에 문제가 있으면 신경이 과잉 흥분되어 청력이 떨어지고 귀질환이 오기 쉽습니다. 통합 교정 치료를 통해 구조적인 문제를 해결하며 귀 질환을 예방합니다.",
      },
    ],
    statistics: {
      title: "국민의 23% 이상이 겪는 이명",
      description:
        "이명은 혼자만 알 수 있는 힘든 고통입니다. 증상을 치료하지 않는다면 결국 고립감과 우울증, 치매와 같은 삶의 질에 큰 영향을 주게 되는 정신적인 병으로 이어질 수 있습니다.",
      source: "연합뉴스 강애란 기자, 자료제공: 태전그룹 AOK",
    },
    imagePath: "/diseases/tinnitus.jpg",
  },
  {
    id: "sudden-hearing-loss",
    title: "돌발성난청",
    titleEn: "SUDDEN HEARING LOSS",
    description: "갑작스러운 청력 저하",
    definition: "돌발성난청은 특별한 원인 없이 갑자기 청력이 나빠지는 응급질환입니다.",
    symptoms: {
      physical: ["청력저하", "이명", "어지럼증"],
      mental: ["불안감", "우울감"],
    },
    causes: [
      {
        title: "혈액순환장애",
        description: "내이로 가는 혈액순환이 갑자기 차단되어 발생",
      },
    ],
    treatments: [
      {
        title: "한약치료",
        description: "혈액순환을 개선하고 청력 회복을 돕는 맞춤 처방",
      },
    ],
    imagePath: "/diseases/돌발성난청.png",
  },
  {
    id: "dizziness",
    title: "어지럼증",
    titleEn: "DIZZINESS",
    description: "균형감각 상실과 어지러움",
    definition: "어지럼증은 자신이나 주위가 빙빙 도는 것 같은 현훈 또는 중심을 잡기 힘든 평형감각 이상을 느끼는 증상입니다.",
    symptoms: {
      physical: ["현기증", "구토", "식은땀", "두통"],
      mental: ["불안감", "공포감"],
    },
    causes: [
      {
        title: "전정기관 이상",
        description: "내이의 전정기관에 문제가 생겨 평형감각에 이상이 발생",
      },
    ],
    treatments: [
      {
        title: "한약치료",
        description: "어지럼증의 원인에 따른 맞춤형 한약 처방",
      },
    ],
    imagePath: "/diseases/어지럼증.png",
  },
  {
    id: "bppv",
    title: "이석증",
    titleEn: "BPPV",
    description: "자세 변화시 심한 어지러움",
    definition: "이석증은 내이의 이석이 제자리를 이탈하여 발생하는 어지럼증입니다.",
    symptoms: {
      physical: ["어지럼증", "메스꺼움", "구토"],
      mental: ["불안감"],
    },
    causes: [
      {
        title: "이석 이탈",
        description: "내이의 이석이 정상 위치에서 벗어나 발생",
      },
    ],
    treatments: [
      {
        title: "이석 치환술",
        description: "이석을 정상 위치로 돌려놓는 치료법",
      },
    ],
    imagePath: "/diseases/이석증.png",
  },
  {
    id: "meniere",
    title: "메니에르",
    titleEn: "MENIERE'S DISEASE",
    description: "어지럼증과 청력 변동",
    definition: "내이의 림프액 순환 장애로 인한 어지럼증, 난청, 이명 등이 복합적으로 나타나는 질환입니다.",
    symptoms: {
      physical: ["어지럼증", "난청", "이명", "귀의 충만감"],
      mental: ["불안감", "우울감"],
    },
    causes: [
      {
        title: "내림프수종",
        description: "내이의 림프액이 과다 축적되어 발생",
      },
    ],
    treatments: [
      {
        title: "한약치료",
        description: "림프액 순환을 개선하는 맞춤 처방",
      },
    ],
    imagePath: "/diseases/메니에르.png",
  },
  {
    id: "vestibular-neuritis",
    title: "전정신경염",
    titleEn: "VESTIBULAR NEURITIS",
    description: "급성 어지럼증",
    definition: "전정신경의 염증으로 인해 발생하는 급성 어지럼증입니다.",
    symptoms: {
      physical: ["심한 어지럼증", "구토", "안진"],
      mental: ["불안감"],
    },
    causes: [
      {
        title: "전정신경 염증",
        description: "바이러스 감염 등으로 인한 전정신경의 염증",
      },
    ],
    treatments: [
      {
        title: "한약치료",
        description: "염증 완화와 면역력 강화를 위한 처방",
      },
    ],
    imagePath: "/diseases/전정신경염.png",
  },
  {
    id: "ear-fullness",
    title: "귀먹먹함",
    titleEn: "EAR FULLNESS",
    description: "귀가 막힌 듯한 느낌",
    definition: "귀가 막히거나 답답한 느낌이 지속되는 증상입니다.",
    symptoms: {
      physical: ["귀막힘", "청력저하", "이명"],
      mental: ["불편감"],
    },
    causes: [
      {
        title: "이관기능장애",
        description: "이관의 기능 저하로 인한 중이 압력 조절 장애",
      },
    ],
    treatments: [
      {
        title: "한약치료",
        description: "이관 기능 개선을 위한 맞춤 처방",
      },
    ],
    imagePath: "/diseases/귀먹먹.png",
  },
  {
    id: "headache",
    title: "두통",
    titleEn: "HEADACHE",
    description: "다양한 원인의 두통",
    definition: "두통은 다양한 원인으로 발생하는 머리의 통증을 말합니다.",
    symptoms: {
      physical: ["두통", "어지럼증", "구토"],
      mental: ["집중력 저하", "불안감"],
    },
    causes: [
      {
        title: "긴장성 두통",
        description: "스트레스나 피로로 인한 근육 긴장",
      },
    ],
    treatments: [
      {
        title: "한약치료",
        description: "두통의 원인에 따른 맞춤형 처방",
      },
    ],
    imagePath: "/diseases/두통.png",
  },
];
