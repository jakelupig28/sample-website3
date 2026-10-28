"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SOFT_SPRING, LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function ReadingBagDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    currency,
    subtotal,
    totalItems,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  const handleCloseAndReset = () => {
    if (checkoutComplete) {
      clearCart();
      setCheckoutComplete(false);
    }
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCloseAndReset}
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm"
      />

      {/* Slide-Over Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={SOFT_SPRING}
        className="relative w-full max-w-md bg-paper border-l border-sand shadow-2xl h-full flex flex-col justify-between z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-sand flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-rust" />
            <div>
              <h3 className="font-serif text-xl font-bold text-espresso">
                Your Reading Bag
              </h3>
              <span className="font-mono text-xs text-stone">
                {totalItems} {totalItems === 1 ? "edition" : "editions"} selected
              </span>
            </div>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-2 rounded-full hover:bg-parchment text-umber hover:text-espresso transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutComplete ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-sage-soft text-sage mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-espresso">
                Parcel Scheduled for Dispatch!
              </h4>
              <p className="font-sans text-sm text-umber max-w-xs mx-auto leading-relaxed">
                Thank you. Our booksellers at Wilson St. are now wrapping your stack in Japanese brown kraft paper and red wax.
              </p>
              <div className="p-3 rounded-xl bg-parchment border border-sand text-xs font-mono text-espresso">
                Dispatched by Dante · Vespa Unit 03
              </div>
              <button
                onClick={handleCloseAndReset}
                className="mt-4 px-6 py-2.5 rounded-full bg-espresso text-paper font-mono text-xs hover:bg-rust transition-colors cursor-pointer"
              >
                Close &amp; Continue Browsing
              </button>
            </motion.div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-stone">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-3 text-sand" />
              <p className="font-serif text-lg text-umber">Your bag is currently empty.</p>
              <p className="font-sans text-xs mt-1">Explore our imprints or curate a stack above.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-parchment border border-sand flex items-start justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-16 rounded shadow flex items-center justify-center text-white text-[9px] font-mono p-1 flex-shrink-0"
                    style={{ backgroundColor: item.coverColor || "var(--espresso)" }}
                  >
                    FOLIO
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-espresso leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-umber">
                      by {item.author}
                    </p>
                    <span className="font-mono text-xs font-bold text-rust mt-1 block">
                      {currency === "USD"
                        ? `$${item.priceUSD * item.quantity}`
                        : `₱${(item.pricePHP * item.quantity).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-16">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-stone hover:text-rust transition-colors p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 border border-sand rounded-full bg-paper px-2 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-umber hover:text-espresso cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-semibold text-espresso">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-umber hover:text-espresso cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!checkoutComplete && items.length > 0 && (
          <div className="p-6 border-t border-sand bg-paper space-y-4">
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-umber">
                <span>Doorstep Courier (Metro Manila):</span>
                <span className="text-sage font-bold">Complimentary Free</span>
              </div>
              <div className="flex justify-between text-umber">
                <span>Packaging:</span>
                <span>Kraft &amp; Crimson Wax Seal</span>
              </div>
              <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-sand">
                <span>Total Amount:</span>
                <span>
                  {currency === "USD"
                    ? `$${subtotal}`
                    : `₱${subtotal.toLocaleString()}`}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 rounded-full bg-espresso hover:bg-rust text-paper font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isCheckingOut ? (
                <span>Packing Parcel...</span>
              ) : (
                <>
                  <span>Dispatch Stack to My Door</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-stone">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>Unconditional Next-Morning Swap Guarantee</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
