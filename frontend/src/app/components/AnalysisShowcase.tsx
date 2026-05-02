import { motion } from "motion/react";
import {
  BarChartIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
  TargetIcon,
} from "@radix-ui/react-icons";
import { useApp } from "../context/AppContext";

interface AnalysisShowcaseProps {
  compact?: boolean;
}

const excerptLines = [
  { text: "The review committee compared sentence rhythm, clause repetition, and lexical variance across the submission.", tone: "human" },
  { text: "Several transitional phrases align with high-confidence synthetic patterns seen across large language model outputs.", tone: "mixed" },
  { text: "The closing section presents statistically unlikely uniformity in cadence and paragraph structure.", tone: "ai" },
];

const modelRows = [
  { name: "GPT-4 family", score: 72 },
  { name: "Claude family", score: 19 },
  { name: "Gemini family", score: 9 },
];

export function AnalysisShowcase({ compact = false }: AnalysisShowcaseProps) {
  const { isDark } = useApp();

  const shell = isDark
    ? "border-white/10 bg-slate-950/78 shadow-[0_34px_90px_-42px_rgba(2,6,23,0.95)]"
    : "border-slate-300/80 bg-[#fcfbf8] shadow-[0_34px_90px_-46px_rgba(15,23,42,0.18)]";
  const sheet = isDark
    ? "border-white/10 bg-slate-900/80"
    : "border-[#d9d1c3] bg-[#fffdfa]";
  const side = isDark
    ? "border-white/10 bg-slate-950/70"
    : "border-slate-200/80 bg-white/86";
  const textPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-300" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
      className={`relative overflow-hidden rounded-[2rem] border p-5 ${shell} ${compact ? "" : "max-w-[720px]"}`}
      style={!isDark ? { transform: "rotate(-1.2deg)" } : undefined}
    >
      <div className="absolute inset-x-8 top-0 h-24 rounded-full bg-blue-500/8 blur-3xl" />

      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
            <TargetIcon className="h-3.5 w-3.5" />
            Evidence preview
          </div>
          <h3 className={`text-[19px] font-semibold tracking-[-0.03em] ${textPrimary}`}>What a reviewer sees after submission</h3>
        </div>

        <div className={`rounded-[1.35rem] border px-3 py-2 text-right ${side}`}>
          <div className={`text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>Likelihood</div>
          <div className="font-mono text-[20px] font-bold text-blue-600">92%</div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className={`rounded-[1.65rem] border p-4 ${sheet}`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className={`text-[10px] uppercase tracking-[0.18em] ${textMuted}`}>Annotated excerpt</div>
              <p className={`mt-1 text-[12px] ${textSecondary}`}>Sentence-level review stays legible, quiet, and specific.</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
              <MagicWandIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-slate-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/4">
            <div className="mb-3 flex items-center justify-between">
              <div className={`text-[11px] uppercase tracking-[0.15em] ${textMuted}`}>Manuscript review note</div>
              <div className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${isDark ? "bg-amber-500/10 text-amber-100" : "bg-amber-50 text-amber-800"}`}>
                Needs review
              </div>
            </div>

            <div className="space-y-3">
              {excerptLines.map((line) => {
                const toneClass =
                  line.tone === "ai"
                    ? "border-red-200 bg-red-50 text-red-900 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-100"
                    : line.tone === "mixed"
                    ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
                    : "border-green-200 bg-green-50 text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100";

                return (
                  <div key={line.text} className={`rounded-[1rem] border px-3 py-3 text-[12.5px] leading-6 ${toneClass}`}>
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className={`rounded-[1.65rem] border p-4 ${side}`}>
            <div className="mb-3 flex items-center gap-2">
              <MixerHorizontalIcon className="h-4 w-4 text-blue-600" />
              <div className={`text-[12px] font-semibold ${textPrimary}`}>Structured signal summary</div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Stylometric drift", value: "94%", tone: "bg-red-500" },
                { label: "Sentence entropy", value: "67%", tone: "bg-amber-500" },
                { label: "Human cadence", value: "18%", tone: "bg-green-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className={`mb-1.5 flex items-center justify-between text-[12px] ${textSecondary}`}>
                    <span>{item.label}</span>
                    <span className="font-mono">{item.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/8">
                    <div className={`h-full rounded-full ${item.tone}`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[1.65rem] border p-4 ${side}`}>
            <div className="mb-3 flex items-center gap-2">
              <BarChartIcon className="h-4 w-4 text-blue-600" />
              <div className={`text-[12px] font-semibold ${textPrimary}`}>Model attribution</div>
            </div>

            <div className="space-y-3">
              {modelRows.map((model) => (
                <div key={model.name}>
                  <div className={`mb-1.5 flex items-center justify-between text-[12px] ${textSecondary}`}>
                    <span>{model.name}</span>
                    <span className="font-mono">{model.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                      style={{ width: `${model.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.65rem] border border-amber-200 bg-amber-50 px-4 py-4 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]">Interpretation</div>
            <p className="text-[12px] leading-6 opacity-85">
              The result is designed to support a reviewer’s judgment with readable evidence, not replace it with a dramatic verdict.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
