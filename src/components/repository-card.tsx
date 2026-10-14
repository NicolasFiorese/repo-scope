import type { GitHubRepository } from "@/types/github";
import { formatCompactNumber } from "@/utils/format-number";

interface RepositoryCardProps {
  repository: GitHubRepository;
  rank: number;
}

function getLanguageColor(language: string | null) {
  switch (language?.toLowerCase()) {
    case "javascript":
      return "#F7DF1E";
    case "typescript":
      return "#5FA8FF";
    case "rust":
      return "#FFAA7A";
    case "python":
      return "#FFD166";
    case "go":
      return "#6AD7E5";
    default:
      return "rgba(243, 248, 255, 0.35)";
  }
}

export function RepositoryCard({
  repository,
  rank,
}: RepositoryCardProps) {
  const stars = formatCompactNumber(repository.stargazers_count);

  return (
    <article
      className="
        group
        relative
        min-h-[190px]
        overflow-hidden
        rounded-[18px]
        border border-[var(--line-1)]
        bg-[var(--surface-glass)]
        p-5
        backdrop-blur-[14px]
        transition-all duration-300

        hover:-translate-y-1
        hover:border-[rgb(255_129_112_/_45%)]
        hover:bg-white/[0.075]
        hover:shadow-[0_18px_38px_-18px_rgba(0,40,140,0.85)]

        focus-within:ring-2
        focus-within:ring-inset
        focus-within:ring-[var(--coral-300)]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-10 -top-10
          h-36 w-36
          rounded-full
          bg-[radial-gradient(circle,rgba(255,129,112,0.12)_0%,transparent_68%)]
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

<div className="relative z-10 flex items-start justify-between">
  <div
    className="
      flex h-[56px] w-[56px]
      shrink-0
      items-center justify-center
      rounded-full
      border border-white/10
      bg-[var(--surface-deep)]
      px-1
      font-[family-name:var(--font-jetbrains-mono)]
      text-[13px]
      font-bold
      tracking-[-0.02em]
      text-[var(--ink-1)]
      shadow-[inset_0_1px_6px_rgba(255,255,255,0.08)]
    "
  >
    {stars}
  </div>

        <span
          className="
            font-[family-name:var(--font-jetbrains-mono)]
            text-[11px]
            font-medium
            text-[var(--coral-300)]
          "
        >
          #{String(rank).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 mt-5">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex items-center gap-1
            text-[15px]
            font-medium
            tracking-[-0.01em]
            text-[var(--ink-2)]
            outline-none
            transition-colors
            group-hover:text-[var(--coral-200)]
          "
        >
          {repository.full_name}

          <span
            aria-hidden="true"
            className="
              text-[var(--coral-300)]
              transition-transform duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          >
            ↗
          </span>
        </a>

        <p
          className="
            mt-3
            min-h-[42px]
            line-clamp-2
            text-[13px]
            leading-[1.5]
            text-[var(--ink-2)]
          "
        >
          {repository.description ?? "No description available."}
        </p>
      </div>

      <div
        className="
          relative z-10
          mt-5
          flex flex-wrap items-center gap-x-4 gap-y-2
          border-t border-dashed border-[var(--line-1)]
          pt-4
          font-[family-name:var(--font-jetbrains-mono)]
          text-[11px]
          font-medium
          text-[var(--ink-3)]
        "
      >
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: getLanguageColor(repository.language),
            }}
          />

          {repository.language ?? "Unknown"}
        </span>

        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="text-[var(--coral-300)]"
          >
            ★
          </span>

          {repository.stargazers_count.toLocaleString("en-US")}
        </span>

        <span>
          Updated{" "}
          {new Date(repository.updated_at).toLocaleDateString("en-US")}
        </span>
      </div>
    </article>
  );
}