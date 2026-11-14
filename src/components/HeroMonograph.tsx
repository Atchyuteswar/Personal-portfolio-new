"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  ScrollText,
  Cpu,
  Award,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react";

export default function HeroMonograph() {
  const { profile, researchAreas, patents, projects } = portfolioData;

  return (
    <section
      id="top"
      className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-[#DED8C8] dark:border-[#272D37]"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Monograph Classification Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 sm:pb-6 sm:mb-8 border-b border-[#DED8C8] dark:border-[#272D37]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs text-[#52504C] dark:text-[#A7ACB4]">
            <span className="px-2.5 py-1 rounded bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
              ACADEMIC DOSSIER · 2023–2027
            </span>
            <span className="hidden xs:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
              <span className="line-clamp-1">
                {profile.university}, {profile.location}
              </span>
            </span>
          </div>

          <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1D3557]/30 dark:border-[#6CA0DC]/30 bg-[#1D3557]/5 dark:bg-[#6CA0DC]/10 font-mono text-[11px] sm:text-xs text-[#1D3557] dark:text-[#6CA0DC] shrink-0">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Expected Graduation: {profile.graduationMonthYear}</span>
          </div>
        </div>

        {/* Main 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column (8 cols on lg+): Academic Identity & Abstract */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6 min-w-0">
            <div className="space-y-2.5 sm:space-y-3">
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold leading-relaxed">
                {profile.academicTitle}
              </p>
              <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl xl:text-6xl font-normal tracking-tight text-[#161615] dark:text-[#ECE8E1] leading-[1.1] break-words">
                {profile.fullName}
              </h1>
              <p className="font-serif italic text-base sm:text-lg xl:text-xl text-[#52504C] dark:text-[#A7ACB4] leading-snug">
                {profile.degree} — {profile.university}
              </p>
            </div>

            {/* Abstract Block */}
            <div className="p-4 sm:p-6 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white/85 dark:bg-[#181C22]/90 shadow-sm space-y-3">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                  § 00 — Collegiate Abstract &amp; Engineering Focus
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#78756F] dark:text-[#6E7582]">
                  {profile.currentSemesterLabel}
                </span>
              </div>
              <p className="text-xs xs:text-sm sm:text-base leading-relaxed text-[#161615] dark:text-[#ECE8E1]">
                {profile.shortBio}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                {profile.researchStatement}
              </p>
            </div>

            {/* Research Vectors (Responsive 1 -> 2 -> 3 Cols) */}
            <div className="space-y-2.5 pt-1">
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#78756F] dark:text-[#A7ACB4]">
                Core Technical Specializations
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5">
                {researchAreas.map((area) => (
                  <div
                    key={area.code}
                    className="p-4 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-[#F3EFE6]/60 dark:bg-[#14181D] hover:border-[#9E2A2B]/50 dark:hover:border-[#E06D53]/50 transition-colors"
                  >
                    <div className="font-mono text-[10px] text-[#9E2A2B] dark:text-[#E06D53] font-semibold mb-1">
                      [{area.code}]
                    </div>
                    <h2 className="font-serif font-semibold text-base text-[#161615] dark:text-[#ECE8E1] mb-1.5">
                      {area.title}
                    </h2>
                    <p className="text-xs leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Scholarly Profiles Bar */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href={`mailto:${profile.email}`}
                className="col-span-1 xs:col-span-2 sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#9E2A2B] dark:bg-[#E06D53] text-white dark:text-[#0D0F12] text-xs font-mono font-semibold tracking-wider hover:opacity-90 transition-opacity min-w-0"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>

              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-xs font-mono hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                <span className="truncate">{profile.phone}</span>
              </a>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-xs font-mono hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
              >
                <Github className="w-3.5 h-3.5 shrink-0" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 xs:col-span-2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-xs font-mono hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols on lg, 4 cols on xl): Dossier Index Card & Graduation Tracker */}
          <div className="lg:col-span-5 xl:col-span-4 w-full">
            <div className="p-4 sm:p-6 rounded-lg border-2 border-[#161615]/15 dark:border-[#ECE8E1]/15 bg-white dark:bg-[#181C22] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#DED8C8] dark:border-[#272D37] pb-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#78756F] dark:text-[#A7ACB4]">
                    MLRITM COLLEGIATE RECORD
                  </div>
                  <div className="font-serif font-semibold text-base sm:text-lg text-[#161615] dark:text-[#ECE8E1]">
                    Dossier Index Metrics
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
              </div>

              {/* Key Quantitative Indicators: 2 cols on mobile, 4 cols on tablet, 2 cols on desktop sidebar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 sm:gap-3">
                <a
                  href="#patents"
                  className="p-3 sm:p-3.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] hover:border-[#9E2A2B] transition-colors group"
                >
                  <div className="flex items-center justify-between text-[#78756F] dark:text-[#A7ACB4] mb-1">
                    <span className="font-mono text-[10px] uppercase">Patent Filed</span>
                    <ScrollText className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#161615] dark:text-[#ECE8E1] group-hover:text-[#9E2A2B] dark:group-hover:text-[#E06D53]">
                    01
                  </div>
                  <div className="font-mono text-[10px] text-[#52504C] dark:text-[#A7ACB4] mt-0.5 truncate">
                    App: 202641112485
                  </div>
                </a>

                <a
                  href="#projects"
                  className="p-3 sm:p-3.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] hover:border-[#9E2A2B] transition-colors group"
                >
                  <div className="flex items-center justify-between text-[#78756F] dark:text-[#A7ACB4] mb-1">
                    <span className="font-mono text-[10px] uppercase">Projects</span>
                    <Cpu className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#161615] dark:text-[#ECE8E1] group-hover:text-[#9E2A2B] dark:group-hover:text-[#E06D53]">
                    0{projects.length}
                  </div>
                  <div className="font-mono text-[10px] text-[#52504C] dark:text-[#A7ACB4] mt-0.5 truncate">
                    AI, SAP &amp; Web3
                  </div>
                </a>

                <a
                  href="#certifications"
                  className="p-3 sm:p-3.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] hover:border-[#9E2A2B] transition-colors group"
                >
                  <div className="flex items-center justify-between text-[#78756F] dark:text-[#A7ACB4] mb-1">
                    <span className="font-mono text-[10px] uppercase">Badges</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#161615] dark:text-[#ECE8E1] group-hover:text-[#9E2A2B] dark:group-hover:text-[#E06D53]">
                    30+
                  </div>
                  <div className="font-mono text-[10px] text-[#52504C] dark:text-[#A7ACB4] mt-0.5 truncate">
                    SAP, AWS, GCP
                  </div>
                </a>

                <a
                  href="#education"
                  className="p-3 sm:p-3.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] hover:border-[#9E2A2B] transition-colors group"
                >
                  <div className="flex items-center justify-between text-[#78756F] dark:text-[#A7ACB4] mb-1">
                    <span className="font-mono text-[10px] uppercase">CGPA</span>
                    <Award className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#161615] dark:text-[#ECE8E1] group-hover:text-[#9E2A2B] dark:group-hover:text-[#E06D53]">
                    7.65
                  </div>
                  <div className="font-mono text-[10px] text-[#52504C] dark:text-[#A7ACB4] mt-0.5 truncate">
                    CSE (Data Sci)
                  </div>
                </a>
              </div>

              {/* March 2027 Degree Completion Meter */}
              <div className="p-3.5 sm:p-4 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#F3EFE6]/60 dark:bg-[#14181D] space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs">
                  <span className="font-semibold text-[#161615] dark:text-[#ECE8E1]">
                    B.Tech. Timeline (2023–2027)
                  </span>
                  <span className="text-[#9E2A2B] dark:text-[#E06D53] font-bold">
                    {profile.graduationProgressPercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#DED8C8] dark:bg-[#272D37] overflow-hidden">
                  <div
                    className="h-full bg-[#9E2A2B] dark:bg-[#E06D53] rounded-full transition-all duration-500"
                    style={{ width: `${profile.graduationProgressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#52504C] dark:text-[#A7ACB4]">
                  <span>Sem VII Active</span>
                  <span>Graduating: {profile.graduationMonthYear}</span>
                </div>
              </div>

              {/* Bridge to Freelance Portfolio */}
              {profile.freelanceBridge.enabled && (
                <div className="p-3.5 sm:p-4 rounded border border-[#1D3557]/25 dark:border-[#6CA0DC]/25 bg-[#1D3557]/5 dark:bg-[#6CA0DC]/10 space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#1D3557] dark:text-[#6CA0DC] font-semibold">
                    Primary Freelance &amp; Dev Portfolio
                  </div>
                  <p className="text-xs text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
                    {profile.freelanceBridge.label}
                  </p>
                  <a
                    href={profile.freelanceBridge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1D3557] dark:text-[#6CA0DC] hover:underline pt-0.5"
                  >
                    <span>{profile.freelanceBridge.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
