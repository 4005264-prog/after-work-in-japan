import Link from "next/link";
import { Coffee, DoorOpen, FilePenLine, Home, LibraryBig, Moon } from "lucide-react";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Moon },
  { href: "/read", label: "Read", icon: LibraryBig },
  { href: "/quiet-room", label: "Quiet Room", icon: DoorOpen },
  { href: "/life-resignation-letter", label: "Letter", icon: FilePenLine }
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-ember/40 bg-ember/10 text-ember">
              <Coffee size={18} strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-sm font-semibold lowercase tracking-[0.18em] text-bone">after work</span>
              <span className="block text-[10px] uppercase tracking-[0.32em] text-ash/60">in japan</span>
            </span>
          </Link>
          <nav aria-label="Primary navigation" className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex h-9 min-w-9 items-center justify-center gap-2 rounded-full px-3 text-xs font-medium text-ash transition hover:bg-white/10 hover:text-bone"
                  title={item.label}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
    </main>
  );
}

export function PageFrame({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-ember">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl leading-[0.95] text-bone sm:text-6xl">{title}</h1>
        <div className="mt-10">{children}</div>
      </section>
    </SiteShell>
  );
}
