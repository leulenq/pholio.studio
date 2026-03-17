// landing/components/talent/TalentScenePhotoIntelligence.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { FilmGrain, GhostWatermark, AiBadge } from "@/components/talent/shared";

const ease = [0.22, 1, 0.36, 1] as const;

const PHASES = [
  {
    key: "good-photos",
    copy: "You have good photos. That\u2019s not the problem.",
  },
  {
    key: "casting-read",
    copy: "Casting directors read photos differently. Composition, negative space, eye line.",
  },
  {
    key: "ai-selects",
    copy: "Pholio reads your gallery the way a casting director does.",
  },
  {
    key: "four-that-work",
    copy: "Not the four you\u2019d choose. The four that work.",
  },
];

const PHOTO_IDS = [
  "1529898329022-1b60a77f8f26",
  "1515886657613-9f3515b0c78f",
  "1488426862026-3ee34a7d66df",
  "1534528741775-53994a69daeb",
  "1485875437342-9b39470b3d95",
  "1509631179647-0177331693ae",
  "1524504388940-b1c1722653e1",
  "1463453091185-61582044d556",
  "1496440788671-ee1e8b25e368",
  "1500648767791-00dcc994a43e",
  "1507003211169-0a1dd7228f2d",
  "1438761681033-6461ffad8d80",
  "1494790108377-be9c29b29330",
  "1552058544-f2b08422138a",
  "1542596768-5d1d21f1cf98",
  "1506794778202-cad84cf45f1d",
];

const SELECTED_INDICES = new Set([0, 5, 10, 15]);

export default function TalentScenePhotoIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.75) setPhase(3);
    else if (v >= 0.5) setPhase(2);
    else if (v >= 0.22) setPhase(1);
    else setPhase(0);
  });

  const gridY = useTransform(
    scrollYProgress,
    [0.12, 0.38],
    prefersReducedMotion ? ["0%", "0%"] : ["110%", "0%"]
  );
  const gridOpacity = useTransform(scrollYProgress, [0.10, 0.32], [0, 1]);

  const scanTop = useTransform(scrollYProgress, [0.22, 0.50], ["0%", "100%"]);
  const scanOpacity = useTransform(
    scrollYProgress,
    [0.20, 0.24, 0.46, 0.50],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: prefersReducedMotion ? "auto" : "350vh" }}
    >
      <div
        className={
          prefersReducedMotion
            ? "relative py-24"
            : "sticky top-0 h-screen overflow-hidden"
        }
        style={{ backgroundColor: "#050505" }}
      >
        <FilmGrain />
        <GhostWatermark label="02" />

        {/* ── Center-axis layout ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">

          {/* Headline block */}
          <div className="flex flex-col items-center text-center w-full">
            <p
              style={{
                color: "#C9A55A",
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Photo Intelligence
            </p>

            <h2
              className="font-editorial"
              style={{
                fontSize:
                  phase >= 1
                    ? "clamp(2.4rem, 5vw, 3.8rem)"
                    : "clamp(5rem, 13vw, 11rem)",
                color: "#FFFFFF",
                fontWeight: 400,
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
                transition: "font-size 0.85s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              The wrong photo
              <br />
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                killed the pitch.
              </span>
            </h2>

            {/* Phase copy */}
            <div style={{ minHeight: 40, maxWidth: 500, marginBottom: "1.5rem" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={PHASES[phase].key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  style={{
                    color: "rgba(255,255,255,0.42)",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-sans)",
                    lineHeight: 1.6,
                    textAlign: "center",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {PHASES[phase].copy}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Phase dots */}
            <div className="flex items-center gap-2" style={{ marginBottom: "1.5rem" }}>
              {PHASES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor:
                      i === phase ? "#C9A55A" : "rgba(255,255,255,0.15)",
                    width: i === phase ? 20 : 6,
                  }}
                  transition={{ duration: 0.4, ease }}
                  style={{ height: 2, borderRadius: 1 }}
                />
              ))}
            </div>

            {/* AI badge — phase 3 */}
            <div style={{ height: 28, display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    key="ai-badge"
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.92 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <AiBadge label="AI Selected \u00b7 4 of 16" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Photo grid — rises from below, full width ── */}
          <motion.div
            style={{
              y: gridY,
              opacity: gridOpacity,
              width: "100%",
              maxWidth: 960,
              position: "relative",
            }}
          >
            {/* 4×4 grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 6,
              }}
            >
              {PHOTO_IDS.map((id, i) => {
                const isSelected = SELECTED_INDICES.has(i);
                const isDimmed = phase >= 3 && !isSelected;

                return (
                  <motion.div
                    key={id}
                    animate={{ opacity: isDimmed ? 0.07 : 1 }}
                    transition={{ duration: 0.5, delay: isDimmed ? i * 0.02 : 0, ease }}
                    style={{
                      aspectRatio: "3/4",
                      borderRadius: 4,
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${id}?w=300&h=400&fit=crop&crop=faces,center&auto=format&q=60`}
                      alt=""
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* AI scan line — full width of the grid */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 2,
                  top: scanTop,
                  opacity: scanOpacity,
                  background:
                    "linear-gradient(90deg, transparent 0%, #C9A55A 20%, #C9A55A 80%, transparent 100%)",
                  boxShadow:
                    "0 0 20px 4px rgba(201,165,90,0.3), 0 0 60px 8px rgba(201,165,90,0.1)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
