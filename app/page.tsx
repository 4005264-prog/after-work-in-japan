import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { memoItems, communityItems, audienceItems, COMMUNITY_URL } from "@/components/content";

export default function Home() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(187,124,64,0.16),transparent_17rem),radial-gradient(circle_at_86%_18%,rgba(60,78,86,0.22),transparent_22rem),linear-gradient(155deg,rgba(6,8,11,0.94)_0%,rgba(13,11,9,0.78)_48%,rgba(5,5,6,0.98)_100%)]" />
        <div className="absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember/90">
            FUKUOKA / AFTER WORK
          </p>
          <h1 className="mt-7 font-serif text-[2.7rem] leading-[1.08] text-bone sm:text-6xl">
            選択肢が一つしかないまま、
            <br />
            家族の未来を決めたくなかった。
          </h1>
          <div className="mt-8 space-y-5 text-[15px] leading-8 text-ash sm:text-base">
            <p>
              One More Optionは、
              <br />
              福岡で暮らす一人の会社員が、
              <br />
              仕事・家族・お金・学び・副業を通して、
              <br />
              人生の選択肢を少しずつ増やしていく記録です。
            </p>
            <p>
              成功者の発信ではありません。
              <br />
              迷いながら、作りながら、何度も戻ってくるための場所です。
            </p>
          </div>
          <div className="mt-9 grid gap-3 sm:flex">
            <Link
              href={COMMUNITY_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ember"
            >
              有料コミュニティを見る
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="#memo"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-bone transition hover:border-ember/50 hover:bg-white/[0.06]"
            >
              最近のメモを読む
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-white/10 bg-white/[0.025] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember/80">SMALL RECORD</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-bone sm:text-5xl">これは、何のサイトか。</h2>
          <div className="mt-8 space-y-5 text-[15px] leading-8 text-ash sm:text-base">
            <p>
              One More Optionは、
              <br />
              会社を辞めるための場所ではありません。
            </p>
            <p>今の仕事を否定する場所でもありません。</p>
            <p>
              ただ、
              <br />
              一つの会社、一つの収入源、一つの考え方だけに
              <br />
              自分と家族の未来を預けたくない。
            </p>
            <p>
              そう思った一人の会社員が、
              <br />
              今日やったこと、迷ったこと、作ったもの、失敗したことを
              <br />
              静かに残していく場所です。
            </p>
          </div>
        </div>
      </section>

      <section id="memo" className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember/80">HAKATA NIGHT NOTE</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-bone sm:text-5xl">最近のメモ</h2>
          <div className="mt-8 grid gap-4">
            {memoItems.map((item) => (
              <article key={item.label} className="memo-card rounded-lg border border-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.20)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ember/70">{item.label}</p>
                <p className="mt-3 font-serif text-[15px] leading-8 text-bone/90">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="px-5 pb-16 sm:px-6 sm:pb-24">
        <div className="community-card mx-auto max-w-3xl rounded-lg border border-ember/20 p-5 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember/80">ONE MORE OPTION / COMMUNITY</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-bone sm:text-5xl">有料コミュニティについて</h2>
          <div className="mt-7 space-y-5 text-[15px] leading-8 text-ash sm:text-base">
            <p>
              One More Optionの有料コミュニティでは、
              <br />
              完成されたノウハウではなく、
              <br />
              選択肢を増やしていく過程を共有します。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-bone">共有するもの</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ash">
                {communityItems.map((item) => (
                  <li key={item} className="border-l border-white/10 pl-3">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-bone">こんな人へ</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ash">
                {audienceItems.map((item) => (
                  <li key={item} className="border-l border-white/10 pl-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-9 grid gap-3">
            <Link
              href={COMMUNITY_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ember"
            >
              コミュニティに参加する
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </Link>
            <p className="text-center text-xs leading-6 text-ash/70">
              現在はテスト版です。詳細ページは準備中です。
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
