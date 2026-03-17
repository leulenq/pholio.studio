// landing/components/talent/TalentSceneDiscoverability.tsx
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
import { FilmGrain, GhostWatermark } from "@/components/talent/shared";

const ease = [0.22, 1, 0.36, 1] as const;

const PHASES = [
  {
    key: "invisible",
    copy: "Most talent aren\u2019t in the room. They\u2019re in an inbox, waiting for a reply that isn\u2019t coming.",
  },
  {
    key: "database",
    copy: "Agencies don\u2019t search inboxes. They search databases.",
  },
  {
    key: "profile",
    copy: "A complete profile puts you in every search that matches you.",
  },
  {
    key: "selected",
    copy: "The judgment still happens in four seconds. Now it goes in your favour.",
  },
];

const FILTER_CHIPS = [
  "Height: 5\u20189\u201d \u2013 6\u20180\u201d",
  "Location: New York",
  "Category: Editorial",
];

const CARDS = [0, 1, 2, 3, 4, 5];
const SELECTED_INDEX = 4;

export default function TalentSceneDiscoverability() {
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
    else if (v >= 0.25) setPhase(1);
    else setPhase(0);
  });

  const uiY = useTransform(
    scrollYProgress,
    [0.12, 0.36],
    prefersReducedMotion ? ["0%", "0%"] : ["108%", "0%"]
  );
  const uiOpacity = useTransform(scrollYProgress, [0.10, 0.30], [0, 1]);

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
        <GhostWatermark label="01" />

        {/* Central ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 900,
            height: 700,
            background: "radial-gradient(circle, rgba(201,165,90,0.25) 0%, transparent 55%)",
            filter: "blur(120px)",
            opacity: 0.07,
          }}
        />

        {/* ── Center-axis layout ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">

          {/* Headline block — shrinks when UI appears */}
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
                opacity: phase >= 1 ? 1 : 0.7,
                transition: "opacity 0.5s ease",
              }}
            >
              Discoverability
            </p>

            <h2
              className="font-editorial"
              style={{
                fontSize:
                  phase >= 1
                    ? "clamp(2.4rem, 5vw, 4rem)"
                    : "clamp(5rem, 13vw, 11rem)",
                color: "#FFFFFF",
                fontWeight: 400,
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
                transition: "font-size 0.85s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              You were
              <br />
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                invisible.
              </span>
            </h2>

            {/* Phase copy — single centered sentence */}
            <div style={{ minHeight: 44, maxWidth: 500, marginBottom: "1.25rem" }}>
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
            <div className="flex items-center gap-2" style={{ marginBottom: "2rem" }}>
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
          </div>

          {/* ── Search UI — rises from below ── */}
          <motion.div
            style={{
              y: uiY,
              opacity: uiOpacity,
              width: "100%",
              maxWidth: 780,
            }}
          >
            {/* Search bar */}
            <div
              style={{
                width: "100%",
                height: 52,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,165,90,0.14)",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                style={{ opacity: 0.28, flexShrink: 0 }}
              >
                <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
                <path
                  d="M11 11l2.5 2.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  color: "rgba(255,255,255,0.18)",
                  fontSize: 14,
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.005em",
                }}
              >
                Search talent...
              </span>
            </div>

            {/* Filter chips */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                minHeight: 36,
                marginBottom: 12,
              }}
            >
              <AnimatePresence>
                {phase >= 1 &&
                  FILTER_CHIPS.map((chip, i) => (
                    <motion.div
                      key={chip}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.3, delay: i * 0.1, ease }}
                      style={{
                        padding: "5px 14px",
                        borderRadius: 20,
                        backgroundColor: "rgba(201,165,90,0.08)",
                        border: "1px solid rgba(201,165,90,0.2)",
                        color: "#C9A55A",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                        letterSpacing: "0.06em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {chip}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Results grid — 3 columns, full width of panel */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {CARDS.map((_, i) => {
                const isSelected = i === SELECTED_INDEX;
                const isVisible = phase >= 2;
                const isDimmed = phase >= 3 && !isSelected;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isVisible ? (isDimmed ? 0.2 : 1) : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: isVisible ? i * 0.06 : 0,
                      ease,
                    }}
                    style={{
                      height: 160,
                      borderRadius: 8,
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow:
                        isSelected && phase >= 3
                          ? "0 0 0 2px rgba(201,165,90,0.8), 0 0 20px 4px rgba(201,165,90,0.25)"
                          : "none",
                      transition: "box-shadow 0.4s ease",
                    }}
                  >
                    <div
                      style={{
                        height: "68%",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                    <div
                      style={{
                        padding: "8px 12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <div
                        style={{
                          height: 6,
                          width: "65%",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: 3,
                        }}
                      />
                      <div
                        style={{
                          height: 5,
                          width: "45%",
                          backgroundColor: "rgba(255,255,255,0.06)",
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    {isSelected && phase >= 3 && (
                      <motion.div
                        className="absolute inset-0 rounded-[8px]"
                        animate={{
                          scale: [1, 1.06, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          border: "2px solid rgba(201,165,90,0.5)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
