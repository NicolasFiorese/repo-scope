interface RepositoryCardProps {
  rank: number;
  stars: string;
  name: string;
  description: string;
  language: string;
  updatedAt: string;
}

export function RepositoryCard({
  rank,
  stars,
  name,
  description,
  language,
  updatedAt,
}: RepositoryCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-800/60 px-3 py-2 text-sm font-semibold">
          {stars}
        </span>

        <span className="text-xs text-white/40">
          #{String(rank).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6">
        <a
          href="#"
          className="font-medium text-white hover:underline"
        >
          {name} ↗
        </a>

        <p className="mt-3 min-h-10 text-sm text-white/70">
          {description}
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/55">
          <span>{language}</span>
          <span>★ {stars}</span>
          <span>◷ {updatedAt}</span>
        </div>
      </div>
    </article>
  );
}