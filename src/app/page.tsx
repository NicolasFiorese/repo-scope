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
  const [query, setQuery] = useState("");

  const [repositories, setRepositories] =
    useState<GitHubRepository[]>([]);

  const [totalCount, setTotalCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [hasSearched, setHasSearched] =
    useState(false);

  const [page, setPage] = useState(1);

  const [sort, setSort] =
    useState<SortOption>("best-match");

  const loadRepositories = useCallback(
    async (
      targetPage: number,
      targetSort: SortOption,
      searchQuery = query
    ) => {
      const trimmedQuery =
        searchQuery.trim();

      if (!trimmedQuery) return;

      try {
        setLoading(true);
        setError(null);
        setHasSearched(true);

        setPage(targetPage);
        setSort(targetSort);

        const data =
          await searchRepositories({
            query: trimmedQuery,
            page: targetPage,
            perPage: PER_PAGE,
            sort: targetSort,
          });

        setRepositories(data.items);
        setTotalCount(
          data.total_count
        );
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
    [query]
  );

  const handleSearch =
    useCallback(() => {
      void loadRepositories(
        1,
        sort
      );
    }, [
      loadRepositories,
      sort,
    ]);

  const handleSuggestionSearch =
    useCallback(
      (suggestion: string) => {
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

  const handleSortChange =
    useCallback(
      (newSort: SortOption) => {
        void loadRepositories(
          1,
          newSort
        );
      },
      [loadRepositories]
    );

  const handlePageChange =
    useCallback(
      (newPage: number) => {
        void loadRepositories(
          newPage,
          sort
        );
      },
      [
        loadRepositories,
        sort,
      ]
    );

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      const target =
        event.target as HTMLElement;

      const isTyping =
        target.tagName ===
          "INPUT" ||
        target.tagName ===
          "TEXTAREA" ||
        target.tagName ===
          "SELECT" ||
        target.isContentEditable;

      // "/" focuses the repository search
      if (
        event.key === "/" &&
        !isTyping
      ) {
        event.preventDefault();

        const searchInput =
          document.getElementById(
            "repository-search"
          );

        searchInput?.focus();

        return;
      }

      // Don't change pages while typing
      if (
        isTyping ||
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
    left-1/2
    top-0
    z-0
    h-[720px]
    w-[1100px]
    max-w-none
    -translate-x-1/2
    bg-[url('/rays.svg')]
    bg-contain
    bg-top
    bg-no-repeat
    opacity-[0.6]

    sm:h-[860px]
    sm:w-[1400px]
    sm:opacity-[0.7]

    lg:h-[1060px]
    lg:w-[1700px]
    lg:opacity-[0.78]
  "
/>

      {/* Page content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <Hero
            query={query}
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