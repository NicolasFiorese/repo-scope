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
});
