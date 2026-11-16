"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Sun,
  Moon,
  ArrowUpRight,
  Award,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { index: "§01", label: "Education & Skills", href: "#education" },
  { index: "§02", label: "Experience", href: "#experience" },
  { index: "§03", label: "Projects", href: "#projects" },
  { index: "§04", label: "Patents & IP", href: "#patents" },
  { index: "§05", label: "Certifications", href: "#certifications" },
  { index: "§06", label: "Leadership", href: "#campus" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("academic-theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("academic-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("academic-theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2]/95 dark:bg-[#0D0F12]/95 backdrop-blur-md">
      {/* Top Archival Metadata Ribbon */}
      <div className="border-b border-[#DED8C8]/70 dark:border-[#272D37]/70 bg-[#F3EFE6]/70 dark:bg-[#14181D]/80 px-3 sm:px-6 lg:px-8 py-1.5 text-[10px] xs:text-[11px] font-mono tracking-wider uppercase text-[#52504C] dark:text-[#A7ACB4]">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#9E2A2B] dark:text-[#E06D53] truncate">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9E2A2B] dark:bg-[#E06D53] animate-pulse shrink-0" />
              <span className="truncate">MLRITM ACADEMIC &amp; PATENT MONOGRAPH</span>
            </span>
            <span className="hidden md:inline text-[#78756F]">|</span>
            <span className="hidden md:inline truncate">
              B.TECH CSE (DATA SCIENCE) · GRADUATING {portfolioData.profile.graduationMonthYear.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#1D3557] dark:text-[#6CA0DC]">
              <GraduationCap className="w-3.5 h-3.5" />
              CGPA: {portfolioData.profile.cgpa}
            </span>
            {portfolioData.profile.freelanceBridge.enabled && (
              <a
                href={portfolioData.profile.freelanceBridge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9E2A2B] dark:text-[#E06D53] hover:underline font-medium"
              >
                <span className="hidden xs:inline">atchyut.vercel.app</span>
                <span className="xs:hidden">Freelance</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Identity Stamp */}
        <a
          href="#top"
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded border border-[#9E2A2B]/40 dark:border-[#E06D53]/40 bg-[#9E2A2B]/10 dark:bg-[#E06D53]/10 flex items-center justify-center font-serif font-bold text-sm sm:text-base text-[#9E2A2B] dark:text-[#E06D53] group-hover:bg-[#9E2A2B] group-hover:text-white dark:group-hover:bg-[#E06D53] dark:group-hover:text-[#0D0F12] transition-colors">
            {portfolioData.profile.monogram}
          </div>
          <div className="min-w-0">
            <div className="font-serif font-semibold text-sm xs:text-base tracking-tight leading-none text-[#161615] dark:text-[#ECE8E1] truncate">
              {portfolioData.profile.fullName}
            </div>
            <div className="font-mono text-[9px] xs:text-[10px] tracking-widest uppercase text-[#78756F] dark:text-[#A7ACB4] mt-1 truncate">
              MLRITM · CSE (Data Science) &apos;27
            </div>
          </div>
        </a>

        {/* Desktop Section Index Links (lg and up) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 2xl:px-3 py-1.5 rounded text-xs font-medium text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-[#ECE8E1] hover:bg-[#F3EFE6] dark:hover:bg-[#181C22] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="font-mono text-[10px] text-[#9E2A2B] dark:text-[#E06D53]">
                {item.index}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <a
            href="#certifications"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-xs font-mono font-medium text-[#161615] dark:text-[#ECE8E1] hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53]" />
            <span>SAP Certified</span>
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-[#ECE8E1] transition-colors"
            title={darkMode ? "Switch to Archival Paper (Light)" : "Switch to Night Lab (Dark)"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#161615] dark:text-[#ECE8E1]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Tablet Horizontal Quick-Jump Strip (visible on md & lg, hidden on mobile and xl) */}
      <div className="hidden md:block xl:hidden border-t border-[#DED8C8]/70 dark:border-[#272D37]/70 bg-[#FAF7F2]/90 dark:bg-[#0D0F12]/90 px-6 py-1.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between gap-2 min-w-max">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 rounded text-xs font-medium text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-[#ECE8E1] hover:bg-[#F3EFE6] dark:hover:bg-[#181C22] transition-colors inline-flex items-center gap-1.5"
            >
              <span className="font-mono text-[10px] text-[#9E2A2B] dark:text-[#E06D53]">
                {item.index}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#0D0F12] px-3 sm:px-6 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-xs font-medium flex items-center gap-2 active:scale-[0.99] transition-transform"
              >
                <span className="font-mono text-[10px] font-semibold text-[#9E2A2B] dark:text-[#E06D53]">
                  {item.index}
                </span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#DED8C8]/70 dark:border-[#272D37]/70 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[#52504C] dark:text-[#A7ACB4]">
              CGPA: <strong>{portfolioData.profile.cgpa}</strong> · Class of Mar 2027
            </span>
            {portfolioData.profile.freelanceBridge.enabled && (
              <a
                href={portfolioData.profile.freelanceBridge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9E2A2B] dark:text-[#E06D53] font-semibold"
              >
                <span>Visit Freelance Site (atchyut.vercel.app)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
