import { useState, useRef } from "react";
import { Type, Upload, FileText, X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";

export type AnalyzePayload =
  | { mode: "text"; text: string }
  | { mode: "file"; file: File };

interface InputPanelProps {
  onAnalyze: (payload: AnalyzePayload) => void | Promise<void>;
  isAnalyzing: boolean;
  errorMessage?: string | null;
}

export function InputPanel({ onAnalyze, isAnalyzing, errorMessage = null }: InputPanelProps) {
  const { isDark } = useApp();
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const fileSize = file ? `${(file.size / 1024).toFixed(1)} KB` : null;

  const cardStyle: React.CSSProperties = {
    background: isDark ? "rgba(15, 23, 42, 0.78)" : "rgba(255, 255, 255, 0.94)",
    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(226,232,240,1)",
    boxShadow: isDark
      ? "0 28px 80px -44px rgba(2,6,23,0.95)"
      : "0 24px 70px -42px rgba(15,23,42,0.18)",
  };

  const tabBarBg = isDark ? "bg-white/5" : "bg-slate-100";
  const tabActive = isDark
    ? "bg-slate-900 text-slate-50 shadow-sm"
    : "bg-white text-slate-900 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.24)]";
  const tabDefault = isDark
    ? "text-slate-400 hover:text-slate-100"
    : "text-slate-500 hover:text-slate-800";
  const textareaClass = isDark
    ? "border-white/10 bg-white/4 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/6"
    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white";
  const counterText = isDark ? "text-slate-500" : "text-slate-400";
  const dropZone = isDark
    ? `border-white/10 bg-white/3 hover:border-blue-400/40 ${dragOver ? "border-blue-400/60 bg-blue-500/8" : ""}`
    : `border-slate-200 bg-slate-50 hover:border-blue-300 ${dragOver ? "border-blue-400 bg-blue-50" : ""}`;
  const dropText = isDark ? "text-slate-200" : "text-slate-700";
  const dropMuted = isDark ? "text-slate-500" : "text-slate-400";
  const fileCard = isDark
    ? "border-white/10 bg-white/3"
    : "border-slate-200 bg-slate-50";

  const canSubmit = mode === "text" ? !!text.trim() : !!file;

  return (
    <div className="rounded-[1.8rem] p-1.5" style={cardStyle}>
      {/* Tab Switcher */}
      <div className={`mb-2 flex items-center gap-1 rounded-[1.2rem] p-1 ${tabBarBg}`}>
        {[
          { id: "text" as const, label: "Text Input", icon: Type },
          { id: "file" as const, label: "File Upload", icon: Upload },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-[1rem] px-4 py-3 text-[12px] transition-all ${
              mode === id ? tabActive : tabDefault
            }`}
            style={{ fontWeight: mode === id ? 500 : 400 }}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {mode === "text" ? (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type the text you want to analyze for AI-generated content..."
                className={`h-[240px] w-full resize-none rounded-[1.35rem] border p-5 text-[14px] outline-none transition-all ${textareaClass}`}
                style={{ lineHeight: "1.8" }}
              />
              <div className={`absolute bottom-3 right-3 flex items-center gap-3 text-[10px] ${counterText}`}>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{wordCount} words</span>
                <span className={`h-3 w-px ${isDark ? "bg-white/8" : "bg-slate-200"}`} />
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{text.length} chars</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
            />
            {!file ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => fileRef.current?.click()}
                className={`flex h-[240px] cursor-pointer flex-col items-center justify-center rounded-[1.35rem] border-2 border-dashed transition-all ${dropZone}`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  <Upload className="h-6 w-6" />
                </div>
                <p className={`mb-1 text-[13px] ${dropText}`}>
                  Drop your file here, or{" "}
                  <span className="text-blue-600 dark:text-blue-300">browse</span>
                </p>
                <p className={`text-[11px] ${dropMuted}`}>
                  PDF, DOCX - Max 10MB
                </p>
              </div>
            ) : (
              <div className={`flex h-[240px] flex-col items-center justify-center rounded-[1.35rem] border ${fileCard}`}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-300">
                  <FileText className="h-6 w-6" />
                </div>
                <p className={`mb-0.5 text-[13px] ${isDark ? "text-slate-100" : "text-slate-800"}`}>{file.name}</p>
                <p className={`mb-3 text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{fileSize}</p>
                <button
                  onClick={() => {
                    setFile(null);
                    if (fileRef.current) {
                      fileRef.current.value = "";
                    }
                  }}
                  className={`flex items-center gap-1 text-[11px] transition-all ${isDark ? "text-slate-500 hover:text-red-300" : "text-slate-400 hover:text-red-500"}`}
                >
                  <X className="h-3 w-3" /> Remove file
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="mt-1 flex gap-2">
        <button
          onClick={() => {
            if (mode === "text" && text.trim()) {
              void onAnalyze({ mode: "text", text: text.trim() });
              return;
            }

            if (mode === "file" && file) {
              void onAnalyze({ mode: "file", file });
            }
          }}
          disabled={isAnalyzing || !canSubmit}
          className={`relative flex flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-[1.15rem] px-6 py-3.5 text-[13px] text-white transition-all disabled:opacity-25 disabled:shadow-none ${canSubmit && !isAnalyzing ? "analyze-btn-animated" : "analyze-btn-static"}`}
          style={{
            fontWeight: 500,
            boxShadow: canSubmit ? "0 18px 34px -20px rgba(37,99,235,0.8)" : "none",
          }}
        >
          {isAnalyzing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Analyzing Content...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze Content
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>

        {(text.trim() || file) && !isAnalyzing && (
          <button
            onClick={() => {
              setText("");
              setFile(null);
              if (fileRef.current) {
                fileRef.current.value = "";
              }
            }}
            className={`rounded-[1.15rem] border px-4 py-3.5 text-[12px] transition-all ${
              isDark
                ? "border-white/10 text-slate-400 hover:bg-white/6 hover:text-slate-100"
                : "border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            Clear
          </button>
        )}
      </div>

      {errorMessage && (
        <p className={`mt-3 text-[11px] ${isDark ? "text-red-200" : "text-red-700"}`}>
          {errorMessage}
        </p>
      )}

      <style>{`
        .analyze-btn-animated {
          background: linear-gradient(135deg, #2563EB, #3B82F6, #2563EB);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        .analyze-btn-static {
          background: linear-gradient(135deg, #2563EB, #3B82F6);
          background-size: 100% 100%;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
