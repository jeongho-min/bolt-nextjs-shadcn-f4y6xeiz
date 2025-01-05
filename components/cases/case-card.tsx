interface CaseCardProps {
  category: string;
  title: string;
  description: string;
  date: string;
}

export function CaseCard({ category, title, description, date }: CaseCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-primary font-medium">{category}</span>
        <time className="text-sm text-gray-400">{date}</time>
      </div>
      <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
    </div>
  );
}