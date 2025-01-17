"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Department } from "@prisma/client";
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
import { ArrowLeft } from "lucide-react";

interface Props {
  params: {
    id: string;
  };
}

export default function EditDepartmentPage({ params }: Props) {
  const [department, setDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`/api/admin/departments/${params.id}`);
      if (!response.ok) {
        throw new Error("부서 정보를 불러올 수 없습니다.");
      }
      const data = await response.json();
      setDepartment(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "부서 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      router.push("/admin/departments");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    try {
      const response = await fetch(`/api/admin/departments/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("부서 수정에 실패했습니다.");
      }

      toast({
        title: "성공",
        description: "부서 정보가 수정되었습니다.",
      });

      router.push("/admin/departments");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: "부서 수정 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/departments/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "성공",
        description: "부서가 삭제되었습니다.",
      });

      router.push("/admin/departments");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "부서 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (!department) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/departments")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-2xl font-bold">부서 수정</h1>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">삭제</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>부서 삭제</AlertDialogTitle>
                  <AlertDialogDescription>정말로 이 부서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              부서명
            </label>
            <Input id="name" name="name" required defaultValue={department.name} placeholder="부서명을 입력하세요" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              설명
            </label>
            <Textarea id="description" name="description" defaultValue={department.description || ""} placeholder="부서에 대한 설명을 입력하세요" rows={4} />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "처리중..." : "수정 완료"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
