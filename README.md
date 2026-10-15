# repo·scope

A responsive GitHub repository search interface built with Next.js, TypeScript and Tailwind CSS.

repo·scope allows users to search public GitHub repositories, inspect relevant repository information, sort results and navigate through paginated results while following the provided Figma design.

## Features

- Search public GitHub repositories
- Display repository:
  - Name and GitHub link
  - Description
  - Primary language
  - Star count
  - Last updated date
- Sort by:
  - Best match
  - Most stars
  - Recently updated
- Pagination
- Display 6 repositories initially with the option to reveal all 12 results on the current page
- Loading state
- Empty results state
- API error state
- GitHub rate-limit handling
- Responsive layout for mobile, tablet and desktop
- Keyboard shortcuts
- Accessible focus and interaction states
- SEO metadata
- End-to-end tests with Playwright

## Tech Stack

- Next.js 16 — App Router
- React
- TypeScript
- Tailwind CSS
- GitHub REST API
- Playwright

## Getting Started

Clone the repository:

```bash
git clone https://github.com/NicolasFiorese/repo-scope.git
cd repo-scope
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

Run the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run the end-to-end test suite:

```bash
npm run test:e2e
```

Open Playwright UI mode:

```bash
npm run test:e2e:ui
```

## Testing

End-to-end tests are implemented with Playwright.

The test suite covers the required scenarios:

1. Searching for repositories and displaying the results correctly.
2. Displaying the error state when the GitHub API request fails.

GitHub API requests are mocked during the E2E tests. This keeps the tests deterministic and prevents them from depending on network availability or GitHub API rate limits.

Run the tests with:

```bash
npm run test:e2e
```

## Technical Decisions

### GitHub REST API

The application uses the GitHub Repository Search REST API.

The API is called directly from the client and no authentication token is exposed in the frontend.

Because unauthenticated GitHub Search requests are rate limited, the interface explicitly handles rate-limit errors and displays retry information when available.

GitHub Search exposes a maximum of the first 1,000 matching results, so pagination respects this API limitation.

### Component Architecture

The interface is divided into reusable components with separate responsibilities:

```text
Header
Hero
SearchField
SearchSummary
RepositorySection
RepositoryCard
SortControl
Pagination
Footer
```

API logic, types and formatting utilities are also separated from the presentation components.

### Custom Components

The challenge recommends shadcn/ui, but does not require it.

Custom components were used because the supplied Figma design has a very specific visual language involving glass surfaces, gradients, pills, glows, borders and interaction states.

Implementing these components directly with Tailwind CSS provided more control over visual fidelity while keeping the dependency footprint small.

### Responsive Design

The supplied Figma focuses on the desktop layout.

Mobile and tablet layouts were adapted from the same visual system while preserving typography, colors, spacing, hierarchy and interaction patterns.

The interface was tested across representative viewport widths including:

```text
390px   Mobile
768px   Tablet
1024px  Desktop transition
1440px  Desktop
```

### Accessibility

The project includes accessibility improvements such as:

- Semantic HTML
- Accessible labels for form controls
- Visible keyboard focus states
- `aria-current` for active navigation and pagination
- `aria-pressed` for sorting controls
- `aria-busy` for repository loading
- Live regions for loading and result updates
- Alert semantics for API errors
- Accessible pagination labels
- Keyboard shortcuts that do not override focused interactive controls

### Keyboard Shortcuts

On desktop:

```text
/   Focus the repository search field
←   Previous results page
→   Next results page
```

Keyboard shortcuts are disabled while the user is interacting with inputs, links or buttons.

### SEO

The application includes metadata for:

- Page title
- Description
- Open Graph
- Twitter cards
- Search-engine indexing

## Design

The interface follows the supplied Figma reference, including:

- Typography
- Colors
- Spacing
- Glass surfaces
- Search field
- Repository cards
- Sorting controls
- Pagination
- Hover states
- Focus states
- Responsive adaptations

The decorative radial background is exported from the Figma as an SVG, while the remaining interface is implemented with HTML, CSS and React components.

## Project Structure

```text
repo-scope/
├── public/
│   └── rays.svg
│
├── src/
│   ├── app/
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
├── playwright.config.ts
└── package.json
```

## Final Validation

Before submission, the project can be validated with:

```bash
npm run lint
npm run build
npm run test:e2e
```

All three commands should complete successfully.