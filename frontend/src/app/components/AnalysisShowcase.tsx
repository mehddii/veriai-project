import { motion } from "motion/react";
import { Bot, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AnalysisShowcaseProps {
  compact?: boolean;
}

const signalRows = [
  { label: "Stylometric drift", value: "94%", tone: "ai" },
  { label: "Sentence entropy", value: "67%", tone: "mixed" },
  { label: "Human cadence", value: "18%", tone: "human" },
];

export function AnalysisShowcase({ compact = false }: AnalysisShowcaseProps) {
  const { isDark } = useApp();

  const shell = isDark
    ? "border-white/10 bg-slate-950/72 shadow-[0_30px_80px_-36px_rgba(2,6,23,0.9)]"
    : "border-slate-200 bg-white/92 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.18)]";
  const panel = isDark ? "border-white/8 bg-white/4" : "border-slate-200 bg-slate-50/90";
  const title = isDark ? "text-slate-100" : "text-slate-900";
  const text = isDark ? "text-slate-300" : "text-slate-600";
  const muted = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <div className={`relative ${compact ? "mx-auto max-w-[380px]" : "mx-auto max-w-[560px]"}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`relative overflow-hidden rounded-[2rem] border p-5 ${shell}`}
      >
        <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Editorial detection panel
            </div>
            <h3 className={`text-[18px] font-semibold tracking-[-0.03em] ${title}`}>Structured analysis preview</h3>
          </div>

          <div className={`rounded-2xl border px-3 py-2 text-right ${panel}`}>
            <div className={`text-[10px] uppercase tracking-[0.18em] ${muted}`}>Signal</div>
            <div className="font-mono text-[18px] font-bold text-blue-600">92%</div>
          </div>
        </div>

        <div className={`rounded-[1.5rem] border p-4 ${panel}`}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className={`mb-1 text-[11px] uppercase tracking-[0.18em] ${muted}`}>Submission summary</div>
              <p className={`max-w-[34ch] text-[13px] leading-6 ${text}`}>
                Multi-model review isolates suspicious phrasing, sentence rhythm, and distribution anomalies without cluttering the scan flow.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_18px_32px_-20px_rgba(37,99,235,0.85)]"
            >
              <ScanSearch className="h-5 w-5" />
            </motion.div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              {signalRows.map((row, index) => {
                const color =
                  row.tone === "ai"
                    ? "bg-red-500"
                    : row.tone === "human"
                    ? "bg-green-500"
                    : "bg-amber-500";
                const stripe =
                  row.tone === "ai"
                    ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200"
                    : row.tone === "human"
                    ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-200"
                    : "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-100";

                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`rounded-2xl border px-3 py-3 ${stripe}`}
                  >
                    <div className="mb-2 flex items-center justify-between text-[12px] font-medium">
                      <span>{row.label}</span>
                      <span className="font-mono">{row.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/6 dark:bg-white/8">
                      <div
                        className={`h-full rounded-full ${color}`}
                        style={{ width: row.value }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid gap-3">
              <div className={`rounded-2xl border p-3 ${panel}`}>
                <div className={`mb-2 flex items-center gap-2 text-[12px] font-medium ${title}`}>
                  <Bot className="h-4 w-4 text-blue-600" />
                  Model attribution
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: "GPT-4", score: 72 },
                    { name: "Claude", score: 19 },
                    { name: "Gemini", score: 9 },
                  ].map((model) => (
                    <div key={model.name}>
                      <div className={`mb-1 flex items-center justify-between text-[11px] ${text}`}>
                        <span>{model.name}</span>
                        <span className="font-mono">{model.score}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                          style={{ width: `${model.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
              >
                <div className="mb-1 flex items-center gap-2 text-[12px] font-semibold">
                  <Sparkles className="h-4 w-4" />
                  Needs review
                </div>
                <p className="text-[12px] leading-5 opacity-80">
                  Sentence-level highlights stay readable, academic, and actionable for reviewers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
