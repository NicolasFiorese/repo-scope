import { SearchField } from "@/components/search-field";

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onSuggestionSearch: (suggestion: string) => void;
}

const suggestions = [
  "vercel",
  "design system",
  "language:rust cli",
  "topic:ai stars:>5000",
];

export function Hero({
  query,
  onQueryChange,
  onSearch,
  onSuggestionSearch,
}: HeroProps) {
  return (
    <section className="relative mx-auto flex w-full max-w-[1184px] flex-col items-center px-6 pb-8 pt-20 text-center">
      <div
  className="
    mb-7 flex items-center gap-2
    rounded-full
    border border-[var(--line-1)]
    bg-[var(--surface-glass)]
    px-3 py-1.5
    backdrop-blur-sm
  "
>
  <span
    aria-hidden="true"
    className="
      h-2 w-2 rounded-full
      bg-[var(--coral-500)]
      shadow-[0_0_10px_rgba(255,129,112,0.65)]
    "
  />

  <span
    className="
      text-[10px]
      font-semibold
      uppercase
      tracking-[0.2em]
      text-[var(--ink-1)]
    "
  >
    Live from the GitHub API
  </span>
</div>

     <h1 className="text-[64px] font-medium leading-[0.98] tracking-[-0.045em]">
  <span className="text-[var(--coral-300)]">
    Find the code
  </span>
  <br />
  <span className="text-[var(--ink-1)]">
    worth starring.
  </span>
</h1>

      <p className="mt-7 max-w-[560px] text-[17px] leading-7 text-white/75">
        Search millions of public repositories. Sort by stars or freshness,
        skim what matters, jump straight to the source.
      </p>

      <div className="mt-10 w-full">
        <SearchField
          query={query}
          onQueryChange={onQueryChange}
          onSearch={onSearch}
        />
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs">
        <span className="text-white/60">Try</span>

        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestionSearch(suggestion)}
            className="rounded-full bg-white/10 px-3 py-1.5 transition hover:bg-white/20"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}