"use client";

import { useState, useEffect } from "react";
import { MedicalSubject } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSubject } from "@/contexts/subject-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SubjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId: string;
}

interface SubjectInput {
  name: string;
}

export function SubjectDialog({ isOpen, onClose, departmentId }: SubjectDialogProps) {
  const [subjects, setSubjects] = useState<SubjectInput[]>([{ name: "" }]);
  const [existingSubjects, setExistingSubjects] = useState<MedicalSubject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSubject, setEditingSubject] = useState<MedicalSubject | null>(null);
  const [deleteSubjectId, setDeleteSubjectId] = useState<string | null>(null);
  const { toast } = useToast();
  const { fetchSubjects, editSubject, deleteSubject, addSubjects } = useSubject();

  useEffect(() => {
    if (isOpen) {
      fetchAndSetSubjects();
    }
  }, [isOpen, departmentId]);

  const fetchAndSetSubjects = async () => {
    try {
      const data = await fetchSubjects(departmentId);
      setExistingSubjects(data);
    } catch (error) {
      // 에러는 이미 Context에서 처리됨
    }
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "" }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { name: value };
    setSubjects(newSubjects);
  };

  const handleEdit = async (subject: MedicalSubject) => {
    try {
      const updatedSubject = await editSubject(departmentId, subject);
      setExistingSubjects((prev) => prev.map((s) => (s.id === updatedSubject.id ? updatedSubject : s)));
      setEditingSubject(null);
    } catch (error) {
      // 에러는 이미 Context에서 처리됨
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSubject(departmentId, id);
      setExistingSubjects((prev) => prev.filter((s) => s.id !== id));
      setDeleteSubjectId(null);
    } catch (error) {
      // 에러는 이미 Context에서 처리됨
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const validSubjects = subjects.filter((subject) => subject.name.trim() !== "");

      if (validSubjects.length === 0) {
        toast({
          variant: "destructive",
          description: "진료과목을 입력해주세요.",
        });
        return;
      }

      await addSubjects(departmentId, validSubjects);
      await fetchAndSetSubjects();
      setSubjects([{ name: "" }]);
    } catch (error) {
      // 에러는 이미 Context에서 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingSubject(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, subject: MedicalSubject) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit(subject);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>진료과목 관리</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {existingSubjects.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">등록된 진료과목</h3>
                <div className="flex flex-wrap gap-2">
                  {existingSubjects.map((subject) => (
                    <div key={subject.id} className="flex items-center gap-1">
                      {editingSubject?.id === subject.id ? (
                        <>
                          <Input
                            value={editingSubject.name}
                            onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                            onKeyDown={(e) => handleKeyDown(e, editingSubject)}
                            className="h-8 w-32"
                          />
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(editingSubject)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline">{subject.name}</Badge>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setEditingSubject(subject)}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setDeleteSubjectId(subject.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">새 진료과목 추가</h3>
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input placeholder="진료과목명" value={subject.name} onChange={(e) => updateSubject(index, e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeSubject(index)} disabled={subjects.length === 1}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" className="w-full" onClick={addSubject}>
                진료과목 추가
              </Button>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  취소
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  저장
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteSubjectId} onOpenChange={(open) => !open && setDeleteSubjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>진료과목 삭제</AlertDialogTitle>
            <AlertDialogDescription>정말 이 진료과목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteSubjectId && handleDelete(deleteSubjectId)} className="bg-red-600 hover:bg-red-700">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
