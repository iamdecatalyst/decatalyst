export default function Footer() {
  return (
    <footer className="border-t border-neu-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/pfp.jpg" alt="" className="w-7 h-7 rounded-full object-cover opacity-70" />
          <p className="text-neutral-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} Isaac Wisdom. All rights reserved.
          </p>
        </div>
        <p className="text-neutral-500 text-xs font-mono italic">
          Ad astra per aspera
        </p>
      </div>
    </footer>
  );
}
