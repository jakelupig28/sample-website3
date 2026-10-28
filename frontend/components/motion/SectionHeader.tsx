"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number?: string;
  eyebrow?: string;
  headline: React.ReactNode;
  subcopy?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export default function SectionHeader({
  headline,
  subcopy,
  align = "left",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: LUXURY_EASE }}
      className={cn(
        "mb-8 sm:mb-10",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {/* Main Fraunces Serif Headline */}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.14] tracking-tight",
          isDark ? "text-paper" : "text-espresso"
        )}
      >
        {headline}
      </h2>

      {/* Lead Paragraph */}
      {subcopy && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed font-sans",
            isDark ? "text-sand/80" : "text-umber"
          )}
        >
          {subcopy}
        </p>
      )}
    </motion.div>
  );
}
