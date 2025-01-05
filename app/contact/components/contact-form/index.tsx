"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ContactFormFields } from "./form-fields";
import { contactFormSchema } from "./schema";
import type { ContactFormData } from "./types";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      department: "",
      date: undefined,
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    // 여기에 실제 제출 로직 구현
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    form.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContactFormFields form={form} isSubmitting={isSubmitting} />
        </form>
      </Form>
    </motion.div>
  );
}