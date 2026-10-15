interface PaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

function getVisiblePages(
  page: number,
  totalPages: number
) {
  if (totalPages <= 6) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (page <= 4) {
    return [
      1,
      2,
      3,
      4,
      "...",
      totalPages,
    ];
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

  const visiblePages =
    getVisiblePages(
      page,
      totalPages
    );

  return (
    <nav
      aria-label="Repository results pagination"
      className="
        mt-6
        flex
        items-center
        justify-center
        gap-1

        sm:mt-8
        sm:gap-2
      "
    >
      {/* Previous */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={
          page === 1 || disabled
        }
        onClick={() =>
          onPageChange(page - 1)
        }
        className="
          group
          cursor-pointer
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[var(--line-1)]
          bg-[var(--surface-glass)]
          text-[18px]
          text-[var(--ink-2)]
          transition
          duration-200

          hover:border-[rgb(255_184_172_/_70%)]
          hover:text-[var(--coral-100)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--coral-300)]

          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        <span
          aria-hidden="true"
          className="
            transition-transform
            duration-200
            group-hover:-translate-x-0.5
            group-disabled:translate-x-0
          "
        >
          ‹
        </span>
      </button>

      {/* Pages */}
      <div
        className="
          flex
          min-w-0
          items-center
          rounded-full
          border
          border-[var(--line-1)]
          bg-[var(--surface-deep)]
          p-1
          backdrop-blur-md
        "
      >
        {visiblePages.map(
          (item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="
                    flex
                    h-9
                    min-w-7
                    items-center
                    justify-center
                    px-0.5
                    font-[family-name:var(--font-jetbrains-mono)]
                    text-[11px]
                    text-[var(--ink-3)]

                    sm:h-8
                    sm:min-w-8
                    sm:px-1
                    sm:text-[12px]
                  "
                >
                  …
                </span>
              );
            }

            const pageNumber =
              Number(item);

            const isCurrent =
              pageNumber === page;

            return (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Go to page ${pageNumber}`}
                aria-current={
                  isCurrent
                    ? "page"
                    : undefined
                }
                disabled={disabled}
                onClick={() =>
                  onPageChange(
                    pageNumber
                  )
                }
                className={`
                  cursor-pointer
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-full
                  px-1
                  font-[family-name:var(--font-jetbrains-mono)]
                  text-[11px]
                  font-medium
                  transition
                  duration-200

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--coral-300)]

                  disabled:cursor-not-allowed

                  sm:h-8
                  sm:min-w-8
                  sm:px-2
                  sm:text-[12px]

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
          }
        )}
      </div>

      {/* Next */}
      <button
        type="button"
        aria-label="Next page"
        disabled={
          page === totalPages ||
          disabled
        }
        onClick={() =>
          onPageChange(page + 1)
        }
        className="
          group
          cursor-pointer
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[var(--line-1)]
          bg-[var(--surface-glass)]
          text-[18px]
          text-[var(--ink-2)]
          transition
          duration-200

          hover:border-[rgb(255_184_172_/_70%)]
          hover:text-[var(--coral-100)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--coral-300)]

          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        <span
          aria-hidden="true"
          className="
            transition-transform
            duration-200
            group-hover:translate-x-0.5
            group-disabled:translate-x-0
          "
        >
          ›
        </span>
      </button>
    </nav>
  );
}