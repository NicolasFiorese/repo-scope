import { SearchField } from "@/components/search-field";

export function Hero() {
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
        <SearchField />
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs">
        <span className="text-white/60">Try</span>

        <button type="button" className="rounded-full bg-white/10 px-3 py-1.5">
          vercel
        </button>

        <button type="button" className="rounded-full bg-white/10 px-3 py-1.5">
          design system
        </button>

        <button type="button" className="rounded-full bg-white/10 px-3 py-1.5">
          language:rust cli
        </button>

        <button type="button" className="rounded-full bg-white/10 px-3 py-1.5">
          topic:ai stars:&gt;5000
        </button>
      </div>
    </section>
  );
}