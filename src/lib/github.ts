import type { GitHubSearchResponse, SortOption } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

interface SearchRepositoriesParams {
  query: string;
  page?: number;
  perPage?: number;
  sort?: SortOption;
}

export class GitHubApiError extends Error {
  status: number;
  retryAt?: number;

  constructor(message: string, status: number, retryAt?: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
    this.retryAt = retryAt;
  }
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
    const remaining = response.headers.get("x-ratelimit-remaining");

    const resetHeader = response.headers.get("x-ratelimit-reset");

    const retryAt = resetHeader ? Number(resetHeader) : undefined;

    const isRateLimited =
      response.status === 429 || (response.status === 403 && remaining === "0");

    if (isRateLimited) {
      throw new GitHubApiError(
        "GitHub rate limit reached.",
        response.status,
        retryAt
      );
    }

    throw new GitHubApiError(
      `GitHub API error: ${response.status}`,
      response.status
    );
  }

  return response.json();
}
