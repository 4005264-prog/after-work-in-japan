import { Archive, KeyRound, Layers, NotebookPen } from "lucide-react";
import { PageFrame } from "@/components/site-shell";

const sections = [
  {
    icon: Archive,
    title: "What I Didn't Post",
    text: "Fragments from workdays, family nights, and the side project that stayed off the public page."
  },
  {
    icon: NotebookPen,
    title: "Private Notes",
    text: "Short entries about the office, money, children, marriage, and the pressure I usually keep quiet."
  },
  {
    icon: Layers,
    title: "Monthly Reflection",
    text: "A monthly record of what changed, what repeated, and what still felt unresolved."
  },
  {
    icon: KeyRound,
    title: "Behind The Transition",
    text: "Notes from leaving one-option work and becoming an infrastructure engineer."
  }
];

export default function QuietRoomPage() {
  return (
    <PageFrame eyebrow="Quiet Room" title="A private monthly archive of thoughts still in progress.">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <section className="rounded-lg border border-ember/25 bg-ember/[0.07] p-5 shadow-glow sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-ember">Private archive</p>
          <div className="mt-6 flex items-end gap-2">
            <span className="font-serif text-6xl leading-none text-bone">$5</span>
            <span className="pb-2 text-sm text-ash">/month</span>
          </div>
          <p className="mt-3 text-sm text-ash/80">Cancel anytime.</p>
          <p className="mt-8 text-sm leading-7 text-ash">
            Quiet Room is a private monthly archive: unfinished thoughts about work, family,
            fear, money, side projects, and the transition still in progress.
          </p>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <section key={item.title} className="rounded-lg border border-white/10 bg-coal/75 p-5">
                <Icon className="text-ember" size={22} strokeWidth={1.6} />
                <h2 className="mt-6 font-serif text-3xl text-bone">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-ash">{item.text}</p>
              </section>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}
