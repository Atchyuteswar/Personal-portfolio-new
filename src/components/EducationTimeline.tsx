"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  GraduationCap,
  Award,
  School,
} from "lucide-react";

export default function EducationTimeline() {
  const { education, profile } = portfolioData;
  const [activeSemIdx, setActiveSemIdx] = useState<number>(3); // Default to Current Semester (Sem VII)

  const currentSem = education.semesters[activeSemIdx];

  return (
    <section
      id="education"
      className="py-12 sm:py-16 lg:py-24 border-b border-[#DED8C8] dark:border-[#272D37]"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 mb-8 sm:pb-8 sm:mb-10 border-b border-[#DED8C8] dark:border-[#272D37]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
              <span>§ 01</span>
              <span>—</span>
              <span>EDUCATION, COURSEWORK &amp; TECHNICAL SKILLS</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
              MLRITM Undergraduate Degree &amp; Coursework Ledger
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
            Four-year B.Tech. CSE (Data Science) progression ({profile.enrollmentYear}–2027) at
            Marri Laxman Reddy Institute of Technology and Management, Hyderabad.
          </p>
        </div>

        {/* Top Degree Overview Card */}
        <div className="p-4 sm:p-8 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] mb-8 sm:mb-10 space-y-5 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#DED8C8] dark:border-[#272D37]">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>{education.duration}</span>
              </div>
              <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl text-[#161615] dark:text-[#ECE8E1] leading-snug">
                {education.degreeTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]">
                {education.institution} · {education.location}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="px-3.5 sm:px-4 py-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D]">
                <div className="font-mono text-[10px] uppercase text-[#78756F] dark:text-[#A7ACB4]">
                  Cumulative GPA
                </div>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#161615] dark:text-[#ECE8E1]">
                  {education.cgpa}
                </div>
              </div>
              <div className="px-3.5 sm:px-4 py-2.5 rounded border border-[#9E2A2B]/30 dark:border-[#E06D53]/30 bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15">
                <div className="font-mono text-[10px] uppercase text-[#9E2A2B] dark:text-[#E06D53]">
                  Conferral Target
                </div>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#9E2A2B] dark:text-[#E06D53]">
                  March 2027
                </div>
              </div>
            </div>
          </div>

          {/* Prior Education + Academic Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#78756F] dark:text-[#A7ACB4]">
                  B.Tech. Specialization &amp; Capstone Focus
                </div>
                <div className="p-3.5 sm:p-4 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] space-y-1">
                  <p className="font-serif text-sm sm:text-base font-medium text-[#161615] dark:text-[#ECE8E1]">
                    &ldquo;{education.thesisTitle}&rdquo;
                  </p>
                  <p className="font-mono text-[11px] sm:text-xs text-[#52504C] dark:text-[#A7ACB4]">
                    {education.advisor} · Expected Defense: March 2027
                  </p>
                </div>
              </div>

              {education.priorEducation && (
                <div className="p-3.5 sm:p-4 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] flex items-start gap-3">
                  <School className="w-4 h-4 text-[#1D3557] dark:text-[#6CA0DC] shrink-0 mt-1" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-mono text-[10px] uppercase text-[#78756F] dark:text-[#A7ACB4]">
                      Pre-University / Intermediate ({education.priorEducation.duration})
                    </div>
                    <div className="font-serif font-medium text-sm text-[#161615] dark:text-[#ECE8E1]">
                      {education.priorEducation.level}
                    </div>
                    <div className="text-xs text-[#52504C] dark:text-[#A7ACB4]">
                      {education.priorEducation.institution}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#78756F] dark:text-[#A7ACB4]">
                Collegiate Milestones &amp; Distinctions
              </div>
              <ul className="space-y-2.5">
                {education.honors.map((honor, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]"
                  >
                    <Award className="w-4 h-4 text-[#9E2A2B] dark:text-[#E06D53] shrink-0 mt-0.5" />
                    <span className="leading-relaxed break-words">{honor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Semester-by-Semester Explorer */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold">
              Interactive B.Tech. Roadmap (Select Term to Inspect Coursework)
            </div>
            <span className="font-mono text-[11px] sm:text-xs text-[#9E2A2B] dark:text-[#E06D53]">
              2023 – March 2027
            </span>
          </div>

          {/* Semester Selector Tabs: 1 col -> 2 col -> 3 col -> 5 col */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {education.semesters.map((sem, idx) => {
              const isSelected = idx === activeSemIdx;
              return (
                <button
                  key={sem.semester}
                  onClick={() => setActiveSemIdx(idx)}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-[#9E2A2B] dark:border-[#E06D53] bg-white dark:bg-[#181C22] shadow-sm ring-1 ring-[#9E2A2B]/30"
                      : "border-[#DED8C8] dark:border-[#272D37] bg-[#F3EFE6]/60 dark:bg-[#14181D] hover:bg-white dark:hover:bg-[#181C22]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#9E2A2B] dark:text-[#E06D53]">
                      0{idx + 1}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        sem.status === "Completed"
                          ? "bg-emerald-900/10 text-emerald-700 dark:text-emerald-400"
                          : sem.status === "Current Semester"
                          ? "bg-[#9E2A2B]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold"
                          : "bg-[#1D3557]/15 text-[#1D3557] dark:text-[#6CA0DC]"
                      }`}
                    >
                      {sem.status === "Completed"
                        ? "Done"
                        : sem.status === "Current Semester"
                        ? "Active"
                        : "Mar '27"}
                    </span>
                  </div>
                  <div className="font-serif font-semibold text-sm text-[#161615] dark:text-[#ECE8E1]">
                    {sem.semester}
                  </div>
                  <div className="font-mono text-[10px] text-[#78756F] dark:text-[#A7ACB4] mt-0.5">
                    {sem.period}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Semester Detail Panel */}
          {currentSem && (
            <div className="p-4 sm:p-6 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DED8C8] dark:border-[#272D37]">
                <div>
                  <div className="font-mono text-xs text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                    {currentSem.semester} · {currentSem.period}
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl text-[#161615] dark:text-[#ECE8E1] mt-0.5">
                    {currentSem.highlight}
                  </h4>
                </div>
                {currentSem.sgpa && (
                  <div className="self-start sm:self-auto px-3 py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] font-mono text-xs shrink-0">
                    Status: <strong>{currentSem.sgpa}</strong>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {currentSem.courses.map((course) => (
                  <div
                    key={course.code}
                    className="p-3.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-[#9E2A2B] dark:text-[#E06D53]">
                          {course.code}
                        </span>
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white dark:bg-[#181C22] border border-[#DED8C8] dark:border-[#272D37] text-[#52504C] dark:text-[#A7ACB4]">
                          {course.tag}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#161615] dark:text-[#ECE8E1] mt-1.5">
                        {course.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
