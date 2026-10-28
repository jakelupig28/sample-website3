"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
  MotionValue,
} from "framer-motion";
import {
  AlertTriangle,
  Sparkles,
  BookOpen,
  Calendar,
  MessageSquare,
  Compass,
  Sliders,
} from "lucide-react";
import SectionHeader from "./motion/SectionHeader";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ClutterTone = "rust" | "sage" | "brass" | "cobalt" | "paper";

interface ChaosCardData {
  id: number;
  title: string;
  subtitle?: string;
  type: string;
  tone: ClutterTone;
  x: string;
  y: string;
  rotate: number;
  exitX: number;
  exitY: number;
  exitRotate: number;
  tape?: boolean;
}

const CLUTTER_TONE_CLASSES: Record<ClutterTone, string> = {
  rust: "bg-tint-rust border-rust/35 text-espresso",
  sage: "bg-tint-sage border-sage/35 text-espresso",
  brass: "bg-tint-brass border-brass/35 text-espresso",
  cobalt: "bg-tint-cobalt border-cobalt/35 text-espresso",
  paper: "bg-parchment border-sand text-espresso",
};

const CLUTTER_ICON_CLASSES: Record<ClutterTone, string> = {
  rust: "text-rust",
  sage: "text-sage",
  brass: "text-brass",
  cobalt: "text-cobalt",
  paper: "text-umber",
};

// 16 Palette-Harmonized Clutter Cards arranged across a balanced 4x4 grid inside the lanes canvas
const CHAOS_CARDS: ChaosCardData[] = [
  {
    id: 1,
    title: "what should I read next??",
    subtitle: "38 open Goodreads tabs",
    type: "sticky",
    tone: "brass",
    x: "2.5%",
    y: "4%",
    rotate: -5,
    exitX: -380,
    exitY: -230,
    exitRotate: -32,
    tape: true,
  },
  {
    id: 2,
    title: "Algorithm Alert · 2:14 AM",
    subtitle: "'Because you bought a blender, read this thriller!'",
    type: "alert",
    tone: "rust",
    x: "26%",
    y: "3%",
    rotate: 3,
    exitX: -40,
    exitY: -310,
    exitRotate: 24,
  },
  {
    id: 3,
    title: "47 unread Substack issues",
    subtitle: "Estimated backlog: 14 hrs",
    type: "badge",
    tone: "brass",
    x: "51%",
    y: "5%",
    rotate: -3,
    exitX: 220,
    exitY: -260,
    exitRotate: 20,
    tape: true,
  },
  {
    id: 4,
    title: "10:00 PM — 1 chapter vs. Reels",
    subtitle: "Overwhelmed & eyes straining",
    type: "conflict",
    tone: "rust",
    x: "73%",
    y: "4%",
    rotate: 4,
    exitX: 390,
    exitY: -210,
    exitRotate: 34,
  },
  {
    id: 5,
    title: "Library late fee — 3 UNREAD",
    subtitle: "Overdue since March 12",
    type: "warning",
    tone: "cobalt",
    x: "5%",
    y: "26%",
    rotate: 4,
    exitX: -340,
    exitY: -90,
    exitRotate: -24,
  },
  {
    id: 6,
    title: "who recommended that blue book??",
    subtitle: "Lost WhatsApp note from June",
    type: "sticky",
    tone: "sage",
    x: "29%",
    y: "25%",
    rotate: -3,
    exitX: -140,
    exitY: -260,
    exitRotate: -18,
    tape: true,
  },
  {
    id: 7,
    title: "Screen Time Report: Up 34%",
    subtitle: "Avg 7h 18m/day on phone",
    type: "alert",
    tone: "rust",
    x: "53%",
    y: "27%",
    rotate: 3,
    exitX: 160,
    exitY: -280,
    exitRotate: 15,
  },
  {
    id: 8,
    title: "BookTok: 10 Dark Romances!!",
    subtitle: "Sponsored · 4.8M Views",
    type: "clickbait",
    tone: "brass",
    x: "74%",
    y: "26%",
    rotate: -4,
    exitX: 420,
    exitY: -20,
    exitRotate: 38,
  },
  {
    id: 9,
    title: "MEGA-RETAILER RECEIPT",
    subtitle: "Bent corners in plastic mailer — $34",
    type: "receipt",
    tone: "paper",
    x: "3%",
    y: "48%",
    rotate: -4,
    exitX: -410,
    exitY: 80,
    exitRotate: -36,
  },
  {
    id: 10,
    title: "Audiobook sub you forgot",
    subtitle: "Recurring $14.99/mo · 0 listened",
    type: "receipt",
    tone: "cobalt",
    x: "27%",
    y: "47%",
    rotate: 3,
    exitX: -90,
    exitY: 290,
    exitRotate: 18,
  },
  {
    id: 11,
    title: "Top 100 Books Before You Die",
    subtitle: "(Browser tab 38 of 92 open)",
    type: "browser",
    tone: "cobalt",
    x: "51%",
    y: "49%",
    rotate: -3,
    exitX: 210,
    exitY: 240,
    exitRotate: 25,
  },
  {
    id: 12,
    title: "buy birthday gift for Sam!!",
    subtitle: "(shipping delayed 3 weeks?)",
    type: "sticky",
    tone: "brass",
    x: "73%",
    y: "48%",
    rotate: 5,
    exitX: 400,
    exitY: 180,
    exitRotate: 30,
    tape: true,
  },
  {
    id: 13,
    title: "4.9★ (14,209 AI bot reviews)",
    subtitle: "Verified fake review network",
    type: "alert",
    tone: "rust",
    x: "4%",
    y: "69%",
    rotate: 3,
    exitX: -380,
    exitY: 310,
    exitRotate: -34,
  },
  {
    id: 14,
    title: "TBR PILE: 19 half-read books",
    subtitle: "Staring with guilt from nightstand",
    type: "warning",
    tone: "brass",
    x: "28%",
    y: "68%",
    rotate: -3,
    exitX: -150,
    exitY: 340,
    exitRotate: -20,
  },
  {
    id: 15,
    title: "#book-club: anyone finish it??",
    subtitle: "23 unread group chat replies",
    type: "chat",
    tone: "paper",
    x: "52%",
    y: "69%",
    rotate: 2,
    exitX: 140,
    exitY: 340,
    exitRotate: 16,
  },
  {
    id: 16,
    title: "books_to_read_v2_final.pdf",
    subtitle: "84 MB download · never opened",
    type: "file",
    tone: "sage",
    x: "73%",
    y: "68%",
    rotate: -3,
    exitX: 360,
    exitY: 320,
    exitRotate: 34,
  },
];

// GPU-accelerated Chaos Card with staggered wave dispersal
function ChaosCardItem({
  card,
  index,
  progress,
}: {
  card: ChaosCardData;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.03 + (index % 6) * 0.045;
  const mid = start + 0.14;
  const end = Math.min(0.86, start + 0.54);

  const x = useTransform(progress, [0, start, end], [0, 0, card.exitX]);
  const y = useTransform(progress, [0, start, mid, end], [0, 0, card.exitY * 0.18 - 10, card.exitY]);
  const rotate = useTransform(
    progress,
    [0, start, end],
    [card.rotate, card.rotate, card.exitRotate]
  );
  const scale = useTransform(progress, [0, start, mid, end], [1, 1, 1.03, 0.52]);
  const opacity = useTransform(progress, [0, start + 0.08, end - 0.06, end], [1, 0.96, 0.25, 0]);
  const pointerEvents = useTransform(progress, (v) => (v > end - 0.1 ? "none" : "auto"));

  return (
    <motion.div
      style={{
        left: card.x,
        top: card.y,
        x,
        y,
        rotate,
        scale,
        opacity,
        pointerEvents,
      }}
      whileHover={{ scale: 1.05, zIndex: 40 }}
      className={cn(
        "absolute p-2 sm:p-3 rounded-xl shadow-md border w-[142px] sm:w-[196px] lg:w-[208px] max-w-[44%] sm:max-w-[30%] lg:max-w-[24%] min-w-[122px] sm:min-w-[155px] cursor-pointer select-none overflow-hidden transition-colors duration-300 will-change-[transform,opacity]",
        CLUTTER_TONE_CLASSES[card.tone]
      )}
    >
      {card.tape && (
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-paper/85 border border-espresso/10 rotate-[-2deg] rounded-xs pointer-events-none" />
      )}

      <div className="flex items-start gap-1.5 min-w-0">
        {card.type === "alert" || card.type === "warning" || card.type === "conflict" ? (
          <AlertTriangle
            className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", CLUTTER_ICON_CLASSES[card.tone])}
          />
        ) : (
          <span className="text-xs leading-none mt-0.5 flex-shrink-0">📌</span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold leading-snug break-words text-espresso">
            {card.title}
          </p>
          {card.subtitle && (
            <p className="text-[10px] mt-0.5 text-umber leading-snug break-words">
              {card.subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface LanePalette {
  surface: string;
  border: string;
  activeRing: string;
}

const LANE_PALETTES: LanePalette[] = [
  {
    surface: "bg-tint-rust",
    border: "border-rust/25",
    activeRing: "ring-1 ring-rust/30 border-rust/45 shadow-md",
  },
  {
    surface: "bg-tint-sage",
    border: "border-sage/25",
    activeRing: "ring-1 ring-sage/30 border-sage/45 shadow-md",
  },
  {
    surface: "bg-tint-brass",
    border: "border-brass/25",
    activeRing: "ring-1 ring-brass/30 border-brass/45 shadow-md",
  },
  {
    surface: "bg-tint-cobalt",
    border: "border-cobalt/25",
    activeRing: "ring-1 ring-cobalt/30 border-cobalt/45 shadow-md",
  },
];

function CalmLaneCard({
  index,
  progress,
  isCalm,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  isCalm: boolean;
  children: React.ReactNode;
}) {
  const start = 0.05 + index * 0.06;
  const end = 0.56 + index * 0.075;

  const opacity = useTransform(progress, [0, start, end], [0.42, 0.5, 1]);
  const y = useTransform(progress, [0, start, end], [20, 16, 0]);
  const scale = useTransform(progress, [0, start, end], [0.97, 0.978, 1]);
  const blurVal = useTransform(progress, [0, start, end], [2.2, 1.8, 0]);
  const filter = useTransform(blurVal, (b) => (b > 0.05 ? `blur(${b.toFixed(2)}px)` : "none"));
  const palette = LANE_PALETTES[index] || LANE_PALETTES[0];

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className={cn(
        "h-full p-4 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-400 flex flex-col justify-between shadow-sm will-change-[transform,opacity]",
        palette.surface,
        isCalm ? palette.activeRing : palette.border
      )}
    >
      {children}
    </motion.div>
  );
}

export default function ChaosToCalmSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [uiPercent, setUiPercent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60px", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const activeProgress = useMotionValue(0);
  const lastRawScroll = useRef(0);

  useEffect(() => {
    const unsubSmooth = smoothScrollProgress.on("change", (v) => {
      if (!isManualMode) {
        const clamped = Math.min(Math.max(v, 0), 1);
        activeProgress.set(clamped);
      }
    });
    return () => unsubSmooth();
  }, [isManualMode, smoothScrollProgress, activeProgress]);

  useEffect(() => {
    const unsubActive = activeProgress.on("change", (v) => {
      const pct = Math.round(Math.min(Math.max(v, 0), 1) * 100);
      setUiPercent((prev) => (prev !== pct ? pct : prev));
    });
    return () => unsubActive();
  }, [activeProgress]);

  useEffect(() => {
    const unsubRaw = scrollYProgress.on("change", (v) => {
      if (isManualMode && Math.abs(v - lastRawScroll.current) > 0.025) {
        setIsManualMode(false);
      }
      lastRawScroll.current = v;
    });
    return () => unsubRaw();
  }, [scrollYProgress, isManualMode]);

  const handleSliderChange = (val: number) => {
    setIsManualMode(true);
    activeProgress.set(val);
  };

  const animateTo = (targetVal: number) => {
    setIsManualMode(true);
    animate(activeProgress, targetVal, {
      duration: 0.85,
      ease: LUXURY_EASE,
    });
  };

  const progressFraction = uiPercent / 100;
  const openTabsCount = Math.round(1284 * (1 - progressFraction));
  const isCalm = progressFraction > 0.58;
  const isComplete = progressFraction > 0.82;

  return (
    <section
      id="calm"
      className="relative bg-paper text-espresso pt-20 sm:pt-24 pb-16 px-4 sm:px-6 overflow-x-clip transition-colors duration-400"
    >
      {/* Subtle Archival Ambient Washes matching Website Palette */}
      <div className="absolute top-24 left-8 w-96 h-96 rounded-full bg-rust/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-24 right-8 w-96 h-96 rounded-full bg-sage/8 blur-[120px] pointer-events-none" />

      {/* 1. Editorial Section Header in Normal Scroll Flow */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 relative z-10">
        <SectionHeader
          number="02"
          eyebrow="The Difference"
          headline={
            <>
              From noise <span className="text-rust">→</span>{" "}
              <em className="italic font-normal text-espresso">deep reading</em>
            </>
          }
          subcopy="Before: 47 open browser tabs of 'Top 10 Must-Reads', algorithmic slop, bent paperbacks in plastic mailers, and a nightstand pile that feels like homework. After: everything distilled into four curated sanctuary lanes."
          className="mb-0"
        />
      </div>

      {/* 2. Dedicated Scroll-Pinned Stage Track */}
      <div ref={trackRef} className="relative lg:h-[255vh] max-w-7xl mx-auto z-10">
        <div className="lg:sticky lg:top-[60px] lg:h-[calc(100svh-68px)] min-h-[590px] flex flex-col gap-3 pb-2">
          {/* Editorial Telemetry & Cohesive Website-Palette Scrubber Bar */}
          <div className="p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-parchment border border-sand shadow-sm flex flex-wrap xl:flex-nowrap items-center justify-between gap-3">
            {/* Live Telemetry Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-paper border border-sand">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
                  Tabs:
                </span>
                <span
                  className={cn(
                    "font-mono text-xs sm:text-sm font-bold transition-colors duration-300 sm:min-w-[108px]",
                    progressFraction > 0.65 ? "text-sage" : "text-rust"
                  )}
                >
                  {progressFraction > 0.95
                    ? "0 unread guilt"
                    : `${openTabsCount.toLocaleString()} open tabs`}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-paper border border-sand">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
                  State:
                </span>
                <span
                  className={cn(
                    "font-serif text-xs sm:text-sm font-bold transition-colors duration-300 sm:min-w-[140px]",
                    isCalm ? "text-sage" : "text-umber"
                  )}
                >
                  {isCalm ? "Deep Focus (Calm)" : "Doomscrolling (Noise)"}
                </span>
              </div>
            </div>

            {/* Cohesive Editorial "Tidy Up" Scrubber & Quick State Buttons */}
            <div className="flex items-center gap-2.5 w-full xl:w-auto xl:flex-1 xl:max-w-md">
              <span className="font-mono text-[11px] text-umber whitespace-nowrap flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-rust" />
                <span className="font-medium">Tidy Up:</span>
              </span>

              <span className="font-mono text-[10px] text-stone font-medium hidden sm:inline">
                Chaos
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={progressFraction}
                onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                aria-label="Scrub from digital noise to reading calm"
                style={{
                  background: `linear-gradient(to right, var(--rust) 0%, var(--sage) ${uiPercent}%, var(--sand) ${uiPercent}%, var(--sand) 100%)`,
                }}
                className="folio-scrubber w-full cursor-pointer"
              />
              <span className="font-mono text-[10px] text-sage font-semibold hidden sm:inline">
                Serene
              </span>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => animateTo(0)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer",
                    progressFraction < 0.2
                      ? "bg-espresso text-paper font-semibold shadow-xs"
                      : "bg-sand/70 text-umber hover:text-espresso"
                  )}
                >
                  Noise
                </button>
                <button
                  onClick={() => animateTo(1)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer",
                    progressFraction > 0.8
                      ? "bg-sage text-paper font-semibold shadow-xs"
                      : "bg-sand/70 text-umber hover:text-espresso"
                  )}
                >
                  Serene
                </button>
                {isManualMode && (
                  <button
                    onClick={() => setIsManualMode(false)}
                    title="Resume scroll-linked tracking"
                    className="px-1.5 py-1 rounded-md text-[10px] font-mono text-stone hover:text-espresso cursor-pointer"
                  >
                    Auto ↺
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* The Full Dual-Layer Stage — flex-1 fills full viewport height cleanly */}
          <div className="relative flex-1 min-h-[480px] sm:min-h-[520px] lg:min-h-0 rounded-3xl border border-sand bg-paper p-4 sm:p-5 overflow-hidden shadow-2xl flex flex-col justify-between gap-3.5">
            {/* Subtle Archival Dot Grid Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--sand)_1px,transparent_1px)] [background-size:22px_22px] opacity-45 pointer-events-none" />

            {/* DEDICATED LANES + CHAOS CANVAS (Strictly above the footer ribbon) */}
            <div className="relative flex-1 min-h-[385px] flex flex-col">
              {/* LAYER 1: 4 Palette-Harmonized Color-Coded Curated Lanes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10 flex-1 items-stretch">
                {/* Lane 1: Curated Fiction (Primary Accent — Rust / Prussian / Bordeaux / Bronze) */}
                <CalmLaneCard index={0} progress={activeProgress} isCalm={isCalm}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-rust text-paper flex items-center justify-center shadow-xs flex-shrink-0">
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-[15px] text-espresso truncate">
                          Curated Fiction
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-paper/85 text-rust font-bold border border-rust/25 flex-shrink-0">
                        0 filler
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs font-sans">
                      <li className="p-2.5 rounded-xl bg-paper border border-rust/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          3 translated novellas pulled
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Matched directly to your pace
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-rust/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          BookTok hype filtered out
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          47 viral titles → 2 timeless works
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-rust/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Hand-written shelf talkers
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Personal margin notes on p. 42
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-rust/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Cotton bookmark &amp; linen wrap
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Protected for morning commutes
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-rust/25 font-mono text-[10px] text-rust font-bold flex items-center justify-between gap-2">
                    <span className="truncate">Staff-read before shelving</span>
                    <span className="px-1.5 py-0.5 rounded bg-rust text-paper text-[9px]">
                      100%
                    </span>
                  </div>
                </CalmLaneCard>

                {/* Lane 2: Reading Calendar (Botanical Sanctuary Sage / Verdigris / Moss) */}
                <CalmLaneCard index={1} progress={activeProgress} isCalm={isCalm}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-sage text-paper flex items-center justify-center shadow-xs flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-[15px] text-espresso truncate">
                          Reading Calendar
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-paper/85 text-sage font-bold border border-sage/25 flex-shrink-0">
                        Protected
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[10px] sm:text-[11px] font-mono">
                      <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-paper border border-sage/20">
                        <span className="font-bold text-espresso whitespace-nowrap">Mon 7 PM</span>
                        <span className="text-sage truncate">Silent Reading Club</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-paper border border-sage/20">
                        <span className="font-bold text-espresso whitespace-nowrap">Tue 6 PM</span>
                        <span className="text-sage truncate">Translated Fiction</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-paper border border-sage/20">
                        <span className="font-bold text-espresso whitespace-nowrap">Wed 5 PM</span>
                        <span className="text-sage truncate">Pour-Over &amp; Poetry</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-paper border border-sage/20">
                        <span className="font-bold text-espresso whitespace-nowrap">Fri 7 PM</span>
                        <span className="text-sage truncate">Author Salon &amp; Wine</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-sage text-paper font-semibold shadow-xs">
                        <span className="whitespace-nowrap">Sat · Day</span>
                        <span className="truncate">Unplugged Sanctuary</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-paper border border-sage/20">
                        <span className="font-bold text-espresso whitespace-nowrap">Sun 10 AM</span>
                        <span className="text-sage truncate">Slow Sunday Chapters</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-sage/25 font-mono text-[10px] text-sage font-bold flex items-center justify-between gap-2">
                    <span className="truncate">Reclaimed offline time</span>
                    <span className="px-1.5 py-0.5 rounded bg-sage text-paper text-[9px]">
                      11 hrs/wk
                    </span>
                  </div>
                </CalmLaneCard>

                {/* Lane 3: Reader Concierge (Warm Brass / Gilt / Persimmon) */}
                <CalmLaneCard index={2} progress={activeProgress} isCalm={isCalm}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-brass text-paper flex items-center justify-center shadow-xs flex-shrink-0">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-[15px] text-espresso truncate">
                          Reader Concierge
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-paper/85 text-brass font-bold border border-brass/25 flex-shrink-0">
                        Delighted
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs font-sans">
                      <li className="p-2.5 rounded-xl bg-paper border border-brass/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Elena R. · Interior Studio
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          12-book architecture stack delivered
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-brass/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Marco&apos;s Anniversary Gift
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Wax-sealed 1st edition + note · 5/5
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-brass/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Quarterly Season Renewed
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          12 months of surprise fiction filed
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-brass/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Taste Ledger Updated
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Logged autumn translated literature
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-brass/25 font-mono text-[10px] text-brass font-bold flex items-center justify-between gap-2">
                    <span className="truncate">Avg. human match time</span>
                    <span className="px-1.5 py-0.5 rounded bg-brass text-paper text-[9px]">
                      &lt; 3 hrs
                    </span>
                  </div>
                </CalmLaneCard>

                {/* Lane 4: Rare & Indie Press (Archival Cobalt / Indigo / Aizome) */}
                <CalmLaneCard index={3} progress={activeProgress} isCalm={isCalm}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-cobalt text-paper flex items-center justify-center shadow-xs flex-shrink-0">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-[15px] text-espresso truncate">
                          Rare &amp; Indie Press
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-paper/85 text-cobalt font-bold border border-cobalt/25 flex-shrink-0">
                        Archival
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs font-sans">
                      <li className="p-2.5 rounded-xl bg-paper border border-cobalt/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          1974 Invisible Cities (1st Ed.)
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Acquired from Kyoto estate · $185
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-cobalt/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Fitzcarraldo Blue Essay Set
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Complete archival set held at counter
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-cobalt/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          14 small-press zines stocked
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Direct from Manila &amp; Seoul studios
                        </span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-paper border border-cobalt/20 shadow-2xs transition-transform hover:-translate-y-0.5">
                        <span className="font-semibold text-espresso block text-[11px] sm:text-xs leading-snug">
                          Friday Literary Dispatch
                        </span>
                        <span className="text-[10px] text-umber block mt-0.5">
                          Sent 4:00 PM · zero algorithmic spam
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-cobalt/25 font-mono text-[10px] text-cobalt font-bold flex items-center justify-between gap-2">
                    <span className="truncate">Indie presses stocked</span>
                    <span className="px-1.5 py-0.5 rounded bg-cobalt text-paper text-[9px]">
                      94
                    </span>
                  </div>
                </CalmLaneCard>
              </div>

              {/* LAYER 2: 16 Palette-Harmonized Clutter Cards — Strictly confined inside the lanes wrapper */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                {CHAOS_CARDS.map((card, idx) => (
                  <ChaosCardItem
                    key={card.id}
                    card={card}
                    index={idx}
                    progress={activeProgress}
                  />
                ))}
              </div>
            </div>

            {/* Integrated Stage Footer Ribbon */}
            <div
              className={cn(
                "relative z-30 px-4 py-3 rounded-2xl border transition-all duration-500 flex flex-col sm:flex-row items-center justify-between gap-3",
                isComplete
                  ? "bg-espresso text-paper border-espresso shadow-lg"
                  : "bg-parchment/95 text-umber border-sand shadow-xs"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-500 flex-shrink-0",
                    isComplete ? "bg-sage text-paper" : "bg-sand text-rust"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <p className="font-serif text-xs sm:text-sm font-medium">
                  {isComplete ? (
                    <>
                      <strong className="font-bold">Sanctuary restored:</strong>{" "}
                      One unforgettable book every month. Zero doomscrolling.
                    </>
                  ) : (
                    <>
                      Scroll down (or drag slider) to sweep away algorithmic noise —{" "}
                      <span className="font-mono text-xs text-rust font-bold">
                        {uiPercent}% organized
                      </span>
                    </>
                  )}
                </p>
              </div>

              <a
                href="#pricing"
                className={cn(
                  "px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap transition-all duration-300",
                  isComplete
                    ? "bg-rust hover:bg-rust-hover text-paper shadow-sm"
                    : "bg-espresso hover:bg-rust text-paper"
                )}
              >
                Join Folio Circle →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
