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
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-bone transition hover:border-ember/50 hover:bg-ember/10"
    >
      {copied ? <Check size={16} strokeWidth={1.8} /> : <Clipboard size={16} strokeWidth={1.8} />}
      {copied ? "コピーしました" : label}
    </button>
  );
}

export function LifeResignationLetterClient() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(initialAnswers);

  const progress = Math.round((answers.filter((answer) => answer !== null).length / questions.length) * 100);
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

  function reset() {
    setAnswers(initialAnswers);
    setCurrent(0);
    setStep("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <SiteShell>
      <section className="relative min-h-[calc(100svh-66px)] overflow-hidden border-b border-white/10 bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(216,138,61,0.18),transparent_20rem),radial-gradient(circle_at_76%_8%,rgba(143,46,53,0.14),transparent_22rem),linear-gradient(180deg,rgba(5,5,6,0)_0%,#050506_96%)]" />
        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-ember/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-66px)] max-w-3xl flex-col justify-end px-4 pb-10 pt-20 sm:px-6 sm:pb-14">
          {step === "intro" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ember">{serviceName}</p>
              <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-bone sm:text-6xl">
                会社は辞めなくていい。
                <span className="mt-7 block">
                  でも、
                  <br />
                  その生き方は
                  <br />
                  もう辞めてもいい。
                </span>
              </h1>
              <p className="mt-7 whitespace-pre-line text-sm leading-7 text-ash sm:text-base">
                {
                  "会社に出す退職届ではありません。\n他人の評価、我慢、狭い世界、会社依存、自分を後回しにする生き方から、\n静かに距離を取るための小さな儀式です。"
                }
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("quiz")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ember"
                >
                  <FilePenLine size={17} strokeWidth={1.8} />
                  退職届を作る
                </button>
              </div>
            </div>
          )}

          {step === "quiz" && (
            <div className="rounded-lg border border-white/10 bg-coal/80 p-5 shadow-glow sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">
                  {String(current + 1).padStart(2, "0")} / {questions.length}
                </p>
                <p className="text-xs text-ash/60">{progress}%</p>
              </div>
              <div className="mt-4 h-px overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-ember transition-all" style={{ width: `${progress}%` }} />
              </div>
              <h2 className="mt-8 text-xl font-semibold leading-8 text-bone sm:text-2xl">{currentQuestion.text}</h2>
              <div className="mt-8 grid gap-3">
                {scaleLabels.map((label, index) => {
                  const score = index + 1;
                  const selected = answers[current] === score;

                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => chooseAnswer(score)}
                      className={`grid min-h-14 grid-cols-[2.25rem_1fr] items-center gap-3 rounded-lg border p-3 text-left transition ${
                        selected
                          ? "border-ember/60 bg-ember/15 text-bone"
                          : "border-white/10 bg-white/[0.035] text-ash hover:border-ember/40 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-sm font-semibold text-ember">
                        {score}
                      </span>
                      <span className="text-sm leading-6">{label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => (current === 0 ? setStep("intro") : setCurrent((value) => value - 1))}
                  className="inline-flex h-10 items-center gap-2 rounded-full px-2 text-sm text-ash transition hover:text-bone"
                >
                  <ArrowLeft size={16} strokeWidth={1.8} />
                  戻る
                </button>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="grid gap-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ember">診断結果</p>
                <h1 className="mt-4 font-serif text-4xl leading-tight text-bone sm:text-6xl">{result.title}</h1>
                <p className="mt-5 whitespace-pre-line text-base leading-7 text-ash">{result.subtitle}</p>
              </div>
              <p className="text-sm leading-7 text-ash sm:text-base">{result.description}</p>
              <section className="rounded-lg border border-ember/25 bg-ember/[0.07] p-5 shadow-glow sm:p-7">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">退職届</p>
                <p className="mt-5 whitespace-pre-line font-serif text-2xl leading-10 text-bone">{result.letter}</p>
              </section>
              <section className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">最初の小さな行動</p>
                <p className="mt-4 text-sm leading-7 text-ash">{result.firstAction}</p>
              </section>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CopyButton text={result.letter} label="退職届をコピー" />
                <CopyButton text={shareText} label="シェア文をコピー" />
              </div>
              <section className="border-t border-white/10 pt-7">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">One More Option Map</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-bone">退職届を作ったあなたへ。</h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-ash">
                  {
                    "退職届は、区切りです。\nでも、本当に必要なのは、その後に何を増やすかです。\n\nOne More Option Mapでは、あなたの仕事・収入・家族・スキル・不安を整理し、次に増やすべき選択肢を1枚のPDFにして返します。"
                  }
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/map"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ember"
                  >
                    自分専用の選択肢マップを作る
                    <ArrowUpRight size={17} strokeWidth={1.8} />
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-bone transition hover:border-ember/40 hover:bg-white/[0.07]"
                  >
                    <RotateCcw size={16} strokeWidth={1.8} />
                    もう一度診断する
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
