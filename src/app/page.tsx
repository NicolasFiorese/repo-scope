"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RepositorySection } from "@/components/repository-section";

import {
  GitHubApiError,
  searchRepositories,
} from "@/lib/github";

import type {
  GitHubRepository,
  SortOption,
} from "@/types/github";

const PER_PAGE = 12;

export default function Home() {
  // What is currently written in the search input.
  const [query, setQuery] =
    useState("");

  // The query that actually generated
  // the repositories currently displayed.
  const [
    activeQuery,
    setActiveQuery,
  ] = useState("");

  const [
    repositories,
    setRepositories,
  ] = useState<GitHubRepository[]>([]);

  const [
    totalCount,
    setTotalCount,
  ] = useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [
    hasSearched,
    setHasSearched,
  ] = useState(false);

  const [page, setPage] =
    useState(1);

  const [sort, setSort] =
    useState<SortOption>(
      "best-match"
    );

  const loadRepositories =
    useCallback(
      async (
        targetPage: number,
        targetSort: SortOption,
        searchQuery: string
      ) => {
        const trimmedQuery =
          searchQuery.trim();

        if (!trimmedQuery) {
          return;
        }

        try {
          setLoading(true);
          setError(null);
          setHasSearched(true);

          const data =
            await searchRepositories({
              query: trimmedQuery,
              page: targetPage,
              perPage: PER_PAGE,
              sort: targetSort,
            });

          setRepositories(
            data.items
          );

          setTotalCount(
            data.total_count
          );

          /*
           * Result-related state is only
           * updated after a successful
           * repository request.
           */
          setActiveQuery(
            trimmedQuery
          );

          setPage(targetPage);
          setSort(targetSort);
        } catch (error) {
          setRepositories([]);
          setTotalCount(0);

          if (
            error instanceof
              GitHubApiError &&
            error.message ===
              "GitHub rate limit reached."
          ) {
            if (error.retryAt) {
              const retryDate =
                new Date(
                  error.retryAt *
                    1000
                );

              setError(
                `GitHub rate limit reached. Try again after ${retryDate.toLocaleTimeString()}.`
              );
            } else {
              setError(
                "GitHub rate limit reached. Please wait a moment and try again."
              );
            }

            return;
          }

          setError(
            "We couldn't load repositories. Please try again."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  const handleSearch =
    useCallback(() => {
      void loadRepositories(
        1,
        sort,
        query
      );
    }, [
      loadRepositories,
      query,
      sort,
    ]);

  const handleSuggestionSearch =
    useCallback(
      (
        suggestion: string
      ) => {
        setQuery(suggestion);

        void loadRepositories(
          1,
          sort,
          suggestion
        );
      },
      [
        loadRepositories,
        sort,
      ]
    );

  /*
   * GitHub does not provide an official
   * "Trending" REST endpoint.
   *
   * I approximate trending repositories
   * by looking for repositories created
   * during the last 30 days with more
   * than 100 stars, sorted by stars.
   */
  const handleTrending =
    useCallback(() => {
      const date =
        new Date();

      date.setDate(
        date.getDate() - 30
      );

      const since = date
        .toISOString()
        .slice(0, 10);

      const trendingQuery =
        `created:>${since} stars:>100`;

      setQuery(trendingQuery);

      void loadRepositories(
        1,
        "stars",
        trendingQuery
      );
    }, [loadRepositories]);

  const handleSortChange =
    useCallback(
      (
        newSort: SortOption
      ) => {
        if (!activeQuery) {
          return;
        }

        void loadRepositories(
          1,
          newSort,
          activeQuery
        );
      },
      [
        activeQuery,
        loadRepositories,
      ]
    );

  const handlePageChange =
    useCallback(
      (
        newPage: number
      ) => {
        if (!activeQuery) {
          return;
        }

        void loadRepositories(
          newPage,
          sort,
          activeQuery
        );
      },
      [
        activeQuery,
        loadRepositories,
        sort,
      ]
    );

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      const target =
        event.target;

      const isInteractive =
        target instanceof
          HTMLElement &&
        (target.tagName ===
          "INPUT" ||
          target.tagName ===
            "TEXTAREA" ||
          target.tagName ===
            "SELECT" ||
          target.tagName ===
            "BUTTON" ||
          target.tagName ===
            "A" ||
          target.isContentEditable);

      // "/" focuses the search field.
      if (
        event.key === "/" &&
        !isInteractive
      ) {
        event.preventDefault();

        const searchInput =
          document.getElementById(
            "repository-search"
          );

        searchInput?.focus();

        return;
      }

      // Do not override controls.
      if (
        isInteractive ||
        !hasSearched ||
        loading
      ) {
        return;
      }

      const maxResults =
        Math.min(
          totalCount,
          1000
        );

      const totalPages =
        Math.ceil(
          maxResults /
            PER_PAGE
        );

      if (
        event.key ===
          "ArrowLeft" &&
        page > 1
      ) {
        event.preventDefault();

        handlePageChange(
          page - 1
        );
      }

      if (
        event.key ===
          "ArrowRight" &&
        page < totalPages
      ) {
        event.preventDefault();

        handlePageChange(
          page + 1
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    page,
    totalCount,
    hasSearched,
    loading,
    handlePageChange,
  ]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative rays */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-0
          h-screen
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            -top-[90px]

            h-[900px]
            w-[1250px]

            max-w-none
            -translate-x-1/2

            bg-[url('/rays.svg')]
            bg-contain
            bg-center
            bg-no-repeat

            opacity-[0.6]

            sm:-top-[120px]
            sm:h-[1080px]
            sm:w-[1550px]
            sm:opacity-[0.7]

            lg:-top-[150px]
            lg:h-[1220px]
            lg:w-[1850px]
            lg:opacity-[0.78]
          "
        />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          onTrending={
            handleTrending
          }
        />

        <main className="flex-1">
          <Hero
            query={query}
            activeQuery={
              activeQuery
            }
            totalCount={
              totalCount
            }
            page={page}
            onQueryChange={
              setQuery
            }
            onSearch={
              handleSearch
            }
            onSuggestionSearch={
              handleSuggestionSearch
            }
          />

          <RepositorySection
            repositories={
              repositories
            }
            totalCount={
              totalCount
            }
            loading={
              loading
            }
            error={error}
            hasSearched={
              hasSearched
            }
            page={page}
            sort={sort}
            onSortChange={
              handleSortChange
            }
            onPageChange={
              handlePageChange
            }
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}