"use client";

import React, { useState } from "react";
import { portfolioData, PatentItem } from "@/data/portfolioData";
import {
  ScrollText,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Code2,
  Users,
  Calendar,
  Building2,
  Cpu,
} from "lucide-react";

export default function PatentSection() {
  const { patents } = portfolioData;
  const [expandedClaims, setExpandedClaims] = useState<Record<string, boolean>>({
    "PAT-01": true,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "PAT-01": true,
  });
  const [activeBibtex, setActiveBibtex] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleClaims = (id: string) => {
    setExpandedClaims((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModules = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBibtex = (id: string) => {
    setActiveBibtex((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="patents"
      className="py-12 sm:py-16 lg:py-24 border-b border-[#DED8C8] dark:border-[#272D37]"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 mb-8 sm:pb-8 sm:mb-10 border-b border-[#DED8C8] dark:border-[#272D37]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
              <span>§ 01</span>
              <span>—</span>
              <span>INTELLECTUAL PROPERTY REGISTRY (THE PATENT ACT, 1970)</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
              Filed Utility Patent &amp; Complete Specification
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
            Official Form 2 Complete Specification filed with the Indian Patent Office (Application
            No. <strong>202641112485</strong>) at MLRITM &amp; MLRIT, Hyderabad.
          </p>
        </div>

        {/* Patent Dossier List */}
        <div className="space-y-5 sm:space-y-6">
          {patents.map((patent: PatentItem) => {
            const isClaimsOpen = !!expandedClaims[patent.id];
            const isModulesOpen = !!expandedModules[patent.id];
            const isBibtexOpen = !!activeBibtex[patent.id];

            return (
              <article
                key={patent.id}
                className="rounded-lg border-2 border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] overflow-hidden shadow-sm hover:border-[#9E2A2B]/60 dark:hover:border-[#E06D53]/60 transition-colors"
              >
                {/* Top Registry Stamp Bar */}
                <div className="px-4 sm:px-7 py-3 sm:py-3.5 bg-[#F3EFE6]/80 dark:bg-[#14181D] border-b border-[#DED8C8] dark:border-[#272D37] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs min-w-0">
                    <span className="px-2 py-0.5 rounded bg-[#161615] text-[#FAF7F2] dark:bg-[#ECE8E1] dark:text-[#0D0F12] font-bold shrink-0">
                      FORM 2 · {patent.id}
                    </span>
                    <span className="text-[#52504C] dark:text-[#A7ACB4] font-medium break-words">
                      APPLICATION NO:{" "}
                      <strong className="text-[#9E2A2B] dark:text-[#E06D53] text-xs sm:text-sm">
                        {patent.applicationNumber}
                      </strong>
                    </span>
                    <span className="hidden lg:inline text-[#DED8C8] dark:text-[#272D37]">|</span>
                    <span className="inline-flex items-center gap-1 text-[#52504C] dark:text-[#A7ACB4]">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{patent.jurisdiction}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-[#52504C] dark:text-[#A7ACB4]">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{patent.filingDate}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-[#9E2A2B]/15 text-[#9E2A2B] dark:bg-[#E06D53]/20 dark:text-[#E06D53] border border-[#9E2A2B]/30">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{patent.status}</span>
                    </span>
                  </div>
                </div>

                {/* Main Patent Body */}
                <div className="p-4 sm:p-7 space-y-5 sm:space-y-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9E2A2B] dark:text-[#E06D53] font-medium">
                      Field of Invention: {patent.domain}
                    </div>
                    <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-medium text-[#161615] dark:text-[#ECE8E1] leading-snug break-words">
                      {patent.title}
                    </h3>
                  </div>

                  {/* Applicants Block */}
                  {patent.applicants && patent.applicants.length > 0 && (
                    <div className="p-3 sm:p-3.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2]/80 dark:bg-[#14181D] text-xs space-y-1">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#78756F] dark:text-[#A7ACB4] font-semibold">
                        Official Applicants on Record
                      </div>
                      <div className="font-medium text-[#161615] dark:text-[#ECE8E1] flex flex-wrap items-center gap-x-3 gap-y-1">
                        {patent.applicants.map((app, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1D3557] dark:bg-[#6CA0DC]" />
                            <span>{app}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inventors Line */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#78756F] dark:text-[#A7ACB4] uppercase">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>Named Inventors ({patent.inventors.length}):</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {patent.inventors.map((inventor, idx) => {
                        const isMe = inventor.toLowerCase().includes("atchyut");
                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 rounded font-mono text-[11px] sm:text-xs break-words ${
                              isMe
                                ? "bg-[#9E2A2B] text-white dark:bg-[#E06D53] dark:text-[#0D0F12] font-bold shadow-sm"
                                : "bg-[#FAF7F2] dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] border border-[#DED8C8] dark:border-[#272D37]"
                            }`}
                          >
                            {idx + 1}. {inventor}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Abstract */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#78756F] dark:text-[#A7ACB4] font-semibold">
                      Official Abstract (Form 2, Page 16)
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                      {patent.abstract}
                    </p>
                  </div>

                  {/* System (100) Architecture — 10 Integrated Modules (FIG. 1 & FIG. 2) */}
                  {patent.systemModules && isModulesOpen && (
                    <div className="p-3.5 sm:p-5 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#1D3557] dark:text-[#6CA0DC] shrink-0" />
                          <span>System (100) Architecture — Reference Numerals 110–200 (FIG. 1 &amp; FIG. 2)</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#78756F] dark:text-[#A7ACB4]">
                          Modality-Adaptive Edge-AI Pipeline
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {patent.systemModules.map((mod) => (
                          <div
                            key={mod.code}
                            className="p-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] space-y-1"
                          >
                            <div className="font-mono text-[10px] font-bold text-[#9E2A2B] dark:text-[#E06D53]">
                              MODULE ({mod.code})
                            </div>
                            <div className="font-serif font-semibold text-xs sm:text-sm text-[#161615] dark:text-[#ECE8E1] leading-snug">
                              {mod.name}
                            </div>
                            <div className="text-[11px] text-[#52504C] dark:text-[#A7ACB4] leading-snug">
                              {mod.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable Claims Section */}
                  {isClaimsOpen && (
                    <div className="p-3.5 sm:p-5 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] space-y-2.5">
                      <div className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] flex items-center gap-2">
                        <ScrollText className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                        <span>Summary of Complete Specification Claims 1–8 (Form 2, Pages 14–15)</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]">
                        {patent.keyClaims.map((claim, i) => (
                          <li key={i} className="leading-relaxed break-words flex items-start gap-2">
                            <span className="font-mono text-xs font-bold text-[#9E2A2B] dark:text-[#E06D53] shrink-0 mt-0.5">
                              0{i + 1}.
                            </span>
                            <span>{claim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Expandable BibTeX Drawer */}
                  {isBibtexOpen && (
                    <div className="p-3.5 sm:p-4 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-[#161615] text-[#ECE8E1] font-mono text-xs overflow-x-auto">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-[#A7ACB4]">
                        <span>BibTeX Citation Record (App No. {patent.applicationNumber})</span>
                        <button
                          onClick={() => handleCopy(`${patent.id}-bib`, patent.bibtex)}
                          className="inline-flex items-center gap-1 text-[#E06D53] hover:underline"
                        >
                          {copiedId === `${patent.id}-bib` ? (
                            <>
                              <Check className="w-3 h-3" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy BibTeX
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[10px] sm:text-[11px] leading-relaxed whitespace-pre-wrap break-words sm:whitespace-pre">
                        {patent.bibtex}
                      </pre>
                    </div>
                  )}

                  {/* Action Footer */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#DED8C8]/60 dark:border-[#272D37]/60">
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                      {patent.systemModules && (
                        <button
                          onClick={() => toggleModules(patent.id)}
                          className="col-span-1 xs:col-span-2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-xs font-mono font-medium hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
                        >
                          <Cpu className="w-3.5 h-3.5 shrink-0 text-[#1D3557] dark:text-[#6CA0DC]" />
                          <span>
                            {isModulesOpen
                              ? "Hide System (100) Modules"
                              : `Show System (100) Modules (${patent.systemModules.length})`}
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleClaims(patent.id)}
                        className="col-span-1 xs:col-span-2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-xs font-mono font-medium hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
                      >
                        {isClaimsOpen ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                            <span>Hide Claims ({patent.keyClaims.length})</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                            <span>Inspect Claims ({patent.keyClaims.length})</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => toggleBibtex(patent.id)}
                        className="col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-xs font-mono font-medium hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{isBibtexOpen ? "Hide BibTeX" : "BibTeX"}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(patent.id, patent.citationText)}
                        className="col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-xs font-mono font-medium hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
                      >
                        {copiedId === patent.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Citation Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 shrink-0" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>

                    {patent.relatedProjectId && (
                      <a
                        href="#projects"
                        className="font-mono text-xs text-[#9E2A2B] dark:text-[#E06D53] hover:underline self-start sm:self-auto"
                      >
                        Linked Engineering Dossier: [{patent.relatedProjectId}] →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
