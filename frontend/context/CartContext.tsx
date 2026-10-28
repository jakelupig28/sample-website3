"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BookItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  pricePHP: number;
  priceUSD: number;
  coverTag?: string;
  coverColor?: string;
  quantity: number;
}

interface CartContextType {
  items: BookItem[];
  currency: "PHP" | "USD";
  setCurrency: (c: "PHP" | "USD") => void;
  addItem: (book: Omit<BookItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isBookMatchOpen: boolean;
  setIsBookMatchOpen: (open: boolean) => void;
  openBookMatch: () => void;
  closeBookMatch: () => void;
  totalItems: number;
  subtotal: number;
  lastAddedId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BookItem[]>([
    {
      id: "initial-book-1",
      title: "The Poetics of Space",
      author: "Gaston Bachelard",
      publisher: "Penguin Classics",
      pricePHP: 1150,
      priceUSD: 22,
      coverTag: "Philosophy · Clothbound",
      coverColor: "#2D6A4F",
      quantity: 1,
    },
  ]);
  const [currency, setCurrency] = useState<"PHP" | "USD">("PHP");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookMatchOpen, setIsBookMatchOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const addItem = (book: Omit<BookItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setLastAddedId(book.id);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BookItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openBookMatch = () => setIsBookMatchOpen(true);
  const closeBookMatch = () => setIsBookMatchOpen(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = currency === "USD" ? item.priceUSD : item.pricePHP;
    return acc + unitPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        setCurrency,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isBookMatchOpen,
        setIsBookMatchOpen,
        openBookMatch,
        closeBookMatch,
        totalItems,
        subtotal,
        lastAddedId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
