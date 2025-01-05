export interface Review {
  id: number;
  name: string;
  department: string;
  rating: number;
  content: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "김**",
    department: "침구과",
    rating: 5,
    content: "허리 통증으로 내원했는데, 꾸준한 치료로 많이 호전되었습니다. 친절하고 세심한 진료 감사합니다.",
    date: "2024-02-15",
  },
  {
    id: 2,
    name: "이**",
    department: "내과",
    rating: 5,
    content: "소화불량이 심했는데 한약 복용 후 많이 좋아졌어요. 의료진분들도 친절하셔서 좋았습니다.",
    date: "2024-02-10",
  },
  // ... 더 많은 리뷰 데이터 추가
];
