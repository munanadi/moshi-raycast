import { Color } from "@raycast/api";

export function getColorScale(change: number): string {
  const c = Math.abs(change / 10);
  if (change <= 0.05 && change >= -0.05)
    return Color.PrimaryText;
  if (change > 0) return Color.Red;
  return Color.Green;
}

export function parseTickerQuery(q: string) {
  const fiats = ["gbp", "usd", "eur", "sgd", "vnd"];
  q = q.toLowerCase();
  let isCompare = false;
  let isFiat = false;
  let [base, target] = q.split("/");
  if (target) {
    isCompare = true;
    isFiat = fiats.includes(base) && fiats.includes(target);
  } else {
    const fiatBase = fiats.find((f) => q.startsWith(f));
    if (fiatBase) {
      const fiatTarget =
        q.substring(fiatBase.length) || "usd";
      isFiat =
        fiats.includes(fiatBase) &&
        fiats.includes(fiatTarget);
      base = isFiat ? fiatBase : q;
      target = isFiat ? fiatTarget : "";
      isCompare = isFiat;
    }
  }
  return { isCompare, isFiat, base, target };
}
