import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import {
  ChevronDownIcon,
  ClockIcon,
  ExitIcon,
  HomeIcon,
  MoonIcon,
  ReaderIcon,
  SunIcon,
} from "@radix-ui/react-icons";

interface HeaderProps {
  variant?: "guest" | "auth";
}

export function Header({ variant = "auth" }: HeaderProps) {
  const { isDark, toggleTheme, isLoggedIn, logout, user } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const shell = isDark
    ? "border-white/10 bg-slate-950/72 text-slate-100 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.7)]"
    : "border-[#ddd3c5] bg-[#fffdfa]/92 text-slate-900 shadow-[0_18px_44px_-24px_rgba(15,23,42,0.12)]";
  const textPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const navActive = isDark
    ? "border-blue-400/30 bg-blue-500/10 text-blue-100"
    : "bg-blue-50 text-blue-700";
  const navDefault = isDark
    ? "text-slate-400 hover:text-slate-100"
    : "text-slate-500 hover:text-slate-900";
  const themeBtn = isDark
    ? "text-slate-400 hover:bg-white/6 hover:text-slate-100"
    : "text-slate-400 hover:bg-[#f3eee6] hover:text-slate-800";
  const dropdownBg = isDark
    ? "border-white/10 bg-slate-950/96 shadow-[0_28px_72px_-28px_rgba(0,0,0,0.7)]"
    : "border-[#ddd3c5] bg-[#fffdfa]/96 shadow-[0_28px_72px_-28px_rgba(15,23,42,0.18)]";

  const navItems = [
    { label: "Dashboard", icon: HomeIcon },
    { label: "History", icon: ClockIcon },
    { label: "Review notes", icon: ReaderIcon },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-[1440px] justify-center">
        <div className={`flex min-h-16 w-full max-w-[1320px] items-center justify-between rounded-[1.4rem] border px-3 sm:px-4 ${shell} backdrop-blur-2xl`}>
        <button
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
          className="flex items-center rounded-2xl px-2 py-2 transition-transform duration-150 hover:scale-[1.01]"
        >
          <BrandLogo size="md" />
        </button>

        <div className="hidden flex-1 justify-center px-5 lg:flex">
          {variant === "auth" && isLoggedIn && (
            <nav className="flex items-center gap-1 rounded-full border border-transparent bg-transparent p-1">
            {navItems.map((item, i) => (
              <button
                key={item.label}
                aria-current={i === 0 ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] transition-all ${
                  i === 0 ? navActive : navDefault
                }`}
                style={{ fontWeight: i === 0 ? 500 : 400 }}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </button>
            ))}
            </nav>
          )}

          {variant === "guest" && !isLoggedIn && (
            <nav className="flex items-center gap-5">
              <button className={`border-b px-0 pb-2 pt-1 text-[12px] ${isDark ? "border-blue-400 text-blue-100" : "border-blue-600 text-blue-700"}`} style={{ fontWeight: 600 }}>
                Analyze
              </button>
              <button className={`border-b border-transparent px-0 pb-2 pt-1 text-[12px] ${navDefault}`}>
                Trust notes
              </button>
              <button className={`border-b border-transparent px-0 pb-2 pt-1 text-[12px] ${navDefault}`}>
                Workflow
              </button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${themeBtn}`}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <SunIcon className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <MoonIcon className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {variant === "guest" && !isLoggedIn && (
            <>
            <button
              onClick={() => navigate("/login")}
              className={`hidden rounded-full px-4 py-2.5 text-[12px] transition-all sm:inline-flex ${navDefault}`}
              style={{ fontWeight: 500 }}
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-blue-600 px-4 py-2.5 text-[12px] text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
              style={{
                fontWeight: 500,
                boxShadow: "0 14px 28px -18px rgba(37,99,235,0.75)",
              }}
            >
              Get Started
            </button>
            </>
          )}

          {variant === "auth" && isLoggedIn && user && (
            <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 rounded-full px-2 py-1.5 transition-all ${
                isDark ? "hover:bg-white/6" : "hover:bg-slate-100"
              }`}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white"
                style={{ fontWeight: 700 }}
              >
                {user.initials}
              </div>
              <div className="hidden text-left sm:block">
                <div className={`text-[12px] ${textPrimary}`} style={{ fontWeight: 600 }}>{user.name}</div>
                <div className={`text-[11px] ${textSecondary}`}>{user.plan} plan</div>
              </div>
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""} ${textSecondary}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 top-full mt-3 w-56 rounded-3xl border p-2 ${dropdownBg}`}
                >
                  <div className={`mb-1 border-b px-3 py-3 ${isDark ? "border-white/10" : "border-slate-100"}`}>
                    <div className={`text-[12px] ${textPrimary}`} style={{ fontWeight: 500 }}>{user.name}</div>
                    <div className={`text-[11px] ${textSecondary} truncate`}>{user.email}</div>
                  </div>
                  {["Profile Settings", "Billing", "API Keys"].map((item) => (
                    <button
                      key={item}
                      className={`w-full rounded-2xl px-3 py-2.5 text-left text-[12px] transition-all ${
                        isDark ? "text-white/55 hover:bg-white/6 hover:text-white/85" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  <div className={`mt-1 border-t pt-1 ${isDark ? "border-white/10" : "border-slate-100"}`}>
                    <button
                      onClick={() => { logout(); navigate("/"); setDropdownOpen(false); }}
                      className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-[12px] text-red-500 transition-all hover:bg-red-500/8"
                    >
                      <ExitIcon className="h-3 w-3" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}
