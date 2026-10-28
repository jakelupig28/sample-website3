"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Plus, Check, Quote, Layers, Bookmark } from "lucide-react";
import SectionWrapper from "./motion/SectionWrapper";
import SectionHeader from "./motion/SectionHeader";
import BookCoverArt, { CoverVariant } from "./BookCoverArt";
import { useCart } from "@/context/CartContext";
import {
  SOFT_SPRING,
  CURSOR_SPRING,
  LUXURY_EASE,
  STAGGER_CONTAINER,
  CARD_3D_PERSPECTIVE,
  VIEWPORT_ONCE,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface BookInStack {
  id: string;
  title: string;
  author: string;
  publisher: string;
  pages: number;
  shelfTalker: string;
  excerpt: string;
  dropCap: string;
  pricePHP: number;
  priceUSD: number;
  spineColor: string;
  coverVariant: CoverVariant;
  accentColor: string;
}

interface StackOption {
  id: string;
  tabLabel: string;
  curatorNote: string;
  totalPricePHP: number;
  totalPriceUSD: number;
  books: BookInStack[];
}

const STACKS: StackOption[] = [
  {
    id: "stack-1",
    tabLabel: "01. Quiet Architecture & Memory",
    curatorNote:
      "Curated for slow Sunday afternoons. Three works examining silence, daylight in concrete spaces, and the architecture of memory.",
    totalPricePHP: 4150,
    totalPriceUSD: 78,
    books: [
      {
        id: "arch-1",
        title: "The Poetics of Space",
        author: "Gaston Bachelard",
        publisher: "Penguin Classics",
        pages: 288,
        shelfTalker: "“A lyrical meditation on attics, cellars, and how spaces nest inside us.”",
        excerpt:
          "he house shelters daydreaming, the house protects the dreamer, the house allows one to dream in peace.",
        dropCap: "T",
        pricePHP: 1150,
        priceUSD: 22,
        spineColor: "#2D6A4F",
        coverVariant: "penguin-triband",
        accentColor: "#FEF3C7",
      },
      {
        id: "arch-2",
        title: "Austerlitz",
        author: "W.G. Sebald",
        publisher: "Modern Library",
        pages: 416,
        shelfTalker: "“Haunting architectural wanderings through European train stations and lost time.”",
        excerpt:
          "t the outset of the second half of the sixties I traveled repeatedly from England to Belgium to study architecture.",
        dropCap: "A",
        pricePHP: 1450,
        priceUSD: 27,
        spineColor: "#1C1917",
        coverVariant: "nyrb-window",
        accentColor: "#E8B678",
      },
      {
        id: "arch-3",
        title: "The Eyes of the Skin",
        author: "Juhani Pallasmaa",
        publisher: "Wiley / MIT",
        pages: 128,
        shelfTalker: "“Why buildings must touch our sense of touch, sound, and smell, not just vision.”",
        excerpt:
          "ouch is the sensory mode that integrates our experience of the world with that of ourselves and light.",
        dropCap: "T",
        pricePHP: 1550,
        priceUSD: 29,
        spineColor: "#C85A32",
        coverVariant: "tectonic-arch",
        accentColor: "#FDE68A",
      },
    ],
  },
  {
    id: "stack-2",
    tabLabel: "02. Midnight in Tokyo & Translation",
    curatorNote:
      "Curated for night owls and city wanderers. Three hypnotic novellas exploring Tokyo rain, late-night convenience stores, and quiet alienation.",
    totalPricePHP: 3450,
    totalPriceUSD: 64,
    books: [
      {
        id: "tokyo-1",
        title: "Convenience Store Woman",
        author: "Sayaka Murata",
        publisher: "Grove Atlantic",
        pages: 176,
        shelfTalker: "“A wonderfully eccentric, deadpan critique of modern societal conformity.”",
        excerpt:
          "convenience store is a world of sound, from the tinkle of the door chime to the hum of refrigerated shelves.",
        dropCap: "A",
        pricePHP: 1050,
        priceUSD: 19,
        spineColor: "#B45309",
        coverVariant: "obi-strip",
        accentColor: "#FEF3C7",
      },
      {
        id: "tokyo-2",
        title: "Hard-Boiled Wonderland",
        author: "Haruki Murakami",
        publisher: "Vintage International",
        pages: 400,
        shelfTalker: "“Dream readers, subconscious elevators, and a mysterious walled town.”",
        excerpt:
          "he elevator continued its impossibly slow ascent, silent enough that I could hear my own breathing.",
        dropCap: "T",
        pricePHP: 1250,
        priceUSD: 23,
        spineColor: "#1E3A8A",
        coverVariant: "cinema-linen",
        accentColor: "#93C5FD",
      },
      {
        id: "tokyo-3",
        title: "The Emissary",
        author: "Yoko Tawada",
        publisher: "New Directions",
        pages: 144,
        shelfTalker: "“Playful, linguistic genius reimagining a quiet future Tokyo with deep warmth.”",
        excerpt:
          "orning light spilled over the tatami as Yoshiro brewed roasted green tea before waking Mumei.",
        dropCap: "M",
        pricePHP: 1150,
        priceUSD: 22,
        spineColor: "#2D6A4F",
        coverVariant: "modernist-split",
        accentColor: "#F59E0B",
      },
    ],
  },
  {
    id: "stack-3",
    tabLabel: "03. The Creative Sabbatical Stack",
    curatorNote:
      "Curated for artists, writers, and burnt-out founders taking a month away from keyboards to restore clarity and creative wonder.",
    totalPricePHP: 3950,
    totalPriceUSD: 74,
    books: [
      {
        id: "sab-1",
        title: "A Field Guide to Getting Lost",
        author: "Rebecca Solnit",
        publisher: "Penguin Books",
        pages: 224,
        shelfTalker: "“An invitation to wander without destination and rediscover how not to know.”",
        excerpt:
          "eave the door open for the unknown, the door into the dark. That is where the most important things come from.",
        dropCap: "L",
        pricePHP: 1150,
        priceUSD: 21,
        spineColor: "#1C1917",
        coverVariant: "tip-on-plate",
        accentColor: "#93C5FD",
      },
      {
        id: "sab-2",
        title: "Bluets",
        author: "Maggie Nelson",
        publisher: "Wave Books",
        pages: 112,
        shelfTalker: "“240 lyrical propositions on color, grief, desire, and the blue hour.”",
        excerpt:
          "uppose I were to begin by saying that I have fallen in love with a color, and that it is inexhaustible.",
        dropCap: "S",
        pricePHP: 1250,
        priceUSD: 24,
        spineColor: "#1E3A8A",
        coverVariant: "cyanotype",
        accentColor: "#DBEAFE",
      },
      {
        id: "sab-3",
        title: "Design as Art",
        author: "Bruno Munari",
        publisher: "Penguin Modern Classics",
        pages: 224,
        shelfTalker: "“Luminous lessons on visual creativity, curiosity, and childlike joy.”",
        excerpt:
          "he designer of today re-establishes the long-lost contact between art and the public in everyday life.",
        dropCap: "T",
        pricePHP: 1550,
        priceUSD: 29,
        spineColor: "#C85A32",
        coverVariant: "risograph",
        accentColor: "#D97706",
      },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Folio & Lark cured my two-year reading slump. The monthly parcel feels like a gift from a friend who knows my mind better than I do. The bookseller shelf talkers are framed on my desk.",
    name: "Architect Miguel S.",
    role: "Studio Principal, Makati",
    metric: "24 books/yr",
    metricLabel: "Reading volume after 6 months",
  },
  {
    quote:
      "I used to spend 40 minutes every evening doomscrolling book recommendation threads. Now I open the brown kraft box and dive straight in. Every single title has been a keeper.",
    name: "Celine R.",
    role: "Independent Film Director, Manila",
    metric: "97.4%",
    metricLabel: "Keeper rate (never returned)",
  },
  {
    quote:
      "The Unplugged Reading Sanctuary in San Juan is the only place in Metro Manila where nobody looks at a screen. Pure cedar wood, vinyl jazz, and books you actually want to hold.",
    name: "David T.",
    role: "Design Lead & Founder, Bonifacio Global City",
    metric: "4,200+",
    metricLabel: "Hand-wrapped parcels dispatched",
  },
];

// Large Interactive 3D Book — Animates strictly ONLY when cursor meets (or taps) the physical book
function StackBook3D({ book, index }: { book: BookInStack; index: number }) {
  const [isBookHovered, setIsBookHovered] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltY = useSpring(useTransform(px, [-1, 1], [-10, 10]), CURSOR_SPRING);
  const tiltX = useSpring(useTransform(py, [-1, 1], [8, -8]), CURSOR_SPRING);
  const sheenX = useSpring(useTransform(px, [-1, 1], [15, 85]), CURSOR_SPRING);
  const sheenY = useSpring(useTransform(py, [-1, 1], [15, 85]), CURSOR_SPRING);
  const coverSheen = useMotionTemplate`radial-gradient(190px circle at ${sheenX}% ${sheenY}%, rgba(255, 248, 235, 0.26), transparent 72%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    px.set(Math.max(-1, Math.min(1, nx)));
    py.set(Math.max(-1, Math.min(1, ny)));
  };

  const handleMouseLeave = () => {
    setIsBookHovered(false);
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl py-5 sm:py-6 px-2.5 sm:px-3 mb-5 flex flex-col items-center justify-center relative select-none",
        isBookHovered && "z-30"
      )}
    >
      {/* Clipped Pedestal Surface & Dot Grid (Separated so 3D Open Book Is Never Clipped) */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-paper via-tint-sage/45 to-parchment border border-sand/85 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(var(--sand)_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
      </div>

      {/* Passive 3D Perspective Stage */}
      <div
        className="relative w-full min-h-[268px] sm:min-h-[300px] flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        {/* Floor Shadow beneath the 3D Book */}
        <motion.div
          animate={{
            scaleX: isBookHovered ? 1.55 : 1,
            scaleY: isBookHovered ? 1.15 : 1,
            opacity: isBookHovered ? 0.26 : 0.2,
          }}
          transition={{ duration: 0.5, ease: LUXURY_EASE }}
          className="absolute bottom-2 w-[155px] sm:w-[185px] h-6 rounded-full bg-espresso blur-lg pointer-events-none"
        />

        {/* Cursor-Tracked 3D Tilt Wrapper */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* STRICT BOOK-ONLY HITBOX — Animation fires ONLY when cursor touches (or taps) the book */}
          <motion.div
            ref={bookRef}
            onMouseEnter={() => setIsBookHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsBookHovered((prev) => !prev)}
            animate={{
              x: isBookHovered ? 64 : 8,
              y: isBookHovered ? -4 : 0,
              scale: isBookHovered ? 0.74 : 1,
              rotateY: isBookHovered ? -3 : -6,
              rotateX: isBookHovered ? 5 : 2,
            }}
            transition={{
              duration: 0.52,
              ease: LUXURY_EASE,
            }}
            className="relative w-[170px] sm:w-[190px] h-[246px] sm:h-[274px] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Exact Spine + Front Cover Hitbox when closed; expands across full 2-page spread ONLY after book opens */}
            {isBookHovered ? (
              <div
                className="absolute -inset-y-2 -left-[98%] -right-2 z-50"
                style={{ transform: "translateZ(12px)" }}
              />
            ) : (
              <div
                className="absolute -inset-y-1 -left-4 -right-0.5 z-50"
                style={{ transform: "translateZ(10px)" }}
              />
            )}

            {/* 0. Back Cover Board (Z = -8px) */}
            <div
              className="absolute -inset-y-1 -right-1 left-0 rounded-r-md"
              style={{
                backgroundColor: book.spineColor,
                filter: "brightness(0.68)",
                transform: "translateZ(-8px)",
              }}
            />

            {/* 1. 3D Hinged Left Bookcloth Spine (Z = -2px) */}
            <div
              className="absolute -left-4 -top-1 -bottom-1 w-4 rounded-l-xs flex flex-col justify-between py-4 items-center text-white/70 text-[7px] font-mono tracking-tighter"
              style={{
                backgroundColor: book.spineColor,
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.14) 45%, rgba(0,0,0,0.28) 100%)",
                transform: "translateZ(-2px)",
              }}
            >
              <span className="rotate-90 whitespace-nowrap uppercase">FOLIO</span>
              <span className="rotate-90 whitespace-nowrap font-serif truncate max-w-[95px] text-white/90">
                {book.title}
              </span>
              <span className="rotate-90 whitespace-nowrap">#{index + 1}</span>
            </div>

            {/* 2. Stationary Interior Munken Page Block (Z = 0px — Revealed when hardcover swings open!) */}
            <div
              className="absolute inset-0 bg-[#FAF7F0] rounded-r-md border-r-[7px] border-b-[6px] border-[#E5DCC8] shadow-lg overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between text-[#171412]"
              style={{ transform: "translateZ(0px)" }}
            >
              <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/14 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between text-[7.5px] font-mono text-[#8A8177] uppercase tracking-wider border-b border-[#E6DEC8] pb-1.5">
                  <span className="truncate max-w-[100px]">{book.publisher}</span>
                  <span>{book.pages} pp</span>
                </div>

                <div className="mt-2.5 sm:mt-3 font-serif text-[10.5px] sm:text-[11px] leading-relaxed text-[#2F2A25]">
                  <span className="float-left text-2xl font-bold text-rust leading-none pr-1 pt-0.5">
                    {book.dropCap}
                  </span>
                  <span>{book.excerpt}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6DEC8] flex items-center justify-between text-[8px] font-mono text-sage">
                <span className="italic">First Chapter</span>
                <span>Staff Pick ★</span>
              </div>

              {/* Silk Bookmark Ribbon */}
              <motion.div
                animate={{
                  rotate: isBookHovered ? [4, 9, 4] : 3,
                  y: isBookHovered ? 4 : 0,
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2.5 right-6 w-2.5 h-7 bg-rust rounded-b-2xs shadow-xs pointer-events-none"
              />
            </div>

            {/* 3. Fanning Left Page Leaf (Opens 2nd [0.06s], Closes 1st [0s] — Never crosses Front Cover!) */}
            <motion.div
              animate={{
                rotateY: isBookHovered ? -156 : 0,
                z: isBookHovered ? 2 : 2.5,
              }}
              transition={{
                rotateY: {
                  duration: isBookHovered ? 0.5 : 0.38,
                  delay: isBookHovered ? 0.06 : 0,
                  ease: LUXURY_EASE,
                },
                z: {
                  duration: 0.28,
                  delay: isBookHovered ? 0.06 : 0,
                  ease: LUXURY_EASE,
                },
              }}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <div
                className="absolute inset-0 bg-[#F5EFE4] rounded-r-sm border-r border-[#E6DEC8]"
                style={{
                  transform: "translateZ(0.3px)",
                  backfaceVisibility: "hidden",
                }}
              />
              <div
                className="absolute inset-0 bg-[#FDFBF7] rounded-l-sm border-l border-[#E6DEC8] shadow-md p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden"
                style={{
                  transform: "rotateY(180deg) translateZ(0.3px)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-black/12 to-transparent pointer-events-none" />
                <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#8A8177] border-b border-[#E6DEC8] pb-1.5">
                  Ex Libris · Folio
                </span>
                <p className="font-serif italic text-[10px] sm:text-[10.5px] text-[#2F2A25] leading-relaxed">
                  {book.shelfTalker}
                </p>
                <span className="font-mono text-[8px] text-rust border-t border-[#E6DEC8] pt-1.5">
                  San Juan Vault
                </span>
              </div>
            </motion.div>

            {/* 4. Bespoke Art-Directed Front Hardcover (Opens 1st [0s], Closes LAST [0.09s] with Z = +8px & zero overshoot!) */}
            <motion.div
              animate={{
                rotateY: isBookHovered ? -164 : 0,
                z: isBookHovered ? -1 : 8,
              }}
              transition={{
                rotateY: {
                  duration: isBookHovered ? 0.54 : 0.46,
                  delay: isBookHovered ? 0 : 0.09,
                  ease: LUXURY_EASE,
                },
                z: {
                  duration: isBookHovered ? 0.42 : 0.2,
                  delay: isBookHovered ? 0 : 0.04,
                  ease: "easeOut",
                },
              }}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="absolute -inset-y-1 -right-0.5 left-0 pointer-events-none"
            >
              {/* Front Cover Exterior with Unique Cover Art */}
              <div
                className="absolute inset-0 rounded-r-md overflow-hidden shadow-2xl"
                style={{
                  transform: "translateZ(0.6px)",
                  backfaceVisibility: "hidden",
                }}
              >
                <BookCoverArt
                  variant={book.coverVariant}
                  title={book.title}
                  author={book.author}
                  publisher={book.publisher}
                  baseColor={book.spineColor}
                  accentColor={book.accentColor}
                  editionTag={`Stack Vol. 0${index + 1}`}
                  metaRight={`${book.pages} PP`}
                  compact
                />
                <motion.div
                  style={{ background: coverSheen }}
                  className="absolute inset-0 pointer-events-none z-20"
                />
              </div>

              {/* Front Cover Interior Endpaper */}
              <div
                className="absolute inset-0 rounded-l-md p-3 overflow-hidden shadow-lg"
                style={{
                  backgroundColor: book.spineColor,
                  transform: "rotateY(180deg) translateZ(0.6px)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="w-full h-full rounded-2xs bg-[#F3EDE2] border border-[#E6DEC8]" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <span className="relative z-10 mt-2 font-mono text-[10px] text-stone flex items-center gap-1">
        <Bookmark className="w-3 h-3 text-rust" />
        <span>{isBookHovered ? "Reading inside preview" : "Hover or tap book to open"}</span>
      </span>
    </div>
  );
}

export default function ProofSection() {
  const [activeStackId, setActiveStackId] = useState<string>("stack-1");
  const [addedStack, setAddedStack] = useState<string | null>(null);
  const { addItem, currency } = useCart();

  const currentStack = STACKS.find((s) => s.id === activeStackId) || STACKS[0];

  const handleAddFullStack = () => {
    currentStack.books.forEach((book) => {
      addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        pricePHP: book.pricePHP,
        priceUSD: book.priceUSD,
        coverTag: currentStack.tabLabel,
        coverColor: book.spineColor,
      });
    });
    setAddedStack(currentStack.id);
    setTimeout(() => setAddedStack(null), 2500);
  };

  return (
    <SectionWrapper
      id="proof"
      backgroundVariant="paper"
      className="pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="05"
          eyebrow="On the Tables & Reader Notes"
          headline={
            <>
              Recent stacks we&apos;ve built — and{" "}
              <em className="italic font-normal text-rust">what readers said</em>.
            </>
          }
          subcopy="Every month, our cedar tables are filled with bespoke stacks tailored to individual readers. Touch any volume below with your cursor to peek inside."
        />

        {/* Part A: Interactive 3D-Book Stack Inspector */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mb-16 sm:mb-20"
        >
          {/* Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar">
            {STACKS.map((stack) => {
              const isSelected = activeStackId === stack.id;
              return (
                <button
                  key={stack.id}
                  onClick={() => setActiveStackId(stack.id)}
                  className={cn(
                    "relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer",
                    isSelected
                      ? "text-espresso font-semibold"
                      : "text-umber hover:text-espresso bg-parchment"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="stack-tab"
                      transition={SOFT_SPRING}
                      className="absolute inset-0 bg-sand rounded-full shadow-sm border border-stone/20"
                    />
                  )}
                  <span className="relative z-10">{stack.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Stack Description Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-parchment border border-sand mb-7 sm:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-rust flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-serif italic text-sm sm:text-base text-espresso">
                  {currentStack.curatorNote}
                </p>
                <span className="font-mono text-[11px] sm:text-xs text-stone">
                  3 full-size volumes · Staff-annotated · Kraft parcel wrapping included
                </span>
              </div>
            </div>

            <button
              onClick={handleAddFullStack}
              className={cn(
                "w-full md:w-auto px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-sm flex-shrink-0 cursor-pointer",
                addedStack === currentStack.id
                  ? "bg-sage text-paper"
                  : "bg-espresso hover:bg-rust text-paper"
              )}
            >
              {addedStack === currentStack.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Stack Added to Bag ✓</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>
                    Add Stack (
                    {currency === "USD"
                      ? `$${currentStack.totalPriceUSD}`
                      : `₱${currentStack.totalPricePHP.toLocaleString()}`}
                    )
                  </span>
                </>
              )}
            </button>
          </div>

          {/* 3 Bespoke Cards with Big Interactive 3D Books */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStack.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.42, ease: LUXURY_EASE }}
              style={{ perspective: "1200px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {currentStack.books.map((book, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 26, rotateX: 4 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.08,
                    ease: LUXURY_EASE,
                  }}
                  style={{ transformPerspective: 1000 }}
                  className="p-5 sm:p-6 rounded-3xl bg-parchment border border-sand flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-stone/40 transition-[box-shadow,border-color] duration-300"
                >
                  <div>
                    {/* Big Interactive 3D Book — Opens ONLY when cursor touches (or taps) the book */}
                    <StackBook3D book={book} index={idx} />

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-espresso mb-1">
                      {book.title}
                    </h4>
                    <p className="font-sans text-xs text-umber mb-4">
                      by {book.author} · {book.publisher}
                    </p>

                    <div className="p-3.5 rounded-xl bg-paper border border-sand mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-rust block mb-1">
                        Bookseller Shelf-Talker
                      </span>
                      <p className="font-serif italic text-xs text-espresso leading-relaxed">
                        {book.shelfTalker}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-sand">
                    <span className="font-mono text-sm font-bold text-espresso">
                      {currency === "USD" ? `$${book.priceUSD}` : `₱${book.pricePHP.toLocaleString()}`}
                    </span>
                    <button
                      onClick={() =>
                        addItem({
                          id: book.id,
                          title: book.title,
                          author: book.author,
                          publisher: book.publisher,
                          pricePHP: book.pricePHP,
                          priceUSD: book.priceUSD,
                          coverTag: currentStack.tabLabel,
                          coverColor: book.spineColor,
                        })
                      }
                      className="px-3.5 py-1.5 rounded-full bg-paper hover:bg-espresso hover:text-paper border border-sand font-mono text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Title</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Part B: Reader Testimonials & Metrics */}
        <div className="pt-10 sm:pt-12 border-t border-sand">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={STAGGER_CONTAINER}
            style={{ perspective: "1200px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={CARD_3D_PERSPECTIVE}
                whileHover={{ y: -5, transition: SOFT_SPRING }}
                style={{ transformPerspective: 1000 }}
                className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-paper via-parchment/80 to-tint-rust/45 border border-sand hover:border-stone/40 hover:shadow-xl transition-[box-shadow,border-color] duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <Quote className="w-6 h-6 text-rust mb-4 opacity-80" />
                  <p className="font-serif italic text-base sm:text-lg text-espresso leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-espresso">
                      {t.name}
                    </h5>
                    <p className="font-mono text-[11px] text-stone">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sand">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-rust block">
                    {t.metric}
                  </span>
                  <span className="font-mono text-xs text-umber mt-0.5 block">
                    {t.metricLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
