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

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-[12px]
        w-[12px]
        shrink-0
      "
      fill="currentColor"
    >
      <path d="m12 2.8 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17l-5.56 2.92 1.06-6.2L3 9.33l6.22-.9L12 2.8Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-[12px]
        w-[12px]
        shrink-0
      "
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />

      <path d="M12 8v4l2.5 1.5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-[13px]
        w-[13px]
        shrink-0
      "
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function formatRelativeDate(dateString: string) {
  const updatedDate = new Date(dateString);

  const now = new Date();

  const differenceMs = now.getTime() - updatedDate.getTime();

  if (differenceMs <= 0) {
    return "just now";
  }

  const minutes = Math.floor(differenceMs / (1000 * 60));

  const hours = Math.floor(differenceMs / (1000 * 60 * 60));

  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  const weeks = Math.floor(days / 7);

  const months = Math.floor(days / 30);

  const years = Math.floor(days / 365);

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (days === 1) {
    return "yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  if (weeks < 5) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  if (months === 1) {
    return "last month";
  }

  if (months < 12) {
    return `${months} months ago`;
  }

  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

export function RepositoryCard({ repository, rank }: RepositoryCardProps) {
  const stars = formatCompactNumber(repository.stargazers_count);

  const relativeUpdatedDate = formatRelativeDate(repository.updated_at);

  const [owner, repositoryName] = repository.full_name.split("/");

  return (
    <article
      className="
        group
        relative
        min-h-[190px]
        overflow-hidden
        rounded-[18px]
        border
        border-white/[0.13]
        bg-white/[0.055]
        p-5
        backdrop-blur-[1px]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[rgb(255_129_112_/_45%)]
        hover:bg-white/[0.085]
        hover:shadow-[0_18px_38px_-18px_rgba(0,40,140,0.85)]

        focus-within:ring-2
        focus-within:ring-inset
        focus-within:ring-[var(--coral-300)]
      "
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-36
          w-36
          rounded-full
          bg-[radial-gradient(circle,rgba(255,129,112,0.12)_0%,transparent_68%)]
          opacity-0
          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* Stars / rank */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="
            flex
            h-[56px]
            w-[56px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/10
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

      {/* Repository content */}
      <div className="relative z-10 mt-5 min-w-0">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex
            max-w-full
            items-center
            gap-1
            text-[15px]
            font-medium
            tracking-[-0.01em]
            outline-none
            transition-colors
            [overflow-wrap:anywhere]

            focus-visible:text-[var(--coral-100)]
          "
        >
          <span
            className="
              min-w-0
              text-[var(--ink-2)]
              transition-colors

              group-hover:text-[var(--coral-100)]
            "
          >
            {owner}/
            <span className="text-[var(--coral-200)]">{repositoryName}</span>
          </span>

          <span
            className="
              shrink-0
              text-[var(--coral-300)]
              transition-transform
              duration-200

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          >
            <ExternalLinkIcon />
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

      {/* Metadata */}
      <div
        className="
          relative
          z-10
          mt-5
          flex
          flex-nowrap
          items-center
          gap-x-3
          overflow-hidden
          border-t
          border-dashed
          border-[var(--line-1)]
          pt-4
          font-[family-name:var(--font-jetbrains-mono)]
          text-[10px]
          font-medium
          text-[var(--ink-3)]

          sm:text-[11px]
        "
      >
        {/* Language */}
        <span
          className="
            flex
            min-w-0
            shrink
            items-center
            gap-1.5
            whitespace-nowrap
          "
        >
          <span
            aria-hidden="true"
            className="
              h-2
              w-2
              shrink-0
              rounded-full
            "
            style={{
              backgroundColor: getLanguageColor(repository.language),
            }}
          />

          <span className="truncate">{repository.language ?? "Unknown"}</span>
        </span>

        {/* Stars */}
        <span
          className="
            flex
            shrink-0
            items-center
            gap-1
            whitespace-nowrap
          "
        >
          <span
            aria-hidden="true"
            className="
              text-[var(--coral-300)]
            "
          >
            <StarIcon />
          </span>

          {repository.stargazers_count.toLocaleString("en-US")}
        </span>

        {/* Updated */}
        <time
          dateTime={repository.updated_at}
          className="
            flex
            min-w-0
            shrink
            items-center
            gap-1
            whitespace-nowrap
          "
        >
          <span
            aria-hidden="true"
            className="
              shrink-0
              text-[var(--coral-300)]
            "
          >
            <ClockIcon />
          </span>

          <span className="truncate">Updated {relativeUpdatedDate}</span>
        </time>
      </div>
    </article>
  );
}
