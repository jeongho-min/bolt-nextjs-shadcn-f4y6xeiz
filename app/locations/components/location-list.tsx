"use client";

import { Card } from "@/components/ui/card";
import { locations } from "@/data/locations";

export function LocationList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <Card key={location.id} className="p-6">
          <h3 className="text-lg font-bold mb-2">{location.name}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>{location.address}</p>
            <p>전화: {location.phone}</p>
            <p>원장: {location.director}</p>
            <p>사업자등록번호: {location.businessNumber}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
