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
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-16 text-center">
      <span className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]">
        Live from the GitHub API
      </span>

      <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
        Find the <span className="text-[#ffb5aa]">code</span>
        <br />
        worth starring.
      </h1>

      <p className="mt-5 max-w-xl text-base text-white/70">
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