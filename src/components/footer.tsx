export function Footer() {
  return (
    <footer
      className="
    relative z-10
    mt-auto
    mx-auto
    flex w-full
    max-w-[1184px]
    flex-col
    items-start
    gap-2
    px-4
    pb-6
    text-[11px]
    text-[var(--ink-3)]

    sm:flex-row
    sm:items-center
    sm:gap-6
    sm:px-6
    sm:pb-8
  "
    >
      <span>© repo·scope 2026</span>

      <span>
        Data:{" "}
        <a
          href="https://docs.github.com/en/rest"
          target="_blank"
          rel="noreferrer"
          className="
            text-[var(--ink-2)]
            transition
            hover:text-[var(--coral-100)]
            hover:underline
            hover:underline-offset-[3px]
          "
        >
          GitHub REST API
        </a>
      </span>

      <a
        href="https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories"
        target="_blank"
        rel="noreferrer"
        className="
          text-[var(--ink-2)]
          transition
          hover:text-[var(--coral-100)]
          hover:underline
          hover:underline-offset-[3px]
        "
      >
        Search syntax
      </a>
    </footer>
  );
}
