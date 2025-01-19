"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

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
}

interface PriceCategory {
  id: string;
  name: string;
  order: number;
  items: PriceItem[];
}

interface PriceListProps {
  initialData: PriceCategory[];
}

export function PriceList({ initialData }: PriceListProps) {
  const [categories, setCategories] = useState<PriceCategory[]>(initialData);
  const { toast } = useToast();

  const formatPrice = (item: PriceItem) => {
    if (item.priceType === "TEXT") return item.priceText;
    if (item.priceType === "RANGE" && item.priceMin && item.priceMax) {
      return `${item.priceMin.toLocaleString()}원~${item.priceMax.toLocaleString()}원`;
    }
    if (item.priceType === "FIXED" && item.priceMin) {
      return `${item.priceMin.toLocaleString()}원`;
    }
    return "-";
  };

  const handleDelete = async (itemId: string) => {
    try {
      const response = await fetch(`/api/admin/prices/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete price item");

      // 성공적으로 삭제된 경우 UI 업데이트
      setCategories(
        categories.map((category) => ({
          ...category,
          items: category.items.filter((item) => item.id !== itemId),
        }))
      );

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
    <div className="space-y-6">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>총 {category.items.length}개 항목</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/admin/prices/new?categoryId=${category.id}`}>
                <Plus className="w-4 h-4 mr-2" />
                항목 추가
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    {item.specification && <p className="text-sm text-gray-500">{item.specification}</p>}
                    <p className="text-sm font-medium text-blue-600">{formatPrice(item)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/prices/${item.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
