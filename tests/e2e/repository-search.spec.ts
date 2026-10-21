import { expect, test } from "@playwright/test";

function createRepository(id: number, fullName: string) {
  const [owner, name] = fullName.split("/");

  return {
    id,
    name,
    full_name: fullName,
    html_url: `https://github.com/${fullName}`,
    description: `Repository ${name}`,
    language: "TypeScript",
    stargazers_count: 1000 + id,
    updated_at: "2026-10-15T10:00:00Z",
    owner: {
      login: owner,
    },
  };
}

test.describe("Repository search", () => {
  test("searches repositories and displays results", async ({ page }) => {
    await page.route("**/search/repositories**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 2,
          incomplete_results: false,
          items: [
            {
              id: 1,
              name: "next.js",
              full_name: "vercel/next.js",
              html_url: "https://github.com/vercel/next.js",
              description: "The React Framework for the Web",
              language: "JavaScript",
              stargazers_count: 130000,
              updated_at: "2026-10-15T10:00:00Z",
            },
            {
              id: 2,
              name: "turborepo",
              full_name: "vercel/turborepo",
              html_url: "https://github.com/vercel/turborepo",
              description: "Incremental bundler and build system",
              language: "Rust",
              stargazers_count: 29000,
              updated_at: "2026-10-14T10:00:00Z",
            },
          ],
        }),
      });
    });

    await page.goto("/");

    const searchInput = page.getByRole("searchbox", {
      name: "Search repositories",
    });

    await searchInput.fill("vercel");

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Repositories",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: /vercel\/next\.js/i,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: /vercel\/turborepo/i,
      })
    ).toBeVisible();

    await expect(page.getByText(/Showing 1–2 of 2/i)).toBeVisible();
  });

  test("displays an error state when the API fails", async ({ page }) => {
    await page.route("**/search/repositories**", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Internal Server Error",
        }),
      });
    });

    await page.goto("/");

    await page
      .getByRole("searchbox", {
        name: "Search repositories",
      })
      .fill("vercel");

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    const errorAlert = page.getByRole("alert").filter({
      hasText: "Something went wrong.",
    });

    await expect(errorAlert).toBeVisible();

    await expect(errorAlert).toContainText("Something went wrong.");

    await expect(errorAlert).toContainText(
      "We couldn't load repositories. Please try again."
    );
  });

  test("keeps pagination tied to the submitted search instead of the current input value", async ({
    page,
  }) => {
    const requestedQueries: string[] = [];

    await page.route("**/search/repositories**", async (route) => {
      const requestUrl = new URL(route.request().url());

      const query = requestUrl.searchParams.get("q") ?? "";

      const requestedPage = requestUrl.searchParams.get("page") ?? "1";

      requestedQueries.push(query);

      const isSecondPage = requestedPage === "2";

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 24,
          incomplete_results: false,
          items: [
            createRepository(
              isSecondPage ? 13 : 1,
              isSecondPage ? "vercel/page-two" : "vercel/page-one"
            ),
          ],
        }),
      });
    });

    await page.goto("/");

    const searchInput = page.getByRole("searchbox", {
      name: "Search repositories",
    });

    await searchInput.fill("vercel");

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    await expect(
      page.getByRole("link", {
        name: /vercel\/page-one/i,
      })
    ).toBeVisible();

    /*
     * Change the input without
     * submitting another search.
     */
    await searchInput.fill("react");

    /*
     * The visible results still
     * belong to the previous
     * submitted search.
     */
    await expect(
      page.getByRole("link", {
        name: /vercel\/page-one/i,
      })
    ).toBeVisible();

    await page
      .getByRole("button", {
        name: "Go to page 2",
      })
      .click();

    await expect(
      page.getByRole("link", {
        name: /vercel\/page-two/i,
      })
    ).toBeVisible();

    /*
     * Both API calls must use
     * "vercel". "react" was never
     * submitted.
     */
    expect(requestedQueries).toEqual(["vercel", "vercel"]);

    await expect(searchInput).toHaveValue("react");
  });

  test("pagination continues working after the search input is cleared", async ({
    page,
  }) => {
    const requestedQueries: string[] = [];

    await page.route("**/search/repositories**", async (route) => {
      const requestUrl = new URL(route.request().url());

      const query = requestUrl.searchParams.get("q") ?? "";

      const requestedPage = requestUrl.searchParams.get("page") ?? "1";

      requestedQueries.push(query);

      const isSecondPage = requestedPage === "2";

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 24,
          incomplete_results: false,
          items: [
            createRepository(
              isSecondPage ? 13 : 1,
              isSecondPage ? "vercel/page-two" : "vercel/page-one"
            ),
          ],
        }),
      });
    });

    await page.goto("/");

    const searchInput = page.getByRole("searchbox", {
      name: "Search repositories",
    });

    await searchInput.fill("vercel");

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    await expect(
      page.getByRole("link", {
        name: /vercel\/page-one/i,
      })
    ).toBeVisible();

    /*
     * Clearing the input must not
     * clear the active search.
     */
    await searchInput.fill("");

    await page
      .getByRole("button", {
        name: "Go to page 2",
      })
      .click();

    await expect(
      page.getByRole("link", {
        name: /vercel\/page-two/i,
      })
    ).toBeVisible();

    await expect(searchInput).toHaveValue("");

    expect(requestedQueries).toEqual(["vercel", "vercel"]);
  });

  test("activates Trending and uses Most stars sorting", async ({ page }) => {
    const requestedQueries: string[] = [];
    const requestedSorts: Array<string | null> = [];

    await page.route("**/search/repositories**", async (route) => {
      const requestUrl = new URL(route.request().url());

      requestedQueries.push(requestUrl.searchParams.get("q") ?? "");
      requestedSorts.push(requestUrl.searchParams.get("sort"));

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 1,
          incomplete_results: false,
          items: [createRepository(1, "trending/popular-project")],
        }),
      });
    });

    await page.goto("/");

    const searchNavigation = page.getByRole("link", {
      name: "Search",
      exact: true,
    });

    const trendingNavigation = page.getByRole("button", {
      name: "Show trending repositories",
    });

    const mostStarsButton = page.getByRole("button", {
      name: "Most stars",
    });

    await expect(searchNavigation).toHaveAttribute("aria-current", "page");

    await trendingNavigation.click();

    await expect(trendingNavigation).toHaveAttribute("aria-current", "page");

    await expect(searchNavigation).not.toHaveAttribute("aria-current");

    await expect(mostStarsButton).toHaveAttribute("aria-pressed", "true");

    await expect(
      page.getByRole("link", {
        name: /trending\/popular-project/i,
      })
    ).toBeVisible();

    expect(requestedQueries).toHaveLength(1);
    expect(requestedQueries[0]).toContain("created:>");
    expect(requestedQueries[0]).toContain("stars:>100");

    expect(requestedSorts).toEqual(["stars"]);
  });

  test("returns to Search and Best match after searching from Trending", async ({
    page,
  }) => {
    const requests: Array<{
      query: string;
      sort: string | null;
    }> = [];

    await page.route("**/search/repositories**", async (route) => {
      const requestUrl = new URL(route.request().url());

      const query = requestUrl.searchParams.get("q") ?? "";
      const sort = requestUrl.searchParams.get("sort");

      requests.push({
        query,
        sort,
      });

      const isTrending = query.includes("created:>");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 1,
          incomplete_results: false,
          items: [
            createRepository(
              isTrending ? 1 : 2,
              isTrending ? "trending/popular-project" : "facebook/react"
            ),
          ],
        }),
      });
    });

    await page.goto("/");

    const searchNavigation = page.getByRole("link", {
      name: "Search",
      exact: true,
    });

    const trendingNavigation = page.getByRole("button", {
      name: "Show trending repositories",
    });

    const bestMatchButton = page.getByRole("button", {
      name: "Best match",
    });

    const mostStarsButton = page.getByRole("button", {
      name: "Most stars",
    });

    const searchInput = page.getByRole("searchbox", {
      name: "Search repositories",
    });

    await trendingNavigation.click();

    await expect(trendingNavigation).toHaveAttribute("aria-current", "page");

    await expect(mostStarsButton).toHaveAttribute("aria-pressed", "true");

    await searchInput.fill("react");

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    await expect(searchNavigation).toHaveAttribute("aria-current", "page");

    await expect(trendingNavigation).not.toHaveAttribute("aria-current");

    await expect(bestMatchButton).toHaveAttribute("aria-pressed", "true");

    await expect(mostStarsButton).toHaveAttribute("aria-pressed", "false");

    await expect(
      page.getByRole("link", {
        name: /facebook\/react/i,
      })
    ).toBeVisible();

    expect(requests).toHaveLength(2);

    expect(requests[0].query).toContain("created:>");
    expect(requests[0].sort).toBe("stars");

    expect(requests[1].query).toBe("react");

    /*
     * GitHub Best match does not require
     * an explicit "sort" query parameter.
     */
    expect(requests[1].sort).toBeNull();
  });

  test("retries the last failed repository request", async ({ page }) => {
    let requestCount = 0;

    const requests: Array<{
      query: string;
      page: string | null;
      sort: string | null;
    }> = [];

    await page.route("**/search/repositories**", async (route) => {
      requestCount += 1;

      const requestUrl = new URL(route.request().url());

      requests.push({
        query: requestUrl.searchParams.get("q") ?? "",
        page: requestUrl.searchParams.get("page"),
        sort: requestUrl.searchParams.get("sort"),
      });

      /*
       * The first request fails.
       */
      if (requestCount === 1) {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            message: "Internal Server Error",
          }),
        });

        return;
      }

      /*
       * The retry succeeds.
       */
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 1,
          incomplete_results: false,
          items: [createRepository(1, "vercel/recovered-repository")],
        }),
      });
    });

    await page.goto("/");

    const searchInput = page.getByRole("searchbox", {
      name: "Search repositories",
    });

    await searchInput.fill("vercel");

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    const errorAlert = page.getByRole("alert").filter({
      hasText: "Something went wrong.",
    });

    await expect(errorAlert).toBeVisible();

    await expect(errorAlert).toContainText(
      "We couldn't load repositories. Please try again."
    );

    const retryButton = page.getByRole("button", {
      name: "Try again",
    });

    await expect(retryButton).toBeVisible();

    await retryButton.click();

    await expect(
      page.getByRole("link", {
        name: /vercel\/recovered-repository/i,
      })
    ).toBeVisible();

    await expect(errorAlert).not.toBeVisible();

    expect(requestCount).toBe(2);

    /*
     * Retry must repeat the exact
     * failed repository request.
     */
    expect(requests[0]).toEqual(requests[1]);

    expect(requests[1].query).toBe("vercel");
    expect(requests[1].page).toBe("1");
    expect(requests[1].sort).toBeNull();
  });
});
