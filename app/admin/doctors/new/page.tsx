"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department, MedicalSubject } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";

interface DepartmentWithSubjects extends Department {
  subjects: MedicalSubject[];
}

export default function NewDoctorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<DepartmentWithSubjects[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([""]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/admin/departments?include=subjects");
      const data = await response.json();
      console.log("Fetched departments:", data);
      setDepartments(data);
    } catch (error) {
      toast({
        title: "부서 정보 로딩 실패",
        description: "부서 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedSubjects([]); // 부서가 변경되면 선택된 진료과목 초기화
    console.log("Selected department:", departmentId);
    console.log("Available subjects:", departments.find((dept) => dept.id === departmentId)?.subjects);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) => (prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]));
  };

  const addSpecialty = () => {
    setSpecialties([...specialties, ""]);
  };

  const removeSpecialty = (index: number) => {
    if (specialties.length > 1) {
      setSpecialties(specialties.filter((_, i) => i !== index));
    }
  };

  const updateSpecialty = (index: number, value: string) => {
    const newSpecialties = [...specialties];
    newSpecialties[index] = value;
    setSpecialties(newSpecialties);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const biography = formData.get("biography") as string;

    // 빈 전문분야 필터링
    const validSpecialties = specialties.filter((specialty) => specialty.trim() !== "");

    if (validSpecialties.length === 0) {
      toast({
        variant: "destructive",
        description: "전문분야를 하나 이상 입력해주세요.",
      });
      setIsLoading(false);
      return;
    }

    if (!selectedDepartment) {
      toast({
        variant: "destructive",
        description: "소속과를 선택해주세요.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          departmentId: selectedDepartment,
          position,
          specialties: validSpecialties,
          biography,
          imageUrl,
          subjectIds: selectedSubjects,
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

  const currentDepartment = departments.find((dept) => dept.id === selectedDepartment);
  const departmentSubjects = currentDepartment?.subjects ?? [];

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
              <Select value={selectedDepartment} onValueChange={handleDepartmentChange} required>
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
              <label className="text-sm font-medium">프로필 이미지</label>
              <div className="flex flex-col items-start gap-4">
                <ImageUpload onUploadComplete={(url) => setImageUrl(url)} defaultImage={imageUrl} />
              </div>
            </div>
          </div>

          {selectedDepartment && departmentSubjects.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">진료과목</label>
              <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">
                {departmentSubjects.map((subject) => (
                  <div key={subject.id} className="flex items-center space-x-2">
                    <Checkbox id={subject.id} checked={selectedSubjects.includes(subject.id)} onCheckedChange={() => handleSubjectToggle(subject.id)} />
                    <Label htmlFor={subject.id} className="text-sm">
                      {subject.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">전문분야</label>
              <Button type="button" variant="outline" size="sm" onClick={addSpecialty}>
                항목 추가
              </Button>
            </div>
            <div className="space-y-2">
              {specialties.map((specialty, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={specialty} onChange={(e) => updateSpecialty(index, e.target.value)} placeholder="전문분야를 입력하세요" />
                  {specialties.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSpecialty(index)} className="shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
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
