# repo·scope

A responsive GitHub repository search interface built with Next.js, TypeScript and Tailwind CSS.

🔗 **Live Demo:**  
https://repo-scope-gamma.vercel.app/

---

## About the project

`repo·scope` is a front-end challenge built around the GitHub REST API.

The main goal is to provide a polished interface for searching and exploring public GitHub repositories while reproducing the supplied Figma design as closely as possible.

The application supports repository search, sorting, pagination, responsive layouts, loading and error states, keyboard shortcuts and direct links to GitHub repositories.

---

## Features

- Search public GitHub repositories
- Sort results by:
  - Best match
  - Most stars
  - Recently updated
- Pagination
- Up to 12 repositories per API page
- Initial display of 6 cards with the option to reveal all 12
- Repository information including:
  - Repository name
  - Description
  - Primary language
  - Star count
  - Relative last updated time
  - Direct GitHub link
- Search suggestion chips
- Trending repository discovery
- Skeleton loading state designed to reduce layout shift
- Empty results state
- API error state
- Non-destructive API errors that preserve previously loaded results when possible
- GitHub rate limit handling
- Responsive mobile, tablet and desktop layouts
- Keyboard shortcuts
- Accessible focus states
- Semantic HTML
- SEO metadata
- End-to-end tests with Playwright
- Consistent code formatting with Prettier

---

## Tech stack

- [Next.js](https://nextjs.org/)
- React
- TypeScript
- Tailwind CSS
- GitHub REST API
- Playwright
- Prettier
- Vercel

I chose to build the interface with custom components instead of introducing a component library such as shadcn/ui.

For this challenge, the UI is highly specific to the supplied Figma design, so implementing the components directly gave me more control over sizing, spacing, glass effects, responsive behavior and interaction states without adding unnecessary abstraction.

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/NicolasFiorese/repo-scope.git
```

### 2. Enter the project directory

```bash
cd repo-scope
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

No environment variables are required.

---

## Available scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production build

```bash
npm run build
```

Creates a production build of the application.

### Production server

```bash
npm run start
```

Runs the production build.

### Lint

```bash
npm run lint
```

Runs ESLint.

### Format

```bash
npm run format
```

Formats the project using Prettier.

### Format check

```bash
npm run format:check
```

Checks that all supported files follow the configured Prettier formatting rules.

### End-to-end tests

```bash
npm run test:e2e
```

Runs the Playwright test suite.

### Playwright UI

```bash
npm run test:e2e:ui
```

Opens the Playwright interactive test interface.

---

## End-to-end testing

I use Playwright for end-to-end coverage.

The test suite currently covers four scenarios.

### Successful repository search

The GitHub API request is intercepted and replaced with mocked repository data.

The test verifies that:

- a search can be submitted;
- repository results are rendered;
- repository links are displayed correctly;
- the result count is shown correctly.

### API failure

The GitHub API request is intercepted and forced to return an HTTP error.

The test verifies that the application displays the expected error state.

### Unsubmitted search query regression

The test verifies that typing a new value into the search field without submitting it does not change the active repository search.

Pagination continues using the last submitted query rather than the current input value.

This prevents the visible search input from becoming inconsistent with the repositories currently displayed.

### Cleared search field regression

The test verifies that clearing the search input does not invalidate the currently displayed results.

Pagination continues working with the last successfully submitted search query even when the input is empty.

Mocking the API makes these tests deterministic and prevents them from depending on network availability or GitHub API rate limits.

Run the tests with:

```bash
npm run test:e2e
```

---

## Technical decisions

### GitHub API integration

I consume GitHub's public Repository Search REST API directly from the browser.

The application does not require authentication or a GitHub personal access token.

I deliberately avoided exposing a GitHub token in client-side code because any secret included in the browser bundle would be publicly accessible.

For this challenge, using the unauthenticated public API also allowed me to implement and demonstrate the required rate-limit error state.

---

### Search input and active search state

I keep the current search input separate from the last successfully submitted search query.

This prevents changes made while typing from immediately changing the context of the currently displayed results.

For example, if I search for `vercel` and then type `react` without submitting it, the existing results and pagination continue to represent the `vercel` search.

The same principle applies when the input is cleared: the current results remain valid until another search is submitted.

This separation also prevents pagination and sorting from accidentally using an unsubmitted query.

---

### Trending behavior

The supplied interface included a `Trending` navigation item, but the challenge did not define any expected behavior for it.

Rather than leaving the control non-functional, I decided to implement a useful interpretation of repository trending.

GitHub's REST API does not expose an official Trending endpoint, so I implemented a practical approximation using the Repository Search API.

When `Trending` is selected, I search for repositories that:

- were created within the last 30 days;
- have more than 100 stars;
- are sorted by star count.

The generated GitHub search query follows this format:

```text
created:>YYYY-MM-DD stars:>100
```

This keeps the control functional while staying entirely within the GitHub Search API used by the rest of the application.

---

### GitHub search result limit

GitHub's Search API only exposes the first 1,000 results of a search.

Because each application page requests 12 repositories, I calculate pagination using:

```text
min(total_count, 1000)
```

This prevents the interface from offering pages that GitHub cannot return.

The UI also informs the user when a search contains more than 1,000 repositories.

---

### Result card expansion

Each GitHub API page contains up to 12 repositories.

To match the supplied design more closely, I initially display 6 cards.

The user can then select:

```text
6 more cards (12 per page)
```

to reveal the remaining results from the same API page.

This does not perform another network request.

Changing the page or sorting mode resets the expanded state.

---

### Relative update time

Repository cards display the last update using relative time instead of a raw calendar date.

Examples include:

```text
Updated 2 hours ago
Updated yesterday
Updated 2 weeks ago
Updated last month
```

This matches the supplied design more closely and makes repository freshness easier to scan.

---

### Sorting

The interface supports:

- Best match
- Most stars
- Recently updated

The selected sorting option is sent to the GitHub Search API and the current page is reset to page 1 when sorting changes.

---

### Loading behavior

I use repository card skeletons while new results are loading.

The skeleton grid keeps approximately the same vertical space as the repository results, which reduces layout movement while the GitHub API request is in progress.

Pagination is temporarily disabled during loading when appropriate.

---

### Error handling

The interface supports API, network and GitHub rate-limit failures.

If an error occurs before any repository results have been loaded, I display a dedicated full error state.

If an error occurs while previously loaded repositories are still available, I preserve those results and display a compact error message above them instead of clearing the entire section.

This prevents temporary API failures from unnecessarily destroying useful content already visible to the user.

---

### Rate limit handling

Unauthenticated GitHub Search API requests have a restricted request quota.

I detect GitHub rate-limit responses and, when the API provides a reset timestamp, display the approximate time at which the user can retry.

Other API or network failures fall back to a generic error state.

---

### Code formatting

I use Prettier to keep code formatting consistent across the project.

Formatting can be applied with:

```bash
npm run format
```

and verified without modifying files with:

```bash
npm run format:check
```

This keeps indentation, line wrapping and general code style consistent across components, tests and configuration files.

---

## Architecture

I split the interface into focused components rather than implementing the full page in a single file.

The main page is responsible for application state and GitHub API interactions, while visual and interaction-specific responsibilities are delegated to individual components.

Examples include:

- `Header`
- `Hero`
- `SearchField`
- `SearchSummary`
- `RepositorySection`
- `RepositoryCard`
- `SortControl`
- `Pagination`
- `Footer`

The GitHub API logic is isolated in:

```text
src/lib/github.ts
```

Shared GitHub types are stored in:

```text
src/types/github.ts
```

Formatting utilities are stored separately under:

```text
src/utils/
```

This keeps API concerns, UI concerns and utility logic separated.

---

## Responsive design

The interface was designed and tested for mobile, tablet and desktop layouts.

The repository grid adapts across breakpoints:

```text
Mobile  → 1 column
Tablet  → 2 columns
Desktop → 3 columns
```

The header also changes layout depending on available width.

On smaller screens, the logo and GitHub button remain on the first row while the navigation moves to a second centered row.

Search controls, sorting controls and pagination were also adjusted to remain usable on smaller screens.

---

## Accessibility

I included accessibility considerations throughout the implementation.

These include:

- semantic `header`, `main`, `section`, `nav` and `footer` elements;
- descriptive `aria-label` attributes;
- `aria-current` for current navigation and pagination states;
- `aria-pressed` for sorting controls;
- `aria-live` for dynamic result information;
- `aria-busy` while repository results are loading;
- `role="status"` for loading and empty states;
- `role="alert"` for API errors;
- visible keyboard focus states;
- accessible repository links;
- keyboard-compatible buttons and pagination;
- decorative SVG elements hidden from assistive technologies.

---

## Keyboard shortcuts

The application includes lightweight keyboard navigation.

### Focus search

Press:

```text
/
```

to focus the repository search field.

### Pagination

When focus is not inside another interactive control:

```text
←
```

moves to the previous page.

```text
→
```

moves to the next page.

The shortcuts intentionally do not override normal behavior while the user is typing or interacting with links, buttons, selects or editable elements.

---

## SEO

I configured metadata using the Next.js App Router metadata API.

The project includes:

- page title;
- page description;
- application name;
- canonical URL;
- Open Graph metadata;
- Twitter metadata;
- index/follow robots configuration;
- English document language.

Production metadata is based on:

```text
https://repo-scope-gamma.vercel.app
```

---

## Design implementation

The supplied Figma file was used as the visual reference for the interface.

I reproduced the main design characteristics including:

- blue background;
- coral accent palette;
- radial ray composition;
- glass-style surfaces;
- rounded navigation;
- large hero typography;
- gradient search field;
- repository card grid;
- compact repository metadata and icons;
- relative update times;
- sorting control;
- pagination;
- responsive spacing;
- hover feedback;
- visible focus states;
- subtle transitions.

The decorative radial background and project logo are exported SVG assets from the supplied design.

Where appropriate, I translated design-system interaction notes into CSS states such as hover, focus and active feedback.

---

## Project structure

```text
repo-scope/
│
├── public/
│   ├── logo-repo.svg
│   └── rays.svg
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── pagination.tsx
│   │   ├── repository-card.tsx
│   │   ├── repository-section.tsx
│   │   ├── search-field.tsx
│   │   ├── search-summary.tsx
│   │   └── sort-control.tsx
│   │
│   ├── lib/
│   │   └── github.ts
│   │
│   ├── types/
│   │   └── github.ts
│   │
│   └── utils/
│       └── format-number.ts
│
├── tests/
│   └── e2e/
│       └── repository-search.spec.ts
│
├── .prettierignore
├── .prettierrc
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Deployment

The production version is deployed on Vercel:

https://repo-scope-gamma.vercel.app/

The Vercel project is connected to the GitHub repository, so updates pushed to the production branch can trigger new deployments automatically.

---

## Final validation

Before submission, I validate the project using:

```bash
npm run format:check
npm run lint
npm run build
npm run test:e2e
```

This verifies consistent formatting, code quality, the production build and the end-to-end flows.

---

## Author

Developed by **Nicolas Fiorese**.
