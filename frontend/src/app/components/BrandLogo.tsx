import { cn } from "./ui/utils";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  wordmarkClassName?: string;
}

const sizeMap = {
  sm: { mark: 28, wordmark: 104 },
  md: { mark: 34, wordmark: 128 },
  lg: { mark: 46, wordmark: 164 },
};

export function BrandLogo({
  className,
  compact = false,
  size = "md",
  wordmarkClassName = "text-slate-900 dark:text-slate-50",
}: BrandLogoProps) {
  const dims = sizeMap[size];

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 72 72"
        className="shrink-0"
        style={{ width: dims.mark, height: dims.mark }}
      >
        <defs>
          <linearGradient id="veri4i-blue" x1="12%" y1="8%" x2="82%" y2="84%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="veri4i-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        <path
          d="M18 12h24l12 12v24a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6Z"
          fill="none"
          stroke="url(#veri4i-blue)"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <path d="M42 12v12h12" fill="none" stroke="url(#veri4i-blue)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M23 27h11M23 37h15M23 47h9" fill="none" stroke="#93C5FD" strokeWidth="4.5" strokeLinecap="round" />

        <circle cx="40.5" cy="42.5" r="16.5" fill="white" stroke="url(#veri4i-blue)" strokeWidth="4.5" />
        <path
          d="M40.5 26a16.5 16.5 0 0 1 14.1 7.9"
          fill="none"
          stroke="url(#veri4i-amber)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path d="m52.5 54.5 6.5 6.5" fill="none" stroke="url(#veri4i-blue)" strokeWidth="5" strokeLinecap="round" />

        <text
          x="40.5"
          y="47.5"
          textAnchor="middle"
          fontSize="12.5"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fill="#2563EB"
        >
          92%
        </text>
      </svg>

      {!compact && (
        <svg
          aria-label="Veri4i"
          viewBox="0 0 210 54"
          className={cn("h-auto", wordmarkClassName)}
          style={{ width: dims.wordmark }}
        >
          <text
            x="0"
            y="40"
            fontSize="40"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            fill="currentColor"
            letterSpacing="-1.8"
          >
            veri
          </text>
          <text
            x="120"
            y="40"
            fontSize="40"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fill="#2563EB"
            letterSpacing="-2.2"
          >
            4i
          </text>
        </svg>
      )}
    </div>
  );
}
