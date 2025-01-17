"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department } from "@prisma/client";

export default function NewDoctorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/admin/departments");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      toast({
        title: "부서 정보 로딩 실패",
        description: "부서 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const departmentId = formData.get("departmentId") as string;
    const position = formData.get("position") as string;
    const specialties = formData.get("specialties") as string;
    const biography = formData.get("biography") as string;
    const imageUrl = formData.get("imageUrl") as string;

    try {
      const response = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          departmentId,
          position,
          specialties,
          biography,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("의사 생성에 실패했습니다.");
      }

      toast({
        title: "성공",
        description: "새로운 의사가 등록되었습니다.",
      });

      router.push("/admin/doctors");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: "의사 등록 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/doctors")} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">새 의사 등록</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                이름
              </label>
              <Input id="name" name="name" required placeholder="의사 이름을 입력하세요" />
            </div>

            <div className="space-y-2">
              <label htmlFor="departmentId" className="text-sm font-medium">
                소속과
              </label>
              <Select name="departmentId" required>
                <SelectTrigger>
                  <SelectValue placeholder="소속과를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-medium">
                직책
              </label>
              <Input id="position" name="position" placeholder="직책을 입력하세요" />
            </div>

            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">
                프로필 이미지 URL
              </label>
              <Input id="imageUrl" name="imageUrl" type="url" placeholder="이미지 URL을 입력하세요" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="specialties" className="text-sm font-medium">
              전문분야
            </label>
            <Input id="specialties" name="specialties" placeholder="전문분야를 입력하세요" />
          </div>

          <div className="space-y-2">
            <label htmlFor="biography" className="text-sm font-medium">
              약력
            </label>
            <Textarea id="biography" name="biography" placeholder="의사의 약력을 입력하세요" rows={4} />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "처리중..." : "의사 등록"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
