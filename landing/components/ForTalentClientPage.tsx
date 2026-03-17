// landing/components/ForTalentClientPage.tsx
"use client";

import SmoothScroll from "@/components/SmoothScroll";
import TalentHero from "@/components/talent/TalentHero";
import TalentSceneDiscoverability from "@/components/talent/TalentSceneDiscoverability";
import TalentScenePhotoIntelligence from "@/components/talent/TalentScenePhotoIntelligence";
import TalentSceneCompCard from "@/components/talent/TalentSceneCompCard";
import TalentCTA from "@/components/talent/TalentCTA";
import MarketingFooter from "@/components/MarketingFooter";

export default function ForTalentClientPage() {
  return (
    <SmoothScroll>
      <main style={{ backgroundColor: "#050505" }}>
        {/* ── HERO — The accusation ───────────────────────────────── */}
        <TalentHero />

        {/* ── DISCOVERABILITY — You were invisible ────────────────── */}
        <TalentSceneDiscoverability />

        {/* ── PHOTO INTELLIGENCE — The wrong photo killed the pitch ── */}
        <TalentScenePhotoIntelligence />

        {/* ── COMP CARD — The artifact that decides ───────────────── */}
        <TalentSceneCompCard />

        {/* ── CTA — Stop letting a bad PDF speak for you ──────────── */}
        <TalentCTA />

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <MarketingFooter />
      </main>
    </SmoothScroll>
  );
}
