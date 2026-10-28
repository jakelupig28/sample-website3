"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  MapPin,
  Clock,
  ArrowRight,
  Mail,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import FolioLogoIcon from "./FolioLogoIcon";
import { useCart } from "@/context/CartContext";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { SCROLL_SPRING, LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "The Imprints", href: "#imprints" },
  { label: "Chaos to Calm", href: "#calm" },
  { label: "Offerings & Spaces", href: "#services" },
  { label: "The Weekly Ritual", href: "#week" },
  { label: "Reader Notes & Stacks", href: "#proof" },
  { label: "Memberships & Parcels", href: "#pricing" },
  { label: "Questions & Answers", href: "#faq" },
];

const NEWSLETTER_TOPICS = [
  "Translated Fiction",
  "Art & Architecture",
  "Essays & Theory",
  "Rare & Indie",
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBookMatch } = useCart();
  const { lenis, scrollTo } = useSmoothScroll();

  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Translated Fiction",
    "Art & Architecture",
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  // Closing card scroll-linked expansion
  const cardScale = useTransform(smoothProgress, [0, 0.72], [0.94, 1]);
  const cardY = useTransform(smoothProgress, [0, 0.72], [28, 0]);
  const cardBorderRadius = useTransform(smoothProgress, [0, 0.72], [44, 28]);
  const watermarkY = useTransform(smoothProgress, [0.25, 1], [30, 0]);
  const watermarkOpacity = useTransform(smoothProgress, [0.25, 1], [0.02, 0.045]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.3 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.length > 1
          ? prev.filter((t) => t !== topic)
          : prev
        : [...prev, topic]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
  };

  return (
    <footer
      ref={containerRef}
      className="relative bg-grad-faq pt-10 sm:pt-12 pb-24 sm:pb-10 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scroll-Linked Closing Espresso Expansion Container */}
        <motion.div
          style={{
            scale: cardScale,
            y: cardY,
            borderRadius: cardBorderRadius,
          }}
          className="bg-grad-espresso text-paper p-6 sm:p-10 lg:p-14 border border-sand/20 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle warm glow orbs */}
          <div className="absolute -top-12 right-1/4 w-96 h-96 rounded-full bg-rust/18 blur-[120px] pointer-events-none transform-gpu" />
          <div className="absolute bottom-16 -left-16 w-80 h-80 rounded-full bg-sage/12 blur-[110px] pointer-events-none transform-gpu" />

          {/* Subtle Centered Watermark Behind Upper Body */}
          <motion.div
            style={{
              y: watermarkY,
              opacity: watermarkOpacity,
            }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 font-serif text-[11vw] font-bold text-white tracking-widest pointer-events-none select-none whitespace-nowrap leading-none"
          >
            FOLIO &amp; LARK
          </motion.div>

          {/* Upper Editorial Newsletter Section — The Sunday Marginalia */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-14">
            {/* Left Column (6 Cols): Editorial Pitch & Personal Match Link */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-px bg-rust-on-dark" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust-on-dark font-semibold">
                  The Sunday Marginalia · Newsletter
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-paper leading-[1.08]">
                Letters on forgotten classics,{" "}
                <em className="italic font-normal text-rust-on-dark">
                  quiet architecture &amp; slow mornings
                </em>
                .
              </h2>

              <p className="font-sans text-sm sm:text-base text-sand/85 max-w-xl leading-relaxed">
                Every Sunday at 8:00 AM, our San Juan booksellers send one unhurried
                dispatch: three overlooked editions, handwritten margin notes from our
                cedar table, and early invitations to our 14-seat evening salons.
              </p>

              {/* Editorial Cadence & Trust Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-[11px] text-sand/75">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-on-dark" />
                  Sundays · 8:00 AM GMT+8
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rust-on-dark" />
                  100% Human-Written
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-foil" />
                  1-Click Unsubscribe
                </span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={openBookMatch}
                  className="inline-flex items-center gap-2 font-mono text-xs text-foil hover:text-paper transition-colors group cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rust-on-dark" />
                  <span className="underline underline-offset-4 decoration-white/25 group-hover:decoration-paper">
                    Looking for a 1-on-1 recommendation instead? Start your Taste Profile
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column (6 Cols): Structured Interactive Subscription Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white/[0.05] border border-white/15 p-5 sm:p-7 shadow-xl backdrop-blur-xs">
                {/* Card Top Ledger Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/12">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rust/20 border border-rust-on-dark/35 flex items-center justify-center text-rust-on-dark">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-sand/65 block">
                        Dispatch No. 148
                      </span>
                      <span className="font-serif text-sm sm:text-base font-bold text-paper">
                        Complimentary Weekly Letter
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/12 text-foil">
                    4,200+ Readers
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="subscribed"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: LUXURY_EASE }}
                      className="py-4 space-y-4"
                    >
                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.06] border border-sage-on-dark/35">
                        <CheckCircle2 className="w-5 h-5 text-sage-on-dark flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg font-bold text-paper">
                            You&apos;re on the Sunday ledger.
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-sand/85 mt-1 leading-relaxed break-words">
                            We&apos;ve registered <span className="text-paper font-medium">{email}</span>{" "}
                            for <span className="text-foil">{selectedTopics.join(", ")}</span>. Look for
                            Issue #148 in your inbox this Sunday morning.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubscribed(false);
                          setEmail("");
                        }}
                        className="font-mono text-[11px] text-sand/70 hover:text-paper underline underline-offset-4 cursor-pointer"
                      >
                        Update email or reading topics
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleNewsletterSubmit}
                      className="space-y-4"
                    >
                      {/* Topic Chips */}
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-sand/70 block mb-2.5">
                          Tailor your Sunday dispatches:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {NEWSLETTER_TOPICS.map((topic) => {
                            const active = selectedTopics.includes(topic);
                            return (
                              <button
                                key={topic}
                                type="button"
                                onClick={() => toggleTopic(topic)}
                                aria-pressed={active}
                                className={cn(
                                  "px-3 py-1.5 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer flex items-center gap-1.5",
                                  active
                                    ? "bg-rust text-paper border-rust-on-dark/60 font-medium shadow-xs"
                                    : "bg-white/[0.04] text-sand/80 border-white/12 hover:bg-white/[0.09] hover:text-paper"
                                )}
                              >
                                <BookOpen className="w-3 h-3 opacity-80" />
                                <span>{topic}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Email Input + Submit CTA */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address..."
                          aria-label="Email address for The Sunday Marginalia newsletter"
                          className="flex-1 min-w-0 px-4 py-3.5 rounded-2xl bg-black/25 border border-white/15 focus:border-rust-on-dark text-sm font-sans text-paper placeholder:text-sand/45 focus:outline-none transition-colors"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3.5 rounded-2xl bg-rust hover:bg-rust-hover text-paper font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 group cursor-pointer flex-shrink-0"
                        >
                          <span>Subscribe</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>

                      <p className="font-mono text-[10px] text-sand/60 leading-relaxed">
                        Dispatched from 148 Wilson St., San Juan · Zero tracking pixels, never shared.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Balanced 3-Column Colophon & Navigation Grid */}
          <div className="relative z-10 pt-9 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-xs font-sans text-sand/80">
            {/* Left (5 Cols): Brand Monogram & Location */}
            <div className="md:col-span-5 space-y-3.5">
              <div className="flex items-center gap-3">
                <FolioLogoIcon
                  accentColor="var(--rust-on-dark)"
                  className="w-8 h-7 text-paper transition-transform hover:scale-105"
                />
                <div>
                  <span className="font-serif text-xl font-bold text-paper block leading-tight">
                    Folio &amp; Lark
                  </span>
                  <span className="font-mono text-[10px] text-sand/65 uppercase tracking-wider">
                    Sanctuary, Books &amp; Editorial Studio
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] pt-1 text-sand/75">
                <p className="flex items-start sm:items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rust-on-dark flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span>148 Wilson St., San Juan, Metro Manila · GMT+8</span>
                </p>
                <p className="flex items-start sm:items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sage-on-dark flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span>Tue–Sun: 10:00 AM – 9:00 PM · Closed Mondays for Curation</span>
                </p>
              </div>
            </div>

            {/* Middle (4 Cols): Compact 2-Column Jump Links */}
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-sand/60 block mb-3">
                Index &amp; Sections
              </span>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px]">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="hover:text-rust-on-dark transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right (3 Cols): Back to Top & Colophon Note */}
            <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 font-mono text-xs text-paper transition-colors group cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-rust-on-dark group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <p className="text-left md:text-right font-mono text-[10px] text-sand/65 leading-relaxed">
                Printed on Munken &amp; Japanese bamboo papers.
                <br />
                All human words. Zero algorithmic traps.
              </p>
            </div>
          </div>

          {/* Symmetrical 3-Column Bottom Bar with Clean Plain Centered Developer Credit */}
          <div className="relative z-10 mt-9 pt-6 border-t border-white/12 grid grid-cols-1 md:grid-cols-3 items-center gap-3 font-mono text-[11px] text-sand/70">
            <p className="text-center md:text-left">
              © 2026 Folio &amp; Lark Studio. All rights reserved.
            </p>

            <p className="text-center tracking-wider text-sand/85">
              Developed by: <span className="font-semibold text-paper">Jake Lupig</span>
            </p>

            <p className="text-center md:text-right">
              Manila Literary Sanctuary · Est. 2019
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
