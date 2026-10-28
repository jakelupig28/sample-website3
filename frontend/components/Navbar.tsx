"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Menu, X, ArrowRight } from "lucide-react";
import FolioLogoIcon from "./FolioLogoIcon";
import { useCart } from "@/context/CartContext";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { SOFT_SPRING } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Imprints", href: "#imprints" },
  { label: "The Difference", href: "#calm" },
  { label: "Experiences", href: "#services" },
  { label: "How We Curate", href: "#week" },
  { label: "Shelf Talkers", href: "#proof" },
  { label: "Memberships", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("imprints");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, openBookMatch } = useCart();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);

      // Spy on active sections
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 240;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollTo(href, -84);
    setActiveSection(href.substring(1));
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-[padding,background-color,box-shadow] duration-300 ease-out",
          isScrolled || isMobileMenuOpen
            ? "py-2.5 bg-paper/95 backdrop-blur-md shadow-[0_8px_28px_rgba(23,20,18,0.04)]"
            : "py-3.5 sm:py-4 bg-paper/0 shadow-[0_8px_28px_rgba(23,20,18,0)]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Monogram & Title (Standalone Bespoke Book Icon — No Circle) */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.scrollY > 10) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <FolioLogoIcon className="w-7 h-6 text-espresso transition-all duration-300 group-hover:text-rust group-hover:scale-105 group-hover:-rotate-2" />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-espresso leading-none group-hover:text-rust transition-colors">
                Folio &amp; Lark
              </span>
            </div>
          </Link>

          {/* Center: Desktop Editorial Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-parchment/80 border border-sand p-1.5 rounded-full shadow-inner">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-sans font-medium transition-colors duration-200 rounded-full",
                    isActive
                      ? "text-espresso font-semibold"
                      : "text-umber hover:text-espresso"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      transition={SOFT_SPRING}
                      className="absolute inset-0 bg-sand rounded-full shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Bag + Match CTA */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Reading Bag button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              aria-label="View Reading Bag"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full border border-sand bg-parchment/80 hover:bg-sand text-espresso transition-all duration-300 text-xs sm:text-sm font-medium group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-umber group-hover:text-espresso transition-colors" />
              <span className="hidden sm:inline font-sans">Bag</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={SOFT_SPRING}
                  className="font-mono text-xs px-1.5 py-0.5 rounded-full bg-espresso text-paper font-semibold min-w-[20px] text-center"
                >
                  {totalItems}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Match CTA button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={openBookMatch}
              className="hidden sm:flex items-center gap-2 bg-espresso hover:bg-rust text-paper transition-all duration-300 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-foil" />
              <span>Get Matched with a Book</span>
            </motion.button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 rounded-full border border-sand bg-parchment/80 text-espresso hover:bg-sand transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-espresso/25 backdrop-blur-[2px] z-20 xl:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-[56px] sm:top-[62px] max-h-[calc(100svh-64px)] overflow-y-auto bg-paper border-b border-sand p-5 sm:p-6 shadow-xl z-30 xl:hidden"
            >
              <div className="max-w-lg mx-auto flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center justify-between py-2.5 text-base font-serif text-espresso hover:text-rust border-b border-sand/50"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-stone" />
                  </a>
                ))}
                <div className="pt-3 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openBookMatch();
                    }}
                    className="w-full py-3 rounded-full bg-espresso text-paper font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-foil" />
                    Get Matched with a Book
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
