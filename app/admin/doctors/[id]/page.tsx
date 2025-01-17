"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Doctor, Department } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface Props {
  params: {
    id: string;
  };
}

type DoctorWithDepartment = Doctor & {
  department: Department;
};

export default function EditDoctorPage({ params }: Props) {
  const [doctor, setDoctor] = useState<DoctorWithDepartment | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([fetchDoctor(), fetchDepartments()]);
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`/api/admin/doctors/${params.id}`);
      if (!response.ok) {
        throw new Error("의사 정보를 불러올 수 없습니다.");
      }
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "의사 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      router.push("/admin/doctors");
    }
  };

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
      const response = await fetch(`/api/admin/doctors/${params.id}`, {
        method: "PATCH",
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
        throw new Error("의사 정보 수정에 실패했습니다.");
      }

      toast({
        title: "성공",
        description: "의사 정보가 수정되었습니다.",
      });

      router.push("/admin/doctors");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: "의사 정보 수정 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/doctors/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "성공",
        description: "의사가 삭제되었습니다.",
      });

      router.push("/admin/doctors");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "의사 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (!doctor) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/doctors")} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-2xl font-bold">의사 정보 수정</h1>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">삭제</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>의사 삭제</AlertDialogTitle>
                  <AlertDialogDescription>정말로 이 의사를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                이름
              </label>
              <Input id="name" name="name" required defaultValue={doctor.name} placeholder="의사 이름을 입력하세요" />
            </div>

            <div className="space-y-2">
              <label htmlFor="departmentId" className="text-sm font-medium">
                소속과
              </label>
              <Select name="departmentId" defaultValue={doctor.departmentId} required>
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
              <Input id="position" name="position" defaultValue={doctor.position || ""} placeholder="직책을 입력하세요" />
            </div>

            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">
                프로필 이미지 URL
              </label>
              <Input id="imageUrl" name="imageUrl" type="url" defaultValue={doctor.imageUrl || ""} placeholder="이미지 URL을 입력하세요" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="specialties" className="text-sm font-medium">
              전문분야
            </label>
            <Input id="specialties" name="specialties" defaultValue={doctor.specialties || ""} placeholder="전문분야를 입력하세요" />
          </div>

          <div className="space-y-2">
            <label htmlFor="biography" className="text-sm font-medium">
              약력
            </label>
            <Textarea id="biography" name="biography" defaultValue={doctor.biography || ""} placeholder="의사의 약력을 입력하세요" rows={4} />
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
