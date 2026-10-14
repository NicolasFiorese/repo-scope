"use client";

import { useState } from "react";
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
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("best-match");

  async function loadRepositories(
  targetPage: number,
  targetSort: SortOption,
  searchQuery = query
) {
  const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      setPage(targetPage);
      setSort(targetSort);

      const data = await searchRepositories({
        query: trimmedQuery,
        page: targetPage,
        perPage: PER_PAGE,
        sort: targetSort,
      });

      setRepositories(data.items);
      setTotalCount(data.total_count);
    } catch (error) {
      setRepositories([]);
      setTotalCount(0);

      if (
        error instanceof GitHubApiError &&
        error.message === "GitHub rate limit reached."
      ) {
        if (error.retryAt) {
          const retryDate = new Date(error.retryAt * 1000);

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
  }

  function handleSearch() {
    void loadRepositories(1, sort);
  }

  function handleSuggestionSearch(suggestion: string) {
  setQuery(suggestion);
  void loadRepositories(1, sort, suggestion);
  }

  function handleSortChange(newSort: SortOption) {
    void loadRepositories(1, newSort);
  }

  function handlePageChange(newPage: number) {
    void loadRepositories(newPage, sort);
  }

return (
  <div className="relative min-h-screen overflow-hidden">
    <img
      src="/rays.svg"
      alt=""
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        z-0
        w-[1700px]
        max-w-none
        -translate-x-1/2
        select-none
        opacity-[0.78]
      "
    />

    <div className="relative z-10">
      <Header />

      <main>
       <Hero
  query={query}
  totalCount={totalCount}
  page={page}
  onQueryChange={setQuery}
  onSearch={handleSearch}
  onSuggestionSearch={handleSuggestionSearch}
/>

        <RepositorySection
          repositories={repositories}
          totalCount={totalCount}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          page={page}
          sort={sort}
          onSortChange={handleSortChange}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  </div>
);
}