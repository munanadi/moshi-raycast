import { Color } from "@raycast/api";

export function getColorScale(change: number): string {
  const c = Math.abs(change / 10);
  if (change <= 0.05 && change >= -0.05)
    return Color.PrimaryText;
  if (change > 0) return Color.Red;
  return Color.Green;
}
