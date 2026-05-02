import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { AnalyzePayload, InputPanel } from "../components/InputPanel";
import { Sidebar } from "../components/Sidebar";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";
import { AnalysisShowcase } from "../components/AnalysisShowcase";

export function GuestDashboard() {
  const { isDark, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  const textPrimary = isDark ? "text-slate-50" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-300" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";

  const handleAnalyze = (_payload: AnalyzePayload) => {
    setNotice("Sign in is required to run analysis.");
    navigate("/login");
  };

  return (
    <div>
      <Header variant="guest" />

      <main className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_30px_80px_-48px_rgba(2,6,23,0.95)] xl:grid-cols-[0.94fr_1.06fr]"
            >
              <div className="flex flex-col justify-center">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Enterprise-grade AI detection
                </div>
                <h1 className={`max-w-[12ch] text-[clamp(2.1rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.05em] ${textPrimary}`}>
                  Review text with a cleaner evidence trail.
                </h1>
                <p className={`mt-4 max-w-[54ch] text-[14px] leading-7 ${textSecondary}`}>
                  Paste text or upload a document to inspect likely AI authorship, confidence, and highlighted sentence risk without changing your backend workflow.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Models", value: "6" },
                    { label: "Max file", value: "10MB" },
                    { label: "Turnaround", value: "< 1m" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-white/8 dark:bg-white/4">
                      <div className="font-mono text-[16px] font-bold text-blue-600">{item.value}</div>
                      <div className={`mt-1 text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <AnalysisShowcase compact />
            </motion.section>

            <InputPanel onAnalyze={handleAnalyze} isAnalyzing={false} errorMessage={notice} />
          </div>

          <div className="w-full lg:sticky lg:top-24">
            <Sidebar variant="guest" />
          </div>
        </div>
      </main>
    </div>
  );
}
