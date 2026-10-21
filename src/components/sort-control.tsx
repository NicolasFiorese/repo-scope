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

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div
      className="
        flex
        w-full
        items-center
        rounded-full
        border
        border-[var(--line-1)]
        bg-[var(--surface-deep)]
        p-1
        backdrop-blur-md

        lg:w-auto
      "
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`
              cursor-pointer
              flex-1
              whitespace-nowrap
              rounded-full
              px-2
              py-2
              text-[11px]
              font-medium
              leading-none
              transition-all
              duration-200

              sm:px-4
              sm:text-[12px]

              lg:flex-none
              lg:text-[13px]

              ${
                isActive
                  ? `
                    bg-[var(--coral-400)]
                    text-[var(--blue-950)]
                    shadow-[0_4px_14px_-5px_rgba(196,64,46,0.4)]
                  `
                  : `
                    text-[var(--ink-2)]
                    hover:bg-white/10
                    hover:text-[var(--coral-100)]
                  `
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
