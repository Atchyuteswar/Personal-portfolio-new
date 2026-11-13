"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  ArrowUpRight,
  Sparkles,
  FileCode2,
  ExternalLink,
} from "lucide-react";

export default function ExperienceAndCampus() {
  const { academicExperience, campusLife, profile } = portfolioData;

  return (
    <>
      {/* § 05 — Internships & Engineering Experience */}
      <section
        id="experience"
        className="py-12 sm:py-16 lg:py-24 border-b border-[#DED8C8] dark:border-[#272D37]"
      >
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 mb-8 sm:pb-8 sm:mb-10 border-b border-[#DED8C8] dark:border-[#272D37]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                <span>§ 05</span>
                <span>—</span>
                <span>COLLEGIATE INTERNSHIPS &amp; TECHNICAL APPOINTMENTS</span>
              </div>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
                Industry Internships &amp; Open-Source Engineering
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
              Practical industry internships completed during my B.Tech tenure—spanning SAP ABAP
              Cloud at Naxrita, Web3 at Timechain Labs, and Climate Data at CAF.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {academicExperience.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-7 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6"
              >
                <div className="lg:col-span-4 space-y-1.5 border-b lg:border-b-0 lg:border-r border-[#DED8C8] dark:border-[#272D37] pb-4 lg:pb-0 lg:pr-6">
                  <div className="font-mono text-xs text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                    {item.period}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#161615] dark:text-[#ECE8E1]">
                    {item.role}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-[#1D3557] dark:text-[#6CA0DC]">
                    {item.organization}
                  </div>
                  <div className="font-mono text-xs text-[#78756F] dark:text-[#A7ACB4]">
                    {item.departmentOrLab}
                  </div>
                  <div className="font-mono text-[11px] text-[#52504C] dark:text-[#A7ACB4] pt-1">
                    {item.location}
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
                  <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#161615] dark:text-[#ECE8E1]"
                      >
                        <span className="font-mono text-xs text-[#9E2A2B] dark:text-[#E06D53] mt-0.5 shrink-0">
                          —
                        </span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-2.5 py-0.5 rounded font-mono text-[10px] sm:text-[11px] bg-[#FAF7F2] dark:bg-[#14181D] border border-[#DED8C8] dark:border-[#272D37] text-[#52504C] dark:text-[#A7ACB4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* § 06 — Campus Leadership, Hackathons, Societies & Student Life */}
      <section
        id="campus"
        className="py-12 sm:py-16 lg:py-24 border-b border-[#DED8C8] dark:border-[#272D37]"
      >
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 mb-8 sm:pb-8 sm:mb-10 border-b border-[#DED8C8] dark:border-[#272D37]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                <span>§ 06</span>
                <span>—</span>
                <span>CAMPUS LEADERSHIP, CHAPTERS &amp; STUDENT LIFE</span>
              </div>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
                Student Chapters, Open-Source &amp; Community Impact
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
              Leading technical communities across Hyderabad and MLRITM, conducting bootcamps for
              700+ students, and contributing to open-source movements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {campusLife.map((activity) => (
              <div
                key={activity.id}
                className="p-4 sm:p-6 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] sm:text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                      {activity.badge}
                    </span>
                    <span className="text-[#78756F] dark:text-[#A7ACB4]">
                      {activity.period}
                    </span>
                  </div>

                  <div>
                    <div className="font-mono text-[11px] text-[#1D3557] dark:text-[#6CA0DC]">
                      {activity.organization}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#161615] dark:text-[#ECE8E1] mt-0.5">
                      {activity.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                    {activity.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DED8C8]/70 dark:border-[#272D37] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] sm:text-xs">
                  {activity.impactMetric && (
                    <span className="font-semibold text-[#161615] dark:text-[#ECE8E1]">
                      {activity.impactMetric}
                    </span>
                  )}
                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#9E2A2B] dark:text-[#E06D53] hover:underline"
                    >
                      <span>Chapter Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual-Persona Bridge: Link to Commercial Freelance Portfolio */}
      {profile.freelanceBridge.enabled && (
        <section className="py-12 sm:py-16 lg:py-20 border-b border-[#DED8C8] dark:border-[#272D37] bg-[#F3EFE6]/60 dark:bg-[#14181D]">
          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
            <div className="p-5 sm:p-8 lg:p-10 rounded-xl border-2 border-[#1D3557]/25 dark:border-[#6CA0DC]/30 bg-white dark:bg-[#181C22] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#1D3557] dark:text-[#6CA0DC] font-semibold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>COMPANION COMMERCIAL &amp; FREELANCE PORTFOLIO</span>
                </div>
                <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl text-[#161615] dark:text-[#ECE8E1] leading-snug">
                  {profile.freelanceBridge.label}
                </h2>
                <p className="text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed max-w-2xl">
                  {profile.freelanceBridge.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between lg:justify-end gap-4">
                <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  {profile.freelanceBridge.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-left sm:text-right"
                    >
                      <div className="font-serif text-base sm:text-lg font-bold text-[#161615] dark:text-[#ECE8E1]">
                        {st.value}
                      </div>
                      <div className="font-mono text-[10px] text-[#78756F] dark:text-[#A7ACB4]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={profile.freelanceBridge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#1D3557] dark:bg-[#6CA0DC] text-white dark:text-[#0D0F12] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <span>{profile.freelanceBridge.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Colophon / Academic Footer */}
      <footer className="py-10 sm:py-12 bg-[#FAF7F2] dark:bg-[#0D0F12] text-xs font-mono text-[#52504C] dark:text-[#A7ACB4]">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-semibold text-[#161615] dark:text-[#ECE8E1]">
              {profile.fullName} — Academic, Patent &amp; Collegiate Research Dossier
            </div>
            <div className="text-[11px] sm:text-xs">
              {profile.degree} · {profile.university} · Graduating {profile.graduationMonthYear}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DED8C8]/60 dark:border-[#272D37]/60">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#78756F]">
              <FileCode2 className="w-3.5 h-3.5 shrink-0" />
              <span>src/data/portfolioData.ts</span>
            </span>
            <a
              href="#top"
              className="text-[#9E2A2B] dark:text-[#E06D53] hover:underline font-semibold"
            >
              ↑ Back to Top
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
