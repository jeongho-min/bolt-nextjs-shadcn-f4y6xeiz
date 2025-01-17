"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ArrowLeft } from "lucide-react";
import { Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function DepartmentsPage() {
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

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchDepartments();
        toast({
          title: "상태 변경 성공",
          description: "부서 상태가 성공적으로 변경되었습니다.",
        });
      }
    } catch (error) {
      toast({
        title: "상태 변경 실패",
        description: "부서 상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const tableHeaders = [
    { label: "부서명", width: "w-[200px]" },
    { label: "설명", width: "w-[300px]" },
    { label: "상태", width: "w-[120px]" },
    { label: "생성일", width: "w-[150px]" },
    { label: "관리", width: "w-[100px]", align: "text-right" },
  ];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin")} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">부서 관리</h1>
        </div>
        <Button size="lg" onClick={() => router.push("/admin/departments/new")}>
          <Plus className="mr-2 h-5 w-5" />새 부서 추가
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
            {departments.map((department) => (
              <TableRow key={department.id} className="hover:bg-muted/50">
                <TableCell className="py-5 px-6 font-medium">{department.name}</TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{department.description || "-"}</TableCell>
                <TableCell className="py-5 px-6">
                  <Button
                    size="sm"
                    variant={department.isActive ? "default" : "secondary"}
                    onClick={() => handleStatusToggle(department.id, department.isActive)}
                    className="w-20"
                  >
                    {department.isActive ? "활성" : "비활성"}
                  </Button>
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{new Date(department.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="py-5 px-6 text-right">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/admin/departments/${department.id}`)}>
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
