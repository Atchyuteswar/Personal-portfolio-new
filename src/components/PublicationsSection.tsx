"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

export default function PublicationsSection() {
  const { certifications } = portfolioData;
  const [copiedCred, setCopiedCred] = useState<string | null>(null);

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedCred(id);
    setTimeout(() => setCopiedCred(null), 2000);
  };

  return (
    <section
      id="certifications"
      className="py-12 sm:py-16 lg:py-24 border-b border-[#DED8C8] dark:border-[#272D37]"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 mb-8 sm:pb-8 sm:mb-10 border-b border-[#DED8C8] dark:border-[#272D37]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
              <span>§ 05</span>
              <span>—</span>
              <span>VERIFIED LICENSES, CERTIFICATIONS &amp; SKILL BADGES</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
              SAP Cloud, AWS, Google Cloud &amp; Cisco Credentials
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
            Over 30+ industry-recognized certifications and cloud laboratories completed alongside
            my B.Tech. CSE (Data Science) curriculum at MLRITM.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="p-4 sm:p-7 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] flex flex-col justify-between space-y-4 sm:space-y-5 shadow-sm"
            >
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] sm:text-xs border-b border-[#DED8C8] dark:border-[#272D37] pb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                    {cert.badgeText}
                  </span>
                  <span className="text-[#78756F] dark:text-[#A7ACB4]">
                    {cert.period}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#1D3557] dark:text-[#6CA0DC] font-semibold">
                    {cert.issuer}
                  </div>
                  <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-medium text-[#161615] dark:text-[#ECE8E1] leading-snug">
                    {cert.category}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                  {cert.summary}
                </p>

                <ul className="space-y-1.5 pt-1">
                  {cert.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-[#161615] dark:text-[#ECE8E1]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {cert.credentialId && (
                <div className="pt-3 border-t border-[#DED8C8] dark:border-[#272D37] flex flex-col xs:flex-row xs:items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-[#78756F] dark:text-[#A7ACB4] break-all">
                    Credential ID:{" "}
                    <strong className="text-[#161615] dark:text-[#ECE8E1]">
                      {cert.credentialId}
                    </strong>
                  </span>
                  <button
                    onClick={() => copyId(cert.credentialId!)}
                    className="self-start xs:self-auto inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-[#9E2A2B] dark:text-[#E06D53] hover:underline shrink-0"
                  >
                    {copiedCred === cert.credentialId ? (
                      <>
                        <Check className="w-3 h-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy ID
                      </>
                    )}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
