"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CAREER, ORGS, TYPES, type CareerItem, type OrgKey } from "@/data/career";
import { ORG_LOGOS } from "@/data/logos";
import { countItems, filterItems, formatRange, groupByYear } from "@/lib/timeline";

const ORG_ORDER: OrgKey[] = ["google", "bell", "goc", "uottawa", "uwindsor"];

function Entry({ it, open, onToggle }: { it: CareerItem; open: boolean; onToggle: () => void }) {
  const org = ORGS[it.org];
  const logo = ORG_LOGOS[it.org];
  const where = it.date ? it.venue : it.location;
  return (
    <article className="ledger-entry relative py-3 pl-8 md:pl-10">
      <button
        aria-expanded={open}
        onClick={onToggle}
        className="ledger-toggle group -mx-4 w-full rounded-xl px-4 py-3 text-left hover:bg-white dark:hover:bg-stone-900/60"
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[9px] tracking-wider text-stone-500 dark:text-stone-400">
            {formatRange(it)}
            {it.approx && (
              <span title="approximate" className="text-[#B4884D]">
                {" "}
                ≈
              </span>
            )}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
            {TYPES[it.type].singular}
          </span>
        </div>
        <div className="mt-1 flex items-start justify-between gap-4">
          <h3
            className={`font-serif ${it.type === "role" ? "text-lg md:text-xl" : "text-base md:text-lg"} font-medium leading-snug text-stone-950 transition group-hover:text-stone-900 dark:text-stone-100 dark:group-hover:text-white`}
          >
            {it.title}
          </h3>
          <span className="ledger-chev mt-0.5 text-base leading-none text-stone-400 transition-transform">
            +
          </span>
        </div>
        <p className="mt-1 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span
            className={`org-logo org-logo-${it.org}`}
            role="img"
            aria-label={logo?.label ?? org.name}
            title={logo?.label ?? org.name}
            dangerouslySetInnerHTML={{ __html: logo?.svg ?? org.name }}
          />
        </p>
      </button>
      <div className="ledger-drawer">
        <div>
          <div className="max-w-2xl space-y-2.5 pb-4 pt-2">
            {where && where !== org.name && (
              <p className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
                {where}
              </p>
            )}
            {it.summary && (
              <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400">
                {it.summary}
              </p>
            )}
            {!!it.bullets?.length && (
              <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                {it.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {!!it.skills?.length && (
              <div className="flex flex-wrap gap-1 font-mono text-[10px] text-stone-500">
                {it.skills.map((s) => (
                  <span key={s} className="rounded bg-stone-100 px-2 py-0.5 dark:bg-stone-800">
                    {s}
                  </span>
                ))}
              </div>
            )}
            {it.link && (
              <a
                href={it.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-[11px] text-stone-900 underline underline-offset-2 hover:text-black dark:text-stone-300 dark:hover:text-white"
              >
                Read more ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Dock-style magnification (like the macOS Dock): the entry at the focus point — the
 * pointer while it's over the ledger, otherwise a reading line just above the viewport
 * centre — scales up and the others shrink/fade with distance (Gaussian falloff).
 * Neighbours are displaced by the accumulated growth so nothing overlaps, and the
 * content under the focus line stays put. Year numerals zoom with their group and are
 * positioned from the same transforms, emulating position: sticky.
 * Transforms are written straight to the DOM from a rAF loop rather than via React state.
 */
function useDock(
  ledgerRef: React.RefObject<HTMLDivElement | null>,
  fillRef: React.RefObject<HTMLDivElement | null>,
  filterKey: string
) {
  const kickRef = useRef<() => void>(() => {});

  useEffect(() => {
    const ledger = ledgerRef.current;
    const fill = fillRef.current;
    if (!ledger || !fill) return;

    const STICK = 80; // below the sticky site header
    const FADE = 0.35;
    const YFADE = 0.35;
    let MAX = 1,
      MIN = 1,
      YMAX = 1,
      YMIN = 1;
    const tune = () => {
      const wide = innerWidth >= 768;
      [MAX, MIN, YMAX, YMIN] = wide ? [1.35, 0.75, 1.3, 0.65] : [1.15, 0.85, 1.15, 0.75];
      // Entries rest at 1/MAX of the column so the magnified one fills it exactly
      ledger.style.setProperty("--dock-max", String(MAX));
    };
    tune();

    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const entries = [...ledger.querySelectorAll<HTMLElement>(".ledger-entry")];
    const state = new Map(entries.map((el) => [el, { s: 1, y: 0, o: 1 }]));
    const years = [...ledger.querySelectorAll<HTMLElement>(".ledger-year-group")].map((g) => ({
      col: g.firstElementChild as HTMLElement,
      slot: g.querySelector<HTMLElement>(".ledger-year-slot")!,
      entries: [...g.querySelectorAll<HTMLElement>(".ledger-entry")],
      s: 1,
      o: 1,
    }));
    let pointerY: number | null = null;
    let focusY = innerHeight * 0.45;
    let raf = 0;

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    kickRef.current = kick;

    function frame() {
      raf = 0;
      // Spine progress
      const lr = ledger!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.55 - lr.top) / lr.height));
      fill!.style.height = `${p * 100}%`;

      if (reduce.matches) {
        ledger!.style.setProperty("--dock-max", "1");
        entries.forEach((el) => {
          el.style.transform = "";
          el.style.opacity = "";
          delete el.dataset.focus;
        });
        years.forEach((y) => {
          y.slot.style.transform = "";
          y.slot.style.opacity = "";
          y.slot.style.position = "sticky";
          y.slot.style.top = `${STICK}px`;
        });
        return;
      }

      const targetFocus = pointerY ?? innerHeight * 0.45;
      focusY += (targetFocus - focusY) * 0.3;
      const sigma = Math.max(110, innerHeight * 0.17);
      const base = lr.top;

      // Natural (untransformed) geometry, measured from layout so there's no feedback loop
      const vis = entries
        .filter((el) => el.offsetParent)
        .map((el) => {
          const top = base + el.offsetTop,
            h = el.offsetHeight,
            c = top + h / 2;
          const g = Math.exp(-0.5 * ((c - focusY) / sigma) ** 2);
          const s = MIN + (MAX - MIN) * g;
          return { el, top, h, c, g, s, d: h * (s - 1), y: 0 };
        });
      if (!vis.length) return;

      // Cumulative displacement keeps the original gap between every pair of neighbours
      for (let i = 1; i < vis.length; i++) vis[i].y = vis[i - 1].y + (vis[i - 1].d + vis[i].d) / 2;

      // Pin the content under the focus line so the zoom pivots around it
      let k = -1;
      for (let i = 0; i < vis.length; i++) if (vis[i].top <= focusY) k = i;
      const off =
        k < 0
          ? vis[0].y - vis[0].d / 2
          : focusY <= vis[k].top + vis[k].h
            ? vis[k].y + (vis[k].s - 1) * (focusY - vis[k].c)
            : vis[k].y + vis[k].d / 2;

      let moving = Math.abs(targetFocus - focusY) > 0.5;
      let best = vis[0];
      const geo = new Map<HTMLElement, { top: number; bottom: number; g: number }>();
      for (const v of vis) {
        const st = state.get(v.el)!;
        const ty = v.y - off,
          to = FADE + (1 - FADE) * v.g;
        st.s += (v.s - st.s) * 0.35;
        st.y += (ty - st.y) * 0.35;
        st.o += (to - st.o) * 0.35;
        if (Math.abs(v.s - st.s) > 0.001 || Math.abs(ty - st.y) > 0.3) moving = true;
        v.el.style.transform = `translate3d(0, ${st.y.toFixed(2)}px, 0) scale(${st.s.toFixed(4)})`;
        v.el.style.opacity = st.o.toFixed(3);
        geo.set(v.el, {
          top: v.c + st.y - (st.s * v.h) / 2,
          bottom: v.c + st.y + (st.s * v.h) / 2,
          g: v.g,
        });
        if (v.g > best.g) best = v;
      }

      for (const y of years) {
        const boxes = y.entries
          .map((e) => geo.get(e))
          .filter((b): b is NonNullable<typeof b> => !!b);
        if (!boxes.length) continue;
        const gMax = Math.max(...boxes.map((b) => b.g));
        const ts = YMIN + (YMAX - YMIN) * gMax,
          to = YFADE + (1 - YFADE) * gMax;
        y.s += (ts - y.s) * 0.35;
        y.o += (to - y.o) * 0.35;
        if (Math.abs(ts - y.s) > 0.001) moving = true;
        const natural = base + y.col.offsetTop;
        const h = y.slot.offsetHeight * y.s;
        const top = Math.min(Math.max(boxes[0].top, STICK), boxes[boxes.length - 1].bottom - h);
        y.slot.style.transform = `translate3d(0, ${(top - natural).toFixed(2)}px, 0) scale(${y.s.toFixed(4)})`;
        y.slot.style.opacity = y.o.toFixed(3);
        if (y.entries.includes(best.el) && best.g > 0.6) y.slot.dataset.focus = "";
        else delete y.slot.dataset.focus;
      }

      entries.forEach((el) => {
        if (el === best.el && best.g > 0.6) el.dataset.focus = "";
        else delete el.dataset.focus;
      });
      if (moving) kick();
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        pointerY = e.clientY;
        kick();
      }
    };
    const onLeave = () => {
      pointerY = null;
      kick();
    };
    const onResize = () => {
      tune();
      kick();
    };
    ledger.addEventListener("pointermove", onMove);
    ledger.addEventListener("pointerleave", onLeave);
    // Re-run while a drawer animates open/closed
    ledger.addEventListener("transitionrun", kick);
    ledger.addEventListener("transitionend", kick);
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", onResize);
    reduce.addEventListener("change", kick);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ledger.removeEventListener("pointermove", onMove);
      ledger.removeEventListener("pointerleave", onLeave);
      ledger.removeEventListener("transitionrun", kick);
      ledger.removeEventListener("transitionend", kick);
      removeEventListener("scroll", kick);
      removeEventListener("resize", onResize);
      reduce.removeEventListener("change", kick);
    };
  }, [ledgerRef, fillRef, filterKey]);

  return kickRef;
}

export function Timeline() {
  const [activeType, setActiveType] = useState<string>("all");
  const [activeOrg, setActiveOrg] = useState<string>("all");
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const ledgerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const filterKey = `${activeType}:${activeOrg}`;
  const kick = useDock(ledgerRef, fillRef, filterKey);

  const counts = useMemo(() => countItems(CAREER), []);

  const typeFilterDefs = useMemo(
    () => [
      { key: "all", label: "All", count: counts.all },
      ...Object.entries(TYPES).map(([k, v]) => ({
        key: k,
        label: v.label,
        count: counts[k] || 0,
      })),
    ],
    [counts]
  );

  const orgFilterDefs = useMemo(
    () =>
      ORG_ORDER.map((k) => ({
        key: k,
        org: ORGS[k],
        logo: ORG_LOGOS[k],
        count: counts[k] || 0,
      })),
    [counts]
  );

  const filtered = useMemo(
    () => filterItems(CAREER, activeType, activeOrg),
    [activeType, activeOrg]
  );

  const groups = useMemo(() => groupByYear(filtered), [filtered]);

  useEffect(() => kick.current(), [open, kick, filterKey]);

  const selectType = (key: string) => {
    setActiveType((prev) => (prev === key ? "all" : key));
  };

  const selectOrg = (key: string) => {
    setActiveOrg((prev) => (prev === key ? "all" : key));
  };

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="scroll-mt-20 pt-8 md:pt-12">
      <h1 id="timeline-title" className="sr-only">
        Career timeline
      </h1>

      <div
        className="mb-8 space-y-2.5 pl-0 md:mb-12 md:pl-[8rem]"
        role="group"
        aria-label="Filter timeline"
      >
        {/* Row 1: Type (hidden on mobile) */}
        <div className="hidden flex-wrap items-center gap-x-3 gap-y-1.5 md:flex">
          <span className="w-12 shrink-0 font-mono text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
            Type
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {typeFilterDefs.map(({ key, label, count }) => {
              const active = activeType === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectType(key)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs transition ${
                    active
                      ? "border-stone-900 bg-stone-900 font-medium text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                      : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-950 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
                  }`}
                >
                  {label}
                  {key !== "all" && (
                    <>
                      {" "}
                      <span className="opacity-50">{count}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Organization (on mobile: no label, no 'All' button) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:justify-start">
          <span className="hidden w-12 shrink-0 font-mono text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 md:inline-block">
            Org
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
            <button
              type="button"
              aria-pressed={activeOrg === "all"}
              onClick={() => setActiveOrg("all")}
              className={`hidden rounded-full border px-3 py-1.5 font-mono text-xs transition md:inline-flex ${
                activeOrg === "all"
                  ? "border-stone-900 bg-stone-900 font-medium text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                  : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-950 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
              }`}
            >
              All
            </button>
            {orgFilterDefs.map(({ key, logo, count }) => {
              const active = activeOrg === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  aria-label={`Filter by ${logo.label} (${count})`}
                  title={`Filter by ${logo.label} (${count})`}
                  onClick={() => selectOrg(key)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition ${
                    active
                      ? "border-stone-900 bg-stone-900 font-medium text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                      : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-950 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
                  }`}
                >
                  <span
                    className={`org-logo org-logo-filter org-logo-${key}`}
                    role="img"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: logo.svg }}
                  />
                  <span className="opacity-50">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="space-y-3 py-16 pl-0 font-mono text-sm text-stone-500 dark:text-stone-400 md:pl-[8rem]">
          <p>No entries match the selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setActiveType("all");
              setActiveOrg("all");
            }}
            className="text-xs uppercase tracking-wider text-stone-900 underline hover:text-black dark:text-stone-300 dark:hover:text-white"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div ref={ledgerRef} className="ledger relative pb-16">
          <div
            className="absolute bottom-16 left-[4.5rem] top-0 w-px bg-stone-300 dark:bg-stone-800 md:left-[8rem]"
            aria-hidden="true"
          >
            <div
              ref={fillRef}
              className="h-0 w-px bg-stone-900 transition-[height] duration-150 dark:bg-stone-300"
            />
          </div>
          {groups.map(([year, items]) => (
            <div
              key={year}
              className="ledger-year-group grid grid-cols-[4.5rem_1fr] pt-6 md:grid-cols-[8rem_1fr]"
            >
              <div className="relative">
                <div className="ledger-year-slot pr-4 pt-2 text-right">
                  <span
                    className={`ledger-year font-serif tracking-tight text-stone-300 dark:text-stone-700 ${year === "Earlier" ? "text-xl italic md:text-2xl" : "text-3xl md:text-5xl"}`}
                  >
                    {year}
                  </span>
                </div>
              </div>
              <div>
                {items.map((it) => (
                  <Entry
                    key={it.id}
                    it={it}
                    open={open.has(it.id)}
                    onToggle={() => toggle(it.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
