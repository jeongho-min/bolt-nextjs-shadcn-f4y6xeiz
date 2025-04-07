import { createClient } from "@supabase/supabase-js";

// 더미 Supabase 클라이언트 생성
// 실제 환경 변수가 없어도 오류가 발생하지 않도록 함
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

// 이미지 업로드를 시뮬레이션하는 목 함수
export async function uploadImage(file: File, bucket: string = "ilgoc-hospital") {
  try {
    // 실제 업로드 없이 더미 URL 반환
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    // 더미 URL 반환
    return `https://picsum.photos/800/600?random=${Math.random()}`;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
  }
}

// 이미지 삭제를 시뮬레이션하는 목 함수
export async function deleteImage(path: string, bucket: string = "ilgoc-hospital") {
  try {
    // 실제 삭제 작업 없이 성공만 반환
    console.log(`Mock: Image deleted from path ${path}`);
    return true;
  } catch (error) {
    console.error("Error deleting image: ", error);
    throw new Error("이미지 삭제에 실패했습니다.");
  }
}
