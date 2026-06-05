import Image from "next/image";
import { CalendarDays, MapPin, Waves, type LucideIcon } from "lucide-react";
import { EntryList, LinkPill, RitualGrid } from "@/components/content";
import { SiteShell } from "@/components/site-shell";

const stats: Array<[string, string, LucideIcon]> = [
  ["Then", "9 years in a fitness club", Waves],
  ["Now", "infrastructure engineer", MapPin],
  ["Why", "wife, two children, more options", CalendarDays]
];

export default function Home() {
  return (
    <SiteShell>
      <section className="relative min-h-[calc(100svh-66px)] overflow-hidden bg-ink">
        <Image
          src="/images/tokyo-after-work.png"
          alt="A quiet Japanese convenience store exterior at night on a rainy residential street"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/42 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(216,138,61,0.14),transparent_20rem),radial-gradient(circle_at_78%_14%,rgba(145,167,180,0.10),transparent_24rem)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute left-4 top-20 h-px w-28 bg-ember/40 sm:left-8 sm:w-44" />
        <div className="relative mx-auto flex min-h-[calc(100svh-66px)] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.36em] text-ember">Japan, after the shift ends</p>
            <h1 className="font-serif text-5xl leading-[0.9] text-bone sm:text-7xl lg:text-8xl">after work in japan</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ash sm:text-lg">
              I worked in a fitness club for nine years. I was a top instructor and loved the work.
              Then I became an engineer because I did not want one company to decide the size of my life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkPill href="/read">Read entries</LinkPill>
              <LinkPill href="/quiet-room">Enter Quiet Room</LinkPill>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink/80">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          {stats.map(([label, value, Icon]) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="text-ember" size={18} strokeWidth={1.7} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-ash/50">{label}</p>
                <p className="mt-1 text-sm text-bone">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ember">The record</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-bone sm:text-5xl">I loved the work. I still felt trapped.</h2>
          <p className="mt-5 text-sm leading-7 text-ash">
            I have a wife and two children. I started a side project. I am trying to protect my family
            by keeping more options open than I used to have. This site is where I keep the record.
          </p>
        </div>
        <RitualGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ember">Read</p>
            <h2 className="mt-3 font-serif text-4xl text-bone">Recent entries</h2>
          </div>
        </div>
        <EntryList />
      </section>
    </SiteShell>
  );
}
