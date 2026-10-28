import React from "react";
import { cn } from "@/lib/utils";

interface FolioLogoIconProps {
  className?: string;
  accentColor?: string;
}

export default function FolioLogoIcon({
  className,
  accentColor = "var(--rust)",
}: FolioLogoIconProps) {
  return (
    <svg
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-7 h-6 flex-shrink-0", className)}
    >
      {/* Lower hardcover board / stacked under-leaf curve */}
      <path
        d="M2.5 21.5C6.8 19.8 11.8 20.4 16 23.2C20.2 20.4 25.2 19.8 29.5 21.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* Left open fanned page */}
      <path
        d="M16 7.4C12.4 4.6 7.4 4.2 3.2 5.6V18.6C7.4 17.2 12.4 17.6 16 20.4"
        stroke="currentColor"
        strokeWidth="1.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right open fanned page */}
      <path
        d="M16 7.4C19.6 4.6 24.6 4.2 28.8 5.6V18.6C24.6 17.2 19.6 17.6 16 20.4"
        stroke="currentColor"
        strokeWidth="1.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center spine stitch */}
      <path
        d="M16 7.4V23.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Subtle editorial prose lines on left page */}
      <path
        d="M6.8 9.8C8.9 9.3 11.1 9.5 12.8 10.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M6.8 13.3C8.9 12.8 11.1 13 12.8 13.9"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Signature silk bookmark ribbon & swallowtail rising from right leaf */}
      <path
        d="M21.2 4.7V13.8L23.1 12.3L25 13.8V5.0"
        fill={accentColor}
        stroke={accentColor}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

