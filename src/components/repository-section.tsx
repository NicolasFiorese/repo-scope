"use client";

import { useState } from "react";

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

const PER_PAGE = 12;
const INITIAL_VISIBLE = 6;

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
  const [expandedResultsKey, setExpandedResultsKey] =
    useState<string | null>(null);

  const resultsKey = `${page}-${sort}-${repositories
    .map((repository) => repository.id)
    .join("-")}`;

  const showAll =
    expandedResultsKey === resultsKey;

  if (!hasSearched) {
    return null;
  }

  const maxResults = Math.min(
    totalCount,
    1000
  );

  const totalPages = Math.ceil(
    maxResults / PER_PAGE
  );

  const firstResult =
    (page - 1) * PER_PAGE + 1;

  const lastResult = Math.min(
    firstResult +
      repositories.length -
      1,
    maxResults
  );

  const visibleRepositories = showAll
    ? repositories
    : repositories.slice(
        0,
        INITIAL_VISIBLE
      );

  const hiddenCount = Math.max(
    repositories.length -
      INITIAL_VISIBLE,
    0
  );

  function handleSortChange(
    value: SortOption
  ) {
    setExpandedResultsKey(null);
    onSortChange(value);
  }

  function handlePageChange(
    newPage: number
  ) {
    setExpandedResultsKey(null);
    onPageChange(newPage);
  }

  function handleToggleCards() {
    setExpandedResultsKey(
      (current) =>
        current === resultsKey
          ? null
          : resultsKey
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

            {!loading && !error && (
              <p
                aria-live="polite"
                className="
                  mt-1
                  text-[13px]
                  text-[var(--ink-3)]
                "
              >
                Showing {firstResult}–
                {lastResult} of{" "}
                {totalCount.toLocaleString(
                  "en-US"
                )}

                {totalCount > 1000 && (
                  <>
                    {" "}
                    · GitHub lists the first
                    1,000
                  </>
                )}
              </p>
            )}
          </div>

          <div className="w-full lg:w-auto">
            <SortControl
              value={sort}
              onChange={
                handleSortChange
              }
            />
          </div>
        </div>

        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="
              flex
              min-h-[280px]
              items-center
              justify-center
              text-[15px]
              text-[var(--ink-2)]

              sm:min-h-[320px]
            "
          >
            Loading repositories...
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="
              flex
              min-h-[280px]
              flex-col
              items-center
              justify-center
              text-center

              sm:min-h-[320px]
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
                text-[14px]
                text-[var(--ink-3)]
              "
            >
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          repositories.length === 0 && (
            <div
              role="status"
              className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                text-center

                sm:min-h-[320px]
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

        {!loading &&
          !error &&
          repositories.length > 0 && (
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
                {visibleRepositories.map(
                  (
                    repository,
                    index
                  ) => (
                    <RepositoryCard
                      key={
                        repository.id
                      }
                      repository={
                        repository
                      }
                      rank={
                        (page - 1) *
                          PER_PAGE +
                        index +
                        1
                      }
                    />
                  )
                )}
              </div>

              {hiddenCount > 0 && (
               <button
  type="button"
  onClick={
    handleToggleCards
  }
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
                totalPages={
                  totalPages
                }
                disabled={loading}
                onPageChange={
                  handlePageChange
                }
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
                Tip: use ← → to change
                pages, / to search.
              </p>
            </>
          )}
      </div>
    </section>
  );
}