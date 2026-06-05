import Image from "next/image";
import { CalendarDays, MapPin, Waves, type LucideIcon } from "lucide-react";
import { EntryList, LinkPill, RitualGrid } from "@/components/content";
import { SiteShell } from "@/components/site-shell";

const stats: Array<[string, string, LucideIcon]> = [
  ["Tone", "plain, personal, unfinished", Waves],
  ["Place", "Japan, office, home, late trains", MapPin],
  ["Pace", "short notes from after work", CalendarDays]
];

export default function Home() {
  return (
    <SiteShell>
      <section className="relative min-h-[calc(100svh-66px)] overflow-hidden">
        <Image
          src="/images/tokyo-after-work.png"
          alt="A person standing on a rainy Tokyo street after work"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/68 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(216,138,61,0.22),transparent_22rem)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-66px)] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.36em] text-ember">Tokyo, after the office lights</p>
            <h1 className="font-serif text-5xl leading-[0.9] text-bone sm:text-7xl lg:text-8xl">after work in japan</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ash sm:text-lg">
              Notes from a Japanese office worker after the day job ends: home, family, money,
              fatigue, and the parts of life that do not fit on a resume.
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
          <h2 className="mt-4 font-serif text-4xl leading-tight text-bone sm:text-5xl">For years, I let work explain my life.</h2>
          <p className="mt-5 text-sm leading-7 text-ash">
            I spent nine years working in a fitness club. Today I work as an infrastructure engineer.
            I am a husband. I am a father. This site keeps a record of what those facts feel like
            after the office, with no clean ending.
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
