interface HeroSlide {
  id: number;
  image: string;
  mobileImage?: string;
  title: string;
  description: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  // {
  //   id: 3,
  //   image: "/main/main_1.png",
  //   title: "체계적인 진료",
  //   description: "체계적인 진료 과정으로 최상의 치료 결과를 제공합니다.",
  // },
  {
    id: 5,
    image: "/main/main_5.jpg",
    mobileImage: "/main/main_5_mobile.jpg",
    title: "정성어린 치료",
    description: "환자 한 분 한 분을 정성껏 치료합니다.",
  },
  // {
  //   id: 1,
  //   image: "/main/main_6.jpg",
  //   title: "소리청한의원",
  //   description: "소리청은 여러분의 또 다른 가족입니다.",
  // },
  {
    id: 2,
    image: "/main/main_2.jpg",
    mobileImage: "/main/main_2_mobile.jpg",
    title: "의료진",
    description: "최고의 실력과 정성으로 진료합니다.",
  },
  {
    id: 4,
    image: "/main/main_4.jpg",
    mobileImage: "/main/main_4_mobile.jpg",
    title: "편안한 환경",
    description: "쾌적하고 편안한 환경에서 치료받으실 수 있습니다.",
  },
];
