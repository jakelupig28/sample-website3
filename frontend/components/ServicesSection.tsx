"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Plane,
  Wine,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import SectionWrapper from "./motion/SectionWrapper";
import SectionHeader from "./motion/SectionHeader";
import { useCart } from "@/context/CartContext";
import {
  SOFT_SPRING,
  STAGGER_CONTAINER,
  CARD_3D_PERSPECTIVE,
  VIEWPORT_ONCE,
} from "@/lib/motion";

const SALON_CHAIRS = Array.from({ length: 14 }, (_, idx) => {
  const angle = (idx / 14) * Math.PI * 2 - Math.PI / 2;
  const x = Math.round((50 + Math.cos(angle) * 38) * 100) / 100;
  const y = Math.round((50 + Math.sin(angle) * 38) * 100) / 100;
  const isAvailable = idx === 2 || idx === 7 || idx === 11;
  return { idx, x, y, isAvailable };
});

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { openBookMatch } = useCart();

  return (
    <SectionWrapper
      id="services"
      backgroundVariant="paper"
      className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="03"
          eyebrow="Offerings"
          headline={
            <>
              Six ways we bring{" "}
              <em className="italic font-normal text-rust">slow reading</em> back to
              your week.
            </>
          }
          subcopy="Come in for a single paperback, or hand us the keys to your reading year. Every recommendation is written by a human bookseller."
        />

        {/* 6 Bento Grid Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={STAGGER_CONTAINER}
          style={{ perspective: "1200px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Personal Book Concierge */}
          <motion.div
            variants={CARD_3D_PERSPECTIVE}
            whileHover={{ y: -6, transition: SOFT_SPRING }}
            style={{ transformPerspective: 1000 }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between group hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div>
              {/* Rich Visual Scene 1: Curator's Cedar Pull Stand & Bespoke Match Slip */}
              <div className="h-52 rounded-2xl bg-gradient-to-br from-paper via-tint-rust to-parchment border border-rust/20 p-4 mb-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-[radial-gradient(var(--rust)_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                {/* Top Curator Match Pill */}
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-paper/95 border border-rust/25 shadow-2xs font-mono text-[9px] font-semibold text-rust">
                    <Sparkles className="w-3 h-3 text-rust" />
                    98% Taste Match
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-espresso text-paper">
                    Pull #04
                  </span>
                </div>

                {/* 3 Detailed Clothbound Covers on Cedar Ledge */}
                <div className="relative z-10 flex items-end justify-center h-32 pb-2">
                  {/* Left Edition: Cobalt */}
                  <motion.div
                    animate={{
                      rotate: hoveredCard === 1 ? -14 : -7,
                      x: hoveredCard === 1 ? -20 : -8,
                      y: hoveredCard === 1 ? -4 : 0,
                    }}
                    transition={SOFT_SPRING}
                    className="relative w-20 h-28 rounded-md bg-[#1E3A8A] border border-white/25 shadow-lg p-2 flex flex-col justify-between text-white -mr-3"
                  >
                    <div className="absolute left-1.5 inset-y-0 w-[1.5px] bg-black/25" />
                    <div className="absolute right-0 inset-y-0.5 w-1 bg-[#FAF5EB] rounded-r-xs" />
                    <span className="font-mono text-[7px] uppercase tracking-wider text-blue-200 pl-1">
                      Sebald
                    </span>
                    <span className="font-serif italic text-[10px] font-bold leading-tight pl-1">
                      Austerlitz
                    </span>
                    <span className="font-mono text-[6px] text-white/70 pl-1">Penguin</span>
                  </motion.div>

                  {/* Center Hero Edition: Terracotta Clothbound */}
                  <motion.div
                    animate={{
                      y: hoveredCard === 1 ? -10 : -3,
                      scale: hoveredCard === 1 ? 1.06 : 1,
                    }}
                    transition={SOFT_SPRING}
                    className="relative z-20 w-22 h-31 rounded-md bg-[#C85A32] border border-[#FDE68A]/40 shadow-xl p-2.5 flex flex-col justify-between text-white"
                  >
                    <div className="absolute inset-1.5 left-2.5 border border-[#FEF3C7]/35 rounded-2xs pointer-events-none" />
                    <div className="absolute left-1.5 inset-y-0 w-[1.5px] bg-black/25" />
                    <div className="absolute right-0 inset-y-0.5 w-1 bg-[#FAF5EB] rounded-r-xs" />
                    <span className="font-mono text-[7px] uppercase tracking-widest text-[#FEF3C7] pl-1">
                      Calvino
                    </span>
                    <div className="pl-1">
                      <span className="font-serif text-[11px] font-bold leading-tight block">
                        Invisible Cities
                      </span>
                      <span className="text-[7px] font-mono text-white/80">p. 42 Note ★</span>
                    </div>
                    <div className="absolute -bottom-2 left-5 w-1.5 h-3.5 bg-[#FEF3C7] rounded-b-2xs shadow-xs" />
                  </motion.div>

                  {/* Right Edition: Botanical Sage */}
                  <motion.div
                    animate={{
                      rotate: hoveredCard === 1 ? 14 : 7,
                      x: hoveredCard === 1 ? 20 : 8,
                      y: hoveredCard === 1 ? -4 : 0,
                    }}
                    transition={SOFT_SPRING}
                    className="relative w-20 h-28 rounded-md bg-[#1F6E50] border border-white/25 shadow-lg p-2 flex flex-col justify-between text-white -ml-3"
                  >
                    <div className="absolute left-1.5 inset-y-0 w-[1.5px] bg-black/25" />
                    <div className="absolute right-0 inset-y-0.5 w-1 bg-[#FAF5EB] rounded-r-xs" />
                    <span className="font-mono text-[7px] uppercase tracking-wider text-emerald-200 pl-1">
                      Didion
                    </span>
                    <span className="font-serif italic text-[10px] font-bold leading-tight pl-1">
                      Blue Nights
                    </span>
                    <span className="font-mono text-[6px] text-white/70 pl-1">Farrar</span>
                  </motion.div>
                </div>

                {/* Warm Cedar Shelf Base */}
                <div className="relative z-20 h-2.5 w-full rounded-full bg-gradient-to-r from-[#7C4A27] via-[#9C6339] to-[#7C4A27] shadow-md" />
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-rust font-semibold block mb-1">
                Bespoke Curation
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                Personal Book Concierge
              </h3>
              <p className="font-sans text-sm text-umber leading-relaxed mb-6">
                Tell us your reading history, current mental space, or aesthetic obsessions. We hand-pull three volumes matched specifically to you with personal margin notes.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-stone">
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  1-on-1 Curation
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Handwritten Notes
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Zero Algorithms
                </span>
              </div>
              <button
                onClick={openBookMatch}
                className="w-full py-2.5 rounded-full bg-paper hover:bg-espresso hover:text-paper text-espresso border border-sand font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-espresso cursor-pointer"
              >
                <span>Begin Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Blind Date With a Book (Monthly Box) */}
          <motion.div
            variants={CARD_3D_PERSPECTIVE}
            whileHover={{ y: -6, transition: SOFT_SPRING }}
            style={{ transformPerspective: 1000 }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between group hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div>
              {/* Rich Visual Scene 2: Twine-Tied Kraft Parcel with Peeking Hardcover & Crimson Wax Crest */}
              <div className="h-52 rounded-2xl bg-gradient-to-br from-paper via-tint-sage to-parchment border border-sage/20 p-3 sm:p-4 mb-6 relative overflow-hidden flex items-center justify-center">
                {/* Hidden Hardcover Book Peeking Out on Hover */}
                <motion.div
                  animate={{
                    x: hoveredCard === 2 ? 32 : 10,
                    y: hoveredCard === 2 ? -6 : 0,
                    rotate: hoveredCard === 2 ? 7 : 2,
                  }}
                  transition={SOFT_SPRING}
                  className="absolute w-38 sm:w-44 h-30 rounded-xl bg-[#1E3A8A] border-2 border-[#93C5FD]/40 shadow-lg flex items-center justify-end pr-2.5"
                >
                  <div className="w-2 h-24 rounded-r bg-[#FBF8F3] border-l border-slate-300" />
                </motion.div>

                {/* Hand-Folded Japanese Kraft Parcel */}
                <motion.div
                  animate={{
                    x: hoveredCard === 2 ? -10 : 0,
                    rotate: hoveredCard === 2 ? -2 : -1,
                  }}
                  transition={SOFT_SPRING}
                  className="relative z-10 w-44 sm:w-52 h-34 rounded-xl bg-gradient-to-br from-[#DFC9AD] via-[#D2B795] to-[#C3A47E] border border-[#A98A65] shadow-xl p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Diagonal Envelope Fold Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#8C6D46_0.8px,transparent_0.8px)] [background-size:10px_10px] opacity-20 pointer-events-none" />

                  {/* Braided Jute Twine Crossbars */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-repeating-linear-gradient bg-[#8D6E48] shadow-xs pointer-events-none" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#8D6E48] shadow-xs pointer-events-none" />

                  {/* Cream Deckle-Edge Clue Card Tucked Under Twine */}
                  <div className="relative z-10 bg-[#FFFDF9] border border-[#DFD3BE] rounded-lg p-2 shadow-sm max-w-[142px]">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-rust font-bold block">
                      Clue Card #842
                    </span>
                    <p className="font-serif italic text-[10px] text-[#171412] leading-snug mt-0.5">
                      {hoveredCard === 2
                        ? "“Midnight train through snow country…”"
                        : "Kyoto rain · vinyl jazz · 192 pp"}
                    </p>
                  </div>

                  {/* Sculpted 3D Crimson Wax Seal */}
                  <motion.div
                    animate={{
                      scale: hoveredCard === 2 ? 1.12 : 1,
                      rotate: hoveredCard === 2 ? 10 : 0,
                    }}
                    transition={SOFT_SPRING}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-br from-[#EF4444] via-[#B91C1C] to-[#7F1D1D] border-2 border-[#FCA5A5]/40 shadow-lg flex items-center justify-center text-[#FEF3C7]"
                  >
                    <div className="w-7 h-7 rounded-full border border-[#FCA5A5]/50 flex items-center justify-center font-serif italic text-[11px] font-bold">
                      F&amp;L
                    </div>
                  </motion.div>

                  {/* Bottom Mood Chips */}
                  <div className="relative z-10 flex items-center justify-between text-[8px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-[#171412]/80 text-[#FEF3C7]">
                      1st Edition
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-white/85 text-[#7F1D1D] font-bold">
                      Wax-Sealed
                    </span>
                  </div>
                </motion.div>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-rust font-semibold block mb-1">
                Monthly Surprise
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                Blind Date With a Book
              </h3>
              <p className="font-sans text-sm text-umber leading-relaxed mb-6">
                Receive a hand-wrapped volume wrapped in heavy Japanese kraft paper, sealed with red wax. You only know the mood, clues, and first paragraph before tearing it open.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-stone">
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Wax-Sealed
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  First Editions
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Pour-Over Drip Bag
                </span>
              </div>
              <a
                href="#pricing"
                className="w-full py-2.5 rounded-full bg-paper hover:bg-espresso hover:text-paper text-espresso border border-sand font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-espresso"
              >
                <span>Reserve Next Box</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Card 3: The Unplugged Reading Sanctuary */}
          <motion.div
            variants={CARD_3D_PERSPECTIVE}
            whileHover={{ y: -6, transition: SOFT_SPRING }}
            style={{ transformPerspective: 1000 }}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between group hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div>
              {/* Rich Visual Scene 3: Vintage Emerald & Brass Banker's Lamp Illuminating Open Book */}
              <div className="h-52 rounded-2xl bg-gradient-to-b from-[#151210] via-[#211A15] to-[#171311] text-[#FBF8F3] border border-[#3E332A] p-4 mb-6 relative overflow-hidden flex flex-col justify-between">
                {/* Top Sanctuary Telemetry Row */}
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-mono text-[9px] text-[#FDE68A]">
                    <Lock className="w-2.5 h-2.5 text-[#34D399]" />
                    Cedar Locker #07 · Stowed
                  </span>

                  {/* Animated 33 RPM Vinyl Jazz Equalizer */}
                  <div className="flex items-end gap-0.5 h-3.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {[55, 95, 65, 85, 45].map((h, idx) => (
                      <motion.span
                        key={idx}
                        animate={{
                          height:
                            hoveredCard === 3
                              ? [`${h}%`, `${100 - h * 0.4}%`, `${h}%`]
                              : `${h * 0.65}%`,
                        }}
                        transition={{
                          duration: 0.9 + idx * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-0.5 bg-[#F59E0B] rounded-full"
                      />
                    ))}
                    <span className="font-mono text-[8px] text-[#E6DEC8]/75 ml-1">33 RPM</span>
                  </div>
                </div>

                {/* Illustrated Brass & Emerald Banker's Lamp + Volumetric Light Cone + Open Book */}
                <div className="relative z-10 flex flex-col items-center justify-end flex-1 pt-2">
                  {/* Volumetric Warm Light Cone */}
                  <motion.div
                    animate={{
                      opacity: hoveredCard === 3 ? 0.95 : 0.68,
                      scaleX: hoveredCard === 3 ? 1.12 : 1,
                    }}
                    transition={SOFT_SPRING}
                    className="absolute top-6 w-44 h-28 bg-gradient-to-b from-[#FBBF24]/45 via-[#F59E0B]/18 to-transparent [clip-path:polygon(32%_0%,68%_0%,100%_100%,0%_100%)] blur-[2px] pointer-events-none"
                  />

                  {/* Emerald Glass Lamp Shade & Brass Neck */}
                  <div className="relative z-20 flex flex-col items-center">
                    <div className="w-20 h-5 rounded-t-xl bg-gradient-to-b from-[#10B981] via-[#047857] to-[#064E3B] border border-[#6EE7B7]/40 shadow-[0_4px_16px_rgba(251,191,36,0.45)]" />
                    <div className="w-14 h-1 bg-[#FDE68A] rounded-b-full opacity-90" />
                    <div className="w-1 h-9 bg-gradient-to-b from-[#D97706] to-[#92400E]" />
                  </div>

                  {/* Illuminated Open Two-Page Book on Walnut Desk */}
                  <div className="relative z-20 -mt-2 flex items-center justify-center">
                    <div className="w-16 h-6 bg-[#FFFBEB] rounded-l-sm border border-[#E6DEC8] -rotate-3 origin-right shadow-md p-1">
                      <div className="w-full h-0.5 bg-[#D6CEBF] mb-1" />
                      <div className="w-4/5 h-0.5 bg-[#D6CEBF] mb-1" />
                      <div className="w-3/5 h-0.5 bg-[#C85A32]/60" />
                    </div>
                    <div className="w-16 h-6 bg-[#FEF3C7] rounded-r-sm border border-[#E6DEC8] rotate-3 origin-left shadow-md p-1">
                      <div className="w-full h-0.5 bg-[#D6CEBF] mb-1" />
                      <div className="w-5/6 h-0.5 bg-[#D6CEBF] mb-1" />
                      <div className="w-2/3 h-0.5 bg-[#D6CEBF]" />
                    </div>
                  </div>

                  {/* Brass Base & Walnut Desk */}
                  <div className="w-full h-2 mt-1.5 rounded-full bg-gradient-to-r from-[#3E2723] via-[#6D4C41] to-[#3E2723] border-t border-[#FBBF24]/25" />
                </div>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-rust font-semibold block mb-1">
                Physical Space
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                Unplugged Reading Sanctuary
              </h3>
              <p className="font-sans text-sm text-umber leading-relaxed mb-6">
                Leave your smartphone in our cedar lockers. Sink into deep mid-century armchairs with unlimited pour-over coffee, vinyl jazz, and zero digital notifications.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-stone">
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Day Passes
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Phone-Free
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Complimentary Brews
                </span>
              </div>
              <a
                href="#pricing"
                className="w-full py-2.5 rounded-full bg-paper hover:bg-espresso hover:text-paper text-espresso border border-sand font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-espresso"
              >
                <span>Book an Armchair</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Card 4: Rare & Out-of-Print Book Scouting */}
          <motion.div
            variants={CARD_3D_PERSPECTIVE}
            whileHover={{ y: -6, transition: SOFT_SPRING }}
            style={{ transformPerspective: 1000 }}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between group hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div>
              {/* Rich Visual Scene 4: Global Estate Flight Arc Map + Stamped Provenance Dossier */}
              <div className="h-52 rounded-2xl bg-gradient-to-br from-paper via-tint-cobalt to-parchment border border-cobalt/25 p-4 mb-6 relative overflow-hidden flex flex-col justify-between">
                {/* Cartographic Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#94A3B81A_1px,transparent_1px),linear-gradient(to_bottom,#94A3B81A_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                {/* Interactive Flight Route SVG: LONDON -> KYOTO -> MANILA */}
                <div className="relative z-10 w-full h-22">
                  <svg viewBox="0 0 280 76" className="w-full h-full overflow-visible">
                    <path
                      d="M 24 54 Q 95 6, 156 36 T 256 48"
                      fill="none"
                      stroke="var(--cobalt)"
                      strokeWidth="1.75"
                      strokeDasharray="4 4"
                      opacity="0.55"
                    />
                    {/* London Node */}
                    <circle cx="24" cy="54" r="4.5" fill="var(--cobalt)" />
                    <text x="10" y="70" className="fill-cobalt text-[8px] font-mono font-bold">
                      LONDON
                    </text>

                    {/* Kyoto Node */}
                    <circle cx="156" cy="36" r="4.5" fill="var(--rust)" />
                    <text x="140" y="52" className="fill-rust text-[8px] font-mono font-bold">
                      KYOTO
                    </text>

                    {/* Manila Destination Beacon */}
                    <circle cx="256" cy="48" r="8" fill="var(--sage)" opacity="0.2" />
                    <circle cx="256" cy="48" r="4.5" fill="var(--sage)" />
                    <text x="232" y="66" className="fill-sage text-[8px] font-mono font-bold">
                      MANILA
                    </text>
                  </svg>

                  {/* Animated Air Courier Badge */}
                  <motion.div
                    animate={{
                      x: hoveredCard === 4 ? [0, 88, 172] : 78,
                      y: hoveredCard === 4 ? [0, -10, 4] : -8,
                    }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                    className="absolute top-5 left-8 px-1.5 py-0.5 rounded-full bg-cobalt text-paper shadow-sm flex items-center gap-1 font-mono text-[8px]"
                  >
                    <Plane className="w-2.5 h-2.5" />
                    <span>Air Pouch</span>
                  </motion.div>
                </div>

                {/* Archival First-Print Provenance Slip with Angled Rubber Stamp */}
                <div className="relative z-10 p-2.5 rounded-xl bg-paper/95 border border-sand shadow-sm flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-cobalt font-bold block">
                      Lot #1974 · Bruno Munari
                    </span>
                    <span className="font-serif text-xs font-bold text-espresso">
                      Design as Art (1st UK Print)
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: hoveredCard === 4 ? -6 : -10,
                      scale: hoveredCard === 4 ? 1.06 : 1,
                    }}
                    transition={SOFT_SPRING}
                    className="px-2 py-1 rounded border-[1.5px] border-sage bg-sage-soft text-sage font-mono text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Near Mint</span>
                  </motion.div>
                </div>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-rust font-semibold block mb-1">
                Archival Hunt
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                Rare &amp; Out-of-Print Scouting
              </h3>
              <p className="font-sans text-sm text-umber leading-relaxed mb-6">
                Chasing a 1980s architectural monograph or a signed first edition? Our bibliophiles in Tokyo, London, and Manila scour private estates to source it within 10 days.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-stone">
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Estate Scouting
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Archival Wrapping
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  First Prints
                </span>
              </div>
              <button
                onClick={openBookMatch}
                className="w-full py-2.5 rounded-full bg-paper hover:bg-espresso hover:text-paper text-espresso border border-sand font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-espresso cursor-pointer"
              >
                <span>Submit Book Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 5: Intimate Evening Salons & Clubs */}
          <motion.div
            variants={CARD_3D_PERSPECTIVE}
            whileHover={{ y: -6, transition: SOFT_SPRING }}
            style={{ transformPerspective: 1000 }}
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between group hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div>
              {/* Rich Visual Scene 5: 14-Chair Candlelit Round Table + Perforated Letterpress Pass */}
              <div className="h-52 rounded-2xl bg-gradient-to-br from-paper via-tint-rust to-parchment border border-rust/25 p-3 sm:p-4 mb-6 relative overflow-hidden flex items-center justify-between gap-2.5 sm:gap-3">
                {/* Left: Overhead 14-Seat Candlelit Cedar Table Diagram */}
                <div className="relative w-22 h-22 sm:w-28 sm:h-28 flex-shrink-0 mx-auto">
                  {SALON_CHAIRS.map((chair) => (
                    <motion.div
                      key={chair.idx}
                      animate={{
                        scale: chair.isAvailable && hoveredCard === 5 ? [1, 1.3, 1] : 1,
                      }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      style={{ left: `${chair.x}%`, top: `${chair.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border ${
                        chair.isAvailable
                          ? "bg-rust border-foil shadow-sm"
                          : "bg-espresso border-paper/30"
                      }`}
                    />
                  ))}

                  {/* Center Cedar Round Table with Warm Candle Glow */}
                  <div className="absolute inset-4 sm:inset-5 rounded-full bg-gradient-to-br from-[#6D4428] to-[#4A2C18] border-2 border-[#D6B499] shadow-inner flex flex-col items-center justify-center text-white">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FDE68A] blur-[2px] animate-pulse" />
                    <span className="font-mono text-[6px] sm:text-[7px] text-foil mt-0.5">14 SEATS</span>
                  </div>
                </div>

                {/* Right: Perforated Letterpress Salon Pass */}
                <motion.div
                  animate={{
                    y: hoveredCard === 5 ? -5 : 0,
                    rotate: hoveredCard === 5 ? -2 : 1,
                  }}
                  transition={SOFT_SPRING}
                  className="relative flex-1 min-w-0 bg-paper border border-rust/25 rounded-xl p-2.5 sm:p-3 shadow-lg"
                >
                  {/* Ticket Notch Cutout */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-tint-rust border-r border-rust/25" />

                  <div className="flex items-center justify-between border-b border-dashed border-rust/35 pb-1.5 mb-2">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-rust">
                      Salon No. 42
                    </span>
                    <Wine className="w-3.5 h-3.5 text-rust" />
                  </div>

                  <p className="font-serif italic font-bold text-xs text-espresso leading-snug">
                    “On Solitude &amp; Japanese Essays”
                  </p>
                  <p className="font-mono text-[9px] text-umber mt-1">
                    Fri 7:30 PM · Natural Wine
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-sand flex items-center justify-between font-mono text-[9px]">
                    <span className="text-sage font-bold">Chair #12</span>
                    <span className="px-1.5 py-0.5 rounded bg-rust text-paper font-bold text-[8px]">
                      3 Open
                    </span>
                  </div>
                </motion.div>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-rust font-semibold block mb-1">
                Community Rituals
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                Intimate Evening Salons
              </h3>
              <p className="font-sans text-sm text-umber leading-relaxed mb-6">
                Capped strictly at fourteen chairs. We gather under dim lamps with low-intervention natural wine and espresso to debate single literary chapters with visiting authors.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-stone">
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  14-Seat Cap
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Author Q&amp;As
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Natural Wine
                </span>
              </div>
              <a
                href="#week"
                className="w-full py-2.5 rounded-full bg-paper hover:bg-espresso hover:text-paper text-espresso border border-sand font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-espresso"
              >
                <span>View Salon Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Card 6: Home & Studio Library Architecture */}
          <motion.div
            variants={CARD_3D_PERSPECTIVE}
            whileHover={{ y: -6, transition: SOFT_SPRING }}
            style={{ transformPerspective: 1000 }}
            onMouseEnter={() => setHoveredCard(6)}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between group hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div>
              {/* Rich Visual Scene 6: Two-Tier Bespoke Architectural Bookcase Elevation */}
              <div className="h-52 rounded-2xl bg-gradient-to-b from-paper via-tint-brass to-parchment border border-brass/25 p-4 mb-6 relative overflow-hidden flex flex-col justify-between">
                {/* Architectural Drafting Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748B14_1px,transparent_1px),linear-gradient(to_bottom,#64748B14_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Dimension Callout Bar */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[8px] text-umber">
                  <span>ELEVATION A-01 · CEDAR</span>
                  <span className="text-cobalt font-bold">← 2,400 MM →</span>
                </div>

                {/* Tier 1: Framed Art Print + Horizontal Folio Stack + Sculptural Ceramic Vessel */}
                <div className="relative z-10 flex flex-col gap-2.5 pt-1">
                  <div className="flex items-end justify-between px-4 border-b-[4px] border-[#8A5A36] pb-0.5">
                    {/* Framed Minimalist Print */}
                    <div className="w-11 h-12 rounded-xs bg-paper border-2 border-espresso p-1.5 flex items-center justify-center shadow-xs">
                      <div className="w-4 h-4 rounded-full bg-rust/85" />
                    </div>

                    {/* Horizontal Stacked Art Monographs */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-2 rounded-2xs bg-cobalt border border-white/20" />
                      <div className="w-19 h-2.5 rounded-2xs bg-brass border border-white/20" />
                      <div className="w-21 h-2.5 rounded-2xs bg-espresso border border-white/20" />
                    </div>

                    {/* Hand-Thrown Ceramic Vessel */}
                    <motion.div
                      animate={{ y: hoveredCard === 6 ? -2 : 0 }}
                      transition={SOFT_SPRING}
                      className="flex flex-col items-center"
                    >
                      <div className="w-3 h-2 bg-rust rounded-t-xs" />
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rust to-rust-hover shadow-sm" />
                    </motion.div>
                  </div>

                  {/* Tier 2: Color-Curated Clothbound Spines + Brass Bookend */}
                  <div className="flex items-end justify-center gap-1 h-16 border-b-[5px] border-[#784B2A] px-3">
                    {[
                      { h: 72, hoverH: 88, c: "#1E3A8A" },
                      { h: 86, hoverH: 86, c: "#2546B8" },
                      { h: 64, hoverH: 82, c: "#1F6E50" },
                      { h: 90, hoverH: 80, c: "#2D6A4F" },
                      { h: 76, hoverH: 78, c: "#D97706" },
                      { h: 84, hoverH: 76, c: "#F59E0B" },
                      { h: 68, hoverH: 82, c: "#C85A32" },
                      { h: 92, hoverH: 86, c: "#9A3412" },
                      { h: 78, hoverH: 90, c: "#171412" },
                      { h: 85, hoverH: 92, c: "#3F3A34" },
                    ].map((spine, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: `${hoveredCard === 6 ? spine.hoverH : spine.h}%`,
                        }}
                        transition={SOFT_SPRING}
                        style={{ backgroundColor: spine.c }}
                        className="w-3 sm:w-3.5 rounded-t-xs shadow-xs relative flex flex-col justify-start pt-1.5 items-center"
                      >
                        <span className="w-2 h-[1.5px] bg-[#FEF3C7]/70 rounded-full" />
                      </motion.div>
                    ))}
                    {/* Solid Brass Geometric Bookend */}
                    <div className="w-3.5 h-8 rounded-t-full bg-gradient-to-b from-[#FBBF24] to-[#B45309] shadow-xs ml-0.5" />
                  </div>
                </div>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-rust font-semibold block mb-1">
                Spatial Curation
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                Private Library Architecture
              </h3>
              <p className="font-sans text-sm text-umber leading-relaxed mb-6">
                For private residences, design studios, and boutique hotels. We catalogue, acquire, and style 50 to 500 cohesive volumes tailored to your architecture and worldview.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-stone">
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Spatial Curation
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Boutique Hotels
                </span>
                <span className="px-2 py-0.5 rounded-full bg-paper border border-sand">
                  Cataloguing
                </span>
              </div>
              <button
                onClick={openBookMatch}
                className="w-full py-2.5 rounded-full bg-paper hover:bg-espresso hover:text-paper text-espresso border border-sand font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-espresso cursor-pointer"
              >
                <span>Inquire About Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
