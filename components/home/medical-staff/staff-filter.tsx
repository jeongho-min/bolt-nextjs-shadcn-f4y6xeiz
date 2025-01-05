interface StaffFilterProps {
  departments: string[];
  activeDepartment: string;
  onDepartmentChange: (department: string) => void;
}

export function StaffFilter({
  departments,
  activeDepartment,
  onDepartmentChange,
}: StaffFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {departments.map((department) => (
        <button
          key={department}
          onClick={() => onDepartmentChange(department)}
          className={`px-6 py-2 rounded-full transition-all ${
            activeDepartment === department
              ? "bg-primary text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {department}
        </button>
      ))}
    </div>
  );
}