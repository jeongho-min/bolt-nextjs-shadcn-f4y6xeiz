"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PageLayout } from "../components/page-layout";
import { PriceTable } from "./components/price-table";
import { PriceCards } from "./components/price-cards";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
  level: number;
  children: PriceCategory[];
}

export default function PricesPage() {
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [viewType, setViewType] = useState<"table" | "grid">("grid");
  const [activeTab, setActiveTab] = useState("categories");
  const router = useRouter();
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setViewType(isDesktop ? "table" : "grid");
  }, [isDesktop]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/prices");
      if (!response.ok) throw new Error("가격표 목록을 불러오는데 실패했습니다.");
      const data = await response.json();

      // 계층 구조로 변환
      const buildHierarchy = (categories: PriceCategory[]) => {
        const categoryMap = new Map();
        const rootCategories: PriceCategory[] = [];

        // 먼저 모든 카테고리를 맵에 저장
        categories.forEach((category) => {
          categoryMap.set(category.id, {
            ...category,
            children: [],
            level: 0,
          });
        });

        // 부모-자식 관계 설정
        categories.forEach((category) => {
          const node = categoryMap.get(category.id);
          if (category.parentId) {
            const parent = categoryMap.get(category.parentId);
            if (parent) {
              node.level = parent.level + 1;
              parent.children.push(node);
            }
          } else {
            rootCategories.push(node);
          }
        });

        // 정렬
        const sortCategories = (cats: PriceCategory[]) => {
          cats.sort((a, b) => a.order - b.order);
          cats.forEach((cat) => {
            if (cat.children.length > 0) {
              sortCategories(cat.children);
            }
          });
          return cats;
        };

        return sortCategories(rootCategories);
      };

      const hierarchicalCategories = buildHierarchy(data);
      setCategories(hierarchicalCategories);
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
      const response = await fetch(`/api/admin/prices/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        await fetchCategories();
        toast({
          title: "가격표 항목 삭제 성공",
          description: "가격표 항목이 성공적으로 삭제되었습니다.",
        });
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      toast({
        title: "가격표 항목 삭제 실패",
        description: error instanceof Error ? error.message : "가격표 항목 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/categories?categoryId=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "카테고리 삭제에 실패했습니다.");
      }

      await fetchCategories();
      toast({
        title: "카테고리 삭제 성공",
        description: "카테고리가 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "카테고리 삭제 실패",
        description: error instanceof Error ? error.message : "카테고리 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

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

  const allItems = categories.flatMap((category) => getAllItems(category));

  const renderCategoryCard = (category: PriceCategory) => {
    return (
      <div key={category.id} className="space-y-4">
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">
                {category.level > 0 && <span className="text-muted-foreground mr-2">{"\u00A0".repeat(category.level * 4)}└</span>}
                {category.name}
              </CardTitle>
              {category.level > 0 && (
                <p className="text-xs text-muted-foreground mt-1">상위 카테고리: {categories.find((c) => c.id === category.parentId)?.name}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/categories/${category.id}`)}>
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
                    <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
                    <AlertDialogDescription>
                      정말로 이 카테고리를 삭제하시겠습니까?
                      <br />
                      하위 카테고리나 가격표 항목이 있는 경우 삭제할 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>삭제</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">항목 수: {category.items.length}개</div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/prices/new?categoryId=${category.id}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    항목 추가
                  </Link>
                </Button>
              </div>
              {category.items.length > 0 && (
                <div className="mt-4 space-y-2">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        {item.specification && <p className="text-sm text-muted-foreground">{item.specification}</p>}
                        <p className="text-sm font-medium text-primary">{formatPrice(item)}</p>
                      </div>
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
                              <AlertDialogAction onClick={() => handleDelete(item.id)}>삭제</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {category.children.length > 0 && <div className="space-y-4">{category.children.map(renderCategoryCard)}</div>}
      </div>
    );
  };

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

  return (
    <PageLayout
      title="가격표 관리"
      onBack={() => router.push("/admin")}
      actions={
        activeTab === "categories"
          ? [
              {
                label: "카테고리 추가",
                onClick: () => router.push("/admin/prices/categories/new"),
                variant: "outline",
              },
            ]
          : [
              {
                label: "가격 항목 추가",
                onClick: () => router.push("/admin/prices/new"),
              },
            ]
      }
      viewOptions={
        activeTab === "items"
          ? {
              isDesktop,
              viewType,
              onViewChange: setViewType,
            }
          : undefined
      }
    >
      <Tabs defaultValue="categories" className="space-y-6" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="categories">카테고리</TabsTrigger>
          <TabsTrigger value="items">가격 항목</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle>카테고리 목록</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-4">{categories.map(renderCategoryCard)}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          {viewType === "table" && isDesktop ? (
            <PriceTable items={allItems} onDelete={handleDelete} />
          ) : (
            <PriceCards categories={categories} onDelete={handleDelete} />
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
