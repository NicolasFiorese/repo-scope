interface PaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

function getVisiblePages(page: number, totalPages: number) {
  if (totalPages <= 6) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (page <= 4) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    page - 1,
    page,
    page + 1,
    "...",
    totalPages,
  ];
}

export function Pagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(
    page,
    totalPages
  );

  return (
    <nav
      aria-label="Repository results pagination"
      className="mt-8 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1 || disabled}
        onClick={() => onPageChange(page - 1)}
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-[var(--line-1)]
          bg-[var(--surface-glass)]
          text-[18px]
          text-[var(--ink-2)]
          transition duration-200

          hover:border-[rgb(255_184_172_/_70%)]
          hover:text-[var(--coral-100)]

          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        ‹
      </button>

      <div
        className="
          flex items-center
          rounded-full
          border border-[var(--line-1)]
          bg-[var(--surface-deep)]
          p-1
          backdrop-blur-md
        "
      >
        {visiblePages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="
                  flex h-8 min-w-8
                  items-center justify-center
                  px-1
                  font-[family-name:var(--font-jetbrains-mono)]
                  text-[12px]
                  text-[var(--ink-3)]
                "
              >
                …
              </span>
            );
          }

          const pageNumber = Number(item);
          const isCurrent = pageNumber === page;

          return (
            <button
              key={pageNumber}
              type="button"
              aria-current={
                isCurrent ? "page" : undefined
              }
              disabled={disabled}
              onClick={() =>
                onPageChange(pageNumber)
              }
              className={`
                flex h-8 min-w-8
                items-center justify-center
                rounded-full
                px-2
                font-[family-name:var(--font-jetbrains-mono)]
                text-[12px]
                font-medium
                transition duration-200

                ${
                  isCurrent
                    ? `
                      bg-[var(--coral-300)]
                      text-[var(--blue-900)]
                    `
                    : `
                      text-[var(--ink-2)]
                      hover:bg-white/10
                      hover:text-[var(--coral-100)]
                    `
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next page"
        disabled={
          page === totalPages || disabled
        }
        onClick={() => onPageChange(page + 1)}
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-[var(--line-1)]
          bg-[var(--surface-glass)]
          text-[18px]
          text-[var(--ink-2)]
          transition duration-200

          hover:border-[rgb(255_184_172_/_70%)]
          hover:text-[var(--coral-100)]

          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        ›
      </button>
    </nav>
  );
}