import { LucideIcon, ArrowUp, CalendarPlus, MapPin, MessageCircle, Phone } from "lucide-react";

export const HOSPITAL_NAME = "소리청일곡에스한방병원";
export const HOSPITAL_LAT = 35.202698;
export const HOSPITAL_LNG = 126.89739;
export const KAKAO_MAPS_SEARCH_URL = `https://map.kakao.com/link/map/${HOSPITAL_NAME},${HOSPITAL_LAT},${HOSPITAL_LNG}`;
export const KAKAO_MAPS_NAVI_URL = `kakaomap://route?ep=${HOSPITAL_LAT},${HOSPITAL_LNG}&by=CAR`;
export const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_wZaxbn/chat";
export const KAKAO_CHANNEL_MOBILE_URL = "https://pf.kakao.com/_wZaxbn/chat";

// 사용자 환경 체크 함수
const isMobileDevice = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export type QuickLink = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  color: string;
  bgColor: string;
  hoverColor: string;
};

export const QUICK_LINKS: QuickLink[] = [
  {
    icon: MapPin,
    label: "길찾기",
    onClick: () => {
      if (isMobileDevice()) {
        window.location.href = KAKAO_MAPS_NAVI_URL;
      } else {
        window.open(KAKAO_MAPS_SEARCH_URL, "_blank");
      }
    },
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100",
  },
  {
    icon: CalendarPlus,
    label: "예약하기",
    onClick: undefined,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
  },
  {
    icon: MessageCircle,
    label: "상담하기",
    onClick: () => {
      const url = KAKAO_CHANNEL_URL;
      if (isMobileDevice()) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    },
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    icon: Phone,
    label: "전화문의",
    onClick: undefined,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    hoverColor: "hover:bg-rose-100",
  },
];
