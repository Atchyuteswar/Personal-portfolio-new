import React from "react";
import Navbar from "@/components/Navbar";
import HeroMonograph from "@/components/HeroMonograph";
import PatentSection from "@/components/PatentSection";
import ProjectSection from "@/components/ProjectSection";
import PublicationsSection from "@/components/PublicationsSection";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceAndCampus from "@/components/ExperienceAndCampus";

export default function AcademicPortfolioPage() {
  return (
    <div className="min-h-screen bg-editorial-grid">
      <Navbar />
      <main>
        <HeroMonograph />
        <PatentSection />
        <ProjectSection />
        <PublicationsSection />
        <EducationTimeline />
        <ExperienceAndCampus />
      </main>
    </div>
  );
}

