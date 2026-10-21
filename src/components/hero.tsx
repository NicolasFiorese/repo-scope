import { SearchField } from "@/components/search-field";
import { SearchSummary } from "@/components/search-summary";

interface HeroProps {
  query: string;
  activeQuery: string;
  totalCount: number;
  page: number;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onSuggestionSearch: (
    suggestion: string
  ) => void;
}

const suggestions = [
  "vercel",
  "design system",
  "language:rust cli",
  "topic:ai stars:>5000",
];

export function Hero({
  query,
  activeQuery,
  totalCount,
  page,
  onQueryChange,
  onSearch,
  onSuggestionSearch,
}: HeroProps) {
  return (
    <section
      className="
        relative
        mx-auto
        flex
        w-full
        max-w-[1184px]
        flex-col
        items-center
        px-4
        pb-8
        pt-12
        text-center

        sm:px-6
        sm:pt-16

        lg:pt-20
      "
    >
      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          rounded-full
          border
          border-[var(--line-1)]
          bg-[var(--surface-glass)]
          px-3
          py-1.5
          backdrop-blur-sm

          sm:mb-6
          lg:mb-7
        "
      >
        <span
          aria-hidden="true"
          className="
            h-2
            w-2
            rounded-full
            bg-[var(--coral-500)]
            shadow-[0_0_10px_rgba(255,129,112,0.65)]
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[var(--ink-1)]

            sm:text-[10px]
            sm:tracking-[0.2em]
          "
        >
          Live from the GitHub API
        </span>
      </div>

      <h1
        className="
          max-w-[760px]
          text-[clamp(44px,10vw,76px)]
          font-medium
          leading-[0.98]
          tracking-[-0.045em]

          sm:leading-[1]

          lg:leading-[1.02]
          lg:tracking-[-0.035em]
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
          mt-5
          max-w-[532px]
          px-1
          text-[16px]
          leading-[1.5]
          text-[var(--ink-2)]

          sm:mt-6
          sm:text-[17px]

          lg:mt-7
          lg:text-[19px]
        "
      >
        Search millions of public repositories.
        Sort by stars or freshness, skim what
        matters, jump straight to the source.
      </p>

      <div
        className="
          mt-7
          w-full

          sm:mt-8
          lg:mt-10
        "
      >
        <SearchField
          query={query}
          onQueryChange={
            onQueryChange
          }
          onSearch={onSearch}
        />
      </div>

      <div
        className="
          mt-4
          flex
          max-w-[680px]
          flex-wrap
          items-center
          justify-center
          gap-2
          text-[12px]

          sm:mt-5
          sm:text-[13px]
        "
      >
        <span
          className="
            leading-none
            text-[var(--ink-3)]
          "
        >
          Try
        </span>

        {suggestions.map(
          (suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() =>
                onSuggestionSearch(
                  suggestion
                )
              }
              className="
                cursor-pointer
                rounded-full
                border
                border-[var(--line-1)]
                bg-transparent
                px-3
                py-1.5
                leading-none
                text-[var(--ink-2)]
                transition
                duration-200

                hover:-translate-y-px
                hover:border-[var(--coral-300)]
                hover:bg-white/[0.08]
                hover:text-[var(--coral-100)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--coral-300)]
              "
            >
              {suggestion}
            </button>
          )
        )}
      </div>

      <SearchSummary
        activeQuery={
          activeQuery
        }
        totalCount={
          totalCount
        }
        page={page}
      />
    </section>
  );
}