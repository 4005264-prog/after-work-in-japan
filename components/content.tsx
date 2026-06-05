import { ArrowUpRight, BookOpen, Clock3, HeartHandshake, Lamp, TrainFront } from "lucide-react";
import Link from "next/link";

export const entries = [
  {
    number: "01",
    title: "Nine years in a fitness club",
    excerpt: "Before the office and the server alerts, there were opening shifts, closing shifts, and a body that got used to being tired.",
    time: "6 min read"
  },
  {
    number: "02",
    title: "Home after the office",
    excerpt: "There are nights when I come home with nothing dramatic to say, only the weight of the day still on me.",
    time: "8 min read"
  },
  {
    number: "03",
    title: "The part after work",
    excerpt: "For a long time, I treated the rest of my life as the time left over.",
    time: "5 min read"
  }
];

export const rituals = [
  { icon: TrainFront, label: "After the train", detail: "The workday ends, but it takes longer for the body to understand that." },
  { icon: Lamp, label: "The apartment", detail: "Most of this record happens in small rooms, after everyone has settled down." },
  { icon: BookOpen, label: "The notes", detail: "Writing down what happened before the memory gets too clean." },
  { icon: HeartHandshake, label: "Family", detail: "A husband and father trying to notice what the day has done to him." }
];

export const readCategories = [
  {
    title: "Work",
    notes: [
      "The paycheck wasn't the problem.",
      "I knew how to keep going. I did not know what it was costing.",
      "Some days ended, but the office stayed in my face."
    ]
  },
  {
    title: "Family",
    notes: [
      "I was good at taking care of others.",
      "Being home and being present were not the same thing.",
      "I could sit at the table and still be somewhere else."
    ]
  },
  {
    title: "Money",
    notes: [
      "Rent, food, savings, diapers, train fare.",
      "I counted what came in and avoided looking at what went out of me.",
      "Money made some things possible. It did not make them clear."
    ]
  },
  {
    title: "Choice",
    notes: [
      "Maybe next year. Years passed.",
      "I kept saying I would think about it later.",
      "The decision was not dramatic. It was just there every morning."
    ]
  },
  {
    title: "Fear",
    notes: [
      "I was afraid of wasting the years I had already given.",
      "The old life was heavy, but I knew where to stand inside it.",
      "When I was tired, fear sounded like common sense."
    ]
  },
  {
    title: "Quiet Nights",
    notes: [
      "After everyone slept, I could hear what the day had been asking.",
      "The room was ordinary. That made it harder to avoid.",
      "Some nights I only sat there and let the house be quiet."
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
