import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ActivityLogIcon,
  ArrowRightIcon,
  BarChartIcon,
  FileTextIcon,
  LockClosedIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { listSubmissionsRequest, SubmissionListItemResponse } from "../services/api";

const scanData = [40, 65, 48, 80, 72, 90, 75, 95, 88, 100, 92, 98];
const accuracyData = [94, 96, 95, 97, 96, 98, 97, 99, 98, 97, 99, 98];

interface HistoryRow {
  title: string;
  score: number;
  time: string;
  status: "ai" | "human" | "mixed";
}

function formatRelativeTime(isoDate: string): string {
  const timestamp = new Date(isoDate).getTime();
  if (Number.isNaN(timestamp)) {
    return "Unknown";
  }

  const deltaSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (deltaSeconds < 60) {
    return "Just now";
  }

  const deltaMinutes = Math.floor(deltaSeconds / 60);
  if (deltaMinutes < 60) {
    return `${deltaMinutes} min ago`;
  }

  const deltaHours = Math.floor(deltaMinutes / 60);
  if (deltaHours < 24) {
    return `${deltaHours} hr ago`;
  }

  const deltaDays = Math.floor(deltaHours / 24);
  if (deltaDays === 1) {
    return "Yesterday";
  }

  return `${deltaDays} days ago`;
}

function toHistoryRow(item: SubmissionListItemResponse): HistoryRow {
  const title = item.sourceType === "TEXT"
    ? `Text submission - ${item.wordCount} words`
    : `${item.sourceType} upload - ${item.wordCount} words`;

  if (item.status === "PENDING" || item.status === "PROCESSING") {
    return {
      title,
      score: 50,
      time: formatRelativeTime(item.submittedAt),
      status: "mixed",
    };
  }

  if (item.status === "ERROR") {
    return {
      title,
      score: 0,
      time: formatRelativeTime(item.submittedAt),
      status: "mixed",
    };
  }

  const confidence = item.globalConfidence ?? 0;
  const roundedScore = Math.max(0, Math.min(100, Math.round(confidence * 100)));

  return {
    title,
    score: roundedScore,
    time: formatRelativeTime(item.submittedAt),
    status: item.globalLabel === "human" ? "human" : "ai",
  };
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 72;
  const height = 26;
  const points = data
    .map((datum, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((datum - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SidebarProps {
  variant?: "guest" | "auth";
}

export function Sidebar({ variant = "auth" }: SidebarProps) {
  const { isDark, token, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [totalScans, setTotalScans] = useState<number | null>(null);

  useEffect(() => {
    if (variant !== "auth" || !isLoggedIn || !token) {
      return;
    }

    let cancelled = false;
    setHistoryLoading(true);

    void listSubmissionsRequest(token, 0, 5)
      .then((page) => {
        if (cancelled) {
          return;
        }

        setTotalScans(page.totalItems);
        setHistory(page.items.map(toHistoryRow));
      })
      .catch(() => {
        if (!cancelled) {
          setHistory([]);
          setTotalScans(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [variant, isLoggedIn, token]);

  const card = isDark
    ? "border-white/10 bg-slate-950/76 shadow-[0_26px_72px_-38px_rgba(2,6,23,0.95)]"
    : "border-slate-200 bg-white/94 shadow-[0_24px_72px_-40px_rgba(15,23,42,0.18)]";
  const mutedCard = isDark ? "border-white/8 bg-white/4" : "border-slate-200 bg-slate-50";
  const title = isDark ? "text-slate-100" : "text-slate-900";
  const text = isDark ? "text-slate-300" : "text-slate-600";
  const muted = isDark ? "text-slate-500" : "text-slate-400";
  const hoverRow = isDark ? "hover:bg-white/5" : "hover:bg-slate-50";

  const statusBadge = (status: HistoryRow["status"], score: number) => {
    if (status === "human") {
      return "border-green-200 bg-green-50 text-green-800 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-200";
    }
    if (status === "ai") {
      return "border-red-200 bg-red-50 text-red-800 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200";
    }
    return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100";
  };

  if (variant === "guest") {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`rounded-[1.9rem] border p-5 ${card}`}
        >
          <div className="mb-4">
            <div className={`text-[11px] uppercase tracking-[0.18em] ${muted}`}>Trust notes</div>
            <h3 className={`mt-2 text-[24px] font-semibold leading-[1.06] tracking-[-0.04em] ${title}`}>
              Built for review contexts where evidence matters.
            </h3>
          </div>

          <p className={`text-[13px] leading-7 ${text}`}>
            The guest surface should reassure a professor or reviewer before they sign in. It explains how the tool behaves, then gets out of the way.
          </p>

          <div className="mt-5 space-y-3">
            {[
              { icon: MixerHorizontalIcon, text: "Structured confidence and sentence-level inspection" },
              { icon: BarChartIcon, text: "Readable signal breakdowns instead of abstract hype metrics" },
              { icon: ReaderIcon, text: "A workflow suited to repeated classroom or research review" },
            ].map((benefit) => (
              <div key={benefit.text} className={`flex items-start gap-3 rounded-[1.4rem] border px-3 py-3 ${mutedCard}`}>
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/12 dark:text-blue-300">
                  <benefit.icon className="h-4 w-4" />
                </div>
                <span className={`text-[12.5px] leading-6 ${text}`}>{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className={`mt-5 rounded-[1.45rem] border p-4 ${mutedCard}`}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/12 dark:text-blue-300">
                <LockClosedIcon className="h-4 w-4" />
              </div>
              <div>
                <div className={`text-[11px] uppercase tracking-[0.16em] ${muted}`}>When sign-in helps</div>
                <div className={`text-[14px] font-semibold ${title}`}>Save a real review trail</div>
              </div>
            </div>
            <p className={`text-[12.5px] leading-6 ${text}`}>
              Create an account when you need saved history, repeat submissions, or a persistent record across reviews.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3.5 text-white transition-all hover:bg-blue-500"
              style={{ boxShadow: "0 18px 30px -20px rgba(37,99,235,0.9)" }}
            >
              <MagicWandIcon className="h-4 w-4" />
              Log In to Save Scans
            </button>
          </div>

          <div className={`mt-5 rounded-[1.45rem] border p-4 ${mutedCard}`}>
            <div className={`mb-3 text-[11px] uppercase tracking-[0.18em] ${muted}`}>Guest access limits</div>
            <div className="space-y-2.5">
              {[
                { label: "Scans per day", value: "3" },
                { label: "Max file size", value: "10 MB" },
                { label: "History saved", value: "None" },
                { label: "Review history", value: "Account required" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className={`text-[12px] ${text}`}>{item.label}</span>
                  <span className={`text-[12px] font-semibold ${title}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Total Scans",
            value: totalScans == null ? "--" : totalScans.toLocaleString(),
            icon: BarChartIcon,
            accent: "text-blue-600 dark:text-blue-300",
            badge: "+12%",
            sparkData: scanData,
            sparkColor: "#2563EB",
          },
          {
            label: "Accuracy",
            value: "98.7%",
            icon: ActivityLogIcon,
            accent: "text-green-600 dark:text-green-300",
            badge: "+0.3%",
            sparkData: accuracyData,
            sparkColor: "#16A34A",
          },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-[1.5rem] border p-4 ${card}`}>
            <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 ${stat.accent} dark:bg-white/6`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div className={`font-mono text-[20px] font-bold ${title}`}>{stat.value}</div>
            <div className={`mt-1 text-[10px] uppercase tracking-[0.16em] ${muted}`}>{stat.label}</div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <Sparkline data={stat.sparkData} color={stat.sparkColor} />
              <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-200">
                {stat.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-[1.8rem] border p-5 ${card}`}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className={`text-[11px] uppercase tracking-[0.16em] ${muted}`}>Recent scans</div>
            <h3 className={`mt-1 text-[18px] font-semibold tracking-[-0.03em] ${title}`}>Latest submissions</h3>
          </div>
          <button className="flex items-center gap-1 text-[12px] font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-300">
            View all <ArrowRightIcon className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-2">
          {historyLoading && (
            <p className={`rounded-2xl border px-4 py-4 text-[12px] ${mutedCard} ${muted}`}>
              Loading submissions...
            </p>
          )}

          {!historyLoading && history.length === 0 && (
            <p className={`rounded-2xl border px-4 py-4 text-[12px] ${mutedCard} ${muted}`}>
              No submissions yet. Run your first scan to populate history.
            </p>
          )}

          {!historyLoading && history.length > 0 && history.map((item) => (
            <div
              key={`${item.title}-${item.time}`}
              className={`flex items-center justify-between rounded-[1.2rem] border border-transparent px-3 py-3 transition-all ${hoverRow}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/6 dark:text-slate-400">
                  <FileTextIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className={`truncate text-[12px] font-medium ${title}`}>{item.title}</p>
                  <p className={`text-[11px] ${muted}`}>{item.time}</p>
                </div>
              </div>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusBadge(item.status, item.score)}`}>
                {item.score}% AI
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
