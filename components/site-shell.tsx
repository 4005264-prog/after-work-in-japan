import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link href="/" className="min-w-0">
            <span className="block text-sm font-semibold tracking-[0.18em] text-bone">One More Option</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.26em] text-ash/55">Fukuoka, Japan</span>
          </Link>
          <nav aria-label="Primary navigation" className="flex items-center gap-2">
            <Link href="#memo" className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-ash transition hover:border-ember/40 hover:text-bone">
              メモ
            </Link>
            <Link href="#community" className="rounded-full bg-white/[0.07] px-4 py-2 text-xs font-medium text-bone transition hover:bg-white/[0.11]">
              参加
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-white/10 px-5 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-bone">One More Option</p>
          <p className="mt-2 text-sm text-ash/70">A quiet record from Fukuoka, Japan.</p>
          <p className="mt-5 text-sm leading-7 text-ash">
            大きく変えるより、選べる状態を少しずつ増やす。
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-ash/70">
            <Link href="https://www.instagram.com/" className="hover:text-bone">Instagram</Link>
            <Link href="#memo" className="hover:text-bone">Read</Link>
            <Link href="#community" className="hover:text-bone">Quiet Room</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
