import {
  expect,
  test,
} from "@playwright/test";

test.describe("Repository search", () => {
  test("searches repositories and displays results", async ({
    page,
  }) => {
    await page.route(
      "https://api.github.com/search/repositories**",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify({
            total_count: 2,
            incomplete_results: false,
            items: [
              {
                id: 1,
                name: "next.js",
                full_name:
                  "vercel/next.js",
                html_url:
                  "https://github.com/vercel/next.js",
                description:
                  "The React Framework for the Web",
                language:
                  "JavaScript",
                stargazers_count:
                  130000,
                updated_at:
                  "2026-10-15T10:00:00Z",
              },
              {
                id: 2,
                name: "turborepo",
                full_name:
                  "vercel/turborepo",
                html_url:
                  "https://github.com/vercel/turborepo",
                description:
                  "Incremental bundler and build system",
                language:
                  "Rust",
                stargazers_count:
                  29000,
                updated_at:
                  "2026-10-14T10:00:00Z",
              },
            ],
          }),
        });
      }
    );

    await page.goto("/");

    const searchInput =
      page.getByRole(
        "searchbox",
        {
          name: "Search repositories",
        }
      );

    await searchInput.fill(
      "vercel"
    );

    await page
      .getByRole("button", {
        name: "Search repositories",
      })
      .click();

    await expect(
      page.getByRole(
        "heading",
        {
          name: "Repositories",
        }
      )
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

    await expect(
      page.getByText(
        /Showing 1–2 of 2/i
      )
    ).toBeVisible();
  });

  test("displays an error state when the API fails", async ({
    page,
  }) => {
    await page.route(
      "**/search/repositories**",
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType:
            "application/json",
          body: JSON.stringify({
            message:
              "Internal Server Error",
          }),
        });
      }
    );

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

    const errorAlert =
     page
      .getByRole("alert")
       .filter({
         hasText:
         "Something went wrong.",
    });

    await expect(
      errorAlert
    ).toBeVisible();

    await expect(
      errorAlert
    ).toContainText(
      "Something went wrong."
    );

    await expect(
      errorAlert
    ).toContainText(
      "We couldn't load repositories. Please try again."
    );
  });
});