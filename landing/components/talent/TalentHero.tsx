// landing/components/talent/TalentHero.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { FilmGrain } from "@/components/talent/shared";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.9, ease },
  }),
};

export default function TalentHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0.65, 0.9], [1, 0]);
  const contentSpring = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const contentY = useTransform(contentSpring, [0, 1], [0, -60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCtaVisible(v < 0.5);
  });

  // Cursor spotlight
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 800);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);
  const spotX = useSpring(mouseX, { stiffness: 38, damping: 22 });
  const spotY = useSpring(mouseY, { stiffness: 38, damping: 22 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handle = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative z-10"
      style={{ height: prefersReducedMotion ? "auto" : "180vh" }}
    >
      <motion.div
        className={
          prefersReducedMotion
            ? "relative w-full h-screen overflow-hidden"
            : "sticky top-0 h-screen w-full overflow-hidden"
        }
        style={{
          backgroundColor: "#050505",
          opacity: prefersReducedMotion ? 1 : heroOpacity,
        }}
      >
        <FilmGrain />

        {/* ── Model image — full bleed background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Radial vignette — keeps edges dark, center slightly open */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 15%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,0.97) 100%)",
            }}
          />
          {/* Bottom gradient for CTA legibility */}
          <div
            className="absolute inset-x-0 bottom-0 z-10"
            style={{
              height: "45%",
              background: "linear-gradient(to top, #050505 0%, transparent 100%)",
            }}
          />
          {/* TODO: swap to /images/model3-nobg.png before launch */}
          <motion.img
            src="/images/model2-nobg.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={mounted ? { opacity: 0.48, scale: 1 } : {}}
            transition={{ duration: 1.6, ease }}
          />
        </div>

        {/* ── Cursor spotlight ── */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute z-[5] pointer-events-none rounded-full"
            animate={{ opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1100,
              height: 1100,
              left: -550,
              top: -550,
              x: spotX,
              y: spotY,
              background:
                "radial-gradient(circle, rgba(201,165,90,0.3) 0%, transparent 65%)",
            }}
          />
        )}

        {/* ── Center-axis content ── */}
        <motion.div
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ y: prefersReducedMotion ? 0 : contentY }}
        >
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            style={{
              color: "#C9A55A",
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.75rem",
            }}
          >
            For Talent
          </motion.p>

          {/* H1 — fills viewport width */}
          <motion.h1
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="font-editorial"
            style={{
              fontSize: "clamp(4.5rem, 13vw, 12rem)",
              color: "#FFFFFF",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 0.94,
              marginBottom: "2rem",
            }}
          >
            They decided
            <br />
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              in four seconds.
            </span>
          </motion.h1>

          {/* Body — centered, short */}
          <motion.p
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)",
              lineHeight: 1.65,
              maxWidth: 460,
              marginBottom: "2.75rem",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            Before they read your name. Based on a PDF you built in Canva at midnight.
            Pholio removes the reason they stopped scrolling.
          </motion.p>

          {/* CTA — centered */}
          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
          >
            <a
              href={`${APP_URL}/signup`}
              tabIndex={ctaVisible ? 0 : -1}
              aria-hidden={ctaVisible ? undefined : true}
              className="relative inline-flex items-center justify-center text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-full overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #C9A55A 0%, #A68644 100%)",
                color: "#050505",
                boxShadow: "0 4px 28px rgba(201,165,90,0.28)",
                textDecoration: "none",
              }}
            >
              <span className="relative z-10">Build Your Profile</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #DFBE76 0%, #C9A55A 100%)" }}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <motion.div
              style={{
                width: 1,
                height: 48,
                background: "linear-gradient(to bottom, transparent, #C9A55A, transparent)",
              }}
              animate={{ scaleY: [0, 1, 0], y: [0, 20, 40], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
