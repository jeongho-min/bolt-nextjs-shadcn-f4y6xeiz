"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function TimePicker({ value = "", onChange, disabled }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  const [selectedHour, selectedMinute] = value ? value.split(":") : ["09", "00"];

  const handleHourChange = (hour: string) => {
    onChange?.(`${hour}:${selectedMinute}`);
  };

  const handleMinuteChange = (minute: string) => {
    onChange?.(`${selectedHour}:${minute}`);
  };

  return (
    <div className="flex gap-2">
      <Select value={selectedHour} onValueChange={handleHourChange} disabled={disabled}>
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="시" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}시
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedMinute} onValueChange={handleMinuteChange} disabled={disabled}>
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="분" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {minute}분
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
