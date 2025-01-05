import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요"),
  phone: z.string().min(1, "연락처를 입력해주세요"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  department: z.string().min(1, "진료과목을 선택해주세요"),
  date: z.date().optional(),
  message: z.string().min(1, "문의사항을 입력해주세요"),
});