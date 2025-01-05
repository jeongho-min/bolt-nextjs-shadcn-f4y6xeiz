"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

export function InfoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">연락처</h3>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>Tel: 062-369-2075</p>
            <p>Tel: 062-571-2222</p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">진료시간</h3>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>평일: 09:00 - 17:30</p>
            <p>토요일: 09:00 - 13:00</p>
            <p>점심시간: 12:30 - 14:30</p>
            <p className="text-primary font-medium">일요일/공휴일 휴진</p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">오시는 길</h3>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>광주광역시 북구 일곡동 840-2번지</p>
            <p>(양일로 307)</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}