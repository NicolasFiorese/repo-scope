export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[1184px] items-center justify-between px-6 pt-6">
      <div className="font-semibold">
        repo-scope
      </div>

      <nav className="flex items-center gap-3">
        <a href="#" className="text-sm">
          Search
        </a>

        <a href="#" className="text-sm">
          Trending
        </a>

        <a href="#" className="text-sm">
          API
        </a>
      </nav>

      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="text-sm"
      >
        GitHub
      </a>
    </header>
  );
}