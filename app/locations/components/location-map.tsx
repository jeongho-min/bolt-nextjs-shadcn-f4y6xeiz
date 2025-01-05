"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { locations } from "@/data/locations";

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [map, setMap] = useState<any>(null);
  const [openInfoWindow, setOpenInfoWindow] = useState<kakao.maps.InfoWindow | null>(null);

  const initMap = () => {
    if (mapRef.current) {
      const initialMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(35.1595, 126.8526),
        level: 7,
      });

      setMap(initialMap);

      locations.forEach((location) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
          map: initialMap,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `
            <div class="p-2">
              <strong>${location.name}</strong><br/>
              <small>${location.phone}</small>
            </div>
          `,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          if (openInfoWindow) {
            openInfoWindow.close();
          }
          infowindow.open(initialMap, marker);
          setOpenInfoWindow(infowindow);
        });
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (map && userLocation) {
      const userPosition = new window.kakao.maps.LatLng(userLocation.latitude, userLocation.longitude);

      map.setCenter(userPosition);

      const userMarker = new window.kakao.maps.Marker({
        position: userPosition,
        map: map,
        title: "현재 위치",
      });

      const userInfowindow = new window.kakao.maps.InfoWindow({
        content: `<div class="p-2">현재 위치</div>`,
      });

      userInfowindow.open(map, userMarker);
    }
  }, [map, userLocation]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div ref={mapRef} className="w-full h-[400px] rounded-lg" />
    </>
  );
}
