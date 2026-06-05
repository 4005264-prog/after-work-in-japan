import { CategoryNotes } from "@/components/content";
import { PageFrame } from "@/components/site-shell";

export default function ReadPage() {
  return (
    <PageFrame eyebrow="Read" title="Notes from work, home, and the hours between.">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm leading-7 text-ash">
            Small notes from a life still being sorted out: work, family, money, decisions,
            fear, and the nights when none of it felt separate.
          </p>
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="text-xs uppercase tracking-[0.26em] text-ash/50">First note</p>
            <p className="mt-3 font-serif text-3xl text-bone">The paycheck wasn't the problem.</p>
            <p className="mt-3 text-sm leading-6 text-ash/80">
              The problem was how much I had learned to leave out.
            </p>
          </div>
        </div>
        <CategoryNotes />
      </div>
    </PageFrame>
  );
}
