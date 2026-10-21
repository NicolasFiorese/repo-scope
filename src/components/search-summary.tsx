import { formatCompactNumber } from "@/utils/format-number";

interface SearchSummaryProps {
  activeQuery: string;
  totalCount: number;
  page: number;
}

export function SearchSummary({
  activeQuery,
  totalCount,
  page,
}: SearchSummaryProps) {
  if (!activeQuery || totalCount === 0) {
    return null;
  }

  const maxResults = Math.min(totalCount, 1000);

  const totalPages = Math.ceil(maxResults / 12);

  return (
    <div
      className="
        mt-6
        flex
        items-center
        gap-2
        rounded-full
        border
        border-[var(--line-1)]
        bg-[var(--surface-deep)]
        px-4
        py-2
        text-[13px]
        backdrop-blur-md
      "
    >
      <span aria-hidden="true" className="text-[var(--coral-300)]">
        ★
      </span>

      <span className="font-medium text-[var(--coral-100)]">{activeQuery}</span>

      <span
        className="
          font-[family-name:var(--font-jetbrains-mono)]
          text-[var(--ink-3)]
        "
      >
        ·
      </span>

      <span
        className="
          font-[family-name:var(--font-jetbrains-mono)]
          font-medium
          text-[var(--ink-2)]
        "
      >
        {formatCompactNumber(totalCount)} repos
      </span>

      <span
        className="
          font-[family-name:var(--font-jetbrains-mono)]
          text-[var(--ink-3)]
        "
      >
        ·
      </span>

      <span
        className="
          font-[family-name:var(--font-jetbrains-mono)]
          font-medium
          text-[var(--ink-2)]
        "
      >
        page {page} of {totalPages}
      </span>
    </div>
  );
}
