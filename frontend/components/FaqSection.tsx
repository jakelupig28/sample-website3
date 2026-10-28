"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionWrapper from "./motion/SectionWrapper";
import SectionHeader from "./motion/SectionHeader";
import {
  LUXURY_EASE,
  STAGGER_CONTAINER,
  FADE_UP_VARIANTS,
  VIEWPORT_ONCE,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How do your booksellers pick books without an algorithm?",
    answer:
      "When you join or order a bespoke stack, you tell us three titles you loved, what you're feeling lately, and what you want to avoid. Our three resident booksellers in San Juan gather around our cedar table every Tuesday, pull 5–10 candidate copies from our shelves, and debate them until we find the title that will truly resonate with your current life.",
    tag: "Human Curation",
  },
  {
    question: "What if you send me a book I've already read or already own?",
    answer:
      "You have our Unconditional Swap Guarantee. Simply message our bookseller via WhatsApp or email with a photo of the duplicate. We dispatch a replacement via zero-plastic courier the very next morning — free of charge. You can pass the duplicate on to a friend or return it in the prepaid envelope.",
    tag: "Zero-Risk Guarantee",
  },
  {
    question: "Can I visit your physical reading room in Manila?",
    answer:
      "Yes! Our reading sanctuary is located on Wilson St. in San Juan, Metro Manila. We are open Tuesday through Sunday from 10:00 AM to 9:00 PM. Members enjoy unlimited access with complimentary pour-over Ethiopian brews, vinyl turntables with headphones, and phone-free lockers. Non-members can purchase day passes at the counter.",
    tag: "Physical Sanctuary",
  },
  {
    question: "Do you ship outside the Philippines?",
    answer:
      "Yes, we ship worldwide! We regularly dispatch carefully packaged kraft parcels with custom wax seals to readers across Southeast Asia (Singapore, Malaysia, Indonesia), Japan, Australia, the United Kingdom, and North America via DHL Express with full door-to-door tracking.",
    tag: "Worldwide Shipping",
  },
  {
    question: "How does the 'Blind Date With a Book' work?",
    answer:
      "Each month, we hand-select exceptional forgotten classics, translated novellas, or quiet essay collections. We wrap the entire volume in heavy brown kraft paper, seal it with deep red wax, and handwrite the opening sentence, atmospheric clues, and tasting notes on an attached index card. You won't know the author or title until you break the seal.",
    tag: "Surprise Parcels",
  },
  {
    question: "Can I pause, skip, or cancel my subscription at any time?",
    answer:
      "Absolutely. We have zero lock-ins and zero awkward phone calls. If you're traveling, taking a sabbatical, or simply need time to catch up on your reading nightstand, you can pause or cancel anytime with one click in your account or a 3-word message to your personal bookseller.",
    tag: "Account Flexibility",
  },
  {
    question: "Can you curate a custom library for an office, studio, or private home?",
    answer:
      "Yes. Our Private Library Architecture service works with interior architects, boutique hospitality spaces, and private homeowners. We source between 50 to 500 cohesive, design-forward volumes, complete with custom cataloguing, provenance ledgers, and brass bookplate stamps.",
    tag: "Spatial Architecture",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper
      id="faq"
      backgroundVariant="paper"
      showThreadConnector={true}
      className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="07"
          eyebrow="Questions & Answers"
          headline={
            <>
              Everything you might wonder{" "}
              <em className="italic font-normal text-rust">
                before your first chapter
              </em>
              .
            </>
          }
          subcopy="Straight answers from real humans. No marketing fluff, no fine print."
          align="center"
        />

        {/* 7 Choreographed Accordion Items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={STAGGER_CONTAINER}
          className="space-y-3.5"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={FADE_UP_VARIANTS}
                className={cn(
                  "rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 overflow-hidden",
                  isOpen
                    ? "bg-gradient-to-br from-paper via-parchment to-tint-rust/45 border-rust/40 shadow-md"
                    : "bg-grad-card border-sand hover:border-stone/40 shadow-sm"
                )}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-stone mb-1">
                      {faq.tag}
                    </span>
                    <span className="font-serif text-lg sm:text-xl font-bold text-espresso leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.3, ease: LUXURY_EASE }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors mt-1",
                      isOpen
                        ? "bg-rust text-paper"
                        : "bg-parchment text-umber border border-sand"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: { duration: 0.4, ease: LUXURY_EASE },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: { duration: 0.3, ease: LUXURY_EASE },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base font-sans text-umber leading-relaxed border-t border-sand/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
