import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface PanelLayoutProps {
  title: string;
  titleEn?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function PanelLayout({ title, titleEn, onClose, children }: PanelLayoutProps) {
  useEffect(() => {
    // 패널이 열릴 때 URL에 해시 추가
    window.location.hash = "panel";

    // 뒤로가기 이벤트 리스너
    const handlePopState = () => {
      if (!window.location.hash) {
        onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // 컴포넌트가 언마운트될 때 해시 제거
      if (window.location.hash === "#panel") {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    };
  }, [onClose]);

  const handleClose = () => {
    // 패널을 닫을 때 해시 제거
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={handleClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 1,
          duration: 0.6,
        }}
        className="fixed top-0 right-0 h-full w-full md:w-3/4 lg:w-3/4 bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* 헤더 */}
          <div className="sticky top-0 z-10 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="h-16 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{title}</h1>
                  {titleEn && <p className="text-sm text-gray-500">{titleEn}</p>}
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div className="container mx-auto px-4 py-8 space-y-8">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
