import { useEffect, useState } from "react";
import { ArrowRight, BookOpenText, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { AnalyzePayload, InputPanel } from "../components/InputPanel";
import { Sidebar } from "../components/Sidebar";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";
import { AnalysisShowcase } from "../components/AnalysisShowcase";

const trustPillars = [
  "Sentence-level evidence instead of a single theatrical score",
  "Readable confidence framing for professors and reviewers",
  "Academic tone designed for serious inspection, not hype",
];

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
  const paperCard = isDark
    ? "border-white/10 bg-slate-950/78 shadow-[0_30px_90px_-48px_rgba(2,6,23,0.95)]"
    : "border-slate-300/80 bg-[#fcfbf8] shadow-[0_30px_90px_-52px_rgba(15,23,42,0.17)]";
  const inkCard = isDark
    ? "border-white/8 bg-slate-900/70"
    : "border-[#d8d1c5] bg-[#fffdfa]";

  const handleAnalyze = (_payload: AnalyzePayload) => {
    setNotice("Sign in is required to run analysis.");
    navigate("/login");
  };

  return (
    <div>
      <Header variant="guest" />

      <main className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_360px]">
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`rounded-[2.25rem] border p-5 sm:p-6 ${paperCard}`}
            >
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)]">
                <div className="flex flex-col">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Review-first AI detection
                  </div>

                  <h1 className={`max-w-[11ch] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.07em] ${textPrimary}`}>
                    Submit writing, inspect evidence, decide carefully.
                  </h1>

                  <p className={`mt-5 max-w-[58ch] text-[15px] leading-8 ${textSecondary}`}>
                    Built for classrooms and review workflows: paste text, upload a document, then inspect the reasoning in a format that feels closer to a marked manuscript than a marketing dashboard.
                  </p>

                  <div className={`mt-6 rounded-[1.8rem] border p-4 ${inkCard}`}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <div className={`text-[11px] uppercase tracking-[0.18em] ${textMuted}`}>Why reviewers trust it</div>
                        <div className={`mt-1 text-[15px] font-semibold ${textPrimary}`}>The interface is tuned for evidence, not theater.</div>
                      </div>
                      <div className="hidden rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.8)] sm:block">
                        Guest access
                      </div>
                    </div>

                    <div className="space-y-3">
                      {trustPillars.map((pillar, index) => (
                        <div key={pillar} className="flex gap-3">
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700 dark:bg-white/8 dark:text-slate-200">
                            {index + 1}
                          </div>
                          <p className={`text-[13px] leading-6 ${textSecondary}`}>{pillar}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Detection layers", value: "6 models" },
                      { label: "Accepted files", value: "PDF, DOCX" },
                      { label: "Typical turnaround", value: "< 1 min" },
                    ].map((item) => (
                      <div key={item.label} className={`rounded-[1.4rem] border px-4 py-4 ${inkCard}`}>
                        <div className="text-[14px] font-semibold text-blue-700 dark:text-blue-200">{item.value}</div>
                        <div className={`mt-1 text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <AnalysisShowcase compact />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.04 }}
              className={`rounded-[2.25rem] border p-5 sm:p-6 ${paperCard}`}
            >
              <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start">
                <div className="flex flex-col justify-between gap-5">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/4 dark:text-slate-200">
                      <BookOpenText className="h-3.5 w-3.5" />
                      Submission desk
                    </div>
                    <h2 className={`text-[28px] leading-[1.02] tracking-[-0.05em] ${textPrimary}`}>
                      Start with the text, not a tour.
                    </h2>
                    <p className={`mt-4 text-[14px] leading-7 ${textSecondary}`}>
                      The first screen should let a reviewer act immediately. Paste the excerpt or upload the file, then move into the evidence view.
                    </p>
                  </div>

                  <div className={`rounded-[1.65rem] border p-4 ${inkCard}`}>
                    <div className={`text-[10px] uppercase tracking-[0.18em] ${textMuted}`}>Quick guidance</div>
                    <div className="mt-3 space-y-3">
                      {[
                        "Paste a full paragraph or section for more reliable results.",
                        "Use file upload when structure and formatting matter.",
                        "Guest mode allows testing, full history requires sign-in.",
                      ].map((note) => (
                        <div key={note} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                          <p className={`text-[12.5px] leading-6 ${textSecondary}`}>{note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/login")}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-slate-700 transition-all hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/4 dark:text-slate-200 dark:hover:border-blue-400/40 dark:hover:text-blue-200"
                  >
                    Create an account later if you need saved history
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <InputPanel onAnalyze={handleAnalyze} isAnalyzing={false} errorMessage={notice} />
              </div>
            </motion.section>
          </div>

          <div className="w-full xl:sticky xl:top-24">
            <Sidebar variant="guest" />
          </div>
        </div>
      </main>
    </div>
  );
}
