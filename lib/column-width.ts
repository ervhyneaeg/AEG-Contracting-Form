import type { CSSProperties } from "react";

const PRESET_WIDTHS: Record<string, string> = {
  full: "100%",
  "1/2": "50%",
  "1/3": "33.3333%",
  "2/3": "66.6666%",
  "1/4": "25%",
  "3/4": "75%",
  "1/5": "20%",
  "1/6": "16.6666%",
};

/**
 * Convert a column's width preset (or custom %) to CSS flex props.
 * - "auto" or missing → flex: 1 (equal share)
 * - "custom" + customWidth → fixed % basis
 * - named preset → fixed % basis
 */
export function columnWidthStyle(
  preset?: string,
  customWidth?: number,
): CSSProperties {
  if (preset === "custom" && typeof customWidth === "number") {
    return { flexBasis: `${customWidth}%`, flexGrow: 0, flexShrink: 0 };
  }
  if (preset && preset !== "auto" && preset in PRESET_WIDTHS) {
    return { flexBasis: PRESET_WIDTHS[preset], flexGrow: 0, flexShrink: 0 };
  }
  return { flex: 1, minWidth: 0 };
}
