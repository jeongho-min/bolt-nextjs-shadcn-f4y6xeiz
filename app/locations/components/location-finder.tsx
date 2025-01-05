"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Clock, Car } from "lucide-react";
import { locations } from "@/data/locations";
import type { Location } from "@/types/location";

interface RouteInfo {
  duration: number;
  distance: string;
}

export function LocationFinder() {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [routeInfos, setRouteInfos] = useState<Map<string, RouteInfo>>(new Map());

  const getRouteInfo = async (origin: GeolocationCoordinates, destination: Location) => {
    try {
      // 직선 거리 계산
      const distance = getDistance(origin.latitude, origin.longitude, destination.coordinates.lat, destination.coordinates.lng);

      // 평균 속도 60km/h로 가정하여 소요 시간 계산
      const duration = Math.round((distance / 60) * 60);

      return {
        duration,
        distance: distance.toFixed(1),
      };
    } catch (error) {
      console.error("Error calculating route info:", error);
      return null;
    }
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // 지구 반경 (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setUserLocation(position.coords);
        const newRouteInfos = new Map<string, RouteInfo>();

        for (const location of locations) {
          const info = await getRouteInfo(position.coords, location);
          if (info) {
            newRouteInfos.set(location.id, info);
            console.log(`${location.name}: 약 ${info.duration}분, ${info.distance}km`);
          }
        }

        setRouteInfos(newRouteInfos);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">가까운 지점 찾기</h2>
        <p className="text-gray-600">현재 위치를 기반으로 각 지점까지의 소요 시간을 확인하세요.</p>

        <div className="flex gap-4 items-start">
          <Button onClick={getCurrentLocation} disabled={loading} className="flex items-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
            현재 위치로 찾기
          </Button>
        </div>

        {Array.from(routeInfos.entries()).map(([id, info]) => {
          const location = locations.find((loc) => loc.id === id);
          return (
            location && (
              <div key={id} className="mt-4 p-4 bg-primary/5 rounded-lg">
                <h3 className="font-bold mb-2">{location.name}</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{location.address}</p>
                  <p className="text-sm text-gray-600">전화: {location.phone}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>약 {info.duration}분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      <span>{info.distance}km</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </Card>
  );
}
