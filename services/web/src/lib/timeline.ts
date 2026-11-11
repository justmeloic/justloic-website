import type { CareerItem } from "@/data/career";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Fractional year, e.g. "2021-07" -> 2021.5 */
export const toYear = (s?: string | null) => {
  if (!s) return null;
  const [y, m = 1, d = 1] = s.split("-").map(Number);
  return y + (m - 1) / 12 + (d - 1) / 365;
};

/** "2021-07" -> "Jul 2021"; "2021" -> "2021"; empty -> "Present" */
export const formatDate = (s?: string | null) => {
  if (!s) return "Present";
  const [y, m] = s.split("-").map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : `${y}`;
};

export const formatRange = (it: CareerItem) =>
  it.date
    ? formatDate(it.date)
    : `${it.start ? formatDate(it.start) : "Pre"} – ${it.end ? formatDate(it.end) : "Present"}`;

/** The date an item is placed at on the timeline. */
export const anchor = (it: CareerItem) => it.date || it.start || null;

/** Item counts keyed by "all", each type and each org. */
export const countItems = (items: CareerItem[]) => {
  const c: Record<string, number> = { all: items.length };
  for (const it of items) {
    c[it.type] = (c[it.type] || 0) + 1;
    c[it.org] = (c[it.org] || 0) + 1;
  }
  return c;
};

export const filterItems = (items: CareerItem[], type: string, org: string) =>
  items.filter((it) => (type === "all" || it.type === type) && (org === "all" || it.org === org));

/** Newest first, grouped by anchor year; undated items go under "Earlier". */
export const groupByYear = (items: CareerItem[]): [string, CareerItem[]][] => {
  const map = new Map<string, CareerItem[]>();
  [...items]
    .sort((a, b) => (toYear(anchor(b)) ?? 0) - (toYear(anchor(a)) ?? 0))
    .forEach((it) => {
      const a = anchor(it);
      const key = a ? a.slice(0, 4) : "Earlier";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    });
  return [...map];
};
