"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type CoverVariant =
  | "fitzcarraldo"
  | "modernist-split"
  | "nyrb-window"
  | "penguin-triband"
  | "cinema-linen"
  | "tectonic-arch"
  | "faber-bands"
  | "tip-on-plate"
  | "constructivist"
  | "cyanotype"
  | "obi-strip"
  | "risograph";

export interface BookCoverArtProps {
  variant: CoverVariant;
  title: string;
  author: string;
  publisher: string;
  baseColor: string;
  accentColor?: string;
  editionTag?: string;
  metaRight?: string;
  compact?: boolean;
}

export default function BookCoverArt({
  variant,
  title,
  author,
  publisher,
  baseColor,
  accentColor = "#E8B678",
  editionTag = "Folio Edition",
  metaRight,
  compact = false,
}: BookCoverArtProps) {
  const pad = compact ? "p-3.5 sm:p-4" : "p-5 sm:p-6";
  const titleSize = compact
    ? "text-[15px] sm:text-[17px] leading-[1.15]"
    : "text-lg sm:text-[21px] leading-[1.14]";

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none rounded-r-md"
      style={{ backgroundColor: baseColor }}
    >
      {/* Universal subtle bookcloth weave & spine hinge crease */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="absolute inset-y-0 left-2.5 w-[2px] bg-black/28 shadow-[1px_0_0_rgba(255,255,255,0.18)] z-30 pointer-events-none" />

      {/* 1. FITZCARRALDO — Minimalist Cobalt Museum Frame & Centered Italic Serif */}
      {variant === "fitzcarraldo" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between text-center text-white", pad)}>
          <div className="absolute inset-2.5 left-4 border-[1.5px] border-white/75 pointer-events-none" />
          <div className="absolute inset-3.5 left-5 border border-white/30 pointer-events-none" />

          <div className="pt-2 pl-2">
            <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-white/85 font-semibold block">
              {author}
            </span>
          </div>

          <div className="pl-2 my-auto px-2">
            <div className="w-6 h-[1px] bg-white/55 mx-auto mb-2.5" />
            <h4 className={cn("font-serif italic font-normal tracking-tight text-white", titleSize)}>
              {title}
            </h4>
            <div className="mt-3 flex items-center justify-center gap-1.5 opacity-80">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="w-2 h-2 rotate-45 border border-white" />
              <span className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          <div className="pb-1.5 pl-2">
            <span className="font-serif italic text-[9px] sm:text-[10px] tracking-wide text-white/85">
              {publisher}
            </span>
          </div>
        </div>
      )}

      {/* 2. MODERNIST SPLIT — High-Contrast Two-Tone Avant-Garde Woodcut Geometry */}
      {variant === "modernist-split" && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* Upper Ivory Paper Block */}
          <div className={cn("bg-[#F6F0E4] text-[#171412] pl-5 pr-4 pt-4 pb-3.5 border-b-2 border-[#171412]/15", compact ? "h-[46%]" : "h-[45%]")}>
            <div className="flex items-center justify-between text-[7.5px] font-mono uppercase tracking-[0.18em] text-[#6E655C] mb-1.5">
              <span className="truncate">{publisher}</span>
              {metaRight && <span>{metaRight}</span>}
            </div>
            <h4 className={cn("font-serif font-bold text-[#171412] tracking-tight line-clamp-2", titleSize)}>
              {title}
            </h4>
            <p className="font-mono text-[8.5px] uppercase tracking-wider text-[#575049] mt-1 truncate">
              {author}
            </p>
          </div>

          {/* Lower Dark/Colored Geometric Print Field */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden pl-3">
            <svg viewBox="0 0 180 140" className="w-full h-full p-3" aria-hidden="true">
              <circle cx="90" cy="70" r="48" fill="none" stroke="#F6F0E4" strokeWidth="1.5" strokeOpacity="0.4" />
              <circle cx="90" cy="70" r="34" fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.85" />
              <path d="M 42 70 L 138 70" stroke="#F6F0E4" strokeWidth="1.2" strokeOpacity="0.55" />
              <circle cx="90" cy="70" r="14" fill="#F6F0E4" fillOpacity="0.92" />
              <circle cx="90" cy="70" r="5" fill={baseColor} />
            </svg>
            <span className="absolute bottom-2.5 right-3.5 font-mono text-[7.5px] uppercase tracking-[0.2em] text-white/70">
              {editionTag}
            </span>
          </div>
        </div>
      )}

      {/* 3. NYRB WINDOW — Mid-Century Color Frame + Recessed Cream Cartouche & Horizon Art */}
      {variant === "nyrb-window" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between", pad)}>
          {/* Recessed Cream Typography Box */}
          <div className="ml-2 bg-[#FAF5EA] text-[#171412] p-3 sm:p-3.5 rounded-2xs shadow-sm border border-[#171412]/20">
            <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] font-bold block mb-1" style={{ color: baseColor }}>
              {publisher}
            </span>
            <h4 className={cn("font-serif font-bold text-[#171412] line-clamp-2", compact ? "text-sm sm:text-base leading-tight" : "text-base sm:text-lg leading-tight")}>
              {title}
            </h4>
            <p className="font-sans text-[10px] font-medium text-[#575049] mt-1 truncate">
              {author}
            </p>
          </div>

          {/* Lower Architectural Illustration Window */}
          <div className="ml-2 mt-2.5 flex-1 rounded-2xs border border-white/35 bg-black/20 overflow-hidden relative flex items-end">
            <svg viewBox="0 0 180 120" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              <rect width="180" height="120" fill="rgba(255,255,255,0.06)" />
              <circle cx="132" cy="36" r="18" fill={accentColor} fillOpacity="0.88" />
              <path d="M 0 86 Q 55 68 115 84 T 180 76 L 180 120 L 0 120 Z" fill="rgba(250,245,234,0.22)" />
              <path d="M 24 120 L 24 58 A 34 34 0 0 1 92 58 L 92 120 Z" fill="rgba(23,20,18,0.42)" stroke="rgba(250,245,234,0.45)" strokeWidth="1.2" />
              <line x1="58" y1="24" x2="58" y2="120" stroke="rgba(250,245,234,0.3)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      )}

      {/* 4. PENGUIN TRIBAND — Classic Horizontal Three-Band Literary Edition */}
      {variant === "penguin-triband" && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* Top Colored Band */}
          <div className="h-[24%] pl-5 pr-4 flex items-center justify-between text-white border-b-2 border-[#171412]/20">
            <span className="font-mono text-[8px] uppercase tracking-[0.22em] font-semibold text-white/90 truncate">
              {publisher}
            </span>
            {metaRight && (
              <span className="font-mono text-[7.5px] px-1.5 py-0.5 rounded-full bg-white/18 text-white/95">
                {metaRight}
              </span>
            )}
          </div>

          {/* Center Cream Paper Title Band */}
          <div className="h-[46%] bg-[#FAF5EA] text-[#171412] pl-5 pr-4 flex flex-col justify-center text-center border-b-2 border-[#171412]/20">
            <h4 className={cn("font-serif font-bold text-[#171412] line-clamp-2", titleSize)}>
              {title}
            </h4>
            <div className="w-8 h-[1.5px] mx-auto my-1.5" style={{ backgroundColor: baseColor }} />
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4A433C] truncate">
              {author}
            </p>
          </div>

          {/* Bottom Colored Band with Geometric Arch Medallion */}
          <div className="flex-1 pl-5 pr-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center bg-white/10">
                <div className="w-2.5 h-3.5 rounded-t-full bg-[#FAF5EA]" />
              </div>
              <span className="font-serif italic text-[9.5px] text-white/90">{editionTag}</span>
            </div>
            <span className="font-mono text-[7.5px] uppercase tracking-widest text-white/75">F&amp;L</span>
          </div>
        </div>
      )}

      {/* 5. CINEMA LINEN — A24 / Screenplay Linen Cloth with Widescreen Frame Plate */}
      {variant === "cinema-linen" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between text-white", pad)}>
          <div className="pl-2 flex items-center justify-between text-[7.5px] font-mono uppercase tracking-[0.2em] text-white/75">
            <span>SCREENPLAY FOLIO</span>
            <span>{metaRight || "35MM"}</span>
          </div>

          {/* Recessed 16:9 Widescreen Duotone Cinema Plate */}
          <div className="ml-2 my-2 aspect-[16/10] w-[calc(100%-0.5rem)] rounded-2xs border border-[#FDE68A]/45 bg-[#121619] overflow-hidden relative shadow-inner">
            <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="cinemaSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <rect width="200" height="125" fill="url(#cinemaSky)" />
              {/* Architectural bridge / skyline bars */}
              <rect x="18" y="42" width="22" height="83" fill="#0B0F17" opacity="0.7" />
              <rect x="48" y="28" width="28" height="97" fill="#0B0F17" opacity="0.55" />
              <rect x="128" y="34" width="32" height="91" fill="#0B0F17" opacity="0.65" />
              {/* Warm train/window light */}
              <rect x="56" y="42" width="5" height="8" fill="#FEF3C7" opacity="0.85" />
              <rect x="65" y="42" width="5" height="8" fill="#FEF3C7" opacity="0.65" />
              <line x1="0" y1="96" x2="200" y2="96" stroke="#FEF3C7" strokeOpacity="0.4" strokeWidth="1" />
              <circle cx="102" cy="54" r="14" fill="#FEF3C7" fillOpacity="0.22" />
            </svg>
          </div>

          <div className="pl-2">
            <h4 className={cn("font-serif font-bold tracking-tight text-[#FEF9EC] line-clamp-2", titleSize)}>
              {title}
            </h4>
            <div className="mt-1.5 pt-1.5 border-t border-white/20 flex items-center justify-between text-[8.5px] font-mono text-[#FDE68A]/90">
              <span className="truncate">{author}</span>
              <span className="uppercase">{publisher.split(" ")[0]}</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. TECTONIC ARCH — Architectural Monograph with Brutalist Light-Slit Relief */}
      {variant === "tectonic-arch" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between text-white", pad)}>
          {/* Swiss Grid Header */}
          <div className="pl-2 border-t-2 border-white/80 pt-2">
            <div className="flex justify-between text-[7.5px] font-mono uppercase tracking-[0.2em] text-white/75 mb-1">
              <span>{publisher}</span>
              <span>{metaRight || "MONOGRAPH"}</span>
            </div>
            <h4 className={cn("font-sans font-bold tracking-tight text-white line-clamp-2", titleSize)}>
              {title}
            </h4>
            <p className="font-mono text-[8.5px] text-white/80 mt-0.5 truncate">{author}</p>
          </div>

          {/* Sculptural Concrete Arch & Sunlight Slit */}
          <div className="ml-2 mt-3 flex-1 relative rounded-2xs overflow-hidden bg-black/22 border border-white/20">
            <svg viewBox="0 0 180 130" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="0,130 0,20 112,0 112,130" fill="rgba(255,255,255,0.12)" />
              <polygon points="118,0 180,28 180,130 118,130" fill="rgba(0,0,0,0.28)" />
              {/* Diagonal light beam */}
              <polygon points="112,12 118,12 156,130 82,130" fill={accentColor} fillOpacity="0.45" />
              <path d="M 34 130 L 34 68 A 28 28 0 0 1 90 68 L 90 130 Z" fill="rgba(23,20,18,0.55)" />
            </svg>
          </div>
        </div>
      )}

      {/* 7. FABER BANDS — Bold British Typographic Stripes & Cream Display Banner */}
      {variant === "faber-bands" && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* Stepped Geometric Header Bars */}
          <div className="pl-4 pr-3 pt-4 space-y-1.5">
            <div className="h-2 w-full bg-[#FAF5EA]/90 rounded-2xs" />
            <div className="h-2 w-4/5 rounded-2xs" style={{ backgroundColor: accentColor }} />
            <div className="h-1.5 w-3/5 bg-[#FAF5EA]/45 rounded-2xs" />
          </div>

          {/* Bold Typographic Cream Placard */}
          <div className="mx-3 ml-4 my-auto bg-[#FAF5EA] text-[#171412] p-3.5 sm:p-4 shadow-md border-l-4" style={{ borderLeftColor: accentColor }}>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-[#6E655C] block mb-1">
              {publisher}
            </span>
            <h4 className={cn("font-serif font-extrabold text-[#171412] line-clamp-2", titleSize)}>
              {title}
            </h4>
            <p className="font-serif italic text-[11px] text-[#4A433C] mt-1 truncate">
              {author}
            </p>
          </div>

          {/* Bottom Modernist Colophon */}
          <div className="pl-5 pr-4 pb-3.5 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.18em] text-white/80">
            <span>{editionTag}</span>
            <span>{metaRight || "UK ED."}</span>
          </div>
        </div>
      )}

      {/* 8. TIP-ON PLATE — Fine Art Clothbound Volume with Recessed Tip-On Landscape Plate */}
      {variant === "tip-on-plate" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between text-white", pad)}>
          {/* Recessed Tip-On Art Print */}
          <div className="ml-2 p-2 bg-[#F7F2E7] rounded-2xs shadow-md">
            <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#D9CEBC]">
              <svg viewBox="0 0 160 120" className="w-full h-full" aria-hidden="true">
                <rect width="160" height="74" fill="#E9DFCF" />
                <circle cx="116" cy="36" r="15" fill={baseColor} fillOpacity="0.78" />
                <path d="M 0 74 Q 44 54 92 70 T 160 62 L 160 120 L 0 120 Z" fill={baseColor} fillOpacity="0.65" />
                <path d="M 0 92 Q 62 78 160 90 L 160 120 L 0 120 Z" fill="#2A2520" fillOpacity="0.82" />
              </svg>
            </div>
          </div>

          {/* Minimalist Foil Stamped Title Beneath Plate */}
          <div className="pl-2 pt-2 text-left">
            <h4 className={cn("font-serif font-normal tracking-tight text-[#FAF5EA] line-clamp-2", compact ? "text-sm sm:text-base leading-snug" : "text-base sm:text-lg leading-snug")}>
              {title}
            </h4>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/75 mt-1 truncate">
              {author}
            </p>
            <div className="mt-2 pt-1.5 border-t border-white/20 flex justify-between text-[7.5px] font-mono text-white/65 uppercase">
              <span className="truncate">{publisher}</span>
              {metaRight && <span>{metaRight}</span>}
            </div>
          </div>
        </div>
      )}

      {/* 9. CONSTRUCTIVIST — Radical Theory Diagonal Bar & Bold Manifesto Grid */}
      {variant === "constructivist" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between text-white overflow-hidden", pad)}>
          {/* Stark Constructivist Diagonal Wedge */}
          <div
            className="absolute -right-8 top-10 w-44 h-12 -rotate-12 opacity-90 pointer-events-none"
            style={{ backgroundColor: "#171412" }}
          />
          <div
            className="absolute -left-4 bottom-12 w-36 h-2 -rotate-12 opacity-80 pointer-events-none"
            style={{ backgroundColor: "#FAF5EA" }}
          />

          <div className="relative z-10 pl-2 flex items-center justify-between border-b-2 border-white/85 pb-1.5">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]">
              {publisher}
            </span>
            <span className="font-mono text-[8px] px-1.5 py-0.2 bg-[#171412] text-[#FAF5EA] font-bold">
              {metaRight || "RADICAL"}
            </span>
          </div>

          <div className="relative z-10 pl-2 my-auto">
            <h4 className={cn("font-sans font-black uppercase tracking-tight text-[#FAF5EA] drop-shadow-xs line-clamp-3", titleSize)}>
              {title}
            </h4>
            <p className="inline-block mt-2 px-2 py-0.5 bg-[#FAF5EA] text-[#171412] font-mono text-[8.5px] font-bold uppercase tracking-wider">
              {author}
            </p>
          </div>

          <div className="relative z-10 pl-2 flex items-center justify-between text-[7.5px] font-mono uppercase tracking-widest text-white/85">
            <span>CRITICAL SERIES</span>
            <span>● ■ ▲</span>
          </div>
        </div>
      )}

      {/* 10. CYANOTYPE — Poetic Ultramarine Lunar Rings & Proposition Typography */}
      {variant === "cyanotype" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between text-white", pad)}>
          {/* Luminous Cyanotype Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 62% 38%, rgba(147, 197, 253, 0.34) 0%, rgba(30, 58, 138, 0.1) 52%, rgba(10, 20, 50, 0.45) 100%)",
            }}
          />

          <div className="relative z-10 pl-2 flex justify-between text-[7.5px] font-mono uppercase tracking-[0.2em] text-blue-100/80">
            <span>§ 01 — 240</span>
            <span>{metaRight || "POETICS"}</span>
          </div>

          {/* Concentric Water/Moon Rings */}
          <div className="relative z-10 pl-2 my-auto text-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2.5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-blue-200/35" />
              <div className="absolute inset-3 rounded-full border border-blue-100/55" />
              <div className="w-7 h-7 rounded-full bg-blue-100/90 shadow-[0_0_20px_rgba(219,234,254,0.7)]" />
            </div>
            <h4 className={cn("font-serif italic font-semibold text-white tracking-wide line-clamp-2", titleSize)}>
              {title}
            </h4>
            <p className="font-sans text-[10px] text-blue-100/90 mt-1">{author}</p>
          </div>

          <div className="relative z-10 pl-2 text-center border-t border-blue-200/25 pt-1.5">
            <span className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-blue-100/75">
              {publisher}
            </span>
          </div>
        </div>
      )}

      {/* 11. OBI STRIP — Japanese/Translated Cloth Edition with Wrap-Around Paper Obi Belly-Band */}
      {variant === "obi-strip" && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between text-white">
          {/* Upper Cloth Cover with Minimalist Storefront / Window Line Art */}
          <div className={cn("pl-5 pr-4 pt-4 flex-1 flex flex-col justify-between", compact ? "pb-2" : "pb-3")}>
            <div className="flex justify-between items-center text-[7.5px] font-mono uppercase tracking-[0.18em] text-white/80">
              <span className="truncate">{publisher}</span>
              {/* Red Hanko Seal Stamp */}
              <span className="w-4 h-4 rounded-2xs bg-[#B91C1C] text-[#FEF3C7] flex items-center justify-center font-serif text-[8px] font-bold border border-[#FCA5A5]/50 flex-shrink-0">
                印
              </span>
            </div>

            <div>
              <h4 className={cn("font-serif font-bold text-white leading-tight line-clamp-2", titleSize)}>
                {title}
              </h4>
              <p className="font-sans text-[10px] text-white/85 mt-1">{author}</p>
            </div>
          </div>

          {/* Authentic Cream Paper Wrap-Around Obi Strip (帯) */}
          <div className="bg-[#FAF4E6] text-[#171412] pl-5 pr-3.5 py-2.5 sm:py-3 border-y-2 border-[#D5C7AE] shadow-[0_-4px_12px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[7px] uppercase tracking-[0.2em] font-bold text-[#B91C1C] block">
                  TOKYO · TRANSLATED EDITION
                </span>
                <span className="font-serif italic text-[9.5px] sm:text-[10.5px] text-[#2F2A25] line-clamp-1">
                  Staff-selected with archival obi band
                </span>
              </div>
              <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-2xs bg-[#171412] text-[#FAF4E6] flex-shrink-0">
                {metaRight || "1ST"}
              </span>
            </div>
          </div>

          {/* Narrow Bottom Cloth Strip Below Obi */}
          <div className="h-3.5 w-full" />
        </div>
      )}

      {/* 12. RISOGRAPH / MUNARI — Playful Bauhaus Overprint Shapes & Registration Marks */}
      {variant === "risograph" && (
        <div className={cn("relative z-10 w-full h-full flex flex-col justify-between bg-[#F6EFE2] text-[#171412]", pad)}>
          {/* Risograph Paper Grain & Registration Crop Marks */}
          <span className="absolute top-2 left-4 font-mono text-[9px] text-[#171412]/45 pointer-events-none">+</span>
          <span className="absolute top-2 right-2.5 font-mono text-[9px] text-[#171412]/45 pointer-events-none">+</span>
          <span className="absolute bottom-2 left-4 font-mono text-[9px] text-[#171412]/45 pointer-events-none">+</span>
          <span className="absolute bottom-2 right-2.5 font-mono text-[9px] text-[#171412]/45 pointer-events-none">+</span>

          <div className="pl-2 flex items-center justify-between text-[7.5px] font-mono uppercase tracking-[0.18em] text-[#575049]">
            <span className="truncate">{publisher}</span>
            <span>{metaRight || "RISO"}</span>
          </div>

          {/* Overlapping Translucent Bauhaus / Munari Geometric Overprints */}
          <div className="pl-2 my-1 flex items-center justify-center">
            <svg viewBox="0 0 150 86" className={cn("w-full", compact ? "h-16" : "h-20")} aria-hidden="true">
              <circle cx="56" cy="44" r="30" fill={baseColor} fillOpacity="0.86" />
              <circle cx="92" cy="44" r="30" fill="#1E3A8A" fillOpacity="0.68" />
              <rect x="64" y="18" width="22" height="52" rx="11" fill="#D97706" fillOpacity="0.72" />
            </svg>
          </div>

          <div className="pl-2 border-t border-[#171412]/20 pt-2">
            <h4 className={cn("font-serif font-bold text-[#171412] line-clamp-2", compact ? "text-sm sm:text-[15px] leading-tight" : "text-base sm:text-lg leading-tight")}>
              {title}
            </h4>
            <p className="font-mono text-[8.5px] uppercase tracking-wider mt-0.5 truncate" style={{ color: baseColor }}>
              {author}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

