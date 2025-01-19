"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PriceTable } from "./price-table";

interface PriceItem {
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
  category: {
    id: string;
    name: string;
  };
}

export function PriceTab() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<PriceItem[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/prices");
      if (!response.ok) throw new Error("가격표 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      console.log("🚀 ~ fetchItems ~ data:", data);
      setItems(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "가격표 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("가격표 항목 삭제에 실패했습니다.");

      await fetchItems();
      toast({
        title: "성공",
        description: "가격표 항목이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "가격표 항목 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">가격표 항목</h2>
        <Button onClick={() => router.push("/admin/prices/new")}>새 항목</Button>
      </div>
      <PriceTable items={items} onDelete={handleDelete} />
    </div>
  );
}
