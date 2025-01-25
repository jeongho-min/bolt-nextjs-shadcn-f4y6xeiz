"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DepartmentInfo {
  id: string;
  name: string;
  type: "KOREAN" | "WESTERN";
  icon: string;
  description: string;
  order_num: number;
  is_active: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: DepartmentInfo;
  onSuccess: () => void;
}

export function DepartmentInfoDialog({ open, onOpenChange, department, onSuccess }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "KOREAN" as "KOREAN" | "WESTERN",
    icon: "",
    description: "",
    order_num: 0,
    is_active: true,
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        type: department.type,
        icon: department.icon,
        description: department.description,
        order_num: department.order_num,
        is_active: department.is_active,
      });
    } else {
      setFormData({
        name: "",
        type: "KOREAN",
        icon: "",
        description: "",
        order_num: 0,
        is_active: true,
      });
    }
  }, [department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = department ? `/api/admin/department-info/${department.id}` : "/api/admin/department-info";

      const response = await fetch(url, {
        method: department ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save department");

      toast({
        title: "성공",
        description: `진료과목이 ${department ? "수정" : "추가"}되었습니다.`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "에러",
        description: `진료과목 ${department ? "수정" : "추가"}에 실패했습니다.`,
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
          <DialogTitle>{department ? "진료과목 수정" : "새 진료과목 추가"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">유형</Label>
            <Select value={formData.type} onValueChange={(value: "KOREAN" | "WESTERN") => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KOREAN">한의학</SelectItem>
                <SelectItem value="WESTERN">양의학</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">아이콘</Label>
            <Input id="icon" value={formData.icon} onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))} required />
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
              {loading ? "처리 중..." : department ? "수정" : "추가"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
