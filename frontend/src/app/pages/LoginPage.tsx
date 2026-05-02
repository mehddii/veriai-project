import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  GitHubLogoIcon,
  LockClosedIcon,
  ReaderIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { AnalysisShowcase } from "../components/AnalysisShowcase";
import { BrandLogo } from "../components/BrandLogo";
import { useApp } from "../context/AppContext";

const evidencePoints = [
  "Sentence-level highlighting for suspicious phrasing",
  "Multi-model attribution with transparent confidence scoring",
  "Review-ready workflow for universities and editorial teams",
];

const workflowNotes = [
  {
    label: "Classroom review",
    note: "Screen a paragraph before discussing authorship concerns with a student.",
  },
  {
    label: "Research screening",
    note: "Inspect sections that feel overly uniform before escalating to full review.",
  },
  {
    label: "Editorial evidence",
    note: "Keep confidence signals and highlighted passages in the same working surface.",
  },
];

export function LoginPage() {
  const { isDark, login, register, authError, clearAuthError } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const panelShell = isDark
    ? "border-white/10 bg-slate-950/76 shadow-[0_30px_90px_-40px_rgba(2,6,23,0.95)]"
    : "border-slate-200 bg-white/92 shadow-[0_26px_90px_-42px_rgba(15,23,42,0.22)]";
  const textPrimary = isDark ? "text-slate-50" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-300" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";
  const dividerColor = isDark ? "bg-white/8" : "bg-slate-200";
  const socialBtn = isDark
    ? "border-white/10 bg-white/3 text-slate-300 hover:bg-white/6 hover:text-slate-50"
    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:text-slate-900";
  const inputBase = isDark
    ? "border-white/10 bg-white/4 text-slate-50 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/6"
    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setFormError("Email and password are required.");
      return;
    }

    if (tab === "signup" && trimmedPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setFormError(null);
    clearAuthError();

    try {
      if (tab === "login") {
        await login(trimmedEmail, trimmedPassword);
      } else {
        await register(trimmedEmail, trimmedPassword, "FREE");
      }

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Authentication failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_26%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-[1440px] gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <section className="flex flex-col justify-center gap-8 py-6 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[620px]"
          >
            <BrandLogo size="lg" wordmarkClassName="text-slate-900 dark:text-slate-50" />

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
              <CheckCircledIcon className="h-3.5 w-3.5" />
              Academic-grade AI authorship review
            </div>

            <h1 className={`mt-5 max-w-[12ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.06em] ${textPrimary}`}>
              Review writing with evidence, not guesswork.
            </h1>
            <p className={`mt-5 max-w-[52ch] text-[15px] leading-7 ${textSecondary}`}>
              Veri4i helps reviewers inspect AI-risk signals with a cleaner workflow: readable submission intake, sentence-level flags, and grounded multi-model attribution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)]"
          >
            <div className="flex flex-col gap-4">
              <div className={`rounded-[1.75rem] border p-5 ${panelShell}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`text-[11px] uppercase tracking-[0.18em] ${textMuted}`}>Review posture</div>
                    <div className={`mt-2 max-w-[18ch] text-[22px] leading-[1.08] tracking-[-0.04em] ${textPrimary}`}>
                      A calmer workspace for first-pass evidence checks.
                    </div>
                  </div>
                  <div className="hidden rounded-[1.15rem] border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200 sm:block">
                    <ReaderIcon className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {evidencePoints.map((point, index) => (
                    <div key={point} className="flex gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-[11px] font-semibold text-blue-700 dark:bg-blue-500/12 dark:text-blue-200">
                        {index + 1}
                      </div>
                      <p className={`text-[13px] leading-6 ${textSecondary}`}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[1.75rem] border p-5 ${panelShell}`}>
                <div className={`text-[11px] uppercase tracking-[0.18em] ${textMuted}`}>Where it fits</div>
                <div className="mt-4 space-y-4">
                  {workflowNotes.map((item) => (
                    <div key={item.label} className="grid gap-2 border-b border-slate-200/80 pb-4 last:border-b-0 last:pb-0 dark:border-white/10">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-blue-700 dark:text-blue-200">
                        <RocketIcon className="h-3.5 w-3.5" />
                        {item.label}
                      </div>
                      <p className={`max-w-[34ch] text-[13px] leading-6 ${textSecondary}`}>{item.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                  <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/8 dark:bg-white/4">
                    <div className={`text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>Observed output</div>
                    <div className="mt-2 font-mono text-[17px] font-bold text-blue-600">98.7%</div>
                    <div className={`mt-1 text-[12px] leading-5 ${textSecondary}`}>calibrated reviewer agreement on benchmark checks</div>
                  </div>
                  <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4 dark:border-white/8 dark:bg-slate-950/35">
                    <div className={`text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>Typical use</div>
                    <div className={`mt-2 text-[13px] leading-6 ${textSecondary}`}>
                      Start with guest review. Keep saved history and repeated submissions behind account access.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:translate-y-6">
              <AnalysisShowcase compact />
            </div>
          </motion.div>
        </section>

        <section className="flex items-center justify-center py-4 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className={`w-full max-w-[460px] rounded-[2rem] border p-5 sm:p-7 ${panelShell}`}
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <div className={`text-[11px] uppercase tracking-[0.18em] ${textMuted}`}>Account access</div>
                <h2 className={`mt-2 text-[28px] tracking-[-0.04em] ${textPrimary}`}>
                  {tab === "login" ? "Welcome back" : "Create your workspace"}
                </h2>
                <p className={`mt-2 text-[13px] leading-6 ${textSecondary}`}>
                  {tab === "login"
                    ? "Continue to your review dashboard and recent scans."
                    : "Start with the free plan and add saved review history when you need it."}
                </p>
              </div>
              <div className="hidden rounded-[1.35rem] border border-blue-200 bg-blue-50 px-3 py-2 text-right dark:border-blue-500/20 dark:bg-blue-500/10 sm:block">
                <div className={`text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>Access</div>
                <div className="text-[13px] font-semibold text-blue-700 dark:text-blue-200">Free workspace</div>
              </div>
            </div>

            <div className={`mb-5 rounded-[1.4rem] border px-4 py-3 ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-slate-50"}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-500/12 dark:text-amber-200">
                  <CheckCircledIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className={`text-[12px] font-semibold ${textPrimary}`}>Sign-in only affects workflow, not the detector itself.</div>
                  <p className={`mt-1 text-[12.5px] leading-6 ${textSecondary}`}>
                    Use guest mode to test the surface first. Create an account when you need saved history and repeat review trails.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/5">
              {(["login", "signup"] as const).map((entry) => (
                <button
                  key={entry}
                  onClick={() => {
                    setTab(entry);
                    setFormError(null);
                    clearAuthError();
                  }}
                  className={`rounded-[1rem] px-4 py-3 text-[13px] transition-all ${
                    tab === entry
                      ? "bg-white text-slate-900 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.25)] dark:bg-slate-900 dark:text-slate-50"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  }`}
                >
                  {entry === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {(formError || authError) && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
                {formError || authError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {tab === "signup" && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <label className={`mb-2 block ${textSecondary}`}>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Amina Rahman"
                      className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition-all ${inputBase}`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={`mb-2 block ${textSecondary}`}>Email Address</label>
                <div className="relative">
                  <EnvelopeClosedIcon className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${textMuted}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@institution.edu"
                    className={`w-full rounded-2xl border py-3.5 pl-11 pr-4 outline-none transition-all ${inputBase}`}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className={textSecondary}>Password</label>
                  {tab === "login" && (
                    <button type="button" className="text-[12px] font-medium text-blue-600 hover:text-blue-500 dark:text-blue-300">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <LockClosedIcon className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${textMuted}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full rounded-2xl border py-3.5 pl-11 pr-11 outline-none transition-all ${inputBase}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${textMuted} hover:text-blue-600 dark:hover:text-blue-300`}
                  >
                    {showPassword ? <EyeClosedIcon className="h-4 w-4" /> : <EyeOpenIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ boxShadow: "0 18px 30px -20px rgba(37,99,235,0.9)" }}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {tab === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {tab === "login" ? "Sign In" : "Create Account"}
                    <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className={`h-px flex-1 ${dividerColor}`} />
              <span className={`text-[10px] uppercase tracking-[0.16em] ${textMuted}`}>or continue with</span>
              <div className={`h-px flex-1 ${dividerColor}`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Google", icon: "G" },
                { label: "GitHub", icon: <GitHubLogoIcon className="h-4 w-4" /> },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFormError("OAuth login is not configured yet. Use email and password.")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 transition-all ${socialBtn}`}
                >
                  {typeof item.icon === "string" ? (
                    <span className="text-[14px] font-bold">{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                  {item.label}
                </button>
              ))}
            </div>

            <p className={`mt-6 text-center text-[12px] ${textMuted}`}>
              {tab === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setTab(tab === "login" ? "signup" : "login");
                  setFormError(null);
                  clearAuthError();
                }}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-300"
              >
                {tab === "login" ? "Create one" : "Sign in"}
              </button>
            </p>

            <p className={`mt-5 text-center text-[11px] leading-5 ${textMuted}`}>
              By continuing, you agree to the Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
