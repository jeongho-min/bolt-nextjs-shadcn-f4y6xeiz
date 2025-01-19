"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const categoryFormSchema = z.object({
  name: z.string().min(1, "카테고리명을 입력해주세요"),
  order: z.number().min(0, "0 이상의 숫자를 입력해주세요"),
  parentId: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialData?: CategoryFormValues & { id: string };
}

interface PriceCategory {
  id: string;
  name: string;
  order: number;
  parentId: string | null;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData || {
      name: "",
      order: 0,
      parentId: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/prices/categories");
      if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch(initialData ? `/api/admin/prices/categories/${initialData.id}` : "/api/admin/prices/categories", {
        method: initialData ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          parentId: data.parentId === "root" ? null : data.parentId,
        }),
      });

      if (!response.ok) throw new Error("카테고리 저장에 실패했습니다.");

      toast({
        title: "성공",
        description: initialData ? "카테고리가 수정되었습니다." : "새 카테고리가 추가되었습니다.",
      });

      router.push("/admin/prices");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 저장에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상위 카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "root"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="상위 카테고리 선택 (선택사항)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="root">없음 (최상위 카테고리)</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="예: 한약/처방, 치료/처치, 제증명" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>정렬 순서</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (initialData ? "수정 중..." : "추가 중...") : initialData ? "수정" : "추가"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
