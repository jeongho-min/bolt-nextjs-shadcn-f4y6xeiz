import * as z from "zod";
import { contactFormSchema } from "./schema";

export type ContactFormData = z.infer<typeof contactFormSchema>;