import type { GitHubRepository } from "@/types/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
  rank: number;
}

export function RepositoryCard({
  repository,
  rank,
}: RepositoryCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-800/60 px-3 py-2 text-sm font-semibold">
          {repository.stargazers_count.toLocaleString("en-US")}
        </span>

        <span className="text-xs text-white/40">
          #{String(rank).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-white hover:underline"
        >
          {repository.full_name} ↗
        </a>

        <p className="mt-3 min-h-10 text-sm text-white/70">
          {repository.description ?? "No description available."}
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/55">
          <span>
            {repository.language ?? "Unknown"}
          </span>

          <span>
            ★ {repository.stargazers_count.toLocaleString("en-US")}
          </span>

          <span>
            Updated{" "}
            {new Date(repository.updated_at).toLocaleDateString("en-US")}
          </span>
        </div>
      </div>
    </article>
  );
}