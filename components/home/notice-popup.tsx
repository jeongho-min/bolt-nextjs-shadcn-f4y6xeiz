"use client";

import { NoticeCategory, PopupNotice } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TipTapViewer } from "@/components/editor/tiptap-viewer";

const POPUP_HIDE_KEY = "notice-popup-hide-all";

interface NoticePopupProps {
  notices: PopupNotice[];
}

export function NoticePopup({ notices }: NoticePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentNotice = notices[currentIndex];
  const hasMultipleNotices = notices.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const checkPopupVisibility = () => {
      const hideUntil = localStorage.getItem(POPUP_HIDE_KEY);
      if (hideUntil) {
        const hideUntilDate = new Date(hideUntil);
        if (hideUntilDate > new Date()) {
          return false;
        }
      }

      const now = new Date();
      const hasVisibleNotice = notices.some((notice) => {
        const startDate = notice.startDate ? new Date(notice.startDate) : null;
        const endDate = notice.endDate ? new Date(notice.endDate) : null;

        if (startDate && startDate > now) return false;
        if (endDate && endDate < now) return false;

        return true;
      });

      return hasVisibleNotice;
    };

    const shouldShowPopup = checkPopupVisibility();
    setIsOpen(shouldShowPopup);
  }, [notices, mounted]);

  const handleHideForDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem(POPUP_HIDE_KEY, tomorrow.toISOString());
    setIsOpen(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? notices.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === notices.length - 1 ? 0 : prev + 1));
  };

  const formatContent = (content: string) => {
    return content.replace(/\n/g, "<br />");
  };

  if (!mounted || notices.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-black/10 z-50 "
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              rotateX: 15,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              rotateX: -15,
              y: 30,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.3,
              },
            }}
            className="fixed top-1/4 left-[5%] -translate-y-1/2 w-full max-w-[75vw] sm:max-w-[320px] z-50 perspective-1000"
          >
            {hasMultipleNotices && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 top-1/2 -translate-x-[calc(100%+16px)] -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all group"
                >
                  <ChevronLeft className="w-7 h-7 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 translate-x-[calc(100%+16px)] -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all group"
                >
                  <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}

            <div className="relative bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-200">
              {currentNotice.imageUrl && (
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image src={currentNotice.imageUrl} alt={currentNotice.title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 400px" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className={currentNotice.imageUrl ? "px-5 pt-4 pb-3" : "relative px-4 pt-4 pb-2.5 bg-white"}>
                {!currentNotice.imageUrl && (
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <h2 className={`font-bold mb-2 text-gray-800 leading-snug ${currentNotice.imageUrl ? "text-[17px]" : "text-[16px] pr-7"}`}>
                  {currentNotice.title}
                </h2>
                <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>
                    {currentNotice.startDate ? new Date(currentNotice.startDate).toLocaleDateString() : new Date(currentNotice.createdAt).toLocaleDateString()}
                  </span>
                  {hasMultipleNotices && (
                    <span className="ml-2 text-gray-400">
                      {currentIndex + 1} / {notices.length}
                    </span>
                  )}
                </div>
              </div>

              {currentNotice.content && (
                <div className={`px-4 py-3 ${currentNotice.imageUrl ? "max-h-[25vh]" : "max-h-[32vh]"} overflow-y-auto border-t border-gray-200 bg-white`}>
                  <div className="prose prose-sm max-w-none">
                    <TipTapViewer content={currentNotice.content} />
                  </div>
                </div>
              )}

              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleHideForDay}
                  className="text-[13px] text-gray-600 hover:text-gray-900 flex items-center gap-1 px-3.5 py-2 rounded-full bg-white hover:bg-gray-50 transition-all w-full justify-center font-medium shadow-sm border border-gray-300 hover:border-gray-400"
                >
                  오늘 하루 보지 않기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
