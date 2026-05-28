export default function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search by actor, movie, dialogue..."
      className="
      w-full
      p-4
      rounded-xl
      bg-slate-900
      border
      border-slate-700
      focus:outline-none
      focus:border-purple-500"
    />
  );
}
