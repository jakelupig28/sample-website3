"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Sparkles, Check, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { LUXURY_EASE, SOFT_SPRING, CURSOR_SPRING, SCROLL_SPRING } from "@/lib/motion";

const ROTATING_WORDS = [
  "rare first editions",
  "translated fiction",
  "architectural monographs",
  "independent zines",
  "your Sunday mornings",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isSeatReserved, setIsSeatReserved] = useState(false);
  const { openBookMatch } = useCart();
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates [-1.35, 1.35] centered on the right-column visual stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Central arch illustration 3D tilt & smooth translation
  const tiltRotateX = useSpring(
    useTransform(mouseY, [-1, 1], [5, -5], { clamp: false }),
    CURSOR_SPRING
  );
  const tiltRotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-5, 5], { clamp: false }),
    CURSOR_SPRING
  );
  const imageTranslateX = useSpring(
    useTransform(mouseX, [-1, 1], [-10, 10], { clamp: false }),
    CURSOR_SPRING
  );
  const imageTranslateY = useSpring(
    useTransform(mouseY, [-1, 1], [-10, 10], { clamp: false }),
    CURSOR_SPRING
  );

  // Floating Card 1 (Top-Left: Salon Invite) - True 4-directional cursor tracking
  const card1MouseX = useSpring(
    useTransform(mouseX, [-1, 1], [-26, 26], { clamp: false }),
    CURSOR_SPRING
  );
  const card1MouseY = useSpring(
    useTransform(mouseY, [-1, 1], [-20, 20], { clamp: false }),
    CURSOR_SPRING
  );
  const card1RotateX = useSpring(
    useTransform(mouseY, [-1, 1], [8, -8], { clamp: false }),
    CURSOR_SPRING
  );
  const card1RotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-8, 8], { clamp: false }),
    CURSOR_SPRING
  );

  // Floating Card 2 (Center-Right: Parcel Dispatched) - Consistent 4-directional cursor tracking
  const card2MouseX = useSpring(
    useTransform(mouseX, [-1, 1], [-22, 22], { clamp: false }),
    CURSOR_SPRING
  );
  const card2MouseY = useSpring(
    useTransform(mouseY, [-1, 1], [-18, 18], { clamp: false }),
    CURSOR_SPRING
  );
  const card2RotateX = useSpring(
    useTransform(mouseY, [-1, 1], [7, -7], { clamp: false }),
    CURSOR_SPRING
  );
  const card2RotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-7, 7], { clamp: false }),
    CURSOR_SPRING
  );

  // Floating Card 3 (Bottom-Left: Concierge Chat) - Deep foreground 4-directional cursor tracking
  const card3MouseX = useSpring(
    useTransform(mouseX, [-1, 1], [-32, 32], { clamp: false }),
    CURSOR_SPRING
  );
  const card3MouseY = useSpring(
    useTransform(mouseY, [-1, 1], [-24, 24], { clamp: false }),
    CURSOR_SPRING
  );
  const card3RotateX = useSpring(
    useTransform(mouseY, [-1, 1], [9, -9], { clamp: false }),
    CURSOR_SPRING
  );
  const card3RotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-9, 9], { clamp: false }),
    CURSOR_SPRING
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetEl = stageRef.current || heroRef.current;
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawNx = (e.clientX - centerX) / (rect.width * 0.5);
    const rawNy = (e.clientY - centerY) / (rect.height * 0.5);
    mouseX.set(Math.max(-1.35, Math.min(1.35, rawNx)));
    mouseY.set(Math.max(-1.35, Math.min(1.35, rawNy)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax scroll controls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothYProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  const backgroundY = useTransform(smoothYProgress, [0, 1], [0, 110]);
  const frameY = useTransform(smoothYProgress, [0, 1], [0, -26]);

  // Distinct parallax speeds for the orbiting micro-UI cards
  const card1Y = useTransform(smoothYProgress, [0, 1], [0, -38]);
  const card2Y = useTransform(smoothYProgress, [0, 1], [0, -32]);
  const card3Y = useTransform(smoothYProgress, [0, 1], [0, -48]);

  // Combine scroll parallax with mouse Y movements
  const frameCombinedY = useTransform(
    [frameY, imageTranslateY],
    ([scroll, mouse]) => Number(scroll) + Number(mouse)
  );
  const card1CombinedY = useTransform(
    [card1Y, card1MouseY],
    ([scroll, mouse]) => Number(scroll) + Number(mouse)
  );
  const card2CombinedY = useTransform(
    [card2Y, card2MouseY],
    ([scroll, mouse]) => Number(scroll) + Number(mouse)
  );
  const card3CombinedY = useTransform(
    [card3Y, card3MouseY],
    ([scroll, mouse]) => Number(scroll) + Number(mouse)
  );

  // Word rotator timer
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] lg:h-[100svh] pt-24 sm:pt-28 lg:pt-[74px] pb-12 sm:pb-14 lg:pb-5 flex flex-col justify-center bg-grad-hero overflow-hidden"
    >
      {/* Ambient Parallax Gradient Blooms */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-28 -left-20 w-[30rem] h-[30rem] rounded-full bg-rust/14 blur-[115px] transform-gpu"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.16, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 -right-32 w-[34rem] h-[34rem] rounded-full bg-sage/12 blur-[125px] transform-gpu"
        />
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-brass/10 blur-[105px] transform-gpu"
        />
      </motion.div>

      {/* Main 2-Column Asymmetric Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Main Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.1 }}
              className="font-serif text-[2.15rem] sm:text-5xl lg:text-[3.15rem] xl:text-[3.55rem] leading-[1.05] tracking-tight text-espresso mb-3.5"
            >
              We filter out the noise.
              <br />
              <em className="text-rust font-normal italic">
                You get lost in the pages.
              </em>
            </motion.h1>

            {/* Interactive Slot-Machine Word Rotator */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.2 }}
              className="flex items-center flex-wrap gap-2 sm:gap-2.5 mb-3.5 text-sm sm:text-lg font-sans text-umber"
            >
              <span className="font-medium text-espresso">We curate</span>
              <div className="relative inline-flex items-center h-8 sm:h-9 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-paper via-parchment to-tint-rust/50 border border-sand shadow-sm overflow-hidden min-w-[205px] sm:min-w-[230px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: LUXURY_EASE }}
                    className="font-serif italic font-semibold text-rust whitespace-nowrap"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-xs sm:text-sm font-mono text-stone">for curious minds.</span>
            </motion.div>

            {/* Editorial Lead Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.3 }}
              className="text-sm sm:text-[15px] text-umber leading-relaxed max-w-xl mb-5 font-sans"
            >
              Seven years hand-selecting literature, essays, and art books for curious readers
              across Manila and beyond — without a single algorithm in sight. Tell us the last
              three books that moved you, and wake up to a hand-wrapped parcel and a reading list
              that actually understands your taste.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={SOFT_SPRING}
                onClick={openBookMatch}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-espresso hover:bg-rust text-paper font-medium text-sm sm:text-[15px] shadow-lg shadow-espresso/10 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-foil" />
                <span>Request a Custom Book Stack</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={SOFT_SPRING}
                onClick={() => scrollTo("#calm")}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-paper to-parchment hover:from-parchment hover:to-sand border border-sand text-espresso font-medium text-sm sm:text-[15px] transition-colors cursor-pointer"
              >
                <span>See how we cure reading slumps</span>
                <span className="text-rust">→</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column (6 Cols) — Flat-Editorial Arched Book Sanctuary Illustration & Orbiting Cards */}
          <div
            ref={stageRef}
            className="lg:col-span-6 relative flex flex-col justify-center items-center mt-3 sm:mt-6 lg:mt-0"
          >
            {/* Subtle Architectural Grid Backdrop Behind Arch */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--sand) 1px, transparent 1px), linear-gradient(to bottom, var(--sand) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 72% 72% at 52% 50%, #000 35%, transparent 88%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 72% 72% at 52% 50%, #000 35%, transparent 88%)",
              }}
            />

            {/* Central Arched Editorial Book Illustration Stage */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.15 }}
              style={{
                transformPerspective: 1200,
                x: imageTranslateX,
                y: frameCombinedY,
                rotateX: tiltRotateX,
                rotateY: tiltRotateY,
              }}
              className="relative z-10 w-full max-w-[310px] sm:max-w-[395px] lg:max-w-[445px] [backface-visibility:hidden] will-change-transform select-none"
            >
              <svg
                viewBox="0 0 460 510"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Editorial arch illustration of curated clothbound books, open pages, reading spectacles, warm sun halo, and botanical foliage"
                className="w-full h-auto max-h-[clamp(355px,75svh,520px)] drop-shadow-[0_18px_38px_rgba(23,20,18,0.08)]"
              >
                <defs>
                  {/* Pastel Arch Dome Gradient */}
                  <linearGradient id="heroArchGrad" x1="230" y1="18" x2="230" y2="500" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--arch-top)" />
                    <stop offset="100%" stopColor="var(--arch-bottom)" />
                  </linearGradient>

                  {/* Warm Sun Halo Gradient */}
                  <radialGradient id="heroSunGrad" cx="42%" cy="40%" r="62%">
                    <stop offset="0%" stopColor="var(--sun-core)" />
                    <stop offset="100%" stopColor="var(--sun-edge)" />
                  </radialGradient>

                  {/* Open Book Left & Right Page Gradients */}
                  <linearGradient id="leftPageGrad" x1="115" y1="190" x2="230" y2="275" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="88%" stopColor="#F8F2E6" />
                    <stop offset="100%" stopColor="#E9DFCE" />
                  </linearGradient>

                  <linearGradient id="rightPageGrad" x1="345" y1="190" x2="230" y2="275" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="88%" stopColor="#F6EFE2" />
                    <stop offset="100%" stopColor="#E6DCC9" />
                  </linearGradient>

                  {/* Clip to Arch Interior for Bottom Elements & Foliage */}
                  <clipPath id="heroArchClip">
                    <path d="M 38 222 A 192 192 0 0 1 422 222 L 422 496 Q 422 504 414 504 L 46 504 Q 38 504 38 496 Z" />
                  </clipPath>
                </defs>

                {/* Subtle Corner Dot Matrix (Lower Right Outside Arch) */}
                {[0, 1, 2].map((row) =>
                  [0, 1, 2].map((col) => (
                    <circle
                      key={`dot-${row}-${col}`}
                      cx={392 + col * 15}
                      cy={432 + row * 15}
                      r="2.2"
                      fill="var(--stone)"
                      opacity="0.28"
                    />
                  ))
                )}

                {/* 1. Tall Rounded Pastel Arch Silhouette */}
                <path
                  d="M 38 222 A 192 192 0 0 1 422 222 L 422 496 Q 422 504 414 504 L 46 504 Q 38 504 38 496 Z"
                  fill="url(#heroArchGrad)"
                />

                {/* Clipped Arch Interior Scene */}
                <g clipPath="url(#heroArchClip)">
                  {/* 2. Offset Thin Concentric Orbit Ring & Warm Sun Halo (Upper Right) */}
                  <circle
                    cx="296"
                    cy="168"
                    r="114"
                    stroke="var(--rust)"
                    strokeOpacity="0.26"
                    strokeWidth="1.4"
                  />
                  <circle cx="312" cy="178" r="88" fill="url(#heroSunGrad)" />

                  {/* 3. Editorial Sparkle Stars (✦) */}
                  {/* Terracotta 4-point star (Upper-Left, matching reference) */}
                  <path
                    d="M 178 66 Q 178 78 190 78 Q 178 78 178 90 Q 178 78 166 78 Q 178 78 178 66 Z"
                    fill="var(--rust)"
                  />
                  {/* Crisp Ivory 4-point star on Sun Halo edge (Upper-Right, matching reference) */}
                  <path
                    d="M 386 96 Q 386 112 402 112 Q 386 112 386 128 Q 386 112 370 112 Q 386 112 386 96 Z"
                    fill="#FFFFFF"
                  />

                  {/* 4. Botanical Foliage Leaves Framing Lower Left & Right */}
                  {/* Left Botanical Sprig */}
                  <g>
                    {/* Tall Left Leaf */}
                    <path
                      d="M 34 422 C 26 376, 52 332, 82 314 C 88 352, 74 396, 34 422 Z"
                      fill="var(--sage)"
                      opacity="0.82"
                    />
                    <path
                      d="M 34 422 C 56 382, 72 346, 82 314 C 88 352, 74 396, 34 422 Z"
                      fill="var(--paper)"
                      opacity="0.22"
                    />
                    <path
                      d="M 36 420 Q 60 370 80 318"
                      stroke="var(--espresso)"
                      strokeOpacity="0.22"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    {/* Secondary Left Side Leaf */}
                    <path
                      d="M 48 442 C 66 410, 96 392, 122 390 C 110 420, 82 440, 48 442 Z"
                      fill="var(--sage)"
                      opacity="0.65"
                    />
                  </g>

                  {/* Right Botanical Sprig */}
                  <g>
                    {/* Upper Right Leaf */}
                    <path
                      d="M 426 408 C 432 356, 412 312, 384 288 C 374 330, 388 376, 426 408 Z"
                      fill="var(--sage)"
                      opacity="0.85"
                    />
                    <path
                      d="M 426 408 C 404 366, 392 328, 384 288 C 374 330, 388 376, 426 408 Z"
                      fill="var(--paper)"
                      opacity="0.2"
                    />
                    {/* Lower Angled Right Leaf */}
                    <path
                      d="M 418 424 C 392 388, 358 368, 330 364 C 344 398, 378 420, 418 424 Z"
                      fill="var(--sage)"
                      opacity="0.72"
                    />
                    <path
                      d="M 414 420 Q 376 390 335 367"
                      stroke="var(--espresso)"
                      strokeOpacity="0.2"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* 5. CENTRAL LITERARY BOOK COMPOSITION */}

                  {/* Soft Ambient Shadow Under Open Book */}
                  <ellipse cx="230" cy="330" rx="96" ry="12" fill="var(--espresso)" opacity="0.08" />

                  {/* A) Round Literary Reading Spectacles Poised Above Open Pages */}
                  <g transform="translate(0, 4)">
                    {/* Left Temple Arm Hint */}
                    <path
                      d="M 164 134 Q 178 122 194 128"
                      stroke="var(--espresso)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                    {/* Right Temple Arm Hint */}
                    <path
                      d="M 296 134 Q 282 122 266 128"
                      stroke="var(--espresso)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                    {/* Left Round Lens */}
                    <circle
                      cx="198"
                      cy="142"
                      r="22"
                      fill="#FFFFFF"
                      fillOpacity="0.42"
                      stroke="var(--espresso)"
                      strokeWidth="3.4"
                    />
                    {/* Lens Sheen */}
                    <path
                      d="M 186 134 Q 192 128 200 130"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    {/* Right Round Lens */}
                    <circle
                      cx="262"
                      cy="142"
                      r="22"
                      fill="#FFFFFF"
                      fillOpacity="0.42"
                      stroke="var(--espresso)"
                      strokeWidth="3.4"
                    />
                    <path
                      d="M 250 134 Q 256 128 264 130"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    {/* Arched Nose Bridge */}
                    <path
                      d="M 220 140 Q 230 132 240 140"
                      stroke="var(--espresso)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* B) Open Fanned Hardcover Volume (Upper Centerpiece) */}
                  <g>
                    {/* Outer Clothbound Cover Board */}
                    <path
                      d="M 102 204 Q 166 188 230 208 Q 294 188 358 204 L 364 316 Q 296 298 230 320 Q 164 298 96 316 Z"
                      fill="var(--espresso)"
                    />
                    {/* Secondary Stacked Page Block Edge */}
                    <path
                      d="M 106 198 Q 168 180 230 202 Q 292 180 354 198 L 358 308 Q 294 290 230 313 Q 166 290 102 308 Z"
                      fill="#EDE3D1"
                    />

                    {/* Main Left Open Arched Page */}
                    <path
                      d="M 110 190 C 148 174, 196 178, 230 198 L 230 308 C 196 288, 148 284, 110 298 Z"
                      fill="url(#leftPageGrad)"
                    />
                    {/* Main Right Open Arched Page */}
                    <path
                      d="M 350 190 C 312 174, 264 178, 230 198 L 230 308 C 264 288, 312 284, 350 298 Z"
                      fill="url(#rightPageGrad)"
                    />

                    {/* Center Spine Fold Line */}
                    <line
                      x1="230"
                      y1="198"
                      x2="230"
                      y2="309"
                      stroke="#D5C8B2"
                      strokeWidth="1.6"
                    />

                    {/* Left Page Illuminated Drop-Cap & Editorial Lines */}
                    <rect
                      x="128"
                      y="204"
                      width="22"
                      height="22"
                      rx="5"
                      fill="var(--rust)"
                    />
                    <path
                      d="M 135 220 L 139 209 L 143 220 M 136.5 217 H 141.5"
                      stroke="#FFFDF9"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect x="157" y="206" width="54" height="4.5" rx="2.25" fill="var(--espresso)" opacity="0.55" />
                    <rect x="157" y="217" width="46" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.38" />
                    <rect x="128" y="235" width="82" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.38" />
                    <rect x="128" y="246" width="76" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.34" />
                    <rect x="128" y="257" width="84" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.34" />
                    <rect x="128" y="268" width="58" height="4.5" rx="2.25" fill="var(--rust)" opacity="0.55" />

                    {/* Right Page Chapter Header, Prose Lines & Highlighted Quote Block */}
                    <rect x="248" y="204" width="42" height="4" rx="2" fill="var(--sage)" opacity="0.7" />
                    <rect x="248" y="216" width="82" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.38" />
                    <rect x="248" y="227" width="74" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.34" />
                    {/* Highlighted Margin Callout Box */}
                    <rect
                      x="248"
                      y="241"
                      width="80"
                      height="24"
                      rx="6"
                      fill="var(--sun-core)"
                      opacity="0.45"
                    />
                    <rect x="256" y="248" width="62" height="4" rx="2" fill="var(--espresso)" opacity="0.55" />
                    <rect x="256" y="256" width="44" height="3.5" rx="1.75" fill="var(--rust)" opacity="0.75" />
                    <rect x="248" y="273" width="68" height="4.5" rx="2.25" fill="var(--umber)" opacity="0.34" />

                    {/* Flowing Silk Bookmark Ribbon Rising from Spine */}
                    <path
                      d="M 230 198 C 236 180, 256 172, 268 182 L 262 190 L 270 196 C 254 188, 238 190, 230 202 Z"
                      fill="var(--rust)"
                    />
                  </g>

                  {/* C) Curated 3-Volume Stacked Clothbound Pedestal (Grounding Arch Base) */}
                  {/* Volume 1 (Top of Stack): Warm Terracotta / Rust Edition */}
                  <g>
                    <rect x="116" y="332" width="228" height="44" rx="11" fill="var(--rust)" />
                    {/* Recessed Cream Page Block on Right */}
                    <rect x="272" y="338" width="66" height="32" rx="6" fill="#FAF5EA" />
                    <line x1="278" y1="346" x2="332" y2="346" stroke="#DFD4C0" strokeWidth="1.5" />
                    <line x1="278" y1="354" x2="332" y2="354" stroke="#DFD4C0" strokeWidth="1.5" />
                    <line x1="278" y1="362" x2="332" y2="362" stroke="#DFD4C0" strokeWidth="1.5" />
                    {/* Spine Foil Bands & Title Plate */}
                    <rect x="134" y="332" width="5" height="44" fill="#FEF3C7" opacity="0.45" />
                    <rect x="152" y="346" width="94" height="16" rx="4" fill="#FFFDF9" opacity="0.18" />
                    <rect x="162" y="352" width="74" height="4" rx="2" fill="#FFFDF9" opacity="0.85" />
                  </g>

                  {/* Volume 2 (Middle of Stack): Deep Espresso / Midnight Edition */}
                  <g>
                    <rect x="96" y="378" width="268" height="50" rx="12" fill="var(--espresso)" />
                    {/* Recessed Cream Page Block on Left */}
                    <rect x="103" y="385" width="76" height="36" rx="7" fill="#FAF5EA" />
                    <line x1="110" y1="395" x2="172" y2="395" stroke="#DFD4C0" strokeWidth="1.5" />
                    <line x1="110" y1="403" x2="172" y2="403" stroke="#DFD4C0" strokeWidth="1.5" />
                    <line x1="110" y1="411" x2="172" y2="411" stroke="#DFD4C0" strokeWidth="1.5" />
                    {/* Draped Silk Bookmark Tail Over Spine */}
                    <path
                      d="M 152 378 L 166 378 L 166 412 L 159 406 L 152 412 Z"
                      fill="var(--sun-core)"
                    />
                    {/* Embossed Spine Medallion & Bands */}
                    <circle cx="212" cy="403" r="8" fill="var(--sage-soft)" opacity="0.25" />
                    <circle cx="212" cy="403" r="4.5" fill="var(--sage-on-dark)" opacity="0.85" />
                    <rect x="234" y="399" width="88" height="7" rx="3.5" fill="#FFFDF9" opacity="0.78" />
                    <rect x="338" y="378" width="5" height="50" fill="var(--sun-core)" opacity="0.4" />
                  </g>

                  {/* Volume 3 (Grand Base Architectural Monograph — Anchoring Bottom of Arch Like Reference Coat) */}
                  <g>
                    <rect x="74" y="430" width="312" height="76" rx="16" fill="var(--sage)" />
                    {/* Subtle Architectural Lapel-Like Two-Tone Bookcloth Band */}
                    <path
                      d="M 74 446 Q 74 430 90 430 L 370 430 Q 386 430 386 446 L 386 456 L 74 456 Z"
                      fill="#FFFFFF"
                      opacity="0.1"
                    />
                    {/* Center Archival Bookplate Crest */}
                    <rect
                      x="184"
                      y="448"
                      width="92"
                      height="36"
                      rx="8"
                      fill="#FFFDF9"
                      opacity="0.92"
                    />
                    <rect x="198" y="458" width="64" height="5" rx="2.5" fill="var(--espresso)" opacity="0.8" />
                    <rect x="208" y="469" width="44" height="4" rx="2" fill="var(--rust)" opacity="0.85" />

                    {/* Charming Editorial Pocket-Tab Detail on Right (Echoing Reference Accent) */}
                    <g transform="translate(308, 456) rotate(-8)">
                      <path d="M 4 12 L 10 3 L 16 12 Z" fill="var(--sun-core)" />
                      <path d="M 14 12 L 20 4 L 26 12 Z" fill="var(--sun-core)" />
                      <rect x="0" y="10" width="30" height="8" rx="2" fill="var(--rust)" />
                    </g>

                    {/* Left Gold Seal Pin Detail (Echoing Reference Pin) */}
                    <circle cx="136" cy="466" r="8" fill="#FFFDF9" opacity="0.9" />
                    <circle cx="136" cy="466" r="5" fill="var(--arch-top)" />
                  </g>
                </g>
              </svg>
            </motion.div>

            {/* 1. Orbiting Micro-UI Card: Top-Left (Salon Invite UI — Tablet & Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.3 }}
              style={{
                transformPerspective: 1000,
                x: card1MouseX,
                y: card1CombinedY,
                rotateX: card1RotateX,
                rotateY: card1RotateY,
              }}
              whileHover={{ scale: 1.05 }}
              className="hidden sm:block absolute top-4 sm:left-0 md:left-3 lg:-left-4 xl:-left-6 z-30 max-w-[205px] md:max-w-[220px] will-change-transform [backface-visibility:hidden]"
            >
              <motion.div
                animate={{ x: [0, 3, -3, 0], y: [0, -5, 3, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="p-2.5 sm:p-3 rounded-2xl bg-grad-card border border-sand shadow-xl text-left cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-rust font-semibold mb-0.5">
                  <span>SALON INVITE</span>
                </div>
                <p className="font-serif text-xs font-bold text-espresso leading-snug">
                  Late Night Murakami &amp; Matcha
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] text-umber mt-0.5">
                  Thu 7:30 PM Manila · 4 seats left
                </p>
                <button
                  onClick={() => setIsSeatReserved(!isSeatReserved)}
                  className={`mt-1.5 w-full py-1 px-2.5 rounded-lg text-[10px] font-mono font-medium transition-colors duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                    isSeatReserved
                      ? "bg-sage text-paper"
                      : "bg-espresso text-paper hover:bg-rust"
                  }`}
                >
                  {isSeatReserved ? (
                    <>
                      <Check className="w-3 h-3" />
                      Seat Held ✓
                    </>
                  ) : (
                    "[ Reserve Seat ]"
                  )}
                </button>
              </motion.div>
            </motion.div>

            {/* 2. Orbiting Micro-UI Card: Center-Right (Parcel Status UI — Tablet & Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.42 }}
              style={{
                transformPerspective: 1000,
                x: card2MouseX,
                y: card2CombinedY,
                rotateX: card2RotateX,
                rotateY: card2RotateY,
              }}
              whileHover={{ scale: 1.05 }}
              className="hidden sm:block absolute top-[42%] sm:right-0 md:right-3 lg:-right-4 xl:-right-6 z-30 max-w-[195px] md:max-w-[215px] will-change-transform [backface-visibility:hidden]"
            >
              <motion.div
                animate={{ x: [0, -3, 3, 0], y: [0, 4, -4, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="p-2.5 sm:p-3 rounded-2xl bg-grad-card border border-sand shadow-xl text-left cursor-pointer flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-sage text-paper flex items-center justify-center flex-shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-espresso leading-tight">
                    Parcel Dispatched
                  </p>
                  <p className="font-serif italic text-[11px] text-umber leading-tight mt-0.5">
                    &ldquo;The Poetics of Space&rdquo;
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* 3. Orbiting Micro-UI Card: Bottom-Left (Concierge Chat Bubble UI — Tablet & Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.54 }}
              style={{
                transformPerspective: 1000,
                x: card3MouseX,
                y: card3CombinedY,
                rotateX: card3RotateX,
                rotateY: card3RotateY,
              }}
              whileHover={{ scale: 1.04 }}
              className="hidden sm:block absolute bottom-4 sm:left-0 md:left-3 lg:-left-4 xl:-left-6 z-30 max-w-[235px] md:max-w-[255px] will-change-transform [backface-visibility:hidden]"
            >
              <motion.div
                animate={{ x: [0, 4, -2, 0], y: [0, -4, 4, 0] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                className="p-2.5 rounded-2xl bg-grad-card border border-sand shadow-xl text-left cursor-pointer space-y-1.5"
              >
                <div className="text-[10px] font-sans text-umber bg-tint-rust/75 p-2 rounded-xl">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-stone block">
                    Maya · Architect
                  </span>
                  <span className="font-medium text-espresso block mt-0.5">
                    &ldquo;Need something quiet like Sebald 🙏&rdquo;
                  </span>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-rust text-paper text-[10px] font-mono font-medium leading-snug shadow-xs">
                  Pulled &apos;Winter Journal&apos; + margin note ✓
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile (<640px) Non-Overlapping Interactive Sanctuary Cards Below the Unobstructed Book Illustration */}
            <div className="grid grid-cols-1 gap-2.5 mt-4 w-full max-w-[350px] sm:hidden relative z-20">
              <div className="p-3 rounded-2xl bg-grad-card border border-sand shadow-md flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-rust font-semibold block">
                    SALON INVITE · THU 7:30 PM
                  </span>
                  <p className="font-serif text-xs font-bold text-espresso truncate">
                    Late Night Murakami &amp; Matcha
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSeatReserved(!isSeatReserved)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-medium transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer ${
                    isSeatReserved
                      ? "bg-sage text-paper"
                      : "bg-espresso text-paper"
                  }`}
                >
                  {isSeatReserved ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Held ✓</span>
                    </>
                  ) : (
                    <span>Reserve</span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-2xl bg-grad-card border border-sand shadow-sm flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-sage text-paper flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[11px] font-bold text-espresso truncate">
                      Dispatched
                    </p>
                    <p className="font-serif italic text-[10px] text-umber truncate">
                      &ldquo;Poetics of Space&rdquo;
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-grad-card border border-sand shadow-sm flex flex-col justify-center">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-stone">
                    Concierge Match
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-rust truncate mt-0.5">
                    &apos;Winter Journal&apos; ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
