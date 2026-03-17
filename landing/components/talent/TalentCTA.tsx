// landing/components/talent/TalentCTA.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FilmGrain, RuleLines } from "@/components/talent/shared";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

export default function TalentCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* ── Atmosphere ── */}
      <FilmGrain />
      <RuleLines />

      {/* Central ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
        style={{
          width: 900,
          height: 700,
          background: "radial-gradient(circle, rgba(201,165,90,0.3) 0%, transparent 50%)",
          filter: "blur(280px)",
          opacity: 0.05,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">

        {/* Speed objection killer — the first thing they read */}
        <motion.p
          className="mb-10 block"
          style={{
            color: "#C9A55A",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.625rem, 1.2vw, 0.8125rem)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          You&apos;re under an hour from a comp card that doesn&apos;t embarrass you.
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-editorial mb-12 leading-[1.05]"
          style={{
            fontSize: "clamp(3rem, 7vw, 5rem)",
            color: "#FAF7F2",
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          Stop letting a bad PDF
          <br />
          <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
            speak for you.
          </span>
        </motion.h2>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          {/* Primary CTA */}
          <a
            href={`${APP_URL}/signup`}
            className="relative inline-flex items-center justify-center text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-full overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #C9A55A 0%, #A68644 100%)",
              color: "#050505",
              boxShadow:
                "0 0 40px rgba(200,169,110,0.15), 0 0 80px rgba(200,169,110,0.06)",
              textDecoration: "none",
            }}
          >
            <span className="relative z-10">Build Your Profile</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #DFBE76 0%, #C9A55A 100%)",
              }}
            />
          </a>

          {/* Secondary CTA */}
          <a
            href="/"
            className="inline-flex items-center justify-center text-[11px] font-medium tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(201,165,90,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#C9A55A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.6)";
            }}
          >
            Back to Home
          </a>
        </motion.div>

        {/* Final note */}
        <motion.p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          Free to start. No agency required.
        </motion.p>
      </div>
    </section>
  );
}
