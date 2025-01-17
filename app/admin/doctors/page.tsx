"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ArrowLeft } from "lucide-react";
import { Doctor, Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorWithDepartment[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/admin/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      toast({
        title: "의사 정보 로딩 실패",
        description: "의사 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/doctors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchDoctors();
        toast({
          title: "상태 변경 성공",
          description: "의사 상태가 성공적으로 변경되었습니다.",
        });
      }
    } catch (error) {
      toast({
        title: "상태 변경 실패",
        description: "의사 상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const tableHeaders = [
    { label: "이름", width: "w-[150px]" },
    { label: "소속과", width: "w-[150px]" },
    { label: "직책", width: "w-[120px]" },
    { label: "전문분야", width: "w-[200px]" },
    { label: "상태", width: "w-[100px]" },
    { label: "관리", width: "w-[100px]", align: "text-right" },
  ];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin")} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">의사 관리</h1>
        </div>
        <Button size="lg" onClick={() => router.push("/admin/doctors/new")}>
          <Plus className="mr-2 h-5 w-5" />새 의사 추가
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {tableHeaders.map((header, index) => (
                <TableHead key={index} className={cn(header.width, "py-5 px-6", header.align, "font-semibold")}>
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id} className="hover:bg-muted/50">
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    {doctor.imageUrl && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" />
                      </div>
                    )}
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{doctor.department.name}</TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{doctor.position || "-"}</TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{doctor.specialties || "-"}</TableCell>
                <TableCell className="py-5 px-6">
                  <Button
                    size="sm"
                    variant={doctor.isActive ? "default" : "secondary"}
                    onClick={() => handleStatusToggle(doctor.id, doctor.isActive)}
                    className="w-20"
                  >
                    {doctor.isActive ? "활성" : "비활성"}
                  </Button>
                </TableCell>
                <TableCell className="py-5 px-6 text-right">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/admin/doctors/${doctor.id}`)}>
                    수정
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
