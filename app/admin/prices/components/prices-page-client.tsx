"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { PriceTable } from "./price-table";
import { PriceCards } from "./price-cards";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PriceItem {
  id: string;
  name: string;
  description?: string | null;
  specification?: string | null;
  priceType: string;
  priceMin?: number | null;
  priceMax?: number | null;
  priceText?: string | null;
  order: number;
  categoryId: string;
  category: {
    name: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PriceCategory {
  id: string;
  name: string;
  order: number;
  items: PriceItem[];
}

interface PricesPageClientProps {
  categories: PriceCategory[];
}

export function PricesPageClient({ categories: rawCategories }: PricesPageClientProps) {
  const router = useRouter();
  const [viewType, setViewType] = useState<"table" | "grid">("grid");

  // 각 아이템에 category 정보 추가
  const categories = rawCategories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      ...item,
      category: { name: category.name },
    })),
  }));

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/prices/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete price item");
    }
  };

  // 모든 항목을 하나의 배열로 변환 (테이블 뷰용)
  const allItems = categories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categoryId: category.id,
      category: { name: category.name },
    }))
  );

  return (
    <PageLayout
      title="가격표 관리"
      onBack={() => router.back()}
      actions={[
        {
          label: "새 항목 추가",
          onClick: () => router.push("/admin/prices/new"),
        },
      ]}
      viewOptions={{
        isDesktop: true,
        viewType,
        onViewChange: (type) => setViewType(type),
      }}
    >
      <div className="space-y-4">
        {viewType === "table" ? <PriceTable items={allItems} onDelete={handleDelete} /> : <PriceCards categories={categories} onDelete={handleDelete} />}
      </div>
    </PageLayout>
  );
}
