interface SearchFieldProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchField({
  query,
  onQueryChange,
  onSearch,
}: SearchFieldProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="relative mx-auto w-full max-w-[680px]"
>
  <label htmlFor="repository-search" className="sr-only">
    Search repositories
  </label>

  <div
    className="
      relative flex h-[66px] w-full items-center gap-3
      rounded-[999px]
      bg-[linear-gradient(90deg,#FFEDEA_0%,#FFD5CD_60%,#FFC8BE_100%)]
      py-[9px] pl-[22px] pr-[9px]
      shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),0_0_18px_rgba(255,220,212,0.33),0_0_70px_-6px_rgba(255,160,145,0.35)]
    "
  >
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center text-[26px] leading-none text-[var(--coral-500)]"
    >
      ⌕
    </span>

    <input
      id="repository-search"
      name="search"
      type="search"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Search repositories..."
      className="
        min-w-0 flex-1
        bg-transparent
        text-[16px] text-[var(--coral-700)]
        outline-none
        placeholder:text-[var(--coral-500)]/60
      "
    />

    <span
      aria-hidden="true"
      className="
        flex h-[26px] w-[26px] shrink-0 items-center justify-center
        rounded-[8px]
        border border-[rgb(255_129_112_/_35%)]
        bg-white/50
        text-sm font-semibold text-[var(--coral-500)]
      "
    >
      /
    </span>

    <button
      type="submit"
      aria-label="Search repositories"
      className="
        flex h-12 w-12 shrink-0 items-center justify-center
        rounded-full
        border border-[rgb(255_129_112_/_35%)]
        bg-[radial-gradient(circle_at_35%_30%,#fff_0%,#FFEDEA_65%,#FFD5CD_100%)]
        text-2xl text-[var(--coral-500)]
        shadow-[0_6px_18px_-6px_rgba(196,64,46,0.45)]
        transition-transform duration-200
        hover:scale-[1.07]
        active:scale-[0.96]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--coral-400)]
      "
    >
      ✦
    </button>
  </div>
</form>
  );
}