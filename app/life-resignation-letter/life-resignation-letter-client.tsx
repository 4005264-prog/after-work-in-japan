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

const serviceName = "莠ｺ逕溘・騾閨ｷ螻翫ず繧ｧ繝阪Ξ繝ｼ繧ｿ繝ｼ";

const scaleLabels = [
  "縺ｾ縺｣縺溘￥蠖薙※縺ｯ縺ｾ繧峨↑縺・",
  "縺ゅ∪繧雁ｽ薙※縺ｯ縺ｾ繧峨↑縺・",
  "縺ｩ縺｡繧峨→繧りｨ縺医↑縺・",
  "蟆代＠蠖薙※縺ｯ縺ｾ繧・",
  "縺ｨ縺ｦ繧ょｽ薙※縺ｯ縺ｾ繧・"
];

const questions: Question[] = [
  {
    category: "evaluationDependency",
    text: "莠ｺ縺九ｉ隧穂ｾ｡縺輔ｌ縺ｦ縺・↑縺・→縲∬・蛻・↓萓｡蛟､縺後↑縺・ｈ縺・↓諢溘§繧・"
  },
  {
    category: "evaluationDependency",
    text: "鬆ｼ縺ｾ繧後ｋ縺ｨ縲∵悽蠖薙・雖後〒繧よ妙繧後↑縺・％縺ｨ縺悟､壹＞"
  },
  {
    category: "evaluationDependency",
    text: "譛溷ｾ・↓蠢懊∴繧九％縺ｨ繧偵∬・蛻・・莠ｺ逕溘ｈ繧雁━蜈医＠縺ｦ縺励∪縺・"
  },
  {
    category: "evaluationDependency",
    text: "縲後＞縺・ｺｺ縲阪後■繧・ｓ縺ｨ縺励※縺・ｋ莠ｺ縲阪〒縺・ｈ縺・→縺励※逍ｲ繧後ｋ"
  },
  {
    category: "companyDependency",
    text: "莉翫・莨夂､ｾ繧貞､ｱ縺｣縺溘ｉ縲∬・蛻・・萓｡蛟､繧ゆｸ九′繧区ｰ励′縺吶ｋ"
  },
  {
    category: "companyDependency",
    text: "閧ｩ譖ｸ縺阪ｄ謇螻槫・縺後↑縺・・蛻・ｒ諠ｳ蜒上☆繧九→荳榊ｮ峨↓縺ｪ繧・"
  },
  {
    category: "companyDependency",
    text: "莨夂､ｾ縺ｮ隧穂ｾ｡縺後∬・蛻・・莠ｺ逕溘・隧穂ｾ｡縺ｮ繧医≧縺ｫ諢溘§繧・"
  },
  {
    category: "companyDependency",
    text: "莉翫・莨夂､ｾ莉･螟悶〒蜒阪￥閾ｪ蛻・ｒ縺ゅ∪繧頑Φ蜒上〒縺阪↑縺・"
  },
  {
    category: "patienceDependency",
    text: "縺､繧峨￥縺ｦ繧よ・諷｢縺ｧ縺阪ｋ縺薙→繧偵∝ｼｷ縺輔□縺ｨ諤昴▲縺ｦ縺阪◆"
  },
  {
    category: "patienceDependency",
    text: "閾ｪ蛻・′辟｡逅・ｒ縺吶ｌ縺ｰ荳ｸ縺丞庶縺ｾ繧句ｴ髱｢縺悟､壹＞"
  },
  {
    category: "patienceDependency",
    text: "莨代・縺薙→繧・焔繧呈栢縺上％縺ｨ縺ｫ鄂ｪ謔ｪ諢溘′縺ゅｋ"
  },
  {
    category: "patienceDependency",
    text: "閾ｪ蛻・・譛ｬ髻ｳ繧医ｊ縲∬ｲｬ莉ｻ繧貞━蜈医☆繧九％縺ｨ縺悟､壹＞"
  },
  {
    category: "narrowWorldDependency",
    text: "莉翫＞繧倶ｼ夂､ｾ繧・･ｭ逡後・螟悶・荳也阜繧偵≠縺ｾ繧顔衍繧峨↑縺・"
  },
  {
    category: "narrowWorldDependency",
    text: "螟悶・荳也阜繧定ｪｿ縺ｹ繧句燕縺ｫ縲瑚・蛻・↓縺ｯ辟｡逅・阪→諤昴▲縺ｦ縺励∪縺・"
  },
  {
    category: "narrowWorldDependency",
    text: "譁ｰ縺励＞謖第姶繧医ｊ縲∽ｻ翫・迺ｰ蠅・〒謌第・縺吶ｋ譁ｹ縺梧･ｽ縺縺ｨ諢溘§繧・"
  },
  {
    category: "narrowWorldDependency",
    text: "縺薙・縺ｾ縺ｾ謨ｰ蟷ｴ邨後▽閾ｪ蛻・ｒ諠ｳ蜒上☆繧九→縲∝ｰ代＠諤悶＞"
  },
  {
    category: "selfPostponement",
    text: "閾ｪ蛻・′菴輔ｒ縺励◆縺・°繧医ｊ縲∝捉繧翫↓霑ｷ諠代ｒ縺九￠縺ｪ縺・％縺ｨ繧貞━蜈医☆繧・"
  },
  {
    category: "selfPostponement",
    text: "螳ｶ譌上ｄ莉穂ｺ九・縺薙→繧定・∴繧九→縲∬・蛻・・莠ｺ逕溘・蠕悟屓縺励↓縺ｪ繧・"
  },
  {
    category: "selfPostponement",
    text: "譛ｬ蠖薙・螟峨∴縺溘＞縺薙→縺後≠繧九・縺ｫ縲∝ｿ吶＠縺輔〒隕九↑縺・ｈ縺・↓縺励※縺・ｋ"
  },
  {
    category: "selfPostponement",
    text: "閾ｪ蛻・・莠ｺ逕溘↓縺､縺・※閠・∴繧九・縺ｯ縲√＞縺､繧ゆｻ穂ｺ九′邨ゅｏ縺｣縺溷ｾ後□"
  }
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
    title: "隧穂ｾ｡萓晏ｭ倥ち繧､繝・",
    subtitle: "騾閨ｷ縺吶∋縺咲函縺肴婿・・\n莉紋ｺｺ縺ｮ隧穂ｾ｡縺縺代〒縲∬・蛻・・萓｡蛟､繧呈ｱｺ繧√ｋ逕溘″譁ｹ",
    description:
      "縺ゅ↑縺溘・縲∽ｺｺ縺九ｉ蠢・ｦ√→縺輔ｌ繧九％縺ｨ縺ｫ螳牙ｿ・ｒ諢溘§繧・☆縺・ち繧､繝励〒縺吶りｩ穂ｾ｡縺輔ｌ繧九％縺ｨ閾ｪ菴薙・謔ｪ縺上≠繧翫∪縺帙ｓ縲ゅ◆縺縲√◎縺ｮ隧穂ｾ｡縺後↑縺・→閾ｪ蛻・・萓｡蛟､縺ｾ縺ｧ謠ｺ繧峨＞縺ｧ縺励∪縺・↑繧峨∝ｰ代＠蜊ｱ髯ｺ縺ｧ縺吶・",
    letter:
      "遘√・譛ｬ譌･繧偵ｂ縺｣縺ｦ縲・\n縲御ｻ紋ｺｺ縺ｮ隧穂ｾ｡縺縺代〒閾ｪ蛻・・萓｡蛟､繧呈ｱｺ繧√ｋ逕溘″譁ｹ縲・\n繧帝閨ｷ縺励∪縺吶・\n\n縺薙ｌ縺九ｉ縺ｯ縲・\n隱ｰ縺九↓隱阪ａ繧峨ｌ繧句燕縺ｫ縲・\n閾ｪ蛻・′菴輔ｒ驕ｸ縺ｳ縺溘＞縺ｮ縺九ｒ遒ｺ隱阪＠縺ｾ縺吶・",
    firstAction:
      "莉頑律縲∬・蛻・′譛ｬ蠖薙・譁ｭ繧翫◆縺九▲縺溘％縺ｨ繧・縺､縺縺第嶌縺榊・縺励※縺上□縺輔＞縲・"
  },
  companyDependency: {
    title: "莨夂､ｾ萓晏ｭ倥ち繧､繝・",
    subtitle: "騾閨ｷ縺吶∋縺咲函縺肴婿・・\n荳縺､縺ｮ莨夂､ｾ縲∽ｸ縺､縺ｮ閧ｩ譖ｸ縺阪↓螳牙ｿ・ｒ鬆舌￠繧狗函縺肴婿",
    description:
      "縺ゅ↑縺溘・縲∽ｼ夂､ｾ繧・か譖ｸ縺阪↓繧医▲縺ｦ螳牙ｿ・ｒ蠕励※縺・ｋ驛ｨ蛻・′螟ｧ縺阪＞繧ｿ繧､繝励〒縺吶ょｮ牙ｮ壹ｒ豎ゅａ繧九％縺ｨ縺ｯ閾ｪ辟ｶ縺ｧ縺吶ゅ◆縺縲√◎縺ｮ螳牙ｮ壹′縲碁∈謚櫁い縺ｮ蟆代↑縺輔阪↓繧医▲縺ｦ謌舌ｊ遶九▲縺ｦ縺・ｋ縺ｪ繧峨∬ｦ狗峩縺吝ｿ・ｦ√′縺ゅｊ縺ｾ縺吶・",
    letter:
      "遘√・譛ｬ譌･繧偵ｂ縺｣縺ｦ縲・\n縲御ｸ縺､縺ｮ莨夂､ｾ縺縺代↓螳牙ｿ・ｒ鬆舌￠繧狗函縺肴婿縲・\n繧帝閨ｷ縺励∪縺吶・\n\n縺薙ｌ縺九ｉ縺ｯ縲・\n莉翫＞繧句ｴ謇繧貞､ｧ蛻・↓縺励↑縺後ｉ縲・\n螟悶・荳也阜繧りｦ九↓陦後″縺ｾ縺吶・",
    firstAction:
      "霆｢閨ｷ縺吶ｋ縺九←縺・°縺ｯ豎ｺ繧√★縺ｫ縲∽ｻ企ｱ荳ｭ縺ｫ莉翫・讌ｭ逡御ｻ･螟悶・豎ゆｺｺ繧・莉ｶ縺縺題ｦ九※縺上□縺輔＞縲・"
  },
  patienceDependency: {
    title: "謌第・萓晏ｭ倥ち繧､繝・",
    subtitle: "騾閨ｷ縺吶∋縺咲函縺肴婿・・\n謌第・縺ｧ縺阪ｋ縺薙→繧偵∝ｼｷ縺輔□縺ｨ諤昴＞霎ｼ繧逕溘″譁ｹ",
    description:
      "縺ゅ↑縺溘・雋ｬ莉ｻ諢溘′蠑ｷ縺上√▽繧峨＞迥ｶ豕√〒繧りｸ上ｓ蠑ｵ繧後ｋ繧ｿ繧､繝励〒縺吶ゅ◆縺縲∵・諷｢縺檎ｿ呈・縺ｫ縺ｪ繧九→縲∬・蛻・′菴輔↓蛯ｷ縺､縺・※縺・ｋ縺ｮ縺句・縺九ｉ縺ｪ縺上↑繧翫∪縺吶・",
    letter:
      "遘√・譛ｬ譌･繧偵ｂ縺｣縺ｦ縲・\n縲梧・諷｢縺ｧ縺阪ｋ縺薙→繧貞ｼｷ縺輔□縺ｨ諤昴＞霎ｼ繧逕溘″譁ｹ縲・\n繧帝閨ｷ縺励∪縺吶・\n\n縺薙ｌ縺九ｉ縺ｯ縲・\n閠舌∴繧句燕縺ｫ縲・\n譛ｬ蠖薙↓閠舌∴繧句ｿ・ｦ√′縺ゅｋ縺ｮ縺九ｒ閠・∴縺ｾ縺吶・",
    firstAction:
      "譛霑第・諷｢縺励◆縺薙→繧・縺､譖ｸ縺阪√◎縺ｮ謌第・縺梧悽蠖薙↓蠢・ｦ√□縺｣縺溘°繧定・∴縺ｦ縺上□縺輔＞縲・"
  },
  narrowWorldDependency: {
    title: "迢ｭ縺・ｸ也阜繧ｿ繧､繝・",
    subtitle: "騾閨ｷ縺吶∋縺咲函縺肴婿・・\n隕九◆縺薙→縺ｮ縺ｪ縺・ｸ也阜繧偵∬ｦ九↑縺・∪縺ｾ隲ｦ繧√ｋ逕溘″譁ｹ",
    description:
      "縺ゅ↑縺溘・縲∽ｻ翫＞繧倶ｼ夂､ｾ繧・･ｭ逡後・荳ｭ縺ｧ譛ｪ譚･繧定・∴繧区凾髢薙′髟ｷ縺上↑縺｣縺ｦ縺・ｋ蜿ｯ閭ｽ諤ｧ縺後≠繧翫∪縺吶ゆｻ翫☆縺仙､峨ｏ繧句ｿ・ｦ√・縺ゅｊ縺ｾ縺帙ｓ縲ゅ〒繧ゅ∝､悶ｒ隕九↑縺・∪縺ｾ縲瑚・蛻・↓縺ｯ辟｡逅・阪→豎ｺ繧√ｋ縺ｮ縺ｯ譌ｩ縺吶℃縺ｾ縺吶・",
    letter:
      "遘√・譛ｬ譌･繧偵ｂ縺｣縺ｦ縲・\n縲瑚ｦ九◆縺薙→縺ｮ縺ｪ縺・ｸ也阜繧偵∬ｦ九↑縺・∪縺ｾ隲ｦ繧√ｋ逕溘″譁ｹ縲・\n繧帝閨ｷ縺励∪縺吶・\n\n縺薙ｌ縺九ｉ縺ｯ縲・\n辟｡逅・□縺ｨ豎ｺ繧√ｋ蜑阪↓縲・\n閾ｪ蛻・・逶ｮ縺ｧ遒ｺ縺九ａ縺ｫ陦後″縺ｾ縺吶・",
    firstAction:
      "莉企ｱ縲∽ｻ翫＞繧区･ｭ逡後・螟門・縺ｫ縺ゅｋ諠・ｱ繧・0蛻・□縺題ｦ九※縺上□縺輔＞縲・"
  },
  selfPostponement: {
    title: "閾ｪ蛻・ｾ悟屓縺励ち繧､繝・",
    subtitle: "騾閨ｷ縺吶∋縺咲函縺肴婿・・\n閾ｪ蛻・・莠ｺ逕溘ｒ縲√＞縺､繧よ怙蠕後↓蝗槭☆逕溘″譁ｹ",
    description:
      "縺ゅ↑縺溘・縲∝ｮｶ譌上∽ｻ穂ｺ九∝捉蝗ｲ縺ｮ莠ｺ繧貞､ｧ蛻・↓縺ｧ縺阪ｋ繧ｿ繧､繝励〒縺吶ゅ◆縺縲∬・蛻・・莠ｺ逕溘ｒ蠕悟屓縺励↓縺礼ｶ壹￠繧九→縲√＞縺､縺倶ｽ輔ｒ驕ｸ縺ｳ縺溘°縺｣縺溘・縺句・縺九ｉ縺ｪ縺上↑繧翫∪縺吶・",
    letter:
      "遘√・譛ｬ譌･繧偵ｂ縺｣縺ｦ縲・\n縲瑚・蛻・・莠ｺ逕溘ｒ縲√＞縺､繧よ怙蠕後↓蝗槭☆逕溘″譁ｹ縲・\n繧帝閨ｷ縺励∪縺吶・\n\n縺薙ｌ縺九ｉ縺ｯ縲・\n隱ｰ縺九ｒ螟ｧ蛻・↓縺吶ｋ縺溘ａ縺ｫ繧ゅ・\n閾ｪ蛻・・驕ｸ謚櫁い繧呈ｮ九＠縺ｾ縺吶・",
    firstAction:
      "莉頑律縲∬・蛻・・縺溘ａ縺縺代↓菴ｿ縺・0蛻・ｒ莠亥ｮ壹↓蜈･繧後※縺上□縺輔＞縲・"
  }
};

const shareText =
  "莨夂､ｾ縺ｯ霎槭ａ縺ｪ縺・・\n縺ｧ繧ゅ√％縺ｮ逕溘″譁ｹ縺ｯ霎槭ａ繧九・\n\n遘√・莠ｺ逕溘・騾閨ｷ螻翫ｒ菴懊ｊ縺ｾ縺励◆縲・\n#莠ｺ逕溘・騾閨ｷ螻・\n#OneMoreOption";

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
      {copied ? "Copied" : label}
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
                莨夂､ｾ縺ｯ霎槭ａ縺ｪ縺上※縺・＞縲・
                <span className="mt-7 block">
                  縺ｧ繧ゅ・
                  <br />
                  縺昴・逕溘″譁ｹ縺ｯ
                  <br />
                  繧ゅ≧霎槭ａ縺ｦ繧ゅ＞縺・・
                </span>
              </h1>
              <p className="mt-7 whitespace-pre-line text-sm leading-7 text-ash sm:text-base">
                {
                  "莨夂､ｾ縺ｫ蜃ｺ縺咎閨ｷ螻翫〒縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲・\n莉紋ｺｺ縺ｮ隧穂ｾ｡縲∵・諷｢縲∫強縺・ｸ也阜縲∽ｼ夂､ｾ萓晏ｭ倥∬・蛻・ｒ蠕悟屓縺励↓縺吶ｋ逕溘″譁ｹ縺九ｉ縲・\n髱吶°縺ｫ霍晞屬繧貞叙繧九◆繧√・蟆上＆縺ｪ蜆蠑上〒縺吶・"
                }
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("quiz")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ember"
                >
                  <FilePenLine size={17} strokeWidth={1.8} />
                  騾閨ｷ螻翫ｒ菴懊ｋ
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
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="grid gap-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ember">Result</p>
                <h1 className="mt-4 font-serif text-4xl leading-tight text-bone sm:text-6xl">{result.title}</h1>
                <p className="mt-5 whitespace-pre-line text-base leading-7 text-ash">{result.subtitle}</p>
              </div>
              <p className="text-sm leading-7 text-ash sm:text-base">{result.description}</p>
              <section className="rounded-lg border border-ember/25 bg-ember/[0.07] p-5 shadow-glow sm:p-7">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">Letter</p>
                <p className="mt-5 whitespace-pre-line font-serif text-2xl leading-10 text-bone">{result.letter}</p>
              </section>
              <section className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">First small action</p>
                <p className="mt-4 text-sm leading-7 text-ash">{result.firstAction}</p>
              </section>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CopyButton text={result.letter} label="Copy letter" />
                <CopyButton text={shareText} label="Copy share text" />
              </div>
              <section className="border-t border-white/10 pt-7">
                <p className="text-xs uppercase tracking-[0.28em] text-ember">One More Option Map</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-bone">騾閨ｷ螻翫ｒ菴懊▲縺溘≠縺ｪ縺溘∈縲・</h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-ash">
                  {
                    "騾閨ｷ螻翫・縲∝玄蛻・ｊ縺ｧ縺吶・\n縺ｧ繧ゅ∵悽蠖薙↓蠢・ｦ√↑縺ｮ縺ｯ縲√◎縺ｮ蠕後↓菴輔ｒ蠅励ｄ縺吶°縺ｧ縺吶・\n\nOne More Option Map縺ｧ縺ｯ縲√≠縺ｪ縺溘・莉穂ｺ九・蜿主・繝ｻ螳ｶ譌上・繧ｹ繧ｭ繝ｫ繝ｻ荳榊ｮ峨ｒ謨ｴ逅・＠縲∵ｬ｡縺ｫ蠅励ｄ縺吶∋縺埼∈謚櫁い繧・譫壹・PDF縺ｫ縺励※霑斐＠縺ｾ縺吶・"
                  }
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/map"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ember"
                  >
                    閾ｪ蛻・ｰら畑縺ｮ驕ｸ謚櫁い繝槭ャ繝励ｒ菴懊ｋ
                    <ArrowUpRight size={17} strokeWidth={1.8} />
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-bone transition hover:border-ember/40 hover:bg-white/[0.07]"
                  >
                    <RotateCcw size={16} strokeWidth={1.8} />
                    Start again
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
