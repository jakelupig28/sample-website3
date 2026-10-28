"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";
import SectionWrapper from "./motion/SectionWrapper";
import SectionHeader from "./motion/SectionHeader";
import { useCart } from "@/context/CartContext";
import {
  SOFT_SPRING,
  LUXURY_EASE,
  STAGGER_CONTAINER,
  CARD_3D_PERSPECTIVE,
  VIEWPORT_ONCE,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Tier {
  id: string;
  name: string;
  tagline: string;
  monthlyPHP: number;
  monthlyUSD: number;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
}

const TIERS: Tier[] = [
  {
    id: "solitary",
    name: "The Solitary Reader",
    tagline: "For intentional reading rituals and quiet weekend mornings.",
    monthlyPHP: 2100,
    monthlyUSD: 38,
    features: [
      "1 hand-matched book every month",
      "Handwritten index card with marginalia & pairing notes",
      "Letterpress cotton bookmark with quote",
      "Japanese kraft & crimson wax-seal gift wrapping",
      "1 Reading Room day pass per month in San Juan",
      "Free doorstep courier replacement if already owned",
    ],
    ctaLabel: "Begin Solitary Membership",
  },
  {
    id: "bibliophile",
    name: "The Bibliophile Pair",
    tagline: "Our most cherished subscription for curious readers.",
    monthlyPHP: 3800,
    monthlyUSD: 68,
    isPopular: true,
    features: [
      "2 bespoke books every month (curated in dialogue)",
      "Direct WhatsApp / email line to your personal bookseller",
      "Unlimited Reading Room access + complimentary pour-over coffee",
      "Priority reserved armchair at Friday evening salons",
      "10% off all rare, archival, and art monographs",
      "Quarterly literary care package with indie zines & roast beans",
    ],
    ctaLabel: "Join Most Loved Circle",
  },
  {
    id: "patron",
    name: "The Patron & Private Library",
    tagline: "For collectors, interior studios, and expansive private libraries.",
    monthlyPHP: 10900,
    monthlyUSD: 195,
    features: [
      "4–5 curated volumes/mo (including rare/architectural monographs)",
      "Custom engraved brass ex-libris bookplate stamp with your name",
      "Quarterly in-person shelf architecture consultation",
      "2 VIP guest passes to private visiting-author dinners",
      "Global rare-book scouting priority across Tokyo & London",
      "Complimentary archival acid-free Mylar preservation sleeves",
    ],
    ctaLabel: "Inquire for Patron Library",
  },
];

export default function PricingSection() {
  const [cadence, setCadence] = useState<"monthly" | "quarterly">("monthly");
  const { currency, setCurrency, addItem } = useCart();
  const [subscribedId, setSubscribedId] = useState<string | null>(null);

  const discountMultiplier = cadence === "quarterly" ? 0.85 : 1;

  const handleSubscribe = (tier: Tier) => {
    const rawPricePHP = Math.round(tier.monthlyPHP * discountMultiplier);
    const rawPriceUSD = Math.round(tier.monthlyUSD * discountMultiplier);

    addItem({
      id: `membership-${tier.id}-${cadence}`,
      title: `${tier.name} (${cadence === "quarterly" ? "Quarterly Season" : "Monthly Parcel"})`,
      author: "Folio & Lark Literary Studio",
      publisher: "Folio Circle Membership",
      pricePHP: rawPricePHP,
      priceUSD: rawPriceUSD,
      coverTag: "Membership",
      coverColor: tier.isPopular ? "var(--espresso)" : "var(--rust)",
    });

    setSubscribedId(tier.id);
    setTimeout(() => setSubscribedId(null), 2500);
  };

  return (
    <SectionWrapper
      id="pricing"
      backgroundVariant="parchment"
      isSheetOverlap={true}
      showThreadConnector={true}
      className="pt-6 sm:pt-8 pb-14 sm:pb-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="06"
          eyebrow="Memberships & Parcels"
          headline={
            <>
              Simple, honest pricing.{" "}
              <em className="italic font-normal text-rust">Pause any month.</em>
            </>
          }
          subcopy="Zero hidden lock-in contracts. Ship directly to your door anywhere in the Philippines or internationally. Skip or swap with a single WhatsApp message."
        />

        {/* Dual Interactive Switchers (Cadence & Currency) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-sand"
        >
          {/* Cadence Switcher */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-paper border border-sand shadow-inner">
            <button
              onClick={() => setCadence("monthly")}
              className={cn(
                "relative px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-colors cursor-pointer",
                cadence === "monthly" ? "text-espresso font-bold" : "text-umber hover:text-espresso"
              )}
            >
              {cadence === "monthly" && (
                <motion.div
                  layoutId="cadence-active"
                  transition={SOFT_SPRING}
                  className="absolute inset-0 bg-sand rounded-full shadow-sm"
                />
              )}
              <span className="relative z-10">Monthly Parcel</span>
            </button>

            <button
              onClick={() => setCadence("quarterly")}
              className={cn(
                "relative px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer",
                cadence === "quarterly" ? "text-espresso font-bold" : "text-umber hover:text-espresso"
              )}
            >
              {cadence === "quarterly" && (
                <motion.div
                  layoutId="cadence-active"
                  transition={SOFT_SPRING}
                  className="absolute inset-0 bg-sand rounded-full shadow-sm"
                />
              )}
              <span className="relative z-10">Quarterly Season</span>
              <span className="relative z-10 text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-sage text-paper font-bold">
                Save 15%
              </span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-stone">Currency:</span>
            <div className="flex items-center gap-1 p-1 rounded-full bg-paper border border-sand">
              <button
                onClick={() => setCurrency("PHP")}
                className={cn(
                  "px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer",
                  currency === "PHP"
                    ? "bg-espresso text-paper"
                    : "text-umber hover:text-espresso"
                )}
              >
                PHP ₱
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={cn(
                  "px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer",
                  currency === "USD"
                    ? "bg-espresso text-paper"
                    : "text-umber hover:text-espresso"
                )}
              >
                USD $
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3 Editorial Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={STAGGER_CONTAINER}
          style={{ perspective: "1200px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1 gap-6 lg:gap-8 items-stretch mb-12 sm:mb-14"
        >
          {TIERS.map((tier) => {
            const price =
              currency === "USD"
                ? Math.round(tier.monthlyUSD * discountMultiplier)
                : Math.round(tier.monthlyPHP * discountMultiplier);

            const isDark = tier.isPopular;

            return (
              <motion.div
                key={tier.id}
                variants={CARD_3D_PERSPECTIVE}
                whileHover={{ y: -7, transition: SOFT_SPRING }}
                style={{ transformPerspective: 1000 }}
                className={cn(
                  "relative p-7 sm:p-8 rounded-3xl border flex flex-col justify-between transition-[box-shadow,border-color,background-color] duration-300 shadow-xl hover:shadow-2xl",
                  isDark
                    ? "bg-grad-espresso text-paper border-espresso lg:-mt-3 lg:mb-3 ring-2 ring-rust"
                    : "bg-grad-card text-espresso border-sand hover:border-stone/40"
                )}
              >
                {/* Popular Pill */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rust text-paper font-mono text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-foil" />
                    <span>Most Loved by Readers</span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl font-bold mb-1">
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "text-xs font-sans mb-6",
                      isDark ? "text-sand/85" : "text-umber"
                    )}
                  >
                    {tier.tagline}
                  </p>

                  {/* Animated Price Figure */}
                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-current/15">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={`${price}-${currency}-${cadence}`}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.35, ease: LUXURY_EASE }}
                        className="font-serif text-4xl sm:text-5xl font-bold tracking-tight"
                      >
                        {currency === "USD" ? `$${price}` : `₱${price.toLocaleString()}`}
                      </motion.span>
                    </AnimatePresence>
                    <span
                      className={cn(
                        "font-mono text-xs",
                        isDark ? "text-sand/70" : "text-stone"
                      )}
                    >
                      / month
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 text-xs sm:text-sm font-sans">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "w-4 h-4 flex-shrink-0 mt-0.5",
                            isDark ? "text-rust-on-dark" : "text-sage"
                          )}
                        />
                        <span
                          className={cn(
                            isDark ? "text-paper/90" : "text-umber"
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div>
                  <button
                    onClick={() => handleSubscribe(tier)}
                    className={cn(
                      "w-full py-3 rounded-full text-xs sm:text-sm font-medium font-mono transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer",
                      isDark
                        ? "bg-rust hover:bg-rust-hover text-paper"
                        : "bg-espresso hover:bg-rust text-paper"
                    )}
                  >
                    {subscribedId === tier.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Membership Added ✓</span>
                      </>
                    ) : (
                      <>
                        <span>{tier.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Swap Guarantee Strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.1 }}
          className="p-5 rounded-2xl bg-paper border border-sand shadow-sm flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="w-10 h-10 rounded-full bg-sage-soft text-sage flex items-center justify-center flex-shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">
              The Folio &amp; Lark Unconditional Swap Guarantee
            </h4>
            <p className="font-sans text-xs sm:text-sm text-umber mt-0.5">
              Already own the book we picked? Tell us and we&apos;ll swap it via courier the next morning — completely free of charge. No receipts, no awkward explanations.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
