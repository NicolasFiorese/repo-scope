import { RepositoryCard } from "@/components/repository-card";
import { SortControl } from "@/components/sort-control";

const repositories = [
  {
    rank: 1,
    stars: "131.4K",
    name: "vercel/next.js",
    description: "The React Framework",
    language: "JavaScript",
    updatedAt: "Updated 2 hours ago",
  },
  {
    rank: 2,
    stars: "44.1K",
    name: "vercel/hyper",
    description: "A terminal built on web technologies",
    language: "JavaScript",
    updatedAt: "Updated 2 weeks ago",
  },
  {
    rank: 3,
    stars: "31.2K",
    name: "vercel/swr",
    description: "React Hooks for Data Fetching",
    language: "TypeScript",
    updatedAt: "Updated yesterday",
  },
  {
    rank: 4,
    stars: "28K",
    name: "vercel/turborepo",
    description: "System optimized for JS and TS",
    language: "Rust",
    updatedAt: "Updated 5 hours ago",
  },
  {
    rank: 5,
    stars: "18.7K",
    name: "vercel/ai",
    description: "The AI Toolkit for TypeScript",
    language: "TypeScript",
    updatedAt: "Updated 3 hours ago",
  },
  {
    rank: 6,
    stars: "12.3K",
    name: "vercel/satori",
    description: "Library to convert HTML and CSS to SVG",
    language: "TypeScript",
    updatedAt: "Updated last month",
  },
];

export function RepositorySection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">
              Repositories
            </h2>

            <p className="mt-1 text-xs text-white/55">
              Showing 1–12 of 4,812 repositories
            </p>
          </div>

          <SortControl />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repository) => (
            <RepositoryCard
              key={repository.rank}
              {...repository}
            />
          ))}
        </div>
      </div>
    </section>
  );
}