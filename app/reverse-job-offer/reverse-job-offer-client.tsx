"use client";

import { ArrowLeft, ArrowRight, Check, Clipboard, FileText, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

type Step = "intro" | "form" | "result";

type Answers = {
  concern: string;
  dependence: string;
  protect: string[];
  quitPattern: string;
  options: string[];
  strengths: string;
  halfYear: string;
};

type Question =
  | {
      id: keyof Answers;
      label: string;
      type: "textarea";
      placeholder: string;
    }
  | {
      id: keyof Answers;
      label: string;
      type: "select";
      options: string[];
    }
  | {
      id: keyof Answers;
      label: string;
      type: "checkbox";
      options: string[];
    };

const googleFormUrl = "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM";

const initialAnswers: Answers = {
  concern: "",
  dependence: "",
  protect: [],
  quitPattern: "",
  options: [],
  strengths: "",
  halfYear: ""
};

const questions: Question[] = [
  {
    id: "concern",
    label: "今の仕事や生活で、いちばん不安に感じていることは何ですか？",
    type: "textarea",
    placeholder: "例：このまま今の会社だけで生きていけるのか不安"
  },
  {
    id: "dependence",
    label: "今の会社や環境に、どれくらい依存していると感じますか？",
    type: "select",
    options: ["かなり依存している", "少し依存している", "あまり依存していない", "分からない"]
  },
  {
    id: "protect",
    label: "あなたが守りたいものは何ですか？",
    type: "checkbox",
    options: ["家族", "収入", "時間", "健康", "自分の可能性", "今の仕事", "安心感", "その他"]
  },
  {
    id: "quitPattern",
    label: "もう続けたくない生き方は何ですか？",
    type: "textarea",
    placeholder: "例：会社の評価だけで自分の価値を決める生き方"
  },
  {
    id: "options",
    label: "これから増やしたい選択肢は何ですか？",
    type: "checkbox",
    options: [
      "会社以外の収入源",
      "他社でも通用するスキル",
      "家族と話せる未来",
      "副業",
      "転職の準備",
      "学習習慣",
      "発信",
      "時間の余裕",
      "分からない"
    ]
  },
  {
    id: "strengths",
    label: "これまでの経験で、他でも使えそうなものは何ですか？",
    type: "textarea",
    placeholder: "例：接客、教える力、継続力、ITの知識、現場経験"
  },
  {
    id: "halfYear",
    label: "半年後、どんな状態になっていたいですか？",
    type: "textarea",
    placeholder: "例：今の会社に残るとしても、会社以外の選択肢を1つ持っていたい"
  }
];

const shareText =
  "未来の自分から、\n求人票が届きました。\n\n会社を辞めたいわけじゃない。\nでも、今の会社だけに未来を預けたくない。\n\n#人生の逆求人票";

function includesAny(value: string, words: string[]) {
  return words.some((word) => value.includes(word));
}

function chooseJobTitle(answers: Answers) {
  const text = `${answers.concern} ${answers.quitPattern} ${answers.strengths} ${answers.halfYear}`;

  if (answers.options.includes("会社以外の収入源") || answers.options.includes("副業") || answers.protect.includes("収入")) {
    return "収入源を一つにしない人";
  }

  if (answers.protect.includes("家族") || answers.options.includes("家族と話せる未来")) {
    return "家族を守るために逃げ道を作る人";
  }

  if (includesAny(text, ["評価", "価値", "肩書き"])) {
    return "自分の価値を会社だけに預けない人";
  }

  if (includesAny(text, ["我慢", "無理", "耐える", "つらい"])) {
    return "我慢を仕事にしない人";
  }

  if (includesAny(text, ["後回し", "自分の人生", "自分のため"])) {
    return "自分の人生を後回しにしない人";
  }

  if (answers.options.includes("転職の準備") || answers.dependence === "かなり依存している") {
    return "今の仕事を続けながら外を見る人";
  }

  if (answers.dependence === "分からない" || answers.options.includes("分からない")) {
    return "情報不足を能力不足だと思わない人";
  }

  if (answers.options.includes("他社でも通用するスキル") || answers.options.includes("学習習慣")) {
    return "会社に残っても選べる人";
  }

  if (includesAny(text, ["知らない", "外", "世界"])) {
    return "見たことのない世界を見に行く人";
  }

  return "会社以外にも選択肢を持つ会社員";
}

function sentence(value: string, fallback: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.replace(/[。.\s]+$/g, "") : fallback;
}

function listOrFallback(values: string[], fallback: string) {
  return values.length > 0 ? values.join("、") : fallback;
}

function buildOffer(answers: Answers) {
  const title = chooseJobTitle(answers);
  const concern = sentence(answers.concern, "今の会社だけに未来を預ける不安");
  const quitPattern = sentence(answers.quitPattern, "会社の評価だけで自分の価値を決める生き方");
  const options = listOrFallback(answers.options, "会社以外の選択肢");
  const protect = listOrFallback(answers.protect, "安心感");
  const strengths = sentence(answers.strengths, "これまで積み重ねてきた経験");
  const halfYear = sentence(answers.halfYear, "会社に残るとしても、会社以外の選択肢を1つ持っている状態");

  return [
    "求人票",
    "",
    "募集職種：",
    title,
    "",
    "募集元：",
    "半年後のあなた",
    "",
    "仕事内容：",
    "今の仕事を続けながら、外の世界を少しずつ見ること。",
    `${quitPattern}から距離を取ること。`,
    `${protect}を守るために、${options}を増やすこと。`,
    "",
    "必須条件：",
    "今すぐ辞めようとしないこと。",
    "でも、外を見ることを後回しにしないこと。",
    `${concern}をごまかさず、言葉にすること。`,
    "",
    "歓迎条件：",
    `${strengths}を、今の場所だけで終わらせないこと。`,
    "小さく試すことを怖がりすぎないこと。",
    "",
    "勤務地：",
    "今の会社。",
    "自宅。",
    "まだ見たことのない世界。",
    "",
    "報酬：",
    "少し増えた安心感。",
    "家族や自分に話せる未来。",
    "会社に残るとしても、選べる自分。",
    "",
    "試用期間：",
    "今日から7日間。",
    "",
    "最初の仕事：",
    `${halfYear}に近づくために、今週中に会社以外の選択肢を1つだけ調べること。`
  ].join("\n");
}

function CopyButton({ text, children }: { text: string; children: React.ReactNode }) {
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
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-4 text-sm font-semibold text-stone-100 transition hover:border-[#d69a55]/60 hover:bg-[#d69a55]/10"
    >
      {copied ? <Check size={17} strokeWidth={1.8} /> : <Clipboard size={17} strokeWidth={1.8} />}
      {copied ? "コピーしました" : children}
    </button>
  );
}

export function ReverseJobOfferClient() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const offer = useMemo(() => buildOffer(answers), [answers]);
  const question = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  function updateText(id: keyof Answers, value: string) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [id]: value }));
  }

  function toggleValue(id: keyof Answers, value: string) {
    setAnswers((currentAnswers) => {
      const values = currentAnswers[id];
      if (!Array.isArray(values)) return currentAnswers;
      return {
        ...currentAnswers,
        [id]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
      };
    });
  }

  function next() {
    if (current === questions.length - 1) {
      setStep("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrent((value) => value + 1);
  }

  function back() {
    if (current === 0) {
      setStep("intro");
      return;
    }

    setCurrent((value) => value - 1);
  }

  function restart() {
    setAnswers(initialAnswers);
    setCurrent(0);
    setStep("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-[100svh] bg-[#050506] text-stone-100">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_8%,rgba(214,154,85,0.16),transparent_18rem),radial-gradient(circle_at_86%_18%,rgba(125,38,46,0.14),transparent_20rem),linear-gradient(180deg,#050506_0%,#101012_46%,#050506_100%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />

      {step === "intro" && (
        <section className="relative mx-auto flex min-h-[100svh] max-w-[35rem] flex-col justify-end px-4 pb-8 pt-14 sm:px-6 sm:pb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#d69a55]">人生の逆求人票</p>
          <h1 className="mt-6 font-serif text-[3.15rem] leading-[0.94] text-stone-100 sm:text-7xl">
            会社を辞めたい
            <br />
            わけじゃない。
            <span className="mt-8 block text-[2.45rem] leading-[1.06] text-stone-100/92 sm:text-6xl">
              でも、
              <br />
              今の会社だけに
              <br />
              未来を預けたくない。
            </span>
          </h1>
          <p className="mt-7 whitespace-pre-line text-[15px] leading-8 text-stone-300">
            {
              "人生の逆求人票は、\n未来の自分があなたに出している求人票を作る無料ジェネレーターです。\n\n今すぐ辞めるためではなく、\nもう一つの選択肢を考えるための小さな診断です。"
            }
          </p>
          <div className="mt-8 grid grid-cols-3 border-y border-white/10 py-4">
            {["7問", "無料", "保存なし"].map((item) => (
              <div key={item} className="border-r border-white/10 text-center last:border-r-0">
                <p className="text-xs font-semibold tracking-[0.18em] text-stone-100">{item}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep("form")}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-stone-100 px-6 text-[15px] font-semibold text-[#050506] transition hover:bg-[#d69a55]"
          >
            <FileText size={18} strokeWidth={1.8} />
            求人票を作る
          </button>
        </section>
      )}

      {step === "form" && (
        <section className="relative mx-auto grid min-h-[100svh] max-w-[35rem] grid-rows-[auto_1fr_auto] px-4 pb-5 pt-6 sm:px-6 sm:py-9">
          <header>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm text-stone-300 transition hover:text-stone-100"
              >
                <ArrowLeft size={18} strokeWidth={1.8} />
                戻る
              </button>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d69a55]">
                  Question {current + 1} / {questions.length}
                </p>
                <p className="mt-1 text-xs text-stone-400">{progress}% complete</p>
              </div>
            </div>
            <div className="mt-4 h-1 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#d69a55] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </header>

          <div className="flex items-center py-8">
            <div className="w-full">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">future job brief</p>
              <h2 className="mt-5 text-[1.72rem] font-semibold leading-[1.34] text-stone-100 sm:text-4xl">
                {question.label}
              </h2>

              <div className="mt-8">
                {question.type === "textarea" && (
                  <textarea
                    value={answers[question.id] as string}
                    onChange={(event) => updateText(question.id, event.target.value)}
                    placeholder={question.placeholder}
                    rows={6}
                    className="min-h-44 w-full resize-none rounded-lg border border-white/10 bg-white/[0.045] px-4 py-4 text-base leading-7 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-[#d69a55]/70 focus:bg-white/[0.065]"
                  />
                )}

                {question.type === "select" && (
                  <div className="grid gap-2">
                    {question.options.map((option) => {
                      const selected = answers.dependence === option;
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => updateText(question.id, option)}
                          className={`min-h-[3.7rem] rounded-lg border px-4 text-left text-[15px] transition ${
                            selected
                              ? "border-[#d69a55]/70 bg-[#d69a55]/15 text-stone-100"
                              : "border-white/10 bg-white/[0.04] text-stone-300 hover:border-[#d69a55]/50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {question.type === "checkbox" && (
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option) => {
                      const values = answers[question.id];
                      const selected = Array.isArray(values) && values.includes(option);
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => toggleValue(question.id, option)}
                          className={`min-h-[3.4rem] rounded-lg border px-3 text-left text-sm transition ${
                            selected
                              ? "border-[#d69a55]/70 bg-[#d69a55]/15 text-stone-100"
                              : "border-white/10 bg-white/[0.04] text-stone-300 hover:border-[#d69a55]/50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-stone-100 px-6 text-[15px] font-semibold text-[#050506] transition hover:bg-[#d69a55]"
          >
            {current === questions.length - 1 ? "求人票を生成する" : "次へ"}
            <ArrowRight size={18} strokeWidth={1.8} />
          </button>
        </section>
      )}

      {step === "result" && (
        <section className="relative mx-auto max-w-[42rem] px-4 py-8 sm:px-6 sm:py-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#d69a55]">人生の逆求人票</p>
            <h1 className="mt-4 font-serif text-[3rem] leading-[0.98] text-stone-100 sm:text-7xl">求人票が届きました。</h1>
            <p className="mt-5 text-[15px] leading-8 text-stone-300">
              これは実在する求人ではありません。
              <br />
              未来の選択肢を考えるための診断コンテンツです。
            </p>
          </div>

          <article className="mt-8 rounded-lg border border-[#d69a55]/35 bg-[linear-gradient(180deg,rgba(214,154,85,0.12),rgba(255,255,255,0.035))] p-5 shadow-[0_0_90px_rgba(214,154,85,0.15)] sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d69a55]">fictional job posting</p>
                <p className="mt-2 text-sm text-stone-400">from your future self</p>
              </div>
              <FileText size={22} className="text-[#d69a55]" strokeWidth={1.65} />
            </div>
            <pre className="mt-6 whitespace-pre-wrap font-serif text-[1.28rem] leading-[1.72] text-stone-100 sm:text-3xl">
              {offer}
            </pre>
          </article>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <CopyButton text={offer}>コピーする</CopyButton>
            <CopyButton text={shareText}>Xでシェア文をコピー</CopyButton>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-stone-100 transition hover:border-[#d69a55]/60 hover:bg-[#d69a55]/10"
            >
              <RotateCcw size={17} strokeWidth={1.8} />
              もう一度作る
            </button>
          </div>

          <section className="mt-10 border-t border-white/10 pt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d69a55]">One More Option Map</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-100">求人票を作ったあなたへ。</h2>
            <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-stone-300">
              {
                "求人票は、きっかけです。\nでも、本当に必要なのは、次に何を増やすかを決めることです。\n\n仕事・収入・家族・スキル・不安を整理して、\n次に増やすべき選択肢を1枚のPDFにする\nOne More Option Mapを準備しています。"
              }
            </p>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-stone-100 px-5 text-center text-[15px] font-semibold text-[#050506] transition hover:bg-[#d69a55] sm:w-auto"
            >
              個別Mapを申し込む
              <ArrowRight size={18} strokeWidth={1.8} />
            </a>
            <p className="mt-3 text-xs leading-6 text-stone-500">現在はテスト版です。申込はGoogleフォームで受け付けています。</p>
          </section>
        </section>
      )}
    </main>
  );
}
