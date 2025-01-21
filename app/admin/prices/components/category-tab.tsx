"use client";

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
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Edit, FolderPlus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
}

interface PriceCategory {
  id: string;
  name: string;
  level: number;
  children: PriceCategory[];
  parentId: string | null;
  order: number;
  items: PriceItem[];
}

export function CategoryTab() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // 모든 카테고리 ID를 수집하는 함수
  const getAllCategoryIds = (categories: PriceCategory[]): Set<string> => {
    const ids = new Set<string>();
    const addIds = (cats: PriceCategory[]) => {
      cats.forEach((category) => {
        ids.add(category.id);
        if (category.children.length > 0) {
          addIds(category.children);
        }
      });
    };
    addIds(categories);
    return ids;
  };

  // 전체 펼치기
  const expandAll = () => {
    setExpandedCategories(getAllCategoryIds(categories));
  };

  // 전체 접기
  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("가격표 항목 삭제에 실패했습니다.");

      await fetchCategories();
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

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("카테고리 삭제에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "카테고리가 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleMoveItemUp = async (itemId: string, items: PriceItem[]) => {
    const sortedItems = [...items].sort((a, b) => a.order - b.order);
    const currentIndex = sortedItems.findIndex((item) => item.id === itemId);

    if (currentIndex === 0) return;

    const currentItem = sortedItems[currentIndex];
    const targetItem = sortedItems[currentIndex - 1];

    try {
      // 현재 항목을 이전 항목의 순서로 변경
      const response1 = await fetch(`/api/admin/prices/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentItem,
          order: targetItem.order,
        }),
      });

      if (!response1.ok) throw new Error("순서 변경에 실패했습니다.");

      // 이전 항목을 현재 항목의 순서로 변경
      const response2 = await fetch(`/api/admin/prices/items/${targetItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...targetItem,
          order: currentItem.order,
        }),
      });

      if (!response2.ok) throw new Error("순서 변경에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "순서가 변경되었습니다.",
      });
    } catch (error) {
      console.error("Error moving item up:", error);
      toast({
        title: "오류",
        description: "순서 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleMoveItemDown = async (itemId: string, items: PriceItem[]) => {
    const sortedItems = [...items].sort((a, b) => a.order - b.order);
    const currentIndex = sortedItems.findIndex((item) => item.id === itemId);

    if (currentIndex === sortedItems.length - 1) return;

    const currentItem = sortedItems[currentIndex];
    const targetItem = sortedItems[currentIndex + 1];

    try {
      // 현재 항목을 임시 순서로 변경 (다음 항목의 순서보다 조금 더 큰 값)
      const tempOrder = targetItem.order + 1;
      const response1 = await fetch(`/api/admin/prices/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentItem,
          order: tempOrder,
        }),
      });

      if (!response1.ok) throw new Error("순서 변경에 실패했습니다.");

      // 다음 항목을 현재 항목의 원래 순서로 변경
      const response2 = await fetch(`/api/admin/prices/items/${targetItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...targetItem,
          order: currentItem.order,
        }),
      });

      if (!response2.ok) throw new Error("순서 변경에 실패했습니다.");

      // 현재 항목을 다음 항목의 원래 순서로 변경
      const response3 = await fetch(`/api/admin/prices/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentItem,
          order: targetItem.order,
        }),
      });

      if (!response3.ok) throw new Error("순서 변경에 실패했습니다.");

      // 약간의 지연 후 목록 새로고침
      await new Promise((resolve) => setTimeout(resolve, 100));
      await fetchCategories();

      toast({
        title: "성공",
        description: "순서가 변경되었습니다.",
      });
    } catch (error) {
      console.error("Error moving item down:", error);
      toast({
        title: "오류",
        description: "순서 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleMoveCategoryUp = async (categoryId: string, categories: PriceCategory[]) => {
    const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
    const currentIndex = sortedCategories.findIndex((cat) => cat.id === categoryId);

    if (currentIndex === 0) return;

    const currentCategory = sortedCategories[currentIndex];
    const targetCategory = sortedCategories[currentIndex - 1];

    try {
      // 현재 카테고리를 이전 카테고리의 순서로 변경
      const response1 = await fetch(`/api/admin/prices/categories/${currentCategory.id}/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: targetCategory.order,
        }),
      });

      if (!response1.ok) throw new Error("순서 변경에 실패했습니다.");

      // 이전 카테고리를 현재 카테고리의 순서로 변경
      const response2 = await fetch(`/api/admin/prices/categories/${targetCategory.id}/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: currentCategory.order,
        }),
      });

      if (!response2.ok) throw new Error("순서 변경에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "카테고리 순서가 변경되었습니다.",
      });
    } catch (error) {
      console.error("Error moving category up:", error);
      toast({
        title: "오류",
        description: "카테고리 순서 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleMoveCategoryDown = async (categoryId: string, categories: PriceCategory[]) => {
    const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
    const currentIndex = sortedCategories.findIndex((cat) => cat.id === categoryId);

    if (currentIndex === sortedCategories.length - 1) return;

    const currentCategory = sortedCategories[currentIndex];
    const targetCategory = sortedCategories[currentIndex + 1];

    try {
      // 현재 카테고리를 다음 카테고리의 순서로 변경
      const response1 = await fetch(`/api/admin/prices/categories/${currentCategory.id}/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: targetCategory.order,
        }),
      });

      if (!response1.ok) throw new Error("순서 변경에 실패했습니다.");

      // 다음 카테고리를 현재 카테고리의 순서로 변경
      const response2 = await fetch(`/api/admin/prices/categories/${targetCategory.id}/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: currentCategory.order,
        }),
      });

      if (!response2.ok) throw new Error("순서 변경에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "카테고리 순서가 변경되었습니다.",
      });
    } catch (error) {
      console.error("Error moving category down:", error);
      toast({
        title: "오류",
        description: "카테고리 순서 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const buildHierarchy = (categories: PriceCategory[]): PriceCategory[] => {
    const categoryMap = new Map<string, PriceCategory>();
    const rootCategories: PriceCategory[] = [];

    categories.forEach((category) => {
      categoryMap.set(category.id, {
        ...category,
        children: [],
        level: 0,
      });
    });

    categories.forEach((category) => {
      const node = categoryMap.get(category.id);
      if (category.parentId && node) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          node.level = parent.level + 1;
          parent.children.push(node);
        }
      } else if (node) {
        rootCategories.push(node);
      }
    });

    const sortCategories = (cats: PriceCategory[]): PriceCategory[] => {
      cats.sort((a, b) => a.order - b.order);
      cats.forEach((cat) => {
        if (cat.children.length > 0) {
          cat.children = sortCategories(cat.children);
        }
      });
      return cats;
    };

    return sortCategories(rootCategories);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/prices/categories");
      if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      const hierarchicalCategories = buildHierarchy(data);
      setCategories(hierarchicalCategories);

      // 기존 expandedCategories 상태를 유지
      // 새로 추가된 카테고리는 자동으로 펼쳐지지 않음
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  // 컴포넌트가 처음 마운트될 때만 모든 카테고리를 펼침
  useEffect(() => {
    const initializeCategories = async () => {
      try {
        const response = await fetch("/api/admin/prices/categories");
        if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
        const data = await response.json();
        const hierarchicalCategories = buildHierarchy(data);
        setCategories(hierarchicalCategories);

        // 초기에만 모든 카테고리를 펼침
        const allCategoryIds = getAllCategoryIds(hierarchicalCategories);
        setExpandedCategories(allCategoryIds);
      } catch (error) {
        toast({
          title: "오류",
          description: "카테고리 목록을 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    };

    initializeCategories();
  }, []);

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const formatPrice = (item: any) => {
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

  const findParentCategory = (categories: PriceCategory[], childId: string): PriceCategory | null => {
    for (const category of categories) {
      if (category.children.some((child) => child.id === childId)) {
        return category;
      }
      const found = findParentCategory(category.children, childId);
      if (found) return found;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">카테고리 목록</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            전체 펼치기
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            전체 접기
          </Button>
          <Button onClick={() => router.push("/admin/prices/categories/new")}>새 카테고리</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium">카테고리/항목</th>
              <th className="h-12 px-4 text-left align-middle font-medium w-[200px]">가격</th>
              <th className="h-12 px-4 text-left align-middle font-medium w-[150px]">정보</th>
              <th className="h-12 px-4 text-right align-middle font-medium w-[200px]">관리</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const renderCategoryRow = (category: PriceCategory, depth = 0): JSX.Element => {
                const hasChildren = category.children.length > 0;
                const isExpanded = expandedCategories.has(category.id);
                const sortedItems = [...category.items].sort((a, b) => a.order - b.order);

                // 같은 부모를 가진 형제 카테고리들을 찾는 로직 수정
                let siblingCategories: PriceCategory[];
                if (depth === 0) {
                  // 최상위 카테고리의 경우
                  siblingCategories = categories.filter((cat) => !cat.parentId);
                } else {
                  // 하위 카테고리의 경우 부모의 children에서 찾기
                  const parent = findParentCategory(categories, category.id);
                  siblingCategories = parent ? parent.children : [];
                }

                const currentIndex = siblingCategories.findIndex((cat) => cat.id === category.id);

                return (
                  <>
                    <tr key={category.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div style={{ marginLeft: `${depth * 24}px` }} className="flex items-center gap-2">
                            {(hasChildren || category.items.length > 0) && (
                              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => toggleExpand(category.id)}>
                                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                              </Button>
                            )}
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">-</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        항목 {category.items.length}개{hasChildren && `, 하위 ${category.children.length}개`}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleMoveCategoryUp(category.id, siblingCategories)}
                              disabled={currentIndex === 0}
                            >
                              ↑
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleMoveCategoryDown(category.id, siblingCategories)}
                              disabled={currentIndex === siblingCategories.length - 1}
                            >
                              ↓
                            </Button>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/categories/new?parentId=${category.id}`)}>
                                  <FolderPlus className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>하위 카테고리 추가</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/new?categoryId=${category.id}`)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>가격표 항목 추가</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/categories/${category.id}`)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>카테고리 수정</p>
                              </TooltipContent>
                            </Tooltip>

                            <AlertDialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>카테고리 삭제</p>
                                </TooltipContent>
                              </Tooltip>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    이 카테고리를 삭제하시겠습니까?
                                    {hasChildren && " 하위 카테고리와 "}
                                    {category.items.length > 0 && " 포함된 가격표 항목도 "}
                                    모두 삭제됩니다.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>취소</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCategory(category.id)} className="bg-red-500 hover:bg-red-600">
                                    삭제
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TooltipProvider>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <>
                        {sortedItems.map((item, index) => (
                          <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div style={{ marginLeft: `${(depth + 1) * 24}px` }}>
                                  <span className="text-muted-foreground">└</span>
                                  <span className="ml-2">{item.name}</span>
                                  {item.specification && <p className="text-sm text-muted-foreground mt-1">{item.specification}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-medium text-primary">{formatPrice(item)}</span>
                            </td>
                            <td className="p-4">-</td>
                            <td className="p-4">
                              <div className="flex items-center justify-end gap-2">
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleMoveItemUp(item.id, category.items)}
                                    disabled={index === 0}
                                  >
                                    ↑
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleMoveItemDown(item.id, category.items)}
                                    disabled={index === sortedItems.length - 1}
                                  >
                                    ↓
                                  </Button>
                                </div>
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
                            </td>
                          </tr>
                        ))}
                        {hasChildren && category.children.map((child) => renderCategoryRow(child, depth + 1))}
                      </>
                    )}
                  </>
                );
              };

              return renderCategoryRow(category);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
