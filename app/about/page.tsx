import { PageFrame } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <PageFrame eyebrow="About" title="A record from the years after work stopped being enough.">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
        <div className="space-y-5 text-base leading-8 text-ash">
          <p>I spent nine years working in a fitness club.</p>
          <p>Today I work as an infrastructure engineer.</p>
          <p>I am a husband.</p>
          <p>I am a father.</p>
          <p>For years, I believed work was enough.</p>
          <p>This website is a record of what happened after I stopped believing that.</p>
        </div>
        <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-glow">
          <p className="kanji-mark float-right ml-5 text-xs text-ember/70">after work</p>
          <h2 className="font-serif text-3xl text-bone">Notes</h2>
          <dl className="mt-6 grid gap-5">
            <div>
              <dt className="text-xs uppercase tracking-[0.26em] text-ash/50">Form</dt>
              <dd className="mt-2 text-sm leading-6 text-ash">Short notes from workdays, family life, and late nights in Japan.</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.26em] text-ash/50">Tone</dt>
              <dd className="mt-2 text-sm leading-6 text-ash">Plain, personal, and close to the facts.</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.26em] text-ash/50">Boundary</dt>
              <dd className="mt-2 text-sm leading-6 text-ash">Some parts are still unresolved. They stay that way here.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </PageFrame>
  );
}
