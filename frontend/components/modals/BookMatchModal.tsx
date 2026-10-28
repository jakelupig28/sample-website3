"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, ArrowRight, BookOpen, Layers } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SOFT_SPRING, LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MOODS = [
  {
    id: "solitary",
    title: "Solitary & Meditative",
    description: "Quiet mornings, attics, winter light, poetic prose.",
    color: "#2D6A4F",
  },
  {
    id: "architectural",
    title: "Architectural & Crisp",
    description: "Concrete forms, spatial theory, mid-century design monographs.",
    color: "#171412",
  },
  {
    id: "melancholic",
    title: "Lyrical & Melancholic",
    description: "Translated European novellas, grief investigations, deep emotion.",
    color: "#C85A32",
  },
  {
    id: "curious",
    title: "Curious & Avant-Garde",
    description: "Risograph indie zines, surrealist experiments, radical essays.",
    color: "#D97706",
  },
];

const PREVIEWS_BY_MOOD: Record<string, { title: string; author: string; publisher: string; pricePHP: number; priceUSD: number; note: string; coverColor: string }[]> = {
  solitary: [
    { title: "The Poetics of Space", author: "Gaston Bachelard", publisher: "Penguin Classics", pricePHP: 1150, priceUSD: 22, note: "On cellars, attics, and the poetry of dwelling.", coverColor: "#2D6A4F" },
    { title: "Winter Journal", author: "Paul Auster", publisher: "Henry Holt", pricePHP: 1250, priceUSD: 24, note: "Physical memory and the sensations of aging.", coverColor: "#171412" },
    { title: "The Sound of Waves", author: "Yukio Mishima", publisher: "Vintage International", pricePHP: 980, priceUSD: 18, note: "Pristine island romance and oceanic serenity.", coverColor: "#1E3A8A" },
  ],
  architectural: [
    { title: "The Eyes of the Skin", author: "Juhani Pallasmaa", publisher: "Wiley / MIT", pricePHP: 1550, priceUSD: 29, note: "Haptic sensory architecture beyond visual spectacle.", coverColor: "#C85A32" },
    { title: "Tadao Ando: Light & Water", author: "Philip Jodidio", publisher: "Taschen", pricePHP: 4200, priceUSD: 78, note: "Monumental photography of concrete temples.", coverColor: "#171412" },
    { title: "Invisible Cities", author: "Italo Calvino", publisher: "Harcourt", pricePHP: 950, priceUSD: 18, note: "55 impossible mathematical dream cities.", coverColor: "#2D6A4F" },
  ],
  melancholic: [
    { title: "Bluets", author: "Maggie Nelson", publisher: "Wave Books", pricePHP: 1250, priceUSD: 24, note: "Lyrical propositions on grief and the color blue.", coverColor: "#1E3A8A" },
    { title: "Austerlitz", author: "W.G. Sebald", publisher: "Modern Library", pricePHP: 1450, priceUSD: 27, note: "Haunting European train stations and lost archives.", coverColor: "#171412" },
    { title: "Speedboat", author: "Renata Adler", publisher: "NYRB Classics", pricePHP: 1350, priceUSD: 25, note: "Brilliant fractured dispatch from 1970s Manhattan.", coverColor: "#C85A32" },
  ],
  curious: [
    { title: "Design as Art", author: "Bruno Munari", publisher: "Penguin Classics", pricePHP: 1550, priceUSD: 29, note: "Playful visual games and childlike design intuition.", coverColor: "#D97706" },
    { title: "Flights", author: "Olga Tokarczuk", publisher: "Fitzcarraldo Editions", pricePHP: 1450, priceUSD: 28, note: "Nobel prize winning essayistic constellation novel.", coverColor: "#1E3A8A" },
    { title: "Pasig River Flâneur", author: "Studio Maginhawa", publisher: "Manila Indie Press", pricePHP: 650, priceUSD: 12, note: "Risograph zine documenting hidden Manila canals.", coverColor: "#C85A32" },
  ],
};

export default function BookMatchModal() {
  const { isBookMatchOpen, closeBookMatch, addItem, currency } = useCart();
  const [step, setStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<string>("solitary");
  const [lastLovedBook, setLastLovedBook] = useState<string>("");
  const [formatPreference, setFormatPreference] = useState<string>("paperback");
  const [addedAll, setAddedAll] = useState(false);

  if (!isBookMatchOpen) return null;

  const currentRecommendations = PREVIEWS_BY_MOOD[selectedMood] || PREVIEWS_BY_MOOD.solitary;

  const handleAddAllToBag = () => {
    currentRecommendations.forEach((book, i) => {
      addItem({
        id: `match-${selectedMood}-${i}`,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        pricePHP: book.pricePHP,
        priceUSD: book.priceUSD,
        coverTag: "Curated Match",
        coverColor: book.coverColor,
      });
    });
    setAddedAll(true);
    setTimeout(() => {
      setAddedAll(false);
      closeBookMatch();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeBookMatch}
        className="fixed inset-0 bg-espresso/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={SOFT_SPRING}
        className="relative w-full max-w-2xl bg-paper border border-sand rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sand mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rust" />
            <span className="font-mono text-xs uppercase tracking-wider text-stone">
              Taste Calibration · Step {step} of 3
            </span>
          </div>
          <button
            onClick={closeBookMatch}
            className="p-2 rounded-full hover:bg-parchment text-umber hover:text-espresso transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: PICK MOOD */}
        {step === 1 && (
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mb-2">
              What is your current mental weather?
            </h3>
            <p className="font-sans text-sm text-umber mb-6">
              Choose the emotional tone you want your next chapter to occupy.
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              {MOODS.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={cn(
                      "p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-left",
                      isSelected
                        ? "bg-parchment border-rust shadow-md ring-1 ring-rust"
                        : "bg-paper border-sand hover:border-stone"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-base text-espresso">
                        {m.title}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-rust" />}
                    </div>
                    <p className="font-sans text-xs text-umber">{m.description}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-full bg-espresso hover:bg-rust text-paper font-mono text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Reading History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: READING HISTORY */}
        {step === 2 && (
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mb-2">
              Tell us a book that deeply moved you.
            </h3>
            <p className="font-sans text-sm text-umber mb-6">
              Even if it was five years ago. Our booksellers use this as our North Star.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="font-mono text-xs text-stone uppercase block mb-1.5">
                  Last Loved Book or Author:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Austerlitz by W.G. Sebald' or 'Joan Didion essays'"
                  value={lastLovedBook}
                  onChange={(e) => setLastLovedBook(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand bg-parchment/50 text-espresso text-sm font-sans focus:outline-none focus:border-rust transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-stone uppercase block mb-1.5">
                  Format Preference:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormatPreference("paperback")}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer",
                      formatPreference === "paperback"
                        ? "bg-espresso text-paper border-espresso"
                        : "bg-parchment text-umber border-sand"
                    )}
                  >
                    Pocket Paperback (Munken paper)
                  </button>
                  <button
                    onClick={() => setFormatPreference("clothbound")}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer",
                      formatPreference === "clothbound"
                        ? "bg-espresso text-paper border-espresso"
                        : "bg-parchment text-umber border-sand"
                    )}
                  >
                    Hardcover / Clothbound Edition
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-full border border-sand bg-parchment text-espresso text-xs font-mono font-medium hover:bg-sand transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-full bg-espresso hover:bg-rust text-paper text-xs font-mono font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Generate Bespoke Match</span>
                <Sparkles className="w-4 h-4 text-foil" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INSTANT 3-BOOK BESPOKE RECOMMENDATION */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sage mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3 TITLES MATCHED BY SAN JUAN BOOKSELLERS</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mb-2">
              Your Custom Folio Stack
            </h3>
            <p className="font-sans text-xs sm:text-sm text-umber mb-5">
              Based on your mood &ldquo;{MOODS.find((m) => m.id === selectedMood)?.title}&rdquo;.
            </p>

            <div className="space-y-3 mb-6">
              {currentRecommendations.map((book, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-parchment border border-sand flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-14 rounded shadow flex items-center justify-center text-white text-[8px] font-mono p-1 text-center"
                      style={{ backgroundColor: book.coverColor }}
                    >
                      FOLIO
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-espresso">
                        {book.title}
                      </h4>
                      <p className="font-sans text-xs text-umber">
                        {book.author} · {book.publisher}
                      </p>
                      <p className="font-serif italic text-[11px] text-stone mt-0.5">
                        {book.note}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-espresso block">
                      {currency === "USD" ? `$${book.priceUSD}` : `₱${book.pricePHP.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-5 rounded-full border border-sand bg-parchment text-espresso text-xs font-mono font-medium hover:bg-sand transition-colors cursor-pointer"
              >
                ← Adjust Taste
              </button>
              <button
                onClick={handleAddAllToBag}
                className={cn(
                  "flex-1 py-3.5 rounded-full font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer",
                  addedAll
                    ? "bg-sage text-paper"
                    : "bg-espresso hover:bg-rust text-paper"
                )}
              >
                {addedAll ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Stack to Reading Bag!</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 text-foil" />
                    <span>Add All 3 Books to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
