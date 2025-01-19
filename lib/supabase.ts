import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(file: File, bucket: string = "ilgoc-hospital") {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage.from(bucket).upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }

    // 완전한 public URL 생성
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
}

export async function deleteImage(path: string, bucket: string = "ilgoc-hospital") {
  try {
    // URL에서 파일 경로 추출
    const filePathMatch = path.match(/\/([^/]+)$/);
    if (!filePathMatch) {
      throw new Error("Invalid file path");
    }
    const filePath = filePathMatch[1];

    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting image: ", error);
    throw error;
  }
}
