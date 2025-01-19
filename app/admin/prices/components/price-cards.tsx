"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  children?: PriceCategory[];
}

interface PriceCardsProps {
  categories: PriceCategory[];
  onDelete: (id: string) => Promise<void>;
}

const getAllItems = (category: PriceCategory): PriceItem[] => {
  let items = category.items.map((item) => ({
    ...item,
    category: { name: category.name },
  }));
  category.children?.forEach((child) => {
    items = items.concat(getAllItems(child));
  });
  return items;
};

export function PriceCards({ categories, onDelete }: PriceCardsProps) {
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

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
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
      {categories.map((category) => {
        const allItems = getAllItems(category);
        if (allItems.length === 0) return null;

        return (
          <Card key={category.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>총 {allItems.length}개 항목</CardDescription>
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
                {allItems.map((item) => (
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>가격 항목 삭제</AlertDialogTitle>
                            <AlertDialogDescription>정말로 이 가격 항목을 삭제하시겠습니까?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>삭제</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
