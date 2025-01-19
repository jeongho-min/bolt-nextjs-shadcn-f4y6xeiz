"use client";

import { createContext, useContext, ReactNode } from "react";
import { MedicalSubject } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

interface SubjectContextType {
  fetchSubjects: (departmentId: string) => Promise<MedicalSubject[]>;
  editSubject: (departmentId: string, subject: MedicalSubject) => Promise<MedicalSubject>;
  deleteSubject: (departmentId: string, subjectId: string) => Promise<void>;
  addSubjects: (departmentId: string, subjects: { name: string }[]) => Promise<void>;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export function SubjectProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const fetchSubjects = async (departmentId: string) => {
    try {
      const response = await fetch(`/api/admin/departments/${departmentId}/subjects`);
      if (!response.ok) throw new Error("진료과목 목록을 불러오는데 실패했습니다.");
      return await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "진료과목 목록을 불러오는데 실패했습니다.",
      });
      throw error;
    }
  };

  const editSubject = async (departmentId: string, subject: MedicalSubject) => {
    try {
      const response = await fetch(`/api/admin/departments/${departmentId}/subjects?subjectId=${subject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: subject.name }),
      });

      if (!response.ok) throw new Error("진료과목 수정에 실패했습니다.");

      const updatedSubject = await response.json();
      toast({ description: "진료과목이 수정되었습니다." });
      return updatedSubject;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "진료과목 수정 중 오류가 발생했습니다.",
      });
      throw error;
    }
  };

  const deleteSubject = async (departmentId: string, subjectId: string) => {
    try {
      const response = await fetch(`/api/admin/departments/${departmentId}/subjects?subjectId=${subjectId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("진료과목 삭제에 실패했습니다.");

      toast({ description: "진료과목이 삭제되었습니다." });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "진료과목 삭제 중 오류가 발생했습니다.",
      });
      throw error;
    }
  };

  const addSubjects = async (departmentId: string, subjects: { name: string }[]) => {
    try {
      await Promise.all(
        subjects.map((subject) =>
          fetch(`/api/admin/departments/${departmentId}/subjects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subject),
          })
        )
      );

      toast({ description: "진료과목이 추가되었습니다." });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "진료과목 추가 중 오류가 발생했습니다.",
      });
      throw error;
    }
  };

  return <SubjectContext.Provider value={{ fetchSubjects, editSubject, deleteSubject, addSubjects }}>{children}</SubjectContext.Provider>;
}

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (context === undefined) {
    throw new Error("useSubject must be used within a SubjectProvider");
  }
  return context;
};
