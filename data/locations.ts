import type { Location } from "@/types/location";

export const locations: Location[] = [
  {
    id: "gyeonggi-bundang",
    name: "경기 분당점",
    address: "경기도 성남시 분당구 미금로 48 (구미동 오렌프라자 205호)",
    phone: "031-718-2075",
    businessNumber: "119-90-86074",
    coordinates: {
      lat: 37.35018,
      lng: 127.108904,
    },
    director: "원성면",
  },
  {
    id: "gyeonggi-suwon",
    name: "경기 수원점",
    address: "경기도 수원시 권선구 효원로 256번길 7 (권선동)",
    phone: "031-263-7575",
    businessNumber: "845-98-00792",
    coordinates: {
      lat: 37.251493,
      lng: 127.028608,
    },
    director: "이만희",
  },
  {
    id: "incheon-bupyeong",
    name: "인천 부천점",
    address: "경기도 부천시 신흥로 228 (중동, 메디타워 9층)",
    phone: "032-322-2075",
    businessNumber: "130-99-78856",
    coordinates: {
      lat: 37.503832,
      lng: 126.761847,
    },
    director: "박기완",
  },
  {
    id: "daejeon",
    name: "대전점",
    address: "대전광역시 서구 둔산호로 38 (둔산동, 둔산메트로타워 6층)",
    phone: "042-483-8220",
    businessNumber: "309-96-01350",
    coordinates: {
      lat: 36.351827,
      lng: 127.377746,
    },
    director: "문대환",
  },
  {
    id: "chungnam-cheonan",
    name: "충남 천안점",
    address: "충남 천안시 동남구 서부대로 229 (신방동, 지성빌딩)",
    phone: "041-579-2075",
    businessNumber: "312-96-03994",
    coordinates: {
      lat: 36.815528,
      lng: 127.108663,
    },
    director: "박근열",
  },
  {
    id: "daegu",
    name: "대구점",
    address: "대구광역시 수성구 명덕로 409 (수성동 2가)",
    phone: "053-581-8275",
    businessNumber: "503-91-41828",
    coordinates: {
      lat: 35.858376,
      lng: 128.619046,
    },
    director: "김만조",
  },
  {
    id: "gyeongbuk-gumi",
    name: "경북 구미점",
    address: "경북 구미시 형곡로왕로 63 (형곡동)",
    phone: "054-441-2075",
    businessNumber: "514-90-57089",
    coordinates: {
      lat: 36.128821,
      lng: 128.344254,
    },
    director: "김재연",
  },
  {
    id: "gyeongbuk-pohang",
    name: "경북 포항점",
    address: "경북 포항시 북구 중흥로 288 (죽도동)",
    phone: "054-274-2818",
    businessNumber: "506-96-03997",
    coordinates: {
      lat: 36.032225,
      lng: 129.365195,
    },
    director: "조광호",
  },
  {
    id: "busan-sahagu",
    name: "부산 사하점",
    address: "부산광역시 사하구 낙동대로 237 3층 (괴정동)",
    phone: "051-611-8057",
    businessNumber: "617-90-51410",
    coordinates: {
      lat: 35.097614,
      lng: 128.997307,
    },
    director: "박진구",
  },
];
