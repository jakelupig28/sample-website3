"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SCROLL_SPRING } from "@/lib/motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rust via-brass to-sage origin-left z-[100] pointer-events-none"
    />
  );
}
