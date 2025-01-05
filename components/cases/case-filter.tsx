interface CaseFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CaseFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CaseFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full transition-all ${
            activeCategory === category
              ? "bg-primary text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}