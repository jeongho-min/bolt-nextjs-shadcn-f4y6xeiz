"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: number;
  time: string;
  doctor: string;
  department: string;
  patientNumber: string;
}

const appointments: Appointment[] = [
  { 
    id: 1, 
    time: "09:30", 
    doctor: "김태호", 
    department: "내과",
    patientNumber: "A-123"
  },
  { 
    id: 2, 
    time: "10:15", 
    doctor: "이미영", 
    department: "소아과",
    patientNumber: "A-124"
  },
  { 
    id: 3, 
    time: "11:00", 
    doctor: "박준서", 
    department: "정형외과",
    patientNumber: "A-125"
  },
];

export function AppointmentWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">실시간 예약 현황</h3>
          <Badge variant="outline" className="font-normal">
            <Clock className="w-3 h-3 mr-1" />
            실시간
          </Badge>
        </div>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {appointment.department} - {appointment.doctor}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {appointment.time}
                    <span className="mx-2">•</span>
                    <span>{appointment.patientNumber}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">예약완료</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}