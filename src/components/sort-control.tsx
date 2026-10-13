import type { SortOption } from "@/types/github";

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: {
  label: string;
  value: SortOption;
}[] = [
  {
    label: "Best match",
    value: "best-match",
  },
  {
    label: "Most stars",
    value: "stars",
  },
  {
    label: "Recently updated",
    value: "updated",
  },
];

export function SortControl({
  value,
  onChange,
}: SortControlProps) {
  return (
    <div className="flex items-center rounded-full bg-white/5 p-1">
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 text-xs transition ${
              isActive
                ? "bg-[#ffb5aa] font-medium text-blue-700"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}