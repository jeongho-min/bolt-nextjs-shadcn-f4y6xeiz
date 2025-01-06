"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (mapRef.current) {
      const coords = new window.kakao.maps.LatLng(35.2034, 126.8969); // 병원 좌표
      const mapOptions = {
        center: coords,
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOptions);
      const marker = new window.kakao.maps.Marker({
        position: coords,
        map: map,
      });

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:12px;">소리청 일곡에스한방병원</div>',
      });
      infowindow.open(map, marker);
    }
  };

  useEffect(() => {
    if (window.kakao) {
      initMap();
    }
  }, []);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
    </>
  );
}
