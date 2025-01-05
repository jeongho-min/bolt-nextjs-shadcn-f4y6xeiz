"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

export function OfficeHoursSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6">진료시간 안내</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium mb-2">평일</p>
              <p className="text-gray-600">오전 9:00 - 오후 6:00</p>
              <p className="text-sm text-gray-500">점심시간 12:30 - 2:00</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Calendar className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium mb-2">토요일</p>
              <p className="text-gray-600">오전 9:00 - 오후 1:00</p>
              <p className="text-sm text-primary">일요일/공휴일 휴진</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}