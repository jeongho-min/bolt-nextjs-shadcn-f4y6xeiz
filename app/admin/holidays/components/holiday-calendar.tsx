"use client";

import { Card } from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";
import { HolidayFormModal } from "./holiday-form-modal";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { parseISO } from "date-fns";
import { DateSelectArg } from "@fullcalendar/core";

interface Holiday {
  id: string;
  title: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

interface HolidayCalendarProps {
  holidays: Holiday[];
  onHolidayCreate?: () => void;
  onHolidayUpdate?: () => void;
}

export function HolidayCalendar({ holidays, onHolidayCreate, onHolidayUpdate }: HolidayCalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const events = holidays
    .filter((holiday) => holiday.isActive && holiday.startDate)
    .map((holiday) => {
      const start = holiday.startDate ? parseISO(holiday.startDate) : null;
      const end = holiday.endDate ? parseISO(holiday.endDate) : null;

      return {
        id: holiday.id,
        title: holiday.title,
        description: holiday.description,
        start: start?.toISOString(),
        end: end ? new Date(end.setDate(end.getDate() + 1)).toISOString() : undefined,
        allDay: true,
        classNames: ["holiday-event"],
        extendedProps: { holiday },
      };
    })
    .filter((event) => event.start);

  const handleDateClick = (arg: DateClickArg) => {
    setMode("create");
    setSelectedDate(arg.date);
    setSelectedEndDate(arg.date);
    setSelectedHoliday(null);
    setIsModalOpen(true);
  };

  const handleSelect = (arg: DateSelectArg) => {
    setMode("create");
    setSelectedDate(arg.start);
    setSelectedEndDate(new Date(arg.end.setDate(arg.end.getDate() - 1)));
    setSelectedHoliday(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const holiday = arg.event.extendedProps.holiday as Holiday;
    setMode("edit");
    setSelectedHoliday(holiday);
    setSelectedDate(arg.event.start);
    setSelectedEndDate(arg.event.end ? new Date(arg.event.end.setDate(arg.event.end.getDate() - 1)) : arg.event.start);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedEndDate(null);
    setSelectedHoliday(null);
  };

  const handleSuccess = () => {
    if (mode === "create" && onHolidayCreate) {
      onHolidayCreate();
    } else if (mode === "edit" && onHolidayUpdate) {
      onHolidayUpdate();
    }
  };

  return (
    <>
      <Card className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={koLocale}
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          height="auto"
          dayMaxEvents={3}
          eventDisplay="block"
          displayEventTime={false}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          selectable={true}
          select={handleSelect}
          selectMirror={true}
          eventClassNames="holiday-event"
          firstDay={0}
          dayCellClassNames="calendar-day"
          dayHeaderClassNames="calendar-header"
          eventContent={(arg) => (
            <div className="px-2 py-1">
              <span className="text-xs font-medium">{arg.event.title}</span>
            </div>
          )}
        />
      </Card>
      <HolidayFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedDate={selectedDate}
        selectedEndDate={selectedEndDate}
        onSuccess={handleSuccess}
        mode={mode}
        initialData={selectedHoliday}
      />
    </>
  );
}
