import { PageFrame } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <PageFrame eyebrow="About" title="From fitness club to engineer, without pretending it was simple.">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
        <div className="space-y-5 text-base leading-8 text-ash">
          <p>I worked in a fitness club for nine years.</p>
          <p>I was a top instructor. I loved the work.</p>
          <p>But I felt trapped by a world with only one option.</p>
          <p>I wanted a life where my value and choices were not decided by a company.</p>
          <p>So I became an infrastructure engineer.</p>
          <p>I have a wife and two children. I started a side project because I want to protect them by keeping more options open in life.</p>
        </div>
        <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-glow">
          <p className="kanji-mark float-right ml-5 text-xs text-ember/70">after work</p>
          <h2 className="font-serif text-3xl text-bone">Notes</h2>
          <dl className="mt-6 grid gap-5">
            <div>
              <dt className="text-xs uppercase tracking-[0.26em] text-ash/50">Form</dt>
              <dd className="mt-2 text-sm leading-6 text-ash">A personal archive about work, family, transition, and late nights in Japan.</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.26em] text-ash/50">Tone</dt>
              <dd className="mt-2 text-sm leading-6 text-ash">Plain, restrained, and close to what actually happened.</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.26em] text-ash/50">Boundary</dt>
              <dd className="mt-2 text-sm leading-6 text-ash">Some parts are still unresolved. This site does not clean them up.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </PageFrame>
  );
}
