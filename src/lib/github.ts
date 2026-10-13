import type {
  GitHubSearchResponse,
  SortOption,
} from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

interface SearchRepositoriesParams {
  query: string;
  page?: number;
  perPage?: number;
  sort?: SortOption;
}

export async function searchRepositories({
  query,
  page = 1,
  perPage = 12,
  sort = "best-match",
}: SearchRepositoriesParams): Promise<GitHubSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    per_page: String(perPage),
  });

  if (sort !== "best-match") {
    params.set("sort", sort);
    params.set("order", "desc");
  }

  const response = await fetch(
    `${GITHUB_API_URL}/search/repositories?${params.toString()}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}