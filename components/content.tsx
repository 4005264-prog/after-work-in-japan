import { ArrowUpRight, BookOpen, Clock3, HeartHandshake, Lamp, TrainFront } from "lucide-react";
import Link from "next/link";

export const entries = [
  {
    number: "01",
    title: "Nine years in a fitness club",
    excerpt: "I was a top instructor. I loved the work. That made the feeling of being trapped harder to explain.",
    time: "6 min read"
  },
  {
    number: "02",
    title: "Becoming an engineer",
    excerpt: "I did not change jobs because I hated the old one. I changed because I needed more than one path.",
    time: "8 min read"
  },
  {
    number: "03",
    title: "Wife, children, options",
    excerpt: "Protecting my family started to mean more than working hard. It meant keeping choices open.",
    time: "5 min read"
  }
];

export const rituals = [
  { icon: TrainFront, label: "After the train", detail: "The workday ends, but it takes longer for the body to understand that." },
  { icon: Lamp, label: "The apartment", detail: "Most of this record happens at home, after everyone has settled down." },
  { icon: BookOpen, label: "Side project", detail: "A small attempt to build options outside a company path." },
  { icon: HeartHandshake, label: "Family", detail: "A husband and father trying to keep more doors open than before." }
];

export const readCategories = [
  {
    title: "Fitness Club",
    notes: [
      "Nine years. Early shifts, late shifts, regular members.",
      "I was a top instructor and loved the work.",
      "Love did not make the world feel wider."
    ]
  },
  {
    title: "Engineer",
    notes: [
      "I became an infrastructure engineer.",
      "The new work did not make life simple.",
      "It gave me another way to stand."
    ]
  },
  {
    title: "Family",
    notes: [
      "I have a wife and two children.",
      "Being useful at work is not the same as being present at home.",
      "Protecting them started to mean keeping options open."
    ]
  },
  {
    title: "Company",
    notes: [
      "I felt trapped by a world with only one option.",
      "I did not want my value decided by a company.",
      "I kept wondering what would happen if that one door closed."
    ]
  },
  {
    title: "Side Project",
    notes: [
      "I started small, after work.",
      "Not to impress anyone.",
      "To practice having another option."
    ]
  },
  {
    title: "Quiet Nights",
    notes: [
      "After everyone slept, the house became quiet.",
      "That was when I could hear what I had been avoiding.",
      "Some nights I only sat there and let the thought stay unfinished."
    ]
  }
];

export function EntryList() {
  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <article key={entry.number} className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-ember/40 hover:bg-white/[0.06]">
          <div className="flex items-start justify-between gap-4">
            <span className="font-serif text-3xl text-ember/80">{entry.number}</span>
            <span className="flex items-center gap-2 text-xs text-ash/60">
              <Clock3 size={13} />
              {entry.time}
            </span>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-bone">{entry.title}</h3>
          <p className="mt-3 text-sm leading-6 text-ash">{entry.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export function CategoryNotes() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {readCategories.map((category) => (
        <section key={category.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-ember/40 hover:bg-white/[0.06]">
          <p className="text-xs uppercase tracking-[0.26em] text-ember/80">{category.title}</p>
          <div className="mt-5 grid gap-4">
            {category.notes.map((note) => (
              <p key={note} className="border-l border-white/10 pl-4 text-sm leading-6 text-ash">
                {note}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function RitualGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rituals.map((ritual) => {
        const Icon = ritual.icon;
        return (
          <div key={ritual.label} className="rounded-lg border border-white/10 bg-coal/70 p-4">
            <Icon className="text-ember" size={20} strokeWidth={1.7} />
            <h3 className="mt-4 text-base font-semibold text-bone">{ritual.label}</h3>
            <p className="mt-2 text-sm leading-6 text-ash/80">{ritual.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

export function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-sm font-semibold text-ink transition hover:bg-ember">
      {children}
      <ArrowUpRight size={16} strokeWidth={1.8} />
    </Link>
  );
}
