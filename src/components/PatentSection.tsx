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
} from "lucide-react";

export default function PatentSection() {
  const { patents } = portfolioData;
  const [expandedClaims, setExpandedClaims] = useState<Record<string, boolean>>({
    "PAT-01": true,
  });
  const [activeBibtex, setActiveBibtex] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleClaims = (id: string) => {
    setExpandedClaims((prev) => ({ ...prev, [id]: !prev[id] }));
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
              <span>INTELLECTUAL PROPERTY REGISTRY</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
              Filed Utility Patents &amp; Disclosures
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
            Formal patent applications filed during my undergraduate research tenure at MLRITM,
            translating laboratory architectures into protected intellectual property.
          </p>
        </div>

        {/* Patent Dossier List */}
        <div className="space-y-5 sm:space-y-6">
          {patents.map((patent: PatentItem) => {
            const isClaimsOpen = !!expandedClaims[patent.id];
            const isBibtexOpen = !!activeBibtex[patent.id];

            return (
              <article
                key={patent.id}
                className="rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] overflow-hidden shadow-sm hover:border-[#9E2A2B]/50 dark:hover:border-[#E06D53]/50 transition-colors"
              >
                {/* Top Registry Stamp Bar */}
                <div className="px-4 sm:px-7 py-3 sm:py-3.5 bg-[#F3EFE6]/80 dark:bg-[#14181D] border-b border-[#DED8C8] dark:border-[#272D37] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs min-w-0">
                    <span className="px-2 py-0.5 rounded bg-[#161615] text-[#FAF7F2] dark:bg-[#ECE8E1] dark:text-[#0D0F12] font-bold shrink-0">
                      {patent.id}
                    </span>
                    <span className="text-[#52504C] dark:text-[#A7ACB4] font-medium break-words">
                      APP NO:{" "}
                      <strong className="text-[#161615] dark:text-[#ECE8E1]">
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
                      <span>Filed: {patent.filingDate}</span>
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${
                        patent.status === "Published" || patent.status === "Granted"
                          ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-700/20"
                          : "bg-[#9E2A2B]/10 text-[#9E2A2B] dark:bg-[#E06D53]/15 dark:text-[#E06D53] border border-[#9E2A2B]/25"
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{patent.status}</span>
                    </span>
                  </div>
                </div>

                {/* Main Patent Body */}
                <div className="p-4 sm:p-7 space-y-4 sm:space-y-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9E2A2B] dark:text-[#E06D53] font-medium">
                      Domain: {patent.domain}
                    </div>
                    <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-medium text-[#161615] dark:text-[#ECE8E1] leading-snug break-words">
                      {patent.title}
                    </h3>
                  </div>

                  {/* Inventors Line */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#78756F] dark:text-[#A7ACB4] uppercase">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>Inventors:</span>
                    </span>
                    {patent.inventors.map((inventor, idx) => (
                      <span
                        key={idx}
                        className={`px-2 sm:px-2.5 py-0.5 rounded font-mono text-[11px] sm:text-xs break-words ${
                          idx === 0
                            ? "bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold border border-[#9E2A2B]/25"
                            : "bg-[#FAF7F2] dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] border border-[#DED8C8] dark:border-[#272D37]"
                        }`}
                      >
                        {inventor}
                      </span>
                    ))}
                  </div>

                  {/* Abstract */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#78756F] dark:text-[#A7ACB4]">
                      Abstract of the Disclosure
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                      {patent.abstract}
                    </p>
                  </div>

                  {/* Expandable Claims Section */}
                  {isClaimsOpen && (
                    <div className="p-3.5 sm:p-5 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] space-y-2.5">
                      <div className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] flex items-center gap-2">
                        <ScrollText className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                        <span>Summary of Independent &amp; Principal Technical Claims</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]">
                        {patent.keyClaims.map((claim, i) => (
                          <li key={i} className="leading-relaxed break-words">
                            {claim}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Expandable BibTeX Drawer */}
                  {isBibtexOpen && (
                    <div className="p-3.5 sm:p-4 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-[#161615] text-[#ECE8E1] font-mono text-xs overflow-x-auto">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-[#A7ACB4]">
                        <span>BibTeX Citation Record</span>
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
                    <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-wrap items-center gap-2">
                      <button
                        onClick={() => toggleClaims(patent.id)}
                        className="col-span-1 xs:col-span-3 sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-xs font-mono font-medium hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
                      >
                        {isClaimsOpen ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                            <span>Hide Technical Claims ({patent.keyClaims.length})</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                            <span>Inspect Technical Claims ({patent.keyClaims.length})</span>
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
                        className="col-span-1 xs:col-span-2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-xs font-mono font-medium hover:border-[#9E2A2B] dark:hover:border-[#E06D53] transition-colors"
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
                        Linked Project: [{patent.relatedProjectId}] →
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
