"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Department, Doctor, MedicalSubject } from "@prisma/client";
import { ArrowLeft, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

type DoctorWithRelations = Doctor & {
  department: Department;
  subjects: {
    subject: MedicalSubject;
  }[];
};

export default function DoctorDetailPage({ params }: Props) {
  const [doctor, setDoctor] = useState<DoctorWithRelations | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleImageError = (imageUrl: string) => {
    console.error("Image load error for URL:", imageUrl);
  };

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

  return doctor ? (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push("/admin/doctors")} className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">의사 상세 정보</h1>
          </div>
          <Button onClick={() => router.push(`/admin/doctors/${params.id}/edit`)}>
            <Pencil className="h-4 w-4 mr-2" />
            수정
          </Button>
        </div>

        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div className="flex gap-6">
            {doctor.imageUrl && (
              <div className="relative w-[200px] h-[200px] overflow-hidden rounded-lg border">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => {
                    handleImageError(doctor.imageUrl!);
                  }}
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-bold">{doctor.name}</h2>
                <p className="text-muted-foreground">{doctor.position}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">소속과</h3>
                <Badge variant="secondary">{doctor.department.name}</Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">진료과목</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.subjects.map(({ subject }) => (
                    <Badge key={subject.id} variant="outline">
                      {subject.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">전문분야</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties?.split(", ").map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {doctor.biography && (
              <div>
                <h3 className="text-sm font-medium mb-2">약력</h3>
                <p className="text-sm whitespace-pre-line">{doctor.biography}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
