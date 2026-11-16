import React from "react";
import Navbar from "@/components/Navbar";
import HeroMonograph from "@/components/HeroMonograph";
import EducationTimeline from "@/components/EducationTimeline";
import {
  ExperienceSection,
  CampusLeadershipSection,
} from "@/components/ExperienceAndCampus";
import ProjectSection from "@/components/ProjectSection";
import PatentSection from "@/components/PatentSection";
import PublicationsSection from "@/components/PublicationsSection";
import AmbientMusicPlayer from "@/components/AmbientMusicPlayer";

export default function AcademicPortfolioPage() {
  return (
    <div className="min-h-screen bg-editorial-grid">
      <Navbar />
      <main>
        {/* § 00 — Header / Profile, Summary & Academic Vitals */}
        <HeroMonograph />

        {/* § 01 — Education, Coursework & Technical Skills */}
        <EducationTimeline />

        {/* § 02 — Work Experience & Industry Internships */}
        <ExperienceSection />

        {/* § 03 — Technical Projects & Research Case Studies */}
        <ProjectSection />

        {/* § 04 — Filed Utility Patent & Intellectual Property */}
        <PatentSection />

        {/* § 05 — Certifications & Cloud Credentials */}
        <PublicationsSection />

        {/* § 06 — Campus Leadership, Open Source & Colophon Footer */}
        <CampusLeadershipSection />
      </main>
      <AmbientMusicPlayer />
    </div>
  );
}
