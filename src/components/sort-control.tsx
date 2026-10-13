export function SortControl() {
  return (
    <div className="flex items-center rounded-full bg-white/5 p-1">
      <button
        type="button"
        className="rounded-full bg-[#ffb5aa] px-4 py-2 text-xs font-medium text-blue-700"
      >
        Best match
      </button>

      <button
        type="button"
        className="rounded-full px-4 py-2 text-xs text-white/70"
      >
        Most stars
      </button>

      <button
        type="button"
        className="rounded-full px-4 py-2 text-xs text-white/70"
      >
        Recently updated
      </button>
    </div>
  );
}