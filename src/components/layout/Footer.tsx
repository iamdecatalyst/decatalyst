export default function Footer() {
  return (
    <footer className="border-t border-neu-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} Isaac Wisdom. All rights reserved.
        </p>
        <p className="text-neutral-600 text-xs font-mono italic">
          Ad astra per aspera
        </p>
      </div>
    </footer>
  );
}
