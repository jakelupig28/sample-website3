"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Compass,
  Users,
  Feather,
  Package,
} from "lucide-react";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  day: string;
  shortDay: string;
  title: string;
  subtitle: string;
  details: string;
  quote: string;
  badges: string[];
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const RITUAL_STEPS: Step[] = [
  {
    id: 1,
    day: "01 · Monday",
    shortDay: "Mon",
    title: "The Taste Calibration",
    subtitle: "A 3-minute qualitative inquiry into what your mind is craving.",
    details:
      "No 50-question algorithmic questionnaires. Every Monday morning, we review the last three books that stayed with you, your current mental weather, and whether you want something devastating, calming, or architecturally precise.",
    quote:
      "“Tell us three titles that moved you, what you're craving lately, and what you want to avoid — we calibrate your reading pace without algorithms.”",
    badges: ["Qualitative Intake", "3-Min Calibration", "Zero Algorithms"],
    icon: Compass,
    tag: "Qualitative Intake",
  },
  {
    id: 2,
    day: "02 · Tuesday",
    shortDay: "Tue",
    title: "The Booksellers' Pull",
    subtitle: "Three human curators meet at our cedar table to debate your stack.",
    details:
      "Our resident writers, poets, and translators gather around our San Juan table to pull candidate acquisitions from London, Kyoto, and local indie presses — debating until we reach unanimous agreement on your volume.",
    quote:
      "“Three human curators gather around our cedar table to debate candidate acquisitions from London, Kyoto, and Manila indie presses.”",
    badges: ["Human Deliberation", "Cedar Table Pull", "Unanimous Agreement"],
    icon: Users,
    tag: "Human Deliberation",
  },
  {
    id: 3,
    day: "03 · Wednesday",
    shortDay: "Wed",
    title: "Handwritten Marginalia",
    subtitle: "Personal shelf-talker index cards, coffee pairings, and cotton bookmarks.",
    details:
      "Your assigned bookseller handwrites an archival Munken index card explaining why this edition was chosen for you, which chapter to linger over, and an ambient album pairing — tucked alongside a letterpress bookmark.",
    quote:
      "“An archival 300gsm Munken card with your bookseller's handwritten notes, chapter guide, and washed pour-over coffee pairing.”",
    badges: ["Curator Notes", "300gsm Munken Card", "Letterpress Bookmark"],
    icon: Feather,
    tag: "Curator Notes",
  },
  {
    id: 4,
    day: "04 · Thursday",
    shortDay: "Thu",
    title: "Kraft & Crimson Wax Seal",
    subtitle: "Wrapped in heavy Japanese kraft paper, braided twine, and hot wax.",
    details:
      "Every volume is inspected page-by-page for pristine corners, sheathed in acid-free tissue, folded into heavy unbleached Japanese kraft paper, tied with jute twine, and stamped with our brass Folio & Lark wax crest before courier dispatch.",
    quote:
      "“Every volume is inspected page-by-page, wrapped in unbleached Japanese kraft, tied with jute twine, and stamped in hot red wax.”",
    badges: ["Tactile Parceling", "Japanese Kraft", "Crimson Wax Seal"],
    icon: Package,
    tag: "Tactile Parceling",
  },
];

// Scroll dwell window inside the pinned runway:
// [0..0.06] settles on Monday, [0.06..0.88] glides smoothly Mon->Thu, [0.88..1] holds Thursday before releasing!
const START_FRAC = 0.06;
const END_FRAC = 0.88;

export default function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [reachedNode, setReachedNode] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const runwayRef = useRef<HTMLElement>(null);
  const { lenis } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  // Map pinned runway scroll [0.06..0.88] -> exact ritual path [0..1]
  const rawRitualProgress = useTransform(scrollYProgress, [START_FRAC, END_FRAC], [0, 1]);

  // Unified GPU spring driving the vertical beam, traveling point, horizontal rail, and active step in 1:1 sync
  const smoothRitual = useSpring(rawRitualProgress, {
    stiffness: 175,
    damping: 26,
    mass: 0.22,
    restDelta: 0.0003,
  });

  // Position along the rail from 0% (Monday node) to 100% (Thursday node)
  const pointPositionPct = useTransform(smoothRitual, [0, 1], ["0%", "100%"]);

  // Point Absorption at Checkpoints:
  // Checkpoints are at 0.0 (Mon), 0.3333 (Tue), 0.6667 (Wed), 1.0 (Thu).
  // As the traveling point hits a checkpoint, it smoothly absorbs into the bead (scale -> 0, opacity -> 0).
  // Between checkpoints, it emerges and travels freely along the line (scale -> 1, opacity -> 1).
  const pointAbsorptionScale = useTransform(
    smoothRitual,
    [0.0, 0.06, 0.27, 0.3333, 0.39, 0.61, 0.6667, 0.72, 0.94, 1.0],
    [0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0]
  );

  const pointAbsorptionOpacity = useTransform(
    smoothRitual,
    [0.0, 0.05, 0.28, 0.3333, 0.38, 0.62, 0.6667, 0.71, 0.95, 1.0],
    [0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0]
  );

  useMotionValueEvent(smoothRitual, "change", (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    // 4 nodes sit at exact intervals k/3 (0, 0.3333, 0.6667, 1.0)
    const scaled = clamped * (RITUAL_STEPS.length - 1);
    const nextActive = Math.min(RITUAL_STEPS.length, Math.max(1, Math.round(scaled) + 1));
    const nextReached = Math.min(RITUAL_STEPS.length, Math.max(1, Math.floor(scaled + 0.05) + 1));

    setReachedNode((prev) => (prev !== nextReached ? nextReached : prev));
    setActiveStep((prev) => {
      if (prev === nextActive) return prev;
      setDirection(nextActive > prev ? 1 : -1);
      return nextActive;
    });
  });

  // Clicking any day immediately selects that step and smoothly scrolls the pinned runway to that exact node
  const scrollToStep = (stepId: number) => {
    setDirection(stepId >= activeStep ? 1 : -1);
    setActiveStep(stepId);
    setReachedNode((prev) => Math.max(prev, stepId));

    if (!runwayRef.current) {
      return;
    }

    const rect = runwayRef.current.getBoundingClientRect();
    const runwayTop = window.scrollY + rect.top;
    const scrollableDistance = Math.max(1, runwayRef.current.offsetHeight - window.innerHeight);
    const targetRitual = (stepId - 1) / (RITUAL_STEPS.length - 1);
    const targetScrollFrac = START_FRAC + targetRitual * (END_FRAC - START_FRAC);
    const targetY = runwayTop + targetScrollFrac * scrollableDistance;

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.72 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const currentStep = RITUAL_STEPS.find((s) => s.id === activeStep) || RITUAL_STEPS[0];

  return (
    <section
      id="week"
      ref={runwayRef}
      className="relative w-full bg-grad-ritual text-espresso h-[300vh] lg:h-[340vh]"
    >
      {/* Pinned Full-Viewport Stage — Stays Locked Until Monday -> Thursday Scroll Completes */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center pt-16 sm:pt-[74px] pb-5 sm:pb-7 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center h-full max-h-[780px]">
          {/* Clean Display Headline (No Eyebrow Line) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-5 flex-shrink-0">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.1] tracking-tight text-espresso">
                From Monday to Thursday inside{" "}
                <em className="italic font-normal text-rust">the Folio Circle</em>.
              </h2>
            </div>

            <p className="font-sans text-xs sm:text-sm text-umber max-w-md leading-snug hidden sm:block">
              Scroll to trace each day along the path — the stage stays locked until Thursday&apos;s wax sealing completes.
            </p>
          </div>

          {/* Main Pinned Content Grid */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch flex-1 min-h-0 max-h-[640px]">
            {/* LEFT COLUMN (Desktop lg+): 4 Equal-Height Rows with Exact 12.5%, 37.5%, 62.5%, 87.5% Centers & Clear Gaps */}
            <div className="hidden lg:flex lg:col-span-5 relative pl-12 flex-col h-full min-h-0">
              {/* Exact Vertical Spine Rail: Perfectly centered at 20px, spanning from 12.5% (Row 0 center) to 87.5% (Row 3 center) */}
              <div
                aria-hidden="true"
                className="absolute left-[20px] -translate-x-1/2 top-[12.5%] bottom-[12.5%] w-[2px] z-10 pointer-events-none"
              >
                {/* Unfilled Archival Track */}
                <div className="absolute inset-0 bg-sand/80 rounded-full" />

                {/* Live Scroll-Filling Gradient Line (Cohesive with Active Palette) */}
                <motion.div
                  style={{ scaleY: smoothRitual }}
                  className="absolute inset-0 origin-top bg-gradient-to-b from-rust via-rust to-rust-hover rounded-full will-change-transform"
                />

                {/* Smooth Traveling Point that Absorbs Into Checkpoints (Collinear at 20px Center) */}
                <motion.div
                  style={{
                    top: pointPositionPct,
                    scale: pointAbsorptionScale,
                    opacity: pointAbsorptionOpacity,
                  }}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rust border-2 border-paper shadow-[0_0_0_4px_var(--glow-warm),0_0_12px_var(--rust)] z-30 pointer-events-none will-change-[top,transform,opacity]"
                />
              </div>

              {RITUAL_STEPS.map((step) => {
                const isActive = activeStep === step.id;
                const isPassed = step.id < activeStep || (step.id <= reachedNode && !isActive);
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    onClick={() => scrollToStep(step.id)}
                    className="relative flex-1 flex items-center min-h-0 group"
                  >
                    {/* Milestone Node Checkpoint: Perfectly centered at 20px, absorbing the point seamlessly */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[38px] top-1/2 -translate-y-1/2 flex items-center z-20 pointer-events-none"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.35, ease: LUXURY_EASE }}
                        className={cn(
                          "w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-all duration-300",
                          isActive
                            ? "bg-rust border-rust shadow-[0_0_0_4px_var(--glow-warm),0_0_12px_var(--rust)]"
                            : isPassed
                            ? "bg-paper border-rust/70 shadow-[0_0_0_2px_var(--glow-warm)]"
                            : "bg-paper border-sand"
                        )}
                      >
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            isActive
                              ? "bg-paper scale-110"
                              : isPassed
                              ? "bg-rust/80 scale-90"
                              : "bg-stone/40 scale-75"
                          )}
                        />
                      </motion.div>

                      {/* Horizontal Connector Branch into Day Card */}
                      <div
                        className={cn(
                          "h-[1.5px] transition-all duration-200",
                          isActive
                            ? "w-[22px] bg-rust"
                            : isPassed
                            ? "w-[18px] bg-rust/40"
                            : "w-[18px] bg-sand"
                        )}
                      />
                    </div>

                    {/* Day Card with Clear Distinct Gaps & Crisp Theme Palette Highlight */}
                    <motion.div
                      animate={{ x: isActive ? 4 : 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      className={cn(
                        "relative w-full my-2.5 sm:my-3 px-4 py-3 sm:py-3.5 rounded-2xl cursor-pointer border text-left flex flex-col justify-center will-change-transform transition-all duration-200 shadow-sm",
                        isActive
                          ? "bg-paper border-rust shadow-md ring-2 ring-rust/20"
                          : isPassed
                          ? "bg-paper/85 hover:bg-paper border-sand/90"
                          : "bg-paper/50 hover:bg-paper/80 border-sand/70"
                      )}
                    >
                      {/* Line 1: Day & Tag */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold transition-colors duration-200",
                            isActive ? "text-rust font-bold" : isPassed ? "text-umber font-semibold" : "text-stone"
                          )}
                        >
                          {step.day}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-[9.5px] px-2 py-0.5 rounded-full truncate transition-colors duration-200",
                            isActive
                              ? "bg-tint-rust text-rust font-semibold ring-1 ring-rust/30"
                              : "bg-sand/55 text-umber"
                          )}
                        >
                          {step.tag}
                        </span>
                      </div>

                      {/* Line 2: Title */}
                      <h3 className="font-serif text-[15px] xl:text-base font-bold text-espresso flex items-center gap-1.5 truncate">
                        <Icon
                          className={cn(
                            "w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200",
                            isActive ? "text-rust" : isPassed ? "text-umber" : "text-stone"
                          )}
                        />
                        <span className="truncate">{step.title}</span>
                      </h3>

                      {/* Line 3: Description showing cleanly with ample line height */}
                      <p
                        className={cn(
                          "font-sans text-xs leading-normal mt-1 transition-colors duration-200",
                          isActive ? "text-espresso font-medium" : "text-umber"
                        )}
                      >
                        {step.subtitle}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: The Single Fitted Showcase Container (No Small Containers, All Text 100% Showing) */}
            <div className="lg:col-span-7 h-full min-h-0 flex flex-col">
              <div className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-grad-card border border-sand shadow-2xl relative flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-rust/10 blur-3xl pointer-events-none transform-gpu" />
                <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-sand/30 blur-3xl pointer-events-none transform-gpu" />

                {/* Top Connected 4-Node Horizontal Step Path (12.5%, 37.5%, 62.5%, 87.5% Centers) */}
                <div className="relative z-10 pb-3.5 mb-3 border-b border-sand flex-shrink-0">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs text-stone">
                      <span className="w-2 h-2 rounded-full bg-rust flex-shrink-0 animate-pulse" />
                      <span className="truncate tracking-wider">
                        WEEKLY ARTIFACT · {currentStep.day.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-serif italic text-sm text-rust font-medium whitespace-nowrap">
                      {currentStep.tag}
                    </span>
                  </div>

                  {/* 4 Equal-Width Columns so Node Centers Align at Exact 12.5%, 37.5%, 62.5%, 87.5% */}
                  <div className="relative grid grid-cols-4 items-center pt-1">
                    {/* Exact Horizontal Path Line from Col 1 Center (12.5%) to Col 4 Center (87.5%) */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[12.5%] right-[12.5%] top-[11px] h-[2px] pointer-events-none"
                    >
                      <div className="absolute inset-0 bg-sand/80 rounded-full" />
                      <motion.div
                        style={{ scaleX: smoothRitual }}
                        className="absolute inset-0 origin-left bg-gradient-to-r from-rust via-rust to-rust-hover rounded-full will-change-transform"
                      />
                      <motion.div
                        style={{
                          left: pointPositionPct,
                          scale: pointAbsorptionScale,
                          opacity: pointAbsorptionOpacity,
                        }}
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-rust border-2 border-paper shadow-[0_0_8px_var(--rust)] z-20 will-change-[left,transform,opacity]"
                      />
                    </div>

                    {RITUAL_STEPS.map((s) => {
                      const isNodeActive = s.id === activeStep;
                      const isNodeDone = s.id < activeStep || (s.id <= reachedNode && !isNodeActive);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => scrollToStep(s.id)}
                          className="relative z-10 flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
                          aria-label={`Jump to ${s.day}`}
                        >
                          <span
                            className={cn(
                              "w-3.5 h-3.5 rounded-full border-2 transition-all duration-200",
                              isNodeActive
                                ? "bg-rust border-rust shadow-xs scale-110"
                                : isNodeDone
                                ? "bg-paper border-rust/70"
                                : "bg-paper border-sand group-hover:border-stone"
                            )}
                          />
                          <span
                            className={cn(
                              "font-mono text-[9px] sm:text-[10px] uppercase tracking-wider",
                              isNodeActive
                                ? "text-rust font-bold"
                                : isNodeDone
                                ? "text-rust/80 font-medium"
                                : "text-stone"
                            )}
                          >
                            {s.shortDay}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* The Single Fit Editorial Container (Zero Small Containers, All Text Showing Completely!) */}
                <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center py-2">
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div
                      key={currentStep.id}
                      custom={direction}
                      initial={{ opacity: 0, y: direction > 0 ? 12 : -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: direction > 0 ? -10 : 10 }}
                      transition={{ duration: 0.28, ease: LUXURY_EASE }}
                      className="space-y-4 will-change-[transform,opacity]"
                    >
                      {/* Step Header */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-rust font-bold px-2.5 py-0.5 rounded-full bg-tint-rust border border-rust/20">
                            {currentStep.day}
                          </span>
                          <span className="font-mono text-xs text-stone">
                            {currentStep.tag}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-espresso leading-tight tracking-tight mb-1.5">
                          {currentStep.title}
                        </h3>

                        <p className="font-sans text-sm sm:text-base font-medium text-rust leading-snug">
                          {currentStep.subtitle}
                        </p>
                      </div>

                      {/* Main Narrative Description — 100% Showing with No Hidden Overflows */}
                      <p className="font-sans text-sm sm:text-[15px] text-umber leading-relaxed">
                        {currentStep.details}
                      </p>

                      {/* Clean Editorial Quote Block (Seamless left accent line, no nested small boxes) */}
                      <div className="pl-4 border-l-2 border-rust/45 py-1">
                        <p className="font-serif italic text-xs sm:text-sm text-espresso leading-relaxed">
                          {currentStep.quote}
                        </p>
                      </div>

                      {/* Key Deliverable Highlights */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                        {currentStep.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-paper border border-sand text-stone"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation between All 4 Days (Mon–Thu) */}
                <div className="relative z-10 pt-3.5 mt-2 border-t border-sand flex items-center justify-between gap-2 font-mono text-xs text-stone flex-shrink-0">
                  <span>
                    Day {activeStep} of {RITUAL_STEPS.length} (Mon–Thu)
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={activeStep === 1}
                      onClick={() => scrollToStep(Math.max(1, activeStep - 1))}
                      className="px-3 py-1.5 rounded-lg border border-sand bg-parchment disabled:opacity-40 hover:bg-sand text-espresso transition-colors cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      disabled={activeStep === RITUAL_STEPS.length}
                      onClick={() => scrollToStep(Math.min(RITUAL_STEPS.length, activeStep + 1))}
                      className="px-3 py-1.5 rounded-lg border border-sand bg-espresso text-paper disabled:opacity-40 hover:bg-rust transition-colors cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
