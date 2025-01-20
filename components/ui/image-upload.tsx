"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  defaultImage?: string;
}

export function ImageUpload({ onUploadComplete, accept, defaultImage }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const { toast } = useToast();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        description: "파일 크기는 5MB를 초과할 수 없습니다.",
      });
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        description: "이미지 파일만 업로드할 수 있습니다.",
      });
      return;
    }

    try {
      setIsUploading(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        onUploadComplete(imageUrl);
        toast({
          description: "파일이 성공적으로 업로드되었습니다.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        description: "파일 업로드에 실패했습니다. 다시 시도해주세요.",
      });
      setPreview(defaultImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <Input type="file" accept={accept} onChange={handleFileChange} disabled={isUploading} className="w-full max-w-[300px]" />
        {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
      {preview && (
        <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg border">
          <Image src={preview} alt="Preview" fill className="object-cover" sizes="150px" unoptimized />
        </div>
      )}
    </div>
  );
}
