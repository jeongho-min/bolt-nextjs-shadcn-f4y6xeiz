"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TreatmentCategory {
  id: string;
  name: string;
  description: string | null;
  order_num: number;
  is_active: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: TreatmentCategory;
  onSuccess: () => void;
}

export function TreatmentCategoryDialog({ open, onOpenChange, category, onSuccess }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    order_num: 0,
    is_active: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        order_num: category.order_num,
        is_active: category.is_active,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        order_num: 0,
        is_active: true,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category ? `/api/admin/treatment-categories/${category.id}` : "/api/admin/treatment-categories";

      const response = await fetch(url, {
        method: category ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save category");

      toast({
        title: "성공",
        description: `카테고리가 ${category ? "수정" : "추가"}되었습니다.`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "에러",
        description: `카테고리 ${category ? "수정" : "추가"}에 실패했습니다.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? "카테고리 수정" : "새 카테고리 추가"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order_num">순서</Label>
            <Input
              id="order_num"
              type="number"
              value={formData.order_num}
              onChange={(e) => setFormData((prev) => ({ ...prev, order_num: parseInt(e.target.value) }))}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))} />
            <Label htmlFor="is_active">활성 상태</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "처리 중..." : category ? "수정" : "추가"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
