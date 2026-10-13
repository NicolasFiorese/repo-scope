interface PaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Repository results pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        disabled={page === 1 || disabled}
        onClick={() => onPageChange(page - 1)}
        className="rounded-full border border-white/20 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
      >
        ←
      </button>

      <span className="text-sm text-white/70">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages || disabled}
        onClick={() => onPageChange(page + 1)}
        className="rounded-full border border-white/20 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
      >
        →
      </button>
    </nav>
  );
}