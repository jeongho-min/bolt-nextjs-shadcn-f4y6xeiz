"use client";

import { useEffect, useState } from "react";
import { NonCoveredHero } from "./components/hero";
import { NonCoveredSection } from "./components/non-covered-section";

interface PriceItem {
  id: string;
  name: string;
  specification?: string | null;
  priceType: "FIXED" | "RANGE" | "TEXT";
  priceMin?: number | null;
  priceMax?: number | null;
  priceText?: string | null;
  order: number;
}

interface PriceCategory {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
  items: PriceItem[];
  children: PriceCategory[];
}

function formatPrice(item: PriceItem) {
  switch (item.priceType) {
    case "FIXED":
      return `${item.priceMin?.toLocaleString()}원`;
    case "RANGE":
      return `${item.priceMin?.toLocaleString()}원~${item.priceMax?.toLocaleString()}원`;
    case "TEXT":
      return item.priceText || "-";
    default:
      return "-";
  }
}

export default function NonCoveredPage() {
  const [categories, setCategories] = useState<PriceCategory[]>([]);

  useEffect(() => {
    fetchPriceItems();
  }, []);

  const fetchPriceItems = async () => {
    try {
      const response = await fetch("/api/prices");
      if (!response.ok) throw new Error("가격표를 불러오는데 실패했습니다.");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("가격표를 불러오는데 실패했습니다:", error);
    }
  };

  return (
    <main className="pt-16">
      <NonCoveredHero />
      <NonCoveredSection items={categories} />
    </main>
  );
}
