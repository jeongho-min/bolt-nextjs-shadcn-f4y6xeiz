export interface Doctor {
  id: number;
  name: string;
  department: string;
  position: string;
  specialties: string[];
  education: string[];
  certifications: string[];
  image: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "김태호",
    department: "내과",
    position: "원장",
    specialties: ["소화기 질환", "만성질환", "건강검진"],
    education: [
      "서울대학교 한의과대학 졸업",
      "경희대학교 한의학 박사"
    ],
    certifications: ["대한한의사협회 정회원", "소화기질환 전문의"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "이미영",
    department: "소아과",
    position: "과장",
    specialties: ["소아질환", "성장발달", "소아침구"],
    education: [
      "경희대학교 한의과대학 졸업",
      "동국대학교 한의학 석사"
    ],
    certifications: ["소아과 전문의", "발달장애 치료 인증"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "박준서",
    department: "침구과",
    position: "과장",
    specialties: ["통증치료", "척추질환", "관절질환"],
    education: [
      "우석대학교 한의과대학 졸업",
      "침구학 전문의"
    ],
    certifications: ["대한침구학회 정회원", "통증치료 전문가"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "최수진",
    department: "부인과",
    position: "과장",
    specialties: ["여성질환", "갱년기", "불임치료"],
    education: [
      "동국대학교 한의과대학 졸업",
      "부인과 전문의"
    ],
    certifications: ["대한한방부인과학회 정회원"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "정민우",
    department: "재활의학과",
    position: "과장",
    specialties: ["스포츠재활", "근골격계", "도수치료"],
    education: [
      "경희대학교 한의과대학 졸업",
      "재활의학 전문의"
    ],
    certifications: ["스포츠의학회 정회원", "재활치료 전문가"],
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "한서연",
    department: "신경과",
    position: "과장",
    specialties: ["두통", "어지럼증", "수면장애"],
    education: [
      "부산대학교 한의과대학 졸업",
      "신경과 전문의"
    ],
    certifications: ["대한한방신경정신과학회 정회원"],
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80",
  }
];

export const departments = [
  "전체",
  "내과",
  "소아과",
  "침구과",
  "부인과",
  "재활의학과",
  "신경과"
] as const;