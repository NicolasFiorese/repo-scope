interface SearchFieldProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchField({
  query,
  onQueryChange,
  onSearch,
}: SearchFieldProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-3"
    >
      <label htmlFor="repository-search" className="sr-only">
        Search repositories
      </label>

      <input
        id="repository-search"
        name="search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search repositories..."
        className="h-14 flex-1 rounded-full border border-white/20 bg-white/90 px-6 text-slate-900 outline-none"
      />

      <button
        type="submit"
        className="h-14 rounded-full bg-white px-6 font-medium text-blue-600"
      >
        Search
      </button>
    </form>
  );
}