/**
 * Convert Sanity blockStyles preset values to React CSS properties.
 * Keep the surface small: this is the single source of truth for what each
 * preset maps to.
 */
import type { CSSProperties } from "react";

const SPACING_PX: Record<string, number> = {
  none: 0,
  xs: 8,
  sm: 16,
  md: 32,
  lg: 48,
  xl: 64,
  "2xl": 96,
  "3xl": 128,
};

const RADIUS_PX: Record<string, string> = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};

const MAX_WIDTH_PX: Record<string, string> = {
  full: "100%",
  wide: "1280px",
  medium: "1024px",
  small: "768px",
  narrow: "640px",
};

const BG: Record<string, string> = {
  transparent: "transparent",
  card: "color-mix(in oklab, var(--card) 60%, transparent)",
  "card-strong": "var(--card)",
  accent: "var(--accent)",
  "gold-tint": "color-mix(in oklab, var(--gold) 8%, transparent)",
  "gold-strong": "color-mix(in oklab, var(--gold) 25%, transparent)",
  dark: "oklch(5% 0.005 60)",
};

const BORDER_COLOR: Record<string, string> = {
  none: "transparent",
  gold: "var(--gold)",
  "gold-subtle": "color-mix(in oklab, var(--gold) 25%, transparent)",
  border: "var(--border)",
};

export type BlockStyles = {
  maxWidth?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginBottom?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
  background?: string;
  textAlign?: "left" | "center" | "right";
};

/**
 * Returns inline CSS for a block. Falls through to {} if styles is undefined.
 * Designed to be spread on top of any defaults the section already applies.
 */
export function applyBlockStyles(s?: BlockStyles | null): CSSProperties {
  if (!s) return {};
  const css: CSSProperties = {};

  if (s.paddingTop && s.paddingTop in SPACING_PX)
    css.paddingTop = SPACING_PX[s.paddingTop];
  if (s.paddingRight && s.paddingRight in SPACING_PX)
    css.paddingRight = SPACING_PX[s.paddingRight];
  if (s.paddingBottom && s.paddingBottom in SPACING_PX)
    css.paddingBottom = SPACING_PX[s.paddingBottom];
  if (s.paddingLeft && s.paddingLeft in SPACING_PX)
    css.paddingLeft = SPACING_PX[s.paddingLeft];
  if (s.marginTop && s.marginTop in SPACING_PX) css.marginTop = SPACING_PX[s.marginTop];
  if (s.marginBottom && s.marginBottom in SPACING_PX)
    css.marginBottom = SPACING_PX[s.marginBottom];

  if (s.maxWidth && s.maxWidth !== "full" && s.maxWidth in MAX_WIDTH_PX) {
    css.maxWidth = MAX_WIDTH_PX[s.maxWidth];
    css.marginLeft = "auto";
    css.marginRight = "auto";
  }

  if (s.borderWidth && s.borderWidth !== "0") {
    css.borderWidth = `${s.borderWidth}px`;
    css.borderStyle = "solid";
    css.borderColor = BORDER_COLOR[s.borderColor || "border"] || BORDER_COLOR.border;
  }

  if (s.borderRadius && s.borderRadius !== "none" && s.borderRadius in RADIUS_PX) {
    css.borderRadius = RADIUS_PX[s.borderRadius];
  }

  if (s.background && s.background !== "transparent" && s.background in BG) {
    css.background = BG[s.background];
  }

  if (s.textAlign) css.textAlign = s.textAlign;

  return css;
}

/**
 * Returns true if the styles object has any meaningful override.
 * Useful for skipping wrapping when no styles are set.
 */
export function hasBlockStyles(s?: BlockStyles | null): boolean {
  if (!s) return false;
  return Object.values(s).some(
    (v) => v != null && v !== "" && v !== "none" && v !== "transparent" && v !== "0",
  );
}
