"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/app/admin/components/page-layout";
import { PriceForm } from "../components/price-form";
import { useToast } from "@/hooks/use-toast";
import type { PriceFormValues } from "../components/price-form";

interface Props {
  params: {
    id: string;
  };
}

interface PriceItemResponse {
  id: string;
  name: string;
  description: string | null;
  specification: string | null;
  priceType: "FIXED" | "RANGE" | "TEXT";
  priceMin: number | null;
  priceMax: number | null;
  priceText: string | null;
  order: number;
  categoryId: string;
}

export default function EditPricePage({ params }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [priceItem, setPriceItem] = useState<(PriceFormValues & { id: string }) | null>(null);

  useEffect(() => {
    fetchPriceItem();
  }, [params.id]);

  const fetchPriceItem = async () => {
    try {
      const response = await fetch(`/api/admin/prices/${params.id}`);
      if (!response.ok) throw new Error("가격표 항목을 불러오는데 실패했습니다.");
      const data: PriceItemResponse = await response.json();

      // API 응답을 폼 값 타입에 맞게 변환
      setPriceItem({
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        specification: data.specification || undefined,
        priceType: data.priceType,
        priceMin: data.priceMin || undefined,
        priceMax: data.priceMax || undefined,
        priceText: data.priceText || undefined,
        order: data.order,
        categoryId: data.categoryId,
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "가격표 항목을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      router.push("/admin/prices");
    }
  };

  if (!priceItem) return null;

  return (
    <PageLayout title="가격표 항목 수정" backUrl="/admin/prices">
      <div className="max-w-3xl mx-auto">
        <PriceForm initialData={priceItem} />
      </div>
    </PageLayout>
  );
}
