"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  BookOpen,
  Plus,
  Check,
  Sparkles,
  Bookmark,
  Compass,
} from "lucide-react";
import SectionWrapper from "./motion/SectionWrapper";
import SectionHeader from "./motion/SectionHeader";
import BookCoverArt, { CoverVariant } from "./BookCoverArt";
import { SOFT_SPRING, CURSOR_SPRING, LUXURY_EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface Publisher {
  name: string;
  category: "Literary Fiction" | "Art & Architecture" | "Essays & Theory" | "Local & Indie";
  country: string;
  signatureTitle: string;
  author: string;
  tastingNote: string;
  pricePHP: number;
  priceUSD: number;
  color: string;
  coverVariant: CoverVariant;
  accentColor: string;
  excerpt: string;
  dropCap: string;
  specs: {
    binding: string;
    paper: string;
    pages: number;
  };
}

const PUBLISHERS: Publisher[] = [
  {
    name: "Fitzcarraldo Editions",
    category: "Literary Fiction",
    country: "London, UK",
    signatureTitle: "Flights",
    author: "Olga Tokarczuk",
    tastingNote: "Signature cobalt blue & white covers. Unapologetic essayistic fiction with Nobel lineage.",
    pricePHP: 1450,
    priceUSD: 28,
    color: "#1E3A8A",
    coverVariant: "fitzcarraldo",
    accentColor: "#DBEAFE",
    dropCap: "C",
    excerpt: "onstellation, not pilgrimage. In motion, we become immune to the tyranny of fixed points. Every journey is a quiet line drawn across the earth, uniting travelers who refuse the slumber of routine.",
    specs: {
      binding: "Smyth-sewn layflat paperback",
      paper: "115gsm Swedish Munken Print Cream",
      pages: 416,
    },
  },
  {
    name: "New Directions",
    category: "Literary Fiction",
    country: "New York, USA",
    signatureTitle: "The Loser",
    author: "Thomas Bernhard",
    tastingNote: "Iconic typography, avant-garde poetry, and profound European translation classics.",
    pricePHP: 1250,
    priceUSD: 24,
    color: "#171412",
    coverVariant: "modernist-split",
    accentColor: "#D97706",
    dropCap: "W",
    excerpt: "e were monomaniacs of the highest order. We talked of nothing but Glenn and the Goldberg Variations, while the Salzburg rain beat continuously against the tall windowpanes.",
    specs: {
      binding: "Cold-glue clothbound paperback",
      paper: "100gsm acid-free Mohawk vellum",
      pages: 192,
    },
  },
  {
    name: "NYRB Classics",
    category: "Literary Fiction",
    country: "New York, USA",
    signatureTitle: "Speedboat",
    author: "Renata Adler",
    tastingNote: "The definitive library of neglected masterpieces and unforgettable mid-century gems.",
    pricePHP: 1350,
    priceUSD: 25,
    color: "#C85A32",
    coverVariant: "nyrb-window",
    accentColor: "#FDE68A",
    dropCap: "T",
    excerpt: "here are questions that need not be answered so long as someone asks them with sufficient elegance. A speedboat cuts a clean white furrow across the bay, erasing its own wake before dawn.",
    specs: {
      binding: "Reinforced library notch binding",
      paper: "110gsm recycled archival kraft stock",
      pages: 184,
    },
  },
  {
    name: "Penguin Classics",
    category: "Literary Fiction",
    country: "London, UK",
    signatureTitle: "Invisible Cities",
    author: "Italo Calvino",
    tastingNote: "Tri-band covers and authoritative translations. The cornerstone of every nightstand.",
    pricePHP: 950,
    priceUSD: 18,
    color: "#D97706",
    coverVariant: "penguin-triband",
    accentColor: "#FEF3C7",
    dropCap: "C",
    excerpt: "ities, like dreams, are made of desires and fears, even if the thread of their discourse is secret, their rules absurd, their perspectives deceitful, and everything conceals something else.",
    specs: {
      binding: "Classic signature tri-band binding",
      paper: "90gsm uncoated featherweight book paper",
      pages: 168,
    },
  },
  {
    name: "A24 Books",
    category: "Art & Architecture",
    country: "New York, USA",
    signatureTitle: "Past Lives Screenplay Book",
    author: "Celine Song",
    tastingNote: "Linen-bound screenplay volumes with full-color frame enlargements and essay forewords.",
    pricePHP: 3200,
    priceUSD: 60,
    color: "#2D6A4F",
    coverVariant: "cinema-linen",
    accentColor: "#FBBF24",
    dropCap: "I",
    excerpt: "nyeon. It is the providence between two people who cross paths in a crowded subway car, whose coats brush against each other across eight thousand past lifetimes.",
    specs: {
      binding: "Linen hardcover with foil stamp",
      paper: "140gsm Japanese matte art paper",
      pages: 288,
    },
  },
  {
    name: "Phaidon",
    category: "Art & Architecture",
    country: "London / Berlin",
    signatureTitle: "Living in the Desert",
    author: "Phaidon Editors",
    tastingNote: "Heavyweight matte-paper monographs exploring tectonic brutalism and vernacular sanctuaries.",
    pricePHP: 3600,
    priceUSD: 68,
    color: "#7C5236",
    coverVariant: "tectonic-arch",
    accentColor: "#FDE68A",
    dropCap: "A",
    excerpt: "shelter carved into pale sandstone is not a barrier against the sun, but a sanctuary that honors silence, shadow, and the vast tectonic horizon of the open desert.",
    specs: {
      binding: "Heavyweight quarter-bound cloth",
      paper: "170gsm Garda silk woodfree paper",
      pages: 352,
    },
  },
  {
    name: "Faber & Faber",
    category: "Literary Fiction",
    country: "London, UK",
    signatureTitle: "Never Let Me Go",
    author: "Kazuo Ishiguro",
    tastingNote: "Timeless British modernist poetry, plays, and poignant psychological fiction.",
    pricePHP: 1100,
    priceUSD: 21,
    color: "#1E293B",
    coverVariant: "faber-bands",
    accentColor: "#F59E0B",
    dropCap: "I",
    excerpt: "saw a new world coming rapidly. More scientific, efficient, yes. More ruthless and cruel. But I saw a little girl holding close what she loved, against the rising tide.",
    specs: {
      binding: "Modernist typography softcover",
      paper: "105gsm Munken Pure cream",
      pages: 288,
    },
  },
  {
    name: "Mack Books",
    category: "Art & Architecture",
    country: "London, UK",
    signatureTitle: "Sleeping by the Mississippi",
    author: "Alec Soth",
    tastingNote: "Poetic documentary photography monographs printed on archival Japanese paper.",
    pricePHP: 3800,
    priceUSD: 72,
    color: "#4A4641",
    coverVariant: "tip-on-plate",
    accentColor: "#E8D5B5",
    dropCap: "T",
    excerpt: "he water does not flow in a straight line; it pools in abandoned roadside motels, cedar armchairs, and faded polaroids of travelers who took the river road and never turned back.",
    specs: {
      binding: "Embossed hardcover with tip-on image",
      paper: "160gsm archival Japanese matte paper",
      pages: 120,
    },
  },
  {
    name: "Verso",
    category: "Essays & Theory",
    country: "London / New York",
    signatureTitle: "Minima Moralia",
    author: "Theodor Adorno",
    tastingNote: "Radical critical theory, spatial politics, and counter-hegemonic cultural manifestos.",
    pricePHP: 1200,
    priceUSD: 23,
    color: "#B91C1C",
    coverVariant: "constructivist",
    accentColor: "#FEF3C7",
    dropCap: "W",
    excerpt: "rong life cannot be lived rightly. In the face of overwhelming noise, the preservation of quiet critique and patient contemplation becomes the final refuge of thought.",
    specs: {
      binding: "Radical red spine cloth edition",
      paper: "95gsm recycled text stock",
      pages: 256,
    },
  },
  {
    name: "Graywolf Press",
    category: "Literary Fiction",
    country: "Minneapolis, USA",
    signatureTitle: "Bluets",
    author: "Maggie Nelson",
    tastingNote: "Lyrical prose poetry, grief investigations, and bold non-traditional memoirs.",
    pricePHP: 1150,
    priceUSD: 22,
    color: "#1E3A8A",
    coverVariant: "cyanotype",
    accentColor: "#93C5FD",
    dropCap: "1",
    excerpt: ". Suppose I were to begin by saying that I had fallen in love with a color. A proposition in which one cannot tell whether it is an affliction or an ecstasy, or simply a way of seeing.",
    specs: {
      binding: "Pocket poet square-back binding",
      paper: "100gsm Rolland Enviro satin",
      pages: 112,
    },
  },
  {
    name: "Taschen",
    category: "Art & Architecture",
    country: "Cologne, Germany",
    signatureTitle: "Tadao Ando: Complete Works",
    author: "Philip Jodidio",
    tastingNote: "Expansive architectural photographic folios documenting light, water, and smooth poured concrete.",
    pricePHP: 4200,
    priceUSD: 78,
    color: "#262320",
    coverVariant: "tectonic-arch",
    accentColor: "#E5E7EB",
    dropCap: "L",
    excerpt: "ight only exists in contrast to darkness. When poured into smooth cast concrete, sunlight becomes a material as palpable, heavy, and resonant as water or stone.",
    specs: {
      binding: "Oversized folio cloth hardback",
      paper: "180gsm heavy matte artboard",
      pages: 512,
    },
  },
  {
    name: "Grove Atlantic",
    category: "Essays & Theory",
    country: "New York, USA",
    signatureTitle: "Disgrace",
    author: "J.M. Coetzee",
    tastingNote: "Uncompromising, fearlessly honest literature and political essays that challenge orthodoxy.",
    pricePHP: 1180,
    priceUSD: 22,
    color: "#575049",
    coverVariant: "tip-on-plate",
    accentColor: "#F59E0B",
    dropCap: "H",
    excerpt: "e has become a person who lives in quiet rooms, listening for what comes after passion, after pride, after the long journey through the interior of one's own country.",
    specs: {
      binding: "Classic trade paperback",
      paper: "100gsm Finch Opaque vellum",
      pages: 224,
    },
  },
  {
    name: "MIT Press",
    category: "Essays & Theory",
    country: "Cambridge, USA",
    signatureTitle: "The Eyes of the Skin",
    author: "Juhani Pallasmaa",
    tastingNote: "Phenomenology of architecture, sensory design, and humane technological philosophy.",
    pricePHP: 1850,
    priceUSD: 34,
    color: "#2D6A4F",
    coverVariant: "modernist-split",
    accentColor: "#FDE68A",
    dropCap: "A",
    excerpt: "rchitecture is the art of reconciliation between ourselves and the world, and this mediation takes place through the senses, through the skin, and through silence.",
    specs: {
      binding: "Tectonic flexibound format",
      paper: "120gsm Munken Lynx uncoated",
      pages: 128,
    },
  },
  {
    name: "Drawn & Quarterly",
    category: "Art & Architecture",
    country: "Montreal, Canada",
    signatureTitle: "Sabrina",
    author: "Nick Drnaso",
    tastingNote: "Graphic literature at the highest literary watermark. Quiet, haunting, and unforgettable.",
    pricePHP: 1650,
    priceUSD: 30,
    color: "#B45309",
    coverVariant: "obi-strip",
    accentColor: "#FEF3C7",
    dropCap: "I",
    excerpt: "n the quiet morning, rumors spread faster than light across illuminated computer screens, leaving ordinary days drenched in quiet mystery and unspoken questions.",
    specs: {
      binding: "Hardcover Smyth-sewn graphic volume",
      paper: "140gsm uncoated offset paper",
      pages: 204,
    },
  },
  {
    name: "Dalkey Archive",
    category: "Literary Fiction",
    country: "Victoria, USA",
    signatureTitle: "The Third Policeman",
    author: "Flann O'Brien",
    tastingNote: "Surrealist avant-garde fiction, comedic satire, and unclassifiable prose experiments.",
    pricePHP: 1300,
    priceUSD: 25,
    color: "#9A3412",
    coverVariant: "constructivist",
    accentColor: "#FDE68A",
    dropCap: "I",
    excerpt: "t is nearly impossible to tell where the bicycle ends and the sergeant begins, so molecular and profound is their mutual understanding after forty miles of country lane.",
    specs: {
      binding: "Classic Dalkey typography softcover",
      paper: "105gsm acid-free cream",
      pages: 208,
    },
  },
  {
    name: "Pushkin Press",
    category: "Literary Fiction",
    country: "London, UK",
    signatureTitle: "Chess Story",
    author: "Stefan Zweig",
    tastingNote: "Pocket-sized French and Austrian masterworks printed on creamy Munken paper.",
    pricePHP: 980,
    priceUSD: 19,
    color: "#1F6E50",
    coverVariant: "faber-bands",
    accentColor: "#FBBF24",
    dropCap: "I",
    excerpt: "n absolute isolation, a mind thrown back upon itself will build entire kingdoms out of dust and memory, seeking solace upon a grid of sixty-four black and white squares.",
    specs: {
      binding: "Flapped pocket edition with foil",
      paper: "100gsm Swedish Munken Pure",
      pages: 104,
    },
  },
  {
    name: "Ateneo University Press",
    category: "Local & Indie",
    country: "Quezon City, PH",
    signatureTitle: "The Woman Who Had Two Navels",
    author: "Nick Joaquin",
    tastingNote: "The golden canon of Philippine modernism, tropical gothic fiction, and Manila cultural essays.",
    pricePHP: 850,
    priceUSD: 16,
    color: "#7C2D12",
    coverVariant: "nyrb-window",
    accentColor: "#FBBF24",
    dropCap: "I",
    excerpt: "n old Intramuros, stone walls retain the dusk of three centuries, heavy with incense, Spanish vowels, and the humid breath of the Pasig River carrying shadows toward Manila Bay.",
    specs: {
      binding: "Philippine literary heritage softcover",
      paper: "90gsm cream bookpaper",
      pages: 336,
    },
  },
  {
    name: "Independent Zines",
    category: "Local & Indie",
    country: "Manila & Baguio",
    signatureTitle: "Pasig River Flâneur (Issue 03)",
    author: "Studio Maginhawa",
    tastingNote: "Risograph-printed local zines on bamboo paper with screen-printed foldout cartography.",
    pricePHP: 650,
    priceUSD: 12,
    color: "#C85A32",
    coverVariant: "risograph",
    accentColor: "#1E3A8A",
    dropCap: "X",
    excerpt: "eroxed at midnight on 80gsm bamboo paper. Folded by hand, stapled with love, and traded over a cup of warm barako coffee in Cubao Expo as the rain begins to fall.",
    specs: {
      binding: "Hand-saddle-stitched copper staple",
      paper: "80gsm recycled bamboo riso paper",
      pages: 48,
    },
  },
];

const CATEGORIES = [
  "All",
  "Literary Fiction",
  "Art & Architecture",
  "Essays & Theory",
  "Local & Indie",
] as const;

export default function ToolkitSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePublisher, setActivePublisher] = useState<Publisher>(PUBLISHERS[0]);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [isBookHovered, setIsBookHovered] = useState(false);
  const [extraPageTurned, setExtraPageTurned] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const bookStageRef = useRef<HTMLDivElement>(null);
  const { addItem, currency } = useCart();

  useEffect(() => {
    const checkViewport = () => setIsMobileViewport(window.innerWidth < 640);
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Interactive 3D tilt when cursor moves across the book stage
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorRotateY = useSpring(useTransform(pointerX, [-1, 1], [-9, 9]), CURSOR_SPRING);
  const cursorRotateX = useSpring(useTransform(pointerY, [-1, 1], [7, -7]), CURSOR_SPRING);
  const sheenX = useSpring(useTransform(pointerX, [-1, 1], [15, 85]), CURSOR_SPRING);
  const sheenY = useSpring(useTransform(pointerY, [-1, 1], [15, 85]), CURSOR_SPRING);
  const coverSheen = useMotionTemplate`radial-gradient(220px circle at ${sheenX}% ${sheenY}%, rgba(255, 248, 235, 0.22), transparent 72%)`;
  const pageSheen = useMotionTemplate`radial-gradient(240px circle at ${sheenX}% ${sheenY}%, rgba(255, 244, 214, 0.45), transparent 75%)`;

  const handleBookMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookStageRef.current) return;
    const rect = bookStageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, nx)));
    pointerY.set(Math.max(-1, Math.min(1, ny)));
  };

  const handleBookMouseLeave = () => {
    setIsBookHovered(false);
    setExtraPageTurned(false);
    pointerX.set(0);
    pointerY.set(0);
  };

  const filteredPublishers =
    selectedCategory === "All"
      ? PUBLISHERS
      : PUBLISHERS.filter((p) => p.category === selectedCategory);

  const handleAddToStack = (publisher: Publisher) => {
    addItem({
      id: `pub-${publisher.name.toLowerCase().replace(/\s+/g, "-")}`,
      title: publisher.signatureTitle,
      author: publisher.author,
      publisher: publisher.name,
      pricePHP: publisher.pricePHP,
      priceUSD: publisher.priceUSD,
      coverTag: publisher.category,
      coverColor: publisher.color,
    });
    setAddedItem(publisher.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const activeIndex = PUBLISHERS.findIndex((p) => p.name === activePublisher.name);

  return (
    <SectionWrapper
      id="imprints"
      backgroundVariant="parchment"
      className="pt-16 pb-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          number="01"
          eyebrow="The Catalogue"
          headline={
            <>
              Home to the imprints you{" "}
              <em className="italic font-normal text-rust">already</em> treasure.
            </>
          }
          subcopy="And if an out-of-print edition isn't on our cedar tables today, our rare-book scouts will track it down by Monday."
        />

        {/* Centered Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
          className="flex justify-center items-center w-full mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-paper/85 border border-sand shadow-sm overflow-x-auto no-scrollbar max-w-full">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "relative px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer",
                    isSelected
                      ? "text-espresso font-semibold"
                      : "text-umber hover:text-espresso"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="imprint-filter"
                      transition={SOFT_SPRING}
                      className="absolute inset-0 bg-sand rounded-full shadow-sm border border-stone/20"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tactile Publisher Selector: Horizontal Swipe Rail on Mobile, Edge-to-Edge Wrap on Tablet/Desktop */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.08 }}
          className="flex sm:flex-wrap overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0 gap-2 sm:gap-2.5 w-full mb-8 sm:mb-10 items-stretch"
        >
          {filteredPublishers.map((pub) => {
            const isHovered = activePublisher.name === pub.name;
            return (
              <motion.button
                key={pub.name}
                layout
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={SOFT_SPRING}
                onClick={() => {
                  setActivePublisher(pub);
                  setExtraPageTurned(false);
                }}
                className={cn(
                  "group relative cursor-pointer px-3.5 sm:px-4 py-2.5 rounded-2xl border transition-[background-color,border-color,color,box-shadow] duration-200 flex items-center justify-between gap-3 flex-shrink-0 sm:flex-shrink sm:flex-grow basis-auto shadow-xs",
                  isHovered
                    ? "bg-espresso text-paper border-espresso shadow-md"
                    : "bg-paper text-espresso border-sand hover:border-stone hover:bg-paper"
                )}
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                    style={{ backgroundColor: isHovered ? "var(--rust-on-dark)" : pub.color }}
                  />
                  <span className="font-serif text-xs sm:text-sm font-medium">
                    {pub.name}
                  </span>
                </div>
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-wider flex-shrink-0 whitespace-nowrap",
                    isHovered ? "text-sand/85" : "text-stone"
                  )}
                >
                  {pub.country}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* The Big Interactive Full Size 3D Book Showcase Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.14 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePublisher.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: LUXURY_EASE }}
              className="p-5 sm:p-8 lg:p-12 rounded-3xl sm:rounded-[2.8rem] bg-grad-card border border-sand shadow-2xl relative overflow-hidden"
            >
              {/* Ambient Background Paper Pattern & Glow */}
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
                style={{ backgroundColor: activePublisher.color }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(var(--sand)_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

              {/* Container Header Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-sand/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse flex-shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-stone">
                    Folio Archive No. {String(activeIndex + 1).padStart(2, "0")} of {PUBLISHERS.length} · Staff Inspected
                  </span>
                </div>
              </div>

              {/* Main Grand 2-Column Split: 3D Full Size Book vs Editorial Provenance */}
              <div className="relative z-10 grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 items-center">
                {/* Left Column: Centered Archival Pedestal — Animation ONLY triggers when cursor meets the book itself */}
                <div className="lg:col-span-6 relative flex flex-col items-center justify-center select-none rounded-3xl px-2 sm:px-4 py-6 sm:py-9">
                  <div className="absolute inset-0 rounded-3xl bg-parchment/45 border border-sand/70 pointer-events-none" />
                  {/* Outer Passive Stage (NO mouse listeners here — hovering background does nothing!) */}
                  <div
                    className="relative w-full min-h-[275px] sm:min-h-[370px] xl:min-h-[398px] flex items-center justify-center"
                    style={{ perspective: "1800px" }}
                  >
                    {/* Dynamic Underneath Floor Shadow */}
                    <motion.div
                      animate={{
                        scaleX: isBookHovered ? (isMobileViewport ? 1.45 : 1.8) : 1.05,
                        scaleY: isBookHovered ? 1.2 : 1,
                        opacity: isBookHovered ? 0.28 : 0.2,
                      }}
                      transition={{ duration: 0.6, ease: LUXURY_EASE }}
                      className="absolute bottom-2 w-[160px] sm:w-[235px] h-7 rounded-full bg-espresso blur-xl pointer-events-none"
                    />

                    {/* Outer Cursor-Tilt Rig */}
                    <motion.div
                      style={{
                        rotateX: cursorRotateX,
                        rotateY: cursorRotateY,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* STRICT BOOK-ONLY HITBOX: Matches exact physical book bounds (spine + cover) when closed, and covers the 2-page spread ONLY once open */}
                      <motion.div
                        ref={bookStageRef}
                        onMouseEnter={() => setIsBookHovered(true)}
                        onMouseMove={handleBookMouseMove}
                        onMouseLeave={handleBookMouseLeave}
                        onClick={() => {
                          if (!isBookHovered) {
                            setIsBookHovered(true);
                          } else {
                            setExtraPageTurned((prev) => !prev);
                          }
                        }}
                        animate={{
                          x: isBookHovered ? (isMobileViewport ? 56 : 96) : 8,
                          y: isBookHovered ? -4 : 0,
                          scale: isBookHovered ? (isMobileViewport ? 0.72 : 0.92) : 1,
                          rotateY: isBookHovered ? -4 : -6,
                          rotateX: isBookHovered ? 7 : 2,
                        }}
                        transition={{
                          duration: 0.56,
                          ease: LUXURY_EASE,
                        }}
                        className="relative w-[176px] sm:w-[222px] xl:w-[240px] h-[256px] sm:h-[322px] xl:h-[348px] cursor-pointer"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Exact Spine + Front Cover Hitbox when closed; expands across 2-page spread ONLY after cursor meets & opens the book */}
                        {isBookHovered ? (
                          <div
                            className="absolute -inset-y-2 -left-[104%] -right-2 z-50"
                            style={{ transform: "translateZ(14px)" }}
                          />
                        ) : (
                          <div
                            className="absolute -inset-y-1 -left-5 -right-1 z-50"
                            style={{ transform: "translateZ(12px)" }}
                          />
                        )}
                        {/* 0. BACK HARDCOVER BOARD (Z = -10px) */}
                        <div
                          className="absolute -inset-y-1 -right-1.5 left-0 rounded-r-md"
                          style={{
                            backgroundColor: activePublisher.color,
                            filter: "brightness(0.68)",
                            transform: "translateZ(-10px)",
                          }}
                        />

                        {/* 1. BOOK SPINE (Left 3D Hinged Binding) */}
                        <div
                          className="absolute -left-5 -top-1 -bottom-1 w-5 rounded-l-sm flex flex-col justify-between py-5 items-center text-white/60 text-[8px] font-mono tracking-tighter"
                          style={{
                            backgroundColor: activePublisher.color,
                            backgroundImage:
                              "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.12) 45%, rgba(0,0,0,0.28) 100%)",
                            transform: "translateZ(-2px)",
                          }}
                        >
                          <span className="rotate-90 origin-center whitespace-nowrap uppercase">
                            FOLIO
                          </span>
                          <span className="rotate-90 origin-center whitespace-nowrap font-serif truncate max-w-[110px] text-white/90">
                            {activePublisher.signatureTitle}
                          </span>
                          <span className="rotate-90 origin-center whitespace-nowrap">
                            F&amp;L
                          </span>
                        </div>

                        {/* 2. STATIONARY RIGHT PAGE BLOCK (Z = 0px) */}
                        <div
                          className="absolute inset-0 bg-[#FAF7F0] rounded-r-md border-r-[8px] border-b-[7px] border-[#E7DEC8] shadow-xl overflow-hidden"
                          style={{ transform: "translateZ(0px)" }}
                        >
                          {/* Realistic Munken Paper Edge Striations & Center Gutter Shadow */}
                          <div className="absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-[#171412]/14 via-[#171412]/4 to-transparent pointer-events-none z-10" />
                          <motion.div
                            style={{ background: pageSheen }}
                            className="absolute inset-0 pointer-events-none z-10"
                          />

                          {/* Stationary Right Page Content (p. 15 or p. 17 depending on extraPageTurned) */}
                          <div className="relative w-full h-full p-4 sm:p-6 flex flex-col justify-between text-[#171412]">
                            <div className="border-b border-[#E6DEC8] pb-2">
                              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#8A8177] uppercase tracking-wider">
                                <span>{extraPageTurned ? "Colophon" : "Chapter I"}</span>
                                <span>{extraPageTurned ? "p. 17" : "p. 15"}</span>
                              </div>
                              <h4 className="font-serif italic font-bold text-xs sm:text-base text-[#171412] mt-1 leading-snug line-clamp-2">
                                {activePublisher.signatureTitle}
                              </h4>
                              <p className="font-mono text-[9px] sm:text-[10px] text-rust truncate">
                                {activePublisher.author}
                              </p>
                            </div>

                            {extraPageTurned ? (
                              <div className="space-y-1.5 text-[10px] sm:text-[11px] font-mono text-[#575049]">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-[#F3EDE2]/80 border border-[#E6DEC8]">
                                  <span className="text-[8px] sm:text-[9px] uppercase text-[#8A8177] block">Binding</span>
                                  <span className="font-sans font-medium text-[#171412] line-clamp-1">{activePublisher.specs.binding}</span>
                                </div>
                                <div className="p-1.5 sm:p-2 rounded-lg bg-[#F3EDE2]/80 border border-[#E6DEC8]">
                                  <span className="text-[8px] sm:text-[9px] uppercase text-[#8A8177] block">Paper Stock</span>
                                  <span className="font-sans font-medium text-[#171412] line-clamp-1">{activePublisher.specs.paper}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-[11px] sm:text-[13px] font-serif leading-relaxed text-[#575049] italic line-clamp-4">
                                &ldquo;{activePublisher.tastingNote}&rdquo;
                              </div>
                            )}

                            <div className="pt-2 border-t border-[#E6DEC8] flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#8A8177]">
                              <span>Manila Vault</span>
                              <span className="text-rust font-semibold">
                                {extraPageTurned ? "↶ Flip Back" : "Turn Page ↷"}
                              </span>
                            </div>
                          </div>

                          {/* Hanging Crimson Silk Bookmark Ribbon */}
                          <motion.div
                            animate={{
                              rotate: isBookHovered ? [3, 6, 3] : 0,
                              y: isBookHovered ? 6 : 0,
                            }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-3 right-8 w-3 h-10 bg-rust rounded-b-xs shadow-sm pointer-events-none"
                          />
                        </div>

                        {/* 3. INTERACTIVE EXTRA PAGE LEAF (Closes immediately at 0ms so it never crosses outer leaves) */}
                        <motion.div
                          animate={{
                            rotateY: isBookHovered && extraPageTurned ? -158 : 0,
                            z: isBookHovered && extraPageTurned ? 5.5 : 1,
                          }}
                          transition={{
                            duration: isBookHovered ? 0.48 : 0.34,
                            delay: 0,
                            ease: LUXURY_EASE,
                          }}
                          style={{
                            transformOrigin: "left center",
                            transformStyle: "preserve-3d",
                          }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          <div
                            className="absolute inset-0 rounded-r-sm bg-transparent"
                            style={{
                              transform: "translateZ(0.4px)",
                              backfaceVisibility: "hidden",
                            }}
                          />
                          <div
                            className="absolute inset-0 bg-[#FDFBF7] p-4 sm:p-6 rounded-l-sm border-l border-[#E6DEC8] shadow-md flex flex-col justify-between overflow-hidden"
                            style={{
                              transform: "rotateY(180deg) translateZ(0.4px)",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            <div className="absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-[#171412]/14 via-[#171412]/4 to-transparent pointer-events-none" />
                            <div>
                              <div className="flex items-center justify-between text-[8px] font-mono text-[#8A8177] uppercase tracking-widest border-b border-[#E6DEC8] pb-2">
                                <span>Marginalia</span>
                                <span>p. 16</span>
                              </div>
                              <p className="mt-3 sm:mt-4 font-serif italic text-[11px] sm:text-[13px] text-[#171412] leading-relaxed">
                                &ldquo;Read slowly in late afternoon light. Notice how the cadence settles around page forty — one of our booksellers&apos; desert-island editions.&rdquo;
                              </p>
                            </div>
                            <div className="pt-2 border-t border-[#E6DEC8] flex items-center justify-between text-[8px] font-mono text-sage">
                              <span>Inspected</span>
                              <span>{activePublisher.specs.pages} pp</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* 4. LITERARY EXCERPT LEAF (Opens 3rd [0.12s], Closes 1st [0s] — Zero 3D plane crossing!) */}
                        <motion.div
                          animate={{
                            rotateY: isBookHovered ? -161 : 0,
                            z: isBookHovered ? 3.5 : 2,
                          }}
                          transition={{
                            rotateY: {
                              duration: isBookHovered ? 0.52 : 0.38,
                              delay: isBookHovered ? 0.12 : 0,
                              ease: LUXURY_EASE,
                            },
                            z: {
                              duration: 0.3,
                              delay: isBookHovered ? 0.12 : 0,
                              ease: LUXURY_EASE,
                            },
                          }}
                          style={{
                            transformOrigin: "left center",
                            transformStyle: "preserve-3d",
                          }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          {/* Front of Leaf */}
                          <div
                            className="absolute inset-0 bg-[#FAF7F0] p-4 sm:p-6 rounded-r-sm border-r border-[#E6DEC8] shadow-sm flex flex-col justify-between overflow-hidden"
                            style={{
                              transform: "translateZ(0.4px)",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#171412]/12 to-transparent pointer-events-none" />
                            <div className="text-[8px] font-mono text-[#8A8177] uppercase tracking-widest border-b border-[#E6DEC8] pb-2 flex justify-between">
                              <span>Half-Title</span>
                              <span>p. i</span>
                            </div>
                            <div className="my-auto text-center">
                              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-rust mx-auto mb-2 opacity-80" />
                              <p className="font-serif italic text-xs sm:text-sm font-bold text-[#171412] line-clamp-2">
                                {activePublisher.signatureTitle}
                              </p>
                              <p className="font-mono text-[9px] text-[#8A8177] mt-1">
                                {activePublisher.name}
                              </p>
                            </div>
                            <div className="text-[8px] font-mono text-center text-[#8A8177] border-t border-[#E6DEC8] pt-2">
                              {activePublisher.country}
                            </div>
                          </div>

                          {/* Back of Leaf (Forms Left Open Page p. 14) */}
                          <div
                            className="absolute inset-0 bg-[#FDFBF7] p-4 sm:p-6 rounded-l-sm border-l border-[#E6DEC8] shadow-md flex flex-col justify-between overflow-hidden"
                            style={{
                              transform: "rotateY(180deg) translateZ(0.4px)",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            <div className="absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-[#171412]/15 via-[#171412]/4 to-transparent pointer-events-none" />

                            <div>
                              <div className="flex items-center justify-between text-[8px] font-mono text-[#8A8177] uppercase tracking-widest border-b border-[#E6DEC8] pb-2">
                                <span className="truncate max-w-[115px]">{activePublisher.name}</span>
                                <span>p. 14</span>
                              </div>

                              <div className="mt-2.5 sm:mt-3.5 text-[#171412] font-serif leading-relaxed text-[10.5px] sm:text-xs line-clamp-6">
                                <span
                                  className="float-left text-2xl sm:text-4xl font-serif font-bold text-rust leading-none pr-1.5 pt-0.5"
                                  style={{ fontFamily: "serif" }}
                                >
                                  {activePublisher.dropCap}
                                </span>
                                <span className="text-[#332E29]">
                                  {activePublisher.excerpt}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#E6DEC8] text-[8px] sm:text-[9px] font-mono text-[#8A8177]">
                              <span className="italic">San Juan Room</span>
                              <span className="text-sage">Excerpt</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* 5. ARCHIVAL FLYLEAF (Opens 2nd [0.06s], Closes 2nd [0.05s] — Strictly behind Front Cover!) */}
                        <motion.div
                          animate={{
                            rotateY: isBookHovered ? -167 : 0,
                            z: isBookHovered ? 1 : 4.2,
                          }}
                          transition={{
                            rotateY: {
                              duration: isBookHovered ? 0.54 : 0.42,
                              delay: isBookHovered ? 0.06 : 0.05,
                              ease: LUXURY_EASE,
                            },
                            z: {
                              duration: 0.3,
                              delay: isBookHovered ? 0.06 : 0.05,
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
                            className="absolute inset-0 bg-[#F3EDE2] rounded-l-sm border-l border-[#E6DEC8]"
                            style={{
                              transform: "rotateY(180deg) translateZ(0.3px)",
                              backfaceVisibility: "hidden",
                            }}
                          />
                        </motion.div>

                        {/* 6. BESPOKE FRONT HARDCOVER (Opens 1st [0s], Closes LAST [0.11s] with zero overshoot & Z = +9.5px so inner pages NEVER slice through!) */}
                        <motion.div
                          animate={{
                            rotateY: isBookHovered ? -172 : 0,
                            z: isBookHovered ? -2 : 9.5,
                          }}
                          transition={{
                            rotateY: {
                              duration: isBookHovered ? 0.56 : 0.48,
                              delay: isBookHovered ? 0 : 0.11,
                              ease: LUXURY_EASE,
                            },
                            z: {
                              duration: isBookHovered ? 0.45 : 0.2,
                              delay: isBookHovered ? 0 : 0.06,
                              ease: "easeOut",
                            },
                          }}
                          style={{
                            transformOrigin: "left center",
                            transformStyle: "preserve-3d",
                          }}
                          className="absolute -inset-y-1 -right-1 left-0 pointer-events-none"
                        >
                          {/* Exterior Bespoke Art-Directed Front Hardcover Face */}
                          <div
                            className="absolute inset-0 rounded-r-md overflow-hidden shadow-2xl"
                            style={{
                              transform: "translateZ(0.8px)",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            <BookCoverArt
                              variant={activePublisher.coverVariant}
                              title={activePublisher.signatureTitle}
                              author={activePublisher.author}
                              publisher={activePublisher.name}
                              baseColor={activePublisher.color}
                              accentColor={activePublisher.accentColor}
                              editionTag={`Folio No. ${String(activeIndex + 1).padStart(2, "0")}`}
                              metaRight={`${activePublisher.specs.pages} PP`}
                            />
                            <motion.div
                              style={{ background: coverSheen }}
                              className="absolute inset-0 pointer-events-none z-20"
                            />
                          </div>

                          {/* Interior Front Cover Face (Marbled Endpaper framing the left open page) */}
                          <div
                            className="absolute inset-0 rounded-l-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-xl"
                            style={{
                              backgroundColor: activePublisher.color,
                              transform: "rotateY(180deg) translateZ(0.8px)",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            <div className="w-full h-full rounded-xs bg-[#F3EDE2] border border-[#E6DEC8] p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden">
                              <div className="absolute inset-0 bg-[radial-gradient(var(--rust)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 pointer-events-none" />
                              <div className="relative z-10">
                                <span className="font-mono text-[8px] uppercase tracking-wider text-[#8A8177]">
                                  EX LIBRIS · FOLIO &amp; LARK
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Tactile 3D Interaction Hint */}
                  <p className="mt-4 text-xs font-mono text-stone flex items-center gap-1.5 text-center">
                    <Bookmark className="w-3.5 h-3.5 text-rust flex-shrink-0" />
                    <span>
                      {isBookHovered
                        ? "Click open pages to turn · Move cursor off book to close"
                        : "Place cursor directly on book to open hardcover & fan pages"}
                    </span>
                  </p>
                </div>

              {/* Right Column: Deep Curatorial Provenance, Tasting Notes & Stack Action */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Category Pill & Origin */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-parchment text-xs font-mono font-medium text-rust border border-sand">
                      {activePublisher.category}
                    </span>
                    <span className="font-mono text-xs text-stone">
                      {activePublisher.country}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-espresso leading-tight mb-2">
                    {activePublisher.signatureTitle}
                  </h3>
                  <p className="font-sans text-base sm:text-lg text-umber mb-4">
                    by <span className="font-semibold text-espresso">{activePublisher.author}</span>
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso">
                      {currency === "USD"
                        ? `$${activePublisher.priceUSD}`
                        : `₱${activePublisher.pricePHP.toLocaleString()}`}
                    </span>
                    <span className="font-mono text-xs text-sage bg-sage-soft px-2.5 py-0.5 rounded-full font-medium border border-sage/20">
                      Rare Copy · In Stock
                    </span>
                  </div>

                  {/* Bookseller's Shelf-Talker Note */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-parchment/90 border border-sand mb-6 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-rust" />
                      <span className="font-semibold text-espresso">
                        Bookseller&apos;s Shelf-Talker Note
                      </span>
                    </div>
                    <p className="font-serif italic text-base sm:text-lg text-espresso leading-relaxed">
                      &ldquo;{activePublisher.tastingNote}&rdquo;
                    </p>
                  </div>

                  {/* Materiality & Production Specs */}
                  <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-paper border border-sand text-xs font-mono mb-7">
                    <div>
                      <span className="text-stone text-[10px] block uppercase">Binding</span>
                      <span className="font-semibold text-espresso truncate block">
                        {activePublisher.specs.binding.split(" ")[0]} Layflat
                      </span>
                    </div>
                    <div>
                      <span className="text-stone text-[10px] block uppercase">Paper</span>
                      <span className="font-semibold text-espresso truncate block">
                        {activePublisher.specs.paper.split(" ")[0]} Munken
                      </span>
                    </div>
                    <div>
                      <span className="text-stone text-[10px] block uppercase">Length</span>
                      <span className="font-semibold text-espresso block">
                        {activePublisher.specs.pages} pages
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-sand/80">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={SOFT_SPRING}
                    onClick={() => handleAddToStack(activePublisher)}
                    className={cn(
                      "flex-1 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md cursor-pointer",
                      addedItem === activePublisher.name
                        ? "bg-sage text-paper"
                        : "bg-espresso hover:bg-rust text-paper"
                    )}
                  >
                    {addedItem === activePublisher.name ? (
                      <>
                        <Check className="w-4 h-4 text-foil" />
                        <span>Added to Your Stack ✓</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-foil" />
                        <span>Add &ldquo;{activePublisher.signatureTitle}&rdquo; to Stack</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
