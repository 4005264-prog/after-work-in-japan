"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Clipboard, FilePenLine, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";

type Category =
  | "evaluationDependency"
  | "companyDependency"
  | "patienceDependency"
  | "narrowWorldDependency"
  | "selfPostponement";

type Step = "intro" | "quiz" | "result";

type Question = {
  category: Category;
  text: string;
};

type ResultContent = {
  title: string;
  subtitle: string;
  description: string;
  letter: string;
  firstAction: string;
};

const serviceName = "人生の退職届ジェネレーター";

const scaleLabels = [
  "まったく当てはまらない",
  "あまり当てはまらない",
  "どちらとも言えない",
  "少し当てはまる",
  "とても当てはまる"
];

const questions: Question[] = [
  { category: "evaluationDependency", text: "人から評価されていないと、自分に価値がないように感じる" },
  { category: "evaluationDependency", text: "頼まれると、本当は嫌でも断れないことが多い" },
  { category: "evaluationDependency", text: "期待に応えることを、自分の人生より優先してしまう" },
  { category: "evaluationDependency", text: "「いい人」「ちゃんとしている人」でいようとして疲れる" },
  { category: "companyDependency", text: "今の会社を失ったら、自分の価値も下がる気がする" },
  { category: "companyDependency", text: "肩書きや所属先がない自分を想像すると不安になる" },
  { category: "companyDependency", text: "会社の評価が、自分の人生の評価のように感じる" },
  { category: "companyDependency", text: "今の会社以外で働く自分をあまり想像できない" },
  { category: "patienceDependency", text: "つらくても我慢できることを、強さだと思ってきた" },
  { category: "patienceDependency", text: "自分が無理をすれば丸く収まる場面が多い" },
  { category: "patienceDependency", text: "休むことや手を抜くことに罪悪感がある" },
  { category: "patienceDependency", text: "自分の本音より、責任を優先することが多い" },
  { category: "narrowWorldDependency", text: "今いる会社や業界の外の世界をあまり知らない" },
  { category: "narrowWorldDependency", text: "外の世界を調べる前に「自分には無理」と思ってしまう" },
  { category: "narrowWorldDependency", text: "新しい挑戦より、今の環境で我慢する方が楽だと感じる" },
  { category: "narrowWorldDependency", text: "このまま数年経つ自分を想像すると、少し怖い" },
  { category: "selfPostponement", text: "自分が何をしたいかより、周りに迷惑をかけないことを優先する" },
  { category: "selfPostponement", text: "家族や仕事のことを考えると、自分の人生は後回しになる" },
  { category: "selfPostponement", text: "本当は変えたいことがあるのに、忙しさで見ないようにしている" },
  { category: "selfPostponement", text: "自分の人生について考えるのは、いつも仕事が終わった後だ" }
];

const resultPriority: Category[] = [
  "narrowWorldDependency",
  "companyDependency",
  "selfPostponement",
  "patienceDependency",
  "evaluationDependency"
];

const resultContent: Record<Category, ResultContent> = {
  evaluationDependency: {
    title: "評価依存タイプ",
    subtitle: "退職すべき生き方：\n他人の評価だけで、自分の価値を決める生き方",
    description:
      "あなたは、人から必要とされることに安心を感じやすいタイプです。評価されること自体は悪くありません。ただ、その評価がないと自分の価値まで揺らいでしまうなら、少し危険です。",
    letter:
      "私は本日をもって、\n「他人の評価だけで自分の価値を決める生き方」\nを退職します。\n\nこれからは、\n誰かに認められる前に、\n自分が何を選びたいのかを確認します。",
    firstAction: "今日、自分が本当は断りたかったことを1つだけ書き出してください。"
  },
  companyDependency: {
    title: "会社依存タイプ",
    subtitle: "退職すべき生き方：\n一つの会社、一つの肩書きに安心を預ける生き方",
    description:
      "あなたは、会社や肩書きによって安心を得ている部分が大きいタイプです。安定を求めることは自然です。ただ、その安定が「選択肢の少なさ」によって成り立っているなら、見直す必要があります。",
    letter:
      "私は本日をもって、\n「一つの会社だけに安心を預ける生き方」\nを退職します。\n\nこれからは、\n今いる場所を大切にしながら、\n外の世界も見に行きます。",
    firstAction: "転職するかどうかは決めずに、今週中に今の業界以外の求人を5件だけ見てください。"
  },
  patienceDependency: {
    title: "我慢依存タイプ",
    subtitle: "退職すべき生き方：\n我慢できることを、強さだと思い込む生き方",
    description:
      "あなたは責任感が強く、つらい状況でも踏ん張れるタイプです。ただ、我慢が習慣になると、自分が何に傷ついているのか分からなくなります。",
    letter:
      "私は本日をもって、\n「我慢できることを強さだと思い込む生き方」\nを退職します。\n\nこれからは、\n耐える前に、\n本当に耐える必要があるのかを考えます。",
    firstAction: "最近我慢したことを1つ書き、その我慢が本当に必要だったかを考えてください。"
  },
  narrowWorldDependency: {
    title: "狭い世界タイプ",
    subtitle: "退職すべき生き方：\n見たことのない世界を、見ないまま諦める生き方",
    description:
      "あなたは、今いる会社や業界の中で未来を考える時間が長くなっている可能性があります。今すぐ変わる必要はありません。でも、外を見ないまま「自分には無理」と決めるのは早すぎます。",
    letter:
      "私は本日をもって、\n「見たことのない世界を、見ないまま諦める生き方」\nを退職します。\n\nこれからは、\n無理だと決める前に、\n自分の目で確かめに行きます。",
    firstAction: "今週、今いる業界の外側にある情報を30分だけ見てください。"
  },
  selfPostponement: {
    title: "自分後回しタイプ",
    subtitle: "退職すべき生き方：\n自分の人生を、いつも最後に回す生き方",
    description:
      "あなたは、家族、仕事、周囲の人を大切にできるタイプです。ただ、自分の人生を後回しにし続けると、いつか何を選びたかったのか分からなくなります。",
    letter:
      "私は本日をもって、\n「自分の人生を、いつも最後に回す生き方」\nを退職します。\n\nこれからは、\n誰かを大切にするためにも、\n自分の選択肢を残します。",
    firstAction: "今日、自分のためだけに使う30分を予定に入れてください。"
  }
};

const shareText =
  "会社は辞めない。\nでも、この生き方は辞める。\n\n私の人生の退職届を作りました。\n#人生の退職届\n#OneMoreOption";

const initialAnswers = Array<number | null>(questions.length).fill(null);

function getResultCategory(answers: Array<number | null>) {
  const totals = resultPriority.reduce(
    (acc, category) => ({ ...acc, [category]: 0 }),
    {} as Record<Category, number>
  );

  questions.forEach((question, index) => {
    totals[question.category] += answers[index] ?? 0;
  });

  return resultPriority.reduce((winner, category) => {
    return totals[category] > totals[winner] ? category : winner;
  }, resultPriority[0]);
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-4 text-sm font-semibold text-bone transition hover:border-ember/50 hover:bg-ember/10 sm:w-auto sm:min-w-44"
    >
      {copied ? <Check size={17} strokeWidth={1.8} /> : <Clipboard size={17} strokeWidth={1.8} />}
      {copied ? "コピーしました" : label}
    </button>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`h-1 rounded-full transition ${
            index <= current ? "bg-ember" : "bg-white/12"
          }`}
        />
      ))}
    </div>
  );
}

export function LifeResignationLetterClient() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(initialAnswers);

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const currentQuestion = questions[current];
  const resultCategory = useMemo(() => getResultCategory(answers), [answers]);
  const result = resultContent[resultCategory];

  function chooseAnswer(score: number) {
    const nextAnswers = [...answers];
    nextAnswers[current] = score;
    setAnswers(nextAnswers);

    if (current === questions.length - 1) {
      setStep("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrent((value) => value + 1);
  }

  function goBack() {
    if (current === 0) {
      setStep("intro");
      return;
    }

    setCurrent((value) => value - 1);
  }

  function reset() {
    setAnswers(initialAnswers);
    setCurrent(0);
    setStep("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <SiteShell>
      <section className="relative min-h-[calc(100svh-66px)] overflow-hidden border-b border-white/10 bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(216,138,61,0.18),transparent_19rem),radial-gradient(circle_at_88%_24%,rgba(145,167,180,0.1),transparent_18rem),linear-gradient(180deg,rgba(5,5,6,0)_0%,#050506_92%)]" />
        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-ember/35 to-transparent" />

        {step === "intro" && (
          <div className="relative mx-auto flex min-h-[calc(100svh-66px)] max-w-[34rem] flex-col justify-end px-4 pb-8 pt-16 sm:px-6 sm:pb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ember">{serviceName}</p>
            <h1 className="mt-6 font-serif text-[3.2rem] leading-[0.92] text-bone sm:text-7xl">
              会社は
              <br />
              辞めなくていい。
              <span className="mt-8 block text-[2.55rem] leading-[1.05] text-bone/92 sm:text-6xl">
                でも、
                <br />
                その生き方は
                <br />
                もう辞めてもいい。
              </span>
            </h1>
            <p className="mt-7 whitespace-pre-line text-[15px] leading-8 text-ash">
              {
                "会社に出す退職届ではありません。\n他人の評価、我慢、狭い世界、会社依存、自分を後回しにする生き方から、静かに距離を取るための小さな儀式です。"
              }
            </p>
            <div className="mt-8 grid grid-cols-3 border-y border-white/10 py-4">
              {["20問", "約2分", "記録なし"].map((item) => (
                <div key={item} className="border-r border-white/10 text-center last:border-r-0">
                  <p className="text-xs font-semibold tracking-[0.18em] text-bone">{item}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep("quiz")}
              className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-bone px-6 text-[15px] font-semibold text-ink transition hover:bg-ember"
            >
              <FilePenLine size={18} strokeWidth={1.8} />
              退職届を作る
            </button>
          </div>
        )}

        {step === "quiz" && (
          <div className="relative mx-auto grid min-h-[calc(100svh-66px)] max-w-[34rem] grid-rows-[auto_1fr_auto] px-4 pb-4 pt-5 sm:px-6 sm:py-8">
            <header className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm text-ash transition hover:text-bone"
                  aria-label="前の画面へ戻る"
                >
                  <ArrowLeft size={18} strokeWidth={1.8} />
                  戻る
                </button>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-ember">
                    Question {String(current + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs text-ash/60">{progress}% complete</p>
                </div>
              </div>
              <ProgressDots total={questions.length} current={current} />
            </header>

            <div className="flex items-center py-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ash/45">old pattern check</p>
                <h2 className="mt-5 text-[1.72rem] font-semibold leading-[1.34] text-bone sm:text-4xl">
                  {currentQuestion.text}
                </h2>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-coal/[0.82] p-2 shadow-glow backdrop-blur">
              <div className="grid gap-2">
                {scaleLabels.map((label, index) => {
                  const score = index + 1;
                  const selected = answers[current] === score;

                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => chooseAnswer(score)}
                      aria-pressed={selected}
                      className={`grid min-h-[3.6rem] grid-cols-[2.4rem_1fr] items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                        selected
                          ? "border-ember/70 bg-ember/15 text-bone"
                          : "border-white/10 bg-white/[0.035] text-ash hover:border-ember/45 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold ${
                          selected ? "border-ember/70 bg-ember text-ink" : "border-white/10 text-ember"
                        }`}
                      >
                        {score}
                      </span>
                      <span className="text-[15px] leading-6">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="relative mx-auto max-w-[42rem] px-4 py-8 sm:px-6 sm:py-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ember">診断結果</p>
              <h1 className="mt-4 font-serif text-[3rem] leading-[0.98] text-bone sm:text-7xl">{result.title}</h1>
              <p className="mt-6 whitespace-pre-line text-base leading-8 text-ash">{result.subtitle}</p>
            </div>

            <div className="mt-8 border-y border-white/10 py-5">
              <p className="text-[15px] leading-8 text-ash">{result.description}</p>
            </div>

            <section className="mt-8 rounded-lg border border-ember/30 bg-[linear-gradient(180deg,rgba(216,138,61,0.11),rgba(255,255,255,0.035))] p-5 shadow-glow sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">退職届</p>
                <FilePenLine size={18} className="text-ember" strokeWidth={1.8} />
              </div>
              <p className="mt-6 whitespace-pre-line font-serif text-[1.65rem] leading-[1.65] text-bone sm:text-4xl">
                {result.letter}
              </p>
            </section>

            <section className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ember">最初の小さな行動</p>
              <p className="mt-4 text-[15px] leading-8 text-ash">{result.firstAction}</p>
            </section>

            <div className="mt-5 grid gap-3 sm:flex">
              <CopyButton text={result.letter} label="退職届をコピー" />
              <CopyButton text={shareText} label="シェア文をコピー" />
            </div>

            <section className="mt-10 border-t border-white/10 pt-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-ember">One More Option Map</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-bone">退職届を作ったあなたへ。</h2>
              <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-ash">
                {
                  "退職届は、区切りです。\nでも、本当に必要なのは、その後に何を増やすかです。\n\nOne More Option Mapでは、あなたの仕事・収入・家族・スキル・不安を整理し、次に増やすべき選択肢を1枚のPDFにして返します。"
                }
              </p>
              <div className="mt-7 grid gap-3 sm:flex">
                <Link
                  href="/map"
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-bone px-5 text-center text-[15px] font-semibold text-ink transition hover:bg-ember sm:w-auto"
                >
                  自分専用の選択肢マップを作る
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 text-[15px] font-semibold text-bone transition hover:border-ember/40 hover:bg-white/[0.07] sm:w-auto"
                >
                  <RotateCcw size={17} strokeWidth={1.8} />
                  もう一度診断する
                </button>
              </div>
            </section>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
