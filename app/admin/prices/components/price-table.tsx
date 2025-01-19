"use client";

import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/app/components/ui/data-table";
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
    id?: string;
    name: string;
  };
}

export interface PriceTableProps {
  items: PriceItem[];
  onDelete: (id: string) => Promise<void>;
}

export function PriceTable({ items, onDelete }: PriceTableProps) {
  const router = useRouter();

  const formatPrice = (item: PriceItem) => {
    if (!item.priceType) return "-";

    switch (item.priceType) {
      case "TEXT":
        return item.priceText || "-";
      case "RANGE":
        if (item.priceMin && item.priceMax) {
          return `${item.priceMin.toLocaleString()}원~${item.priceMax.toLocaleString()}원`;
        }
        return "-";
      case "FIXED":
        return item.priceMin ? `${item.priceMin.toLocaleString()}원` : "-";
      default:
        return "-";
    }
  };

  const columns: Column<PriceItem>[] = [
    {
      header: "카테고리",
      cell: (item: PriceItem) => item.category?.name || "-",
    },
    {
      header: "항목명",
      cell: (item: PriceItem) => item.name,
    },
    {
      header: "규격",
      cell: (item: PriceItem) => item.specification || "-",
    },
    {
      header: "가격",
      cell: (item: PriceItem) => formatPrice(item),
    },
    {
      header: "관리",
      cell: (item: PriceItem) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/${item.id}`)}>
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>가격 항목 삭제</AlertDialogTitle>
                <AlertDialogDescription>정말로 이 가격 항목을 삭제하시겠습니까?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(item.id)}>삭제</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
      className: "w-[100px]",
    },
  ];

  if (!items) return null;

  return <DataTable data={items} columns={columns} pageSize={20} />;
}
