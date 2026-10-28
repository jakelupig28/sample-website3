"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditorialPalette {
  id: "munken" | "prussian" | "claret" | "ochre";
  label: string;
  paperStart: string;
  paperEnd: string;
  inkStart: string;
  inkEnd: string;
}

const EDITORIAL_PALETTES: EditorialPalette[] = [
  {
    id: "munken",
    label: "Manila Munken (Default)",
    paperStart: "#F9F3E8",
    paperEnd: "#E9DAC3",
    inkStart: "#D96B43",
    inkEnd: "#A94622",
  },
  {
    id: "prussian",
    label: "Oxford Vellum & Prussian",
    paperStart: "#EAF1FC",
    paperEnd: "#CDDCF5",
    inkStart: "#3B66D4",
    inkEnd: "#183482",
  },
  {
    id: "claret",
    label: "Venetian Rose & Bordeaux",
    paperStart: "#E8C6D2",
    paperEnd: "#D5A7B7",
    inkStart: "#B82547",
    inkEnd: "#741127",
  },
  {
    id: "ochre",
    label: "Kyoto Kraft & Bronze",
    paperStart: "#E5CFA9",
    paperEnd: "#CFB282",
    inkStart: "#AD651B",
    inkEnd: "#683908",
  },
];

// Exact integer geometry: w-7 (28px) button + gap-2.5 (10px) = 38px step
const SWATCH_STEP_PX = 38;

export default function PaletteSwitcher() {
  const [activePalette, setActivePalette] = useState<EditorialPalette["id"]>("munken");
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const switchTimerRef = useRef<number | null>(null);

  // Always start on the original Folio & Lark default palette ("munken") on page load
  useEffect(() => {
    window.localStorage.removeItem("folio-palette");
    document.documentElement.setAttribute("data-palette", "munken");
    return () => {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
      }
    };
  }, []);

  const handleSelect = (palette: EditorialPalette) => {
    if (palette.id === activePalette) return;

    const root = document.documentElement;
    root.setAttribute("data-palette-switching", "true");
    root.setAttribute("data-palette", palette.id);
    setActivePalette(palette.id);

    if (switchTimerRef.current) {
      window.clearTimeout(switchTimerRef.current);
    }
    switchTimerRef.current = window.setTimeout(() => {
      root.removeAttribute("data-palette-switching");
      switchTimerRef.current = null;
    }, 560);
  };

  const activeIndex = Math.max(
    0,
    EDITORIAL_PALETTES.findIndex((p) => p.id === activePalette)
  );

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40 flex flex-col items-start pointer-events-none scale-[0.88] sm:scale-100 origin-bottom-left">
      {/* Subtle Floating Edition Tooltip on Hover */}
      <AnimatePresence>
        {hoveredLabel && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="mb-2 px-3 py-1 rounded-full bg-espresso text-paper border border-sand/25 font-mono text-[10px] tracking-wider shadow-lg whitespace-nowrap"
          >
            {hoveredLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crisp Architectural Pill Switcher in Lower-Left Corner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        style={{
          backgroundImage: "linear-gradient(135deg, var(--paper) 0%, var(--parchment) 100%)",
        }}
        className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-paper border border-espresso/20 shadow-[0_10px_28px_rgba(23,20,18,0.14)]"
      >
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-espresso select-none">
          PALETTE
        </span>

        {/* Clean Hairline Divider */}
        <span className="w-px h-4 bg-espresso/20 flex-shrink-0" aria-hidden="true" />

        {/* Swatch Track with Exact Integer Pixel Ring & 1:1 28x28 Full-Circle Medallions */}
        <div className="relative flex items-center gap-2.5 px-0.5 py-0.5">
          <motion.span
            initial={false}
            animate={{ x: activeIndex * SWATCH_STEP_PX }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.65,
            }}
            className="absolute -left-[2px] -top-[2px] w-9 h-9 rounded-full border-2 border-espresso pointer-events-none will-change-transform"
          />

          {EDITORIAL_PALETTES.map((palette) => {
            const isSelected = activePalette === palette.id;
            const clipId = `swatch-clip-${palette.id}`;
            const paperGradId = `swatch-paper-${palette.id}`;
            const inkGradId = `swatch-ink-${palette.id}`;

            return (
              <motion.button
                key={palette.id}
                type="button"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => handleSelect(palette)}
                onMouseEnter={() => setHoveredLabel(palette.label)}
                onMouseLeave={() => setHoveredLabel(null)}
                aria-label={`Switch palette to ${palette.label}`}
                aria-pressed={isSelected}
                className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer focus:outline-none flex-shrink-0"
              >
                {/* 1:1 28x28 Pixel-Aligned SVG Full-Circle Medallion */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  shapeRendering="geometricPrecision"
                  className="w-7 h-7 block"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id={clipId}>
                      <circle cx="14" cy="14" r="12.5" />
                    </clipPath>
                    <linearGradient id={paperGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={palette.paperStart} />
                      <stop offset="100%" stopColor={palette.paperEnd} />
                    </linearGradient>
                    <linearGradient id={inkGradId} x1="20%" y1="20%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={palette.inkStart} />
                      <stop offset="100%" stopColor={palette.inkEnd} />
                    </linearGradient>
                  </defs>

                  <g clipPath={`url(#${clipId})`}>
                    {/* Upper-Left Base Gradient Half */}
                    <rect x="0" y="0" width="28" height="28" fill={`url(#${paperGradId})`} />
                    {/* Lower-Right Rich Ink Gradient Half */}
                    <polygon points="0,28 28,0 28,28" fill={`url(#${inkGradId})`} />
                    {/* Diagonal Seam */}
                    <line
                      x1="0"
                      y1="28"
                      x2="28"
                      y2="0"
                      stroke="var(--espresso)"
                      strokeOpacity="0.28"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Unbroken 360-Degree Full-Circle Rim (1.5px stroke inside 28x28 bounds so top/bottom/sides never clip) */}
                  <circle
                    cx="14"
                    cy="14"
                    r="12.5"
                    fill="none"
                    stroke="var(--espresso)"
                    strokeOpacity={isSelected ? "0.8" : "0.52"}
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
