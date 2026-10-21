import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onTrending: () => void;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-[18px]
        w-[18px]

        sm:h-5
        sm:w-5
      "
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function Header({ onTrending }: HeaderProps) {
  return (
    <header
      className="
        relative
        z-20
        mx-auto
        w-full
        max-w-[1184px]
        px-4
        pt-5

        sm:px-6
        sm:pt-6
      "
    >
      <div
        className="
          grid
          grid-cols-[1fr_auto]
          items-center
          gap-y-3

          lg:grid-cols-[1fr_auto_1fr]
          lg:gap-y-0
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="repo·scope home"
          className="
            col-start-1
            row-start-1
            justify-self-start
            rounded-md

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--coral-300)]
            focus-visible:ring-offset-4
            focus-visible:ring-offset-[var(--blue-600)]
          "
        >
          <Image
            src="/logo-repo.svg"
            alt=""
            width={148}
            height={30}
            priority
            className="
              h-[24px]
              w-[118px]

              sm:h-[30px]
              sm:w-[148px]
            "
          />
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="
            col-span-2
            row-start-2
            flex
            items-center
            justify-self-center
            rounded-full
            border
            border-white/[0.13]
            bg-white/[0.055]
            p-1
            backdrop-blur-[1px]

            lg:col-span-1
            lg:col-start-2
            lg:row-start-1
          "
        >
          {/* Search */}
          <Link
            href="/"
            aria-current="page"
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/[0.13]
              bg-white/[0.075]
              px-3
              py-2
              text-[12px]
              text-[var(--ink-1)]
              backdrop-blur-[1px]
              transition
              duration-200

              hover:bg-white/[0.10]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--coral-300)]

              sm:gap-2
              sm:px-4
              sm:text-sm
            "
          >
            <SearchIcon />
            Search
          </Link>

          {/* Trending */}
          <button
            type="button"
            onClick={onTrending}
            aria-label="Show trending repositories"
            className="
              flex
              cursor-pointer
              items-center
              gap-1.5
              rounded-full
              px-3
              py-2
              text-[12px]
              text-[var(--ink-1)]
              transition
              duration-200

              hover:bg-white/[0.08]
              hover:text-[var(--coral-100)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--coral-300)]

              sm:gap-2
              sm:px-4
              sm:text-sm
            "
          >
            <TrendingIcon />
            Trending
          </button>

          {/* API */}
          <a
            href="https://docs.github.com/en/rest/search/search"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub REST API documentation, opens in a new tab"
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              px-3
              py-2
              text-[12px]
              text-[var(--ink-1)]
              transition
              duration-200

              hover:bg-white/[0.08]
              hover:text-[var(--coral-100)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--coral-300)]

              sm:gap-2
              sm:px-4
              sm:text-sm
            "
          >
            <CodeIcon />
            API
          </a>
        </nav>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub, opens in a new tab"
          className="
            col-start-2
            row-start-1
            flex
            items-center
            justify-self-end
            gap-1.5
            rounded-full
            border
            border-white/[0.13]
            bg-white/[0.055]
            px-3
            py-2
            text-[12px]
            text-[var(--ink-1)]
            backdrop-blur-[1px]
            transition
            duration-200

            hover:-translate-y-px
            hover:border-[var(--coral-300)]
            hover:bg-white/[0.085]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--coral-300)]

            sm:gap-2
            sm:px-4
            sm:text-sm

            lg:col-start-3
          "
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </header>
  );
}
