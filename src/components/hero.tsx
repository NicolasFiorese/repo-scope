import { SearchField } from "@/components/search-field";
import { SearchSummary } from "@/components/search-summary";

interface HeroProps {
  query: string;
  totalCount: number;
  page: number;
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
  totalCount,
  page,
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

      <h1
        className="
          text-[76px]
          font-medium
          leading-[1.02]
          tracking-[-0.035em]
        "
      >
        <span className="text-[var(--coral-300)]">
          Find the code
        </span>

        <br />

        <span className="text-[var(--ink-1)]">
          worth starring.
        </span>
      </h1>

      <p
        className="
          mt-7
          max-w-[532px]
          text-[19px]
          font-normal
          leading-[1.5]
          tracking-normal
          text-[var(--ink-2)]
        "
      >
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

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[13px]">
        <span className="leading-none text-[var(--ink-3)]">
          Try
        </span>

        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestionSearch(suggestion)}
            className="
              rounded-full
              border border-[var(--line-1)]
              bg-transparent
              px-3 py-1.5
              leading-none
              text-[var(--ink-2)]
              transition duration-200
              hover:bg-white/10
              hover:text-[var(--coral-100)]
            "
          >
            {suggestion}
          </button>
        ))}
      </div>

      <SearchSummary
        query={query}
        totalCount={totalCount}
        page={page}
      />
    </section>
  );
}