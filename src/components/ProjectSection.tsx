"use client";

import React, { useState, useMemo } from "react";
import { portfolioData, ProjectItem } from "@/data/portfolioData";
import {
  Search,
  LayoutGrid,
  Table2,
  Github,
  ExternalLink,
  X,
  CheckCircle2,
  FlaskConical,
  Layers,
  BarChart3,
  Cpu,
  AlertTriangle,
  Sparkles,
  Database,
  Tag,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Patented Healthcare & Edge AI",
  "AI, ML & Data Science",
  "Enterprise & Cloud (SAP / Web)",
  "Web3 & Blockchain",
] as const;

/**
 * Helper to render inline backticks (`code`) as styled monospace pills
 * and bold any leading "Label:" prefix for clean academic typography.
 */
function renderInlineCode(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[#F3EFE6] dark:bg-[#222731] font-mono text-[11px] text-[#9E2A2B] dark:text-[#E06D53] border border-[#DED8C8] dark:border-[#2F3643]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function renderRichStep(text: string): React.ReactNode {
  // Strip any accidental leading "1. ", "2. " numbering
  const cleaned = text.replace(/^\d+\.\s+/, "");
  const colonIdx = cleaned.indexOf(":");
  if (colonIdx > 0 && colonIdx < 48) {
    const label = cleaned.slice(0, colonIdx + 1);
    const rest = cleaned.slice(colonIdx + 1);
    return (
      <>
        <strong className="font-semibold text-[#161615] dark:text-[#ECE8E1]">
          {label}
        </strong>
        {renderInlineCode(rest)}
      </>
    );
  }
  return renderInlineCode(cleaned);
}

export default function ProjectSection() {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory =
        selectedCategory === "All" || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.subtitle.toLowerCase().includes(q) ||
        proj.courseOrLab.toLowerCase().includes(q) ||
        proj.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 lg:py-24 border-b border-[#DED8C8] dark:border-[#272D37]"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 mb-6 sm:pb-8 sm:mb-8 border-b border-[#DED8C8] dark:border-[#272D37]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
              <span>§ 02</span>
              <span>—</span>
              <span>COLLEGIATE ENGINEERING &amp; RESEARCH ARTIFACTS</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#161615] dark:text-[#ECE8E1]">
              Academic, AI/ML, SAP &amp; Web3 Projects
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
            Production systems, native AI mobile applications, SAP S/4HANA RAP modules, and
            collegiate project placeholders from my B.Tech tenure (2023–2027).
          </p>
        </div>

        {/* Filter & View Controls Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {/* Category Pills: Horizontal swipe on mobile, wrap on tablet+ */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap -mx-3 px-3 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 sm:py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors shrink-0 ${
                    active
                      ? "bg-[#9E2A2B] dark:bg-[#E06D53] text-white dark:text-[#0D0F12] font-semibold"
                      : "bg-white dark:bg-[#181C22] text-[#52504C] dark:text-[#A7ACB4] border border-[#DED8C8] dark:border-[#272D37] hover:border-[#9E2A2B]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search + View Switcher */}
          <div className="flex items-center gap-2 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-64">
              <Search className="w-3.5 h-3.5 text-[#78756F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kotlin, SAP, NLP, Web3..."
                className="w-full pl-8 pr-3 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-xs font-mono text-[#161615] dark:text-[#ECE8E1] placeholder:text-[#78756F] focus:outline-none focus:border-[#9E2A2B] dark:focus:border-[#E06D53]"
              />
            </div>

            <div className="inline-flex rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] p-0.5 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2.5 py-1.5 rounded text-xs flex items-center gap-1 font-mono ${
                  viewMode === "grid"
                    ? "bg-[#F3EFE6] dark:bg-[#272D37] text-[#9E2A2B] dark:text-[#E06D53] font-semibold"
                    : "text-[#78756F]"
                }`}
                title="Monograph Dossier Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px]">Cards</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1.5 rounded text-xs flex items-center gap-1 font-mono ${
                  viewMode === "table"
                    ? "bg-[#F3EFE6] dark:bg-[#272D37] text-[#9E2A2B] dark:text-[#E06D53] font-semibold"
                    : "text-[#78756F]"
                }`}
                title="Archival Index Table"
              >
                <Table2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px]">Index</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Editorial Monograph Grid (1 col mobile -> 2 col md -> 3 col 2xl) */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="h-full flex flex-col justify-between rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] overflow-hidden shadow-sm hover:border-[#9E2A2B]/60 dark:hover:border-[#E06D53]/60 transition-colors"
              >
                <div className="flex-1 flex flex-col">
                  {/* Card Top Index Header */}
                  <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#F3EFE6]/70 dark:bg-[#14181D] border-b border-[#DED8C8] dark:border-[#272D37] flex items-center justify-between gap-2 font-mono text-[11px] sm:text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="font-bold text-[#9E2A2B] dark:text-[#E06D53] shrink-0">
                        [{project.id}]
                      </span>
                      <span className="text-[#52504C] dark:text-[#A7ACB4] truncate">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[#78756F] dark:text-[#A7ACB4] truncate max-w-[45%] text-right">
                      {project.semester}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <div className="font-mono text-[10px] sm:text-[11px] text-[#1D3557] dark:text-[#6CA0DC] break-words">
                            {project.courseOrLab}
                            {project.advisor ? ` · Guide: ${project.advisor}` : ""}
                          </div>
                          {(project.benchmarkTable || project.caseStudySections) && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#9E2A2B]/10 text-[#9E2A2B] dark:bg-[#E06D53]/15 dark:text-[#E06D53] border border-[#9E2A2B]/30 dark:border-[#E06D53]/30 shrink-0">
                              <BarChart3 className="w-3 h-3" />
                              <span>Case Study + Benchmark</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-[#161615] dark:text-[#ECE8E1] leading-snug break-words">
                          {project.title}
                        </h3>
                        <p className="font-serif italic text-xs sm:text-sm text-[#78756F] dark:text-[#A7ACB4] break-words">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                        {project.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      {/* Empirical Metrics Strip */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {project.metrics.map((m, idx) => (
                            <div
                              key={idx}
                              className="p-2 sm:p-2.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] flex flex-col justify-between"
                            >
                              <div className="font-serif font-bold text-xs sm:text-sm text-[#161615] dark:text-[#ECE8E1] leading-tight break-words">
                                {m.value}
                              </div>
                              <div className="font-mono text-[9px] sm:text-[10px] text-[#78756F] dark:text-[#A7ACB4] leading-tight mt-0.5 break-words">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-[#F3EFE6] dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] border border-[#DED8C8]/70 dark:border-[#272D37]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-t border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2]/60 dark:bg-[#14181D]/50 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#9E2A2B] dark:text-[#E06D53] hover:underline py-1"
                  >
                    <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {project.caseStudySections
                        ? "Read Full Case Study →"
                        : "Inspect Technical Dossier →"}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {project.links.huggingFace && (
                      <a
                        href={project.links.huggingFace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-white"
                        title="Hugging Face Model Hub"
                      >
                        <Database className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-white"
                        title="Source Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links.liveDemo && (
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-white"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* View Mode 2: Archival Index Table (Responsive columns + smooth scroll) */
          <div className="overflow-x-auto rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22]">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DED8C8] dark:border-[#272D37] bg-[#F3EFE6]/80 dark:bg-[#14181D] font-mono text-[11px] uppercase text-[#52504C] dark:text-[#A7ACB4]">
                  <th className="py-3 px-3 sm:px-4">ID</th>
                  <th className="py-3 px-3 sm:px-4">Project &amp; Subtitle</th>
                  <th className="py-3 px-3 sm:px-4 hidden md:table-cell">Category / Domain</th>
                  <th className="py-3 px-3 sm:px-4">Term</th>
                  <th className="py-3 px-3 sm:px-4 hidden lg:table-cell">Core Stack</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED8C8] dark:divide-[#272D37] text-xs">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[#FAF7F2] dark:hover:bg-[#14181D] transition-colors"
                  >
                    <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-[#9E2A2B] dark:text-[#E06D53] whitespace-nowrap">
                      {project.id}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4">
                      <div className="font-serif font-medium text-sm text-[#161615] dark:text-[#ECE8E1]">
                        {project.title}
                      </div>
                      <div className="text-[#78756F] dark:text-[#A7ACB4] text-xs">
                        {project.subtitle}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 font-mono text-[11px] text-[#52504C] dark:text-[#A7ACB4] hidden md:table-cell">
                      <div>{project.category}</div>
                      <div className="text-[#78756F]">{project.courseOrLab}</div>
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 font-mono text-[11px] whitespace-nowrap text-[#52504C] dark:text-[#A7ACB4]">
                      {project.semester}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-[#F3EFE6] dark:bg-[#14181D] font-mono text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-2.5 py-1.5 rounded border border-[#9E2A2B]/40 dark:border-[#E06D53]/40 text-[#9E2A2B] dark:text-[#E06D53] font-mono text-[11px] hover:bg-[#9E2A2B] hover:text-white transition-colors"
                      >
                        Open →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Interactive Project Dossier Modal (Fixed Header + Scrollable Body + Fixed Footer) */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden rounded-t-2xl sm:rounded-xl border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 1. Fixed Modal Header (Never lets scrolled content bleed above it) */}
              <div className="shrink-0 bg-[#FAF7F2] dark:bg-[#14181D] flex items-start justify-between gap-3 border-b border-[#DED8C8] dark:border-[#272D37] px-4 sm:px-7 py-4 sm:py-5">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-[#9E2A2B] dark:text-[#E06D53]">
                    <span className="font-bold">[{selectedProject.id}]</span>
                    <span>·</span>
                    <span>{selectedProject.category}</span>
                    <span>·</span>
                    <span>{selectedProject.semester}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#161615] dark:text-[#ECE8E1] leading-snug break-words">
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-[11px] sm:text-xs text-[#52504C] dark:text-[#A7ACB4]">
                    {selectedProject.courseOrLab}
                    {selectedProject.advisor ? ` · Faculty Guide: ${selectedProject.advisor}` : ""}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] hover:border-[#9E2A2B] shrink-0"
                  aria-label="Close dossier modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 2. Scrollable Modal Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-5 sm:py-6 space-y-6">
                {/* Problem Statement */}
                <div className="p-4 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] space-y-1.5">
                  <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#9E2A2B] dark:text-[#E06D53] font-semibold">
                    1. Problem Formulation &amp; Motivation
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#52504C] dark:text-[#A7ACB4]">
                    {renderInlineCode(selectedProject.problemStatement)}
                  </p>
                </div>

                {/* Held-Out Test Benchmark Table (when available, e.g., WasteAI) */}
                {selectedProject.benchmarkTable &&
                  selectedProject.benchmarkTable.rows.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                        <span>{selectedProject.benchmarkTable.caption}</span>
                      </div>
                      <div className="overflow-x-auto rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22]">
                        <table className="w-full min-w-[540px] text-left border-collapse text-xs font-mono">
                          <thead>
                            <tr className="border-b border-[#DED8C8] dark:border-[#272D37] bg-[#F3EFE6]/80 dark:bg-[#14181D] text-[10px] sm:text-[11px] uppercase text-[#52504C] dark:text-[#A7ACB4]">
                              <th className="py-2.5 px-3.5">Model Architecture</th>
                              <th className="py-2.5 px-3">Accuracy</th>
                              <th className="py-2.5 px-3">Macro Precision</th>
                              <th className="py-2.5 px-3">Macro Recall</th>
                              <th className="py-2.5 px-3">Macro F1</th>
                              <th className="py-2.5 px-3.5 text-right">Model Size</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#DED8C8] dark:divide-[#272D37]">
                            {selectedProject.benchmarkTable.rows.map((row) => (
                              <tr
                                key={row.model}
                                className={
                                  row.highlight
                                    ? "bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 font-semibold text-[#161615] dark:text-[#ECE8E1]"
                                    : "text-[#52504C] dark:text-[#A7ACB4]"
                                }
                              >
                                <td className="py-2.5 px-3.5 flex items-center gap-2">
                                  <span>{row.model}</span>
                                  {row.highlight && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase bg-[#9E2A2B] text-white dark:bg-[#E06D53] dark:text-[#0D0F12]">
                                      Best
                                    </span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 text-[#9E2A2B] dark:text-[#E06D53] font-bold">
                                  {row.accuracy}
                                </td>
                                <td className="py-2.5 px-3">{row.precision}</td>
                                <td className="py-2.5 px-3">{row.recall}</td>
                                <td className="py-2.5 px-3">{row.f1}</td>
                                <td className="py-2.5 px-3.5 text-right">{row.size}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                {/* Methodology & Architecture */}
                <div className="space-y-2.5">
                  <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                    <span>2. System Architecture &amp; Implementation</span>
                  </div>
                  <ul className="space-y-2.5 pl-1">
                    {selectedProject.methodology.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]"
                      >
                        <span className="font-mono text-xs font-bold text-[#9E2A2B] dark:text-[#E06D53] mt-0.5 shrink-0">
                          0{i + 1}.
                        </span>
                        <span className="leading-relaxed">{renderRichStep(step)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extended Case Study Sections (Workflow, Preprocessing, Engineering Decisions, Limitations, Future Work) */}
                {selectedProject.caseStudySections && (
                  <div className="space-y-6 pt-3 border-t border-[#DED8C8]/70 dark:border-[#272D37]">
                    {/* End-to-End System Workflow */}
                    {selectedProject.caseStudySections.workflow && (
                      <div className="space-y-2.5">
                        <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#1D3557] dark:text-[#6CA0DC] shrink-0" />
                          <span>End-to-End System &amp; Inference Workflow</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {selectedProject.caseStudySections.workflow.map((step, idx) => (
                            <div
                              key={idx}
                              className="p-3 sm:p-3.5 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] flex items-start gap-3 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]"
                            >
                              <span className="mt-0.5 px-2 py-0.5 rounded bg-[#F3EFE6] dark:bg-[#222731] border border-[#DED8C8]/80 dark:border-[#2F3643] font-mono text-[10px] font-bold text-[#1D3557] dark:text-[#6CA0DC] shrink-0">
                                STEP 0{idx + 1}
                              </span>
                              <div className="leading-relaxed flex-1">
                                {renderRichStep(step)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Preprocessing Parity Notes (Balanced 2x2 Grid for 4 CNN Models) */}
                    {selectedProject.caseStudySections.preprocessingNotes && (
                      <div className="space-y-2.5">
                        <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold">
                          Input Transformation &amp; Preprocessing Parity
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedProject.caseStudySections.preprocessingNotes.map(
                            (note, idx) => (
                              <div
                                key={idx}
                                className="p-3 sm:p-3.5 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] flex flex-col justify-between gap-1 text-xs font-mono"
                              >
                                <div className="font-bold text-[#9E2A2B] dark:text-[#E06D53]">
                                  {note.model}
                                </div>
                                <div className="text-[11px] text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
                                  {note.transform}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Engineering Challenges & Design Decisions */}
                    {selectedProject.caseStudySections.challengesAndDecisions && (
                      <div className="space-y-2.5">
                        <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#9E2A2B] dark:text-[#E06D53] shrink-0" />
                          <span>Engineering Challenges &amp; Design Decisions</span>
                        </div>
                        <ul className="space-y-2 pl-1">
                          {selectedProject.caseStudySections.challengesAndDecisions.map(
                            (decision, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]"
                              >
                                <span className="font-mono text-xs font-bold text-[#9E2A2B] dark:text-[#E06D53] mt-0.5 shrink-0">
                                  →
                                </span>
                                <span className="leading-relaxed">
                                  {renderRichStep(decision)}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Limitations & Future Work Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedProject.caseStudySections.limitations && (
                        <div className="p-4 rounded-lg border border-amber-600/30 bg-amber-500/5 space-y-2">
                          <div className="font-mono text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>Limitations &amp; Responsible Use</span>
                          </div>
                          <p className="text-xs text-[#52504C] dark:text-[#A7ACB4] leading-relaxed">
                            {selectedProject.caseStudySections.limitations}
                          </p>
                        </div>
                      )}

                      {selectedProject.caseStudySections.futureWork && (
                        <div className="p-4 rounded-lg border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] space-y-2">
                          <div className="font-mono text-[11px] uppercase tracking-wider text-[#1D3557] dark:text-[#6CA0DC] font-semibold">
                            Future Research &amp; Engineering Roadmap
                          </div>
                          <ul className="space-y-1.5 text-xs text-[#52504C] dark:text-[#A7ACB4]">
                            {selectedProject.caseStudySections.futureWork.map((fw, i) => (
                              <li key={i} className="leading-relaxed">
                                • {fw}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Empirical Outcomes */}
                <div className="space-y-2.5">
                  <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#161615] dark:text-[#ECE8E1] font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>3. Key Outcomes &amp; Deliverables</span>
                  </div>
                  <ul className="space-y-2 pl-1">
                    {selectedProject.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52504C] dark:text-[#A7ACB4]"
                      >
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="leading-relaxed">{renderRichStep(outcome)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. Fixed Modal Footer (Tech Stack & Action Links) */}
              <div className="shrink-0 bg-[#FAF7F2] dark:bg-[#14181D] px-4 sm:px-7 py-3.5 sm:py-4 border-t border-[#DED8C8] dark:border-[#272D37] flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white dark:bg-[#181C22] border border-[#DED8C8] dark:border-[#272D37] text-[#52504C] dark:text-[#A7ACB4]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedProject.links.liveDemo && (
                    <a
                      href={selectedProject.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded bg-[#9E2A2B] text-white dark:bg-[#E06D53] dark:text-[#0D0F12] text-xs font-mono font-semibold hover:opacity-95 transition-opacity"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Deployment</span>
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded bg-[#161615] text-white dark:bg-[#ECE8E1] dark:text-[#0D0F12] text-xs font-mono font-semibold hover:opacity-95 transition-opacity"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                  {selectedProject.links.huggingFace && (
                    <a
                      href={selectedProject.links.huggingFace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#161615] dark:text-[#ECE8E1] hover:border-[#9E2A2B] text-xs font-mono font-semibold transition-colors"
                    >
                      <Database className="w-3.5 h-3.5 text-[#9E2A2B] dark:text-[#E06D53]" />
                      <span>Hugging Face Models</span>
                    </a>
                  )}
                  {selectedProject.links.releaseTag && (
                    <a
                      href={selectedProject.links.releaseTag}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#181C22] text-[#161615] dark:text-[#ECE8E1] hover:border-[#9E2A2B] text-xs font-mono font-semibold transition-colors"
                    >
                      <Tag className="w-3.5 h-3.5 text-[#1D3557] dark:text-[#6CA0DC]" />
                      <span>Release v1.0.0</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
