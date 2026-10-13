import { Pagination } from "@/components/pagination";
import { RepositoryCard } from "@/components/repository-card";
import { SortControl } from "@/components/sort-control";
import type {
  GitHubRepository,
  SortOption,
} from "@/types/github";

interface RepositorySectionProps {
  repositories: GitHubRepository[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  page: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  onPageChange: (page: number) => void;
}

export function RepositorySection({
  repositories,
  totalCount,
  loading,
  error,
  hasSearched,
  page,
  sort,
  onSortChange,
  onPageChange,
}: RepositorySectionProps) {
  const maxResults = Math.min(totalCount, 1000);
  const totalPages = Math.ceil(maxResults / 12);

  if (!hasSearched) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">
              Repositories
            </h2>

            {!loading && !error && (
              <p className="mt-1 text-xs text-white/55">
                {totalCount.toLocaleString("en-US")} repositories found
              </p>
            )}
          </div>

          <SortControl
            value={sort}
            onChange={onSortChange}
          />
        </div>

        {loading && (
          <div className="py-16 text-center text-white/70">
            Loading repositories...
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="py-16 text-center"
          >
            <p className="font-medium">
              Something went wrong.
            </p>

            <p className="mt-2 text-sm text-white/60">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          repositories.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-medium">
                No repositories found.
              </p>

              <p className="mt-2 text-sm text-white/60">
                Try a different search.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          repositories.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {repositories.map((repository, index) => (
                  <RepositoryCard
                    key={repository.id}
                    repository={repository}
                    rank={(page - 1) * 12 + index + 1}
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                disabled={loading}
                onPageChange={onPageChange}
              />
            </>
          )}
      </div>
    </section>
  );
}