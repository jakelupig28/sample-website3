import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { CartProvider } from "@/context/CartContext";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import PaletteSwitcher from "@/components/PaletteSwitcher";
import BookMatchModal from "@/components/modals/BookMatchModal";
import ReadingBagDrawer from "@/components/modals/ReadingBagDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Folio & Lark — Reading Sanctuary & Literary Curation Studio | Manila",
  description:
    "An independent bookstore, reading sanctuary, and bespoke curation studio in San Juan, Manila. Curating rare first editions, translated fiction, and slow reading rituals without algorithms. Shipping worldwide.",
  keywords: [
    "Folio and Lark",
    "Independent bookstore Manila",
    "Reading sanctuary",
    "Literary curation",
    "Translated fiction",
    "San Juan bookstore",
    "Blind date with a book",
    "Unplugged reading room",
  ],
  authors: [{ name: "Folio & Lark Booksellers" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  openGraph: {
    title: "Folio & Lark — Reading Sanctuary & Literary Curation Studio",
    description:
      "We filter out the noise. You get lost in the pages. An independent bookstore and reading sanctuary in Manila.",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper text-espresso font-sans antialiased selection:bg-rust selection:text-paper">
        {/* Subtle fixed SVG film/paper grain overlay across the viewport */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <CartProvider>
          <SmoothScrollProvider>
            {/* Top Scroll Progress Ribbon */}
            <ScrollProgress />

            {/* Floating Editorial Header */}
            <Navbar />

            {/* Main Page Content */}
            <main className="relative flex flex-col w-full min-h-screen">
              {children}
            </main>

            {/* Global Slide-Over Modals, Drawers & Palette Switcher */}
            <PaletteSwitcher />
            <BookMatchModal />
            <ReadingBagDrawer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
