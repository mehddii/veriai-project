import { useState, useEffect } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "../components/Header";
import { AnalyzePayload, InputPanel } from "../components/InputPanel";
import { ResultsData, ResultsPanel } from "../components/ResultsPanel";
import { Sidebar } from "../components/Sidebar";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";
import {
  getErrorMessage,
  pollSubmissionResult,
  submitFileRequest,
  submitTextRequest,
} from "../services/api";

export function LoggedInDashboard() {
  const { isDark, user, isLoggedIn, authLoading, token, refreshUser } = useApp();
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultsData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn && !authLoading) {
      navigate("/");
    }
  }, [isLoggedIn, authLoading, navigate]);

  const textPrimary = isDark ? "text-slate-50" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-300" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";

  const handleAnalyze = async (payload: AnalyzePayload) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setIsAnalyzing(true);
    setResults(null);
    setAnalysisError(null);

    try {
      const accepted = payload.mode === "text"
        ? await submitTextRequest(token, payload.text)
        : await submitFileRequest(token, payload.file);

      const detail = await pollSubmissionResult(token, accepted.submissionId);

      if (detail.status === "ERROR") {
        throw new Error(detail.errorMessage ?? "Analysis failed in processing pipeline.");
      }

      if (!detail.frontendPayload) {
        throw new Error("Backend did not return the expected frontend payload.");
      }

      setResults(detail.frontendPayload);
      void refreshUser().catch(() => {});
    } catch (error) {
      setAnalysisError(getErrorMessage(error, "Unable to analyze this content."));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const plan = user?.plan ?? "FREE";
  const usageLabel = plan === "FREE"
    ? `${user?.dailySubmissionCount ?? 0}/3 scans used today`
    : "Unlimited scans";

  return (
    <div>
      <Header variant="auth" />

      <main className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <div className="space-y-6">
            <AnimatePresence>
              {!results && !isAnalyzing && (
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_30px_80px_-48px_rgba(2,6,23,0.95)]"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-[56ch]">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Detection workspace
                      </div>
                      <h1 className={`text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.05em] ${textPrimary}`}>
                        Welcome back, {user?.name?.split(" ")[0] || "User"}.
                      </h1>
                      <p className={`mt-4 text-[14px] leading-7 ${textSecondary}`}>
                        Submit a new scan, review suspicious passages, and keep the evidence trail readable for editorial or academic review.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 xl:w-[370px] xl:grid-cols-1">
                      {[
                        { label: "Plan", value: plan },
                        { label: "Usage", value: usageLabel },
                        { label: "Status", value: "Operational" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/8 dark:bg-white/4">
                          <div className={`text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>{item.label}</div>
                          <div className={`mt-1 text-[13px] font-semibold ${item.label === "Status" ? "text-green-600 dark:text-green-300" : textPrimary}`}>
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <InputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} errorMessage={analysisError} />

            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white/90 py-16 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-40px_rgba(2,6,23,0.95)]"
                >
                  <div className="relative mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                      <Sparkles className="h-7 w-7 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 h-16 w-16 animate-ping rounded-2xl bg-blue-500/8" />
                  </div>
                  <p className={`text-[14px] ${textSecondary}`}>Analyzing content patterns...</p>
                  <p className={`mt-1 text-[11px] ${textMuted}`}>Running the 6-model detection pipeline</p>
                </motion.div>
              )}
            </AnimatePresence>

            {results && <ResultsPanel data={results} />}
          </div>

          <div className="w-full lg:sticky lg:top-24">
            <Sidebar variant="auth" />
          </div>
        </div>
      </main>
    </div>
  );
}
