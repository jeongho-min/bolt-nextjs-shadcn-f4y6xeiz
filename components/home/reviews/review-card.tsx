import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
}

export function ReviewCard({ title, description, date, category }: Props) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="p-8 w-[360px] h-[280px] bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col h-full">
          <Badge className="w-fit mb-4" variant="secondary">
            {category}
          </Badge>

          <h3 className="text-lg font-semibold mb-3 line-clamp-1">{title}</h3>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-5 flex-1">{description}</p>

          <time className="text-xs text-gray-400 mt-4 block">{format(date, "yyyy년 M월 d일", { locale: ko })}</time>
        </div>
      </Card>
    </motion.div>
  );
}
