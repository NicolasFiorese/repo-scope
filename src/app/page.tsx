"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RepositorySection } from "@/components/repository-section";
import { searchRepositories } from "@/lib/github";
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
    targetSort: SortOption
  ) {
    const trimmedQuery = query.trim();

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
    } catch {
      setRepositories([]);
      setTotalCount(0);
      setError("We couldn't load repositories.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    void loadRepositories(1, sort);
  }

  function handleSortChange(newSort: SortOption) {
    void loadRepositories(1, newSort);
  }

  function handlePageChange(newPage: number) {
    void loadRepositories(newPage, sort);
  }

  return (
    <>
      <Header />

      <main>
        <Hero
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
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
    </>
  );
}