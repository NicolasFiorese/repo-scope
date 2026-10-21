"use client";

import { useState } from "react";

import { Pagination } from "@/components/pagination";
import { RepositoryCard } from "@/components/repository-card";
import { SortControl } from "@/components/sort-control";

import type { GitHubRepository, SortOption } from "@/types/github";

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
  onRetry: () => void;
}

const PER_PAGE = 12;
const INITIAL_VISIBLE = 6;

function RepositoryCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="
        skeleton-shimmer
        min-h-[220px]
        animate-pulse
        rounded-[20px]
        border
        border-white/[0.13]
        bg-white/[0.055]
        p-5
        backdrop-blur-[1px]

        sm:min-h-[230px]
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            h-14
            w-14
            rounded-full
            bg-white/[0.09]
          "
        />

        <div
          className="
            h-3
            w-8
            rounded-full
            bg-white/[0.08]
          "
        />
      </div>

      <div
        className="
          mt-6
          h-4
          w-2/3
          rounded-full
          bg-white/[0.10]
        "
      />

      <div
        className="
          mt-4
          h-3
          w-full
          rounded-full
          bg-white/[0.07]
        "
      />

      <div
        className="
          mt-2
          h-3
          w-4/5
          rounded-full
          bg-white/[0.07]
        "
      />

      <div
        className="
          mt-8
          border-t
          border-dashed
          border-white/[0.10]
          pt-4
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              h-3
              w-16
              rounded-full
              bg-white/[0.07]
            "
          />

          <div
            className="
              h-3
              w-12
              rounded-full
              bg-white/[0.07]
            "
          />

          <div
            className="
              h-3
              w-20
              rounded-full
              bg-white/[0.07]
            "
          />
        </div>
      </div>
    </div>
  );
}

function RetryButton({ onRetry }: { onRetry: () => void }) {
  return (
    <button
      type="button"
      onClick={onRetry}
      className="
        cursor-pointer
        rounded-full
        border
        border-[rgb(255_184_172_/_45%)]
        bg-white/[0.06]
        px-4
        py-2
        font-[family-name:var(--font-jetbrains-mono)]
        text-[11px]
        font-medium
        text-[var(--coral-100)]
        transition
        duration-200

        hover:-translate-y-px
        hover:border-[var(--coral-300)]
        hover:bg-white/[0.10]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--coral-300)]
      "
    >
      Try again
    </button>
  );
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
  onRetry,
}: RepositorySectionProps) {
  const [expandedResultsKey, setExpandedResultsKey] = useState<string | null>(
    null
  );

  const resultsKey = `${page}-${sort}-${repositories
    .map((repository) => repository.id)
    .join("-")}`;

  const showAll = expandedResultsKey === resultsKey;

  if (!hasSearched) {
    return null;
  }

  const hasRepositories = repositories.length > 0;

  const maxResults = Math.min(totalCount, 1000);

  const totalPages = Math.ceil(maxResults / PER_PAGE);

  const firstResult = (page - 1) * PER_PAGE + 1;

  const lastResult = Math.min(
    firstResult + repositories.length - 1,
    maxResults
  );

  const visibleRepositories = showAll
    ? repositories
    : repositories.slice(0, INITIAL_VISIBLE);

  const hiddenCount = Math.max(repositories.length - INITIAL_VISIBLE, 0);

  function handleSortChange(value: SortOption) {
    setExpandedResultsKey(null);
    onSortChange(value);
  }

  function handlePageChange(newPage: number) {
    setExpandedResultsKey(null);
    onPageChange(newPage);
  }

  function handleToggleCards() {
    setExpandedResultsKey((current) =>
      current === resultsKey ? null : resultsKey
    );
  }

  return (
    <section
      aria-labelledby="repositories-heading"
      aria-busy={loading}
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-[1184px]
        px-4
        pb-12

        sm:px-6
        sm:pb-16

        lg:pb-20
      "
    >
      <div
        className="
          rounded-[28px]
          border
          border-white/[0.13]
          bg-white/[0.035]
          p-4
          shadow-[0_30px_80px_-40px_rgba(0,40,140,0.55)]
          backdrop-blur-[2px]

          sm:p-6
          lg:p-7
        "
      >
        {/* Header */}
        <div
          className="
            mb-6
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-start
            lg:justify-between
            lg:gap-8
          "
        >
          <div>
            <h2
              id="repositories-heading"
              className="
                text-[20px]
                font-medium
                tracking-[-0.02em]
                text-[var(--coral-100)]
              "
            >
              Repositories
            </h2>

            {!loading && hasRepositories && (
              <p
                aria-live="polite"
                className="
                  mt-1
                  text-[13px]
                  text-[var(--ink-3)]
                "
              >
                Showing {firstResult}–{lastResult} of{" "}
                {totalCount.toLocaleString("en-US")}
                {totalCount > 1000 && <> · GitHub lists the first 1,000</>}
              </p>
            )}

            {loading && (
              <p
                role="status"
                aria-live="polite"
                className="
                  mt-1
                  text-[13px]
                  text-[var(--ink-3)]
                "
              >
                Loading repositories...
              </p>
            )}
          </div>

          <div className="w-full lg:w-auto">
            <SortControl value={sort} onChange={handleSortChange} />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <>
            <div
              className="
                grid
                grid-cols-1
                gap-4

                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {Array.from({
                length: INITIAL_VISIBLE,
              }).map((_, index) => (
                <RepositoryCardSkeleton key={index} />
              ))}
            </div>

            <div
              aria-hidden="true"
              className="
                mt-4
                h-[42px]
                w-full
                animate-pulse
                rounded-[14px]
                border
                border-dashed
                border-white/[0.10]
                bg-white/[0.025]
              "
            />

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                disabled
                onPageChange={handlePageChange}
              />
            )}

            <p
              aria-hidden="true"
              className="
                mt-3
                hidden
                text-center
                font-[family-name:var(--font-jetbrains-mono)]
                text-[11px]
                text-transparent

                lg:block
              "
            >
              Tip: use ← → to change pages, / to search.
            </p>
          </>
        )}

        {/* Non-destructive error */}
        {!loading && error && hasRepositories && (
          <div
            role="alert"
            className="
              mb-4
              flex
              flex-col
              gap-3
              rounded-[14px]
              border
              border-[rgb(255_184_172_/_35%)]
              bg-[rgb(196_64_46_/_12%)]
              px-4
              py-3
              text-left

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[14px]
                  font-medium
                  text-[var(--coral-100)]
                "
              >
                Something went wrong.
              </p>

              <p
                className="
                  mt-1
                  text-[13px]
                  text-[var(--ink-2)]
                "
              >
                {error}
              </p>
            </div>

            <div className="shrink-0">
              <RetryButton onRetry={onRetry} />
            </div>
          </div>
        )}

        {/* Full error state */}
        {!loading && error && !hasRepositories && (
          <div
            role="alert"
            className="
              flex
              min-h-[480px]
              flex-col
              items-center
              justify-center
              text-center

              sm:min-h-[520px]
              lg:min-h-[560px]
            "
          >
            <p
              className="
                text-[17px]
                font-medium
                text-[var(--ink-1)]
              "
            >
              Something went wrong.
            </p>

            <p
              className="
                mt-2
                max-w-[460px]
                text-[14px]
                text-[var(--ink-3)]
              "
            >
              {error}
            </p>

            <div className="mt-5">
              <RetryButton onRetry={onRetry} />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && !hasRepositories && (
          <div
            role="status"
            className="
              flex
              min-h-[480px]
              flex-col
              items-center
              justify-center
              text-center

              sm:min-h-[520px]
              lg:min-h-[560px]
            "
          >
            <p
              className="
                text-[17px]
                font-medium
                text-[var(--ink-1)]
              "
            >
              No repositories found.
            </p>

            <p
              className="
                mt-2
                text-[14px]
                text-[var(--ink-3)]
              "
            >
              Try a different search.
            </p>
          </div>
        )}

        {/* Repository results */}
        {!loading && hasRepositories && (
          <>
            <div
              className="
                grid
                grid-cols-1
                gap-4

                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {visibleRepositories.map((repository, index) => (
                <RepositoryCard
                  key={repository.id}
                  repository={repository}
                  rank={(page - 1) * PER_PAGE + index + 1}
                  animationIndex={index}
                />
              ))}
            </div>

            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={handleToggleCards}
                className="
                  mt-4
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-[14px]
                  border
                  border-dashed
                  border-[var(--line-2)]
                  bg-transparent
                  px-4
                  py-3
                  font-[family-name:var(--font-jetbrains-mono)]
                  text-[11px]
                  font-medium
                  text-[var(--ink-3)]
                  transition
                  duration-200

                  hover:border-[rgb(255_184_172_/_55%)]
                  hover:bg-white/[0.04]
                  hover:text-[var(--coral-100)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--coral-300)]

                  sm:text-[12px]
                "
              >
                {showAll
                  ? "Show fewer cards"
                  : `${hiddenCount} more cards (12 per page)`}
              </button>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              disabled={loading}
              onPageChange={handlePageChange}
            />

            <p
              className="
                mt-3
                hidden
                text-center
                font-[family-name:var(--font-jetbrains-mono)]
                text-[11px]
                text-[var(--ink-3)]

                lg:block
              "
            >
              Tip: use ← → to change pages, / to search.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
