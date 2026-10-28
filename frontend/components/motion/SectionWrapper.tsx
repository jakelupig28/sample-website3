"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SCROLL_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  isSheetOverlap?: boolean;
  showThreadConnector?: boolean;
  backgroundVariant?: "paper" | "parchment" | "espresso";
  allowSticky?: boolean;
}

const SECTION_GRADIENT_BY_ID: Record<string, string> = {
  imprints: "bg-grad-imprints text-espresso",
  calm: "bg-grad-calm text-espresso",
  services: "bg-grad-services text-espresso",
  week: "bg-grad-ritual text-espresso",
  proof: "bg-grad-proof text-espresso",
  pricing: "bg-grad-pricing text-espresso",
  faq: "bg-grad-faq text-espresso",
};

export default function SectionWrapper({
  id,
  className,
  children,
  backgroundVariant = "paper",
  allowSticky = false,
}: SectionWrapperProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  // Smooth editorial glide without any inter-section border lines or dark seams
  const contentY = useTransform(smoothProgress, [0, 0.16, 0.86, 1], [14, 0, 0, -6]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.12, 0.92, 1], [0.85, 1, 1, 0.96]);

  const fallbackBgClasses = {
    paper: "bg-grad-services text-espresso",
    parchment: "bg-grad-imprints text-espresso",
    espresso: "bg-grad-espresso text-paper",
  }[backgroundVariant];

  const resolvedBg = (id && SECTION_GRADIENT_BY_ID[id]) || fallbackBgClasses;

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn(
        "relative w-full",
        resolvedBg,
        className
      )}
    >
      {allowSticky ? (
        <motion.div style={{ opacity: contentOpacity }} className="w-full">
          {children}
        </motion.div>
      ) : (
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="w-full will-change-[transform,opacity]"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
