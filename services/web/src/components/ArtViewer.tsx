"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  ART_ASPECT,
  ART_SIZE,
  ARTIST,
  pieceAlt,
  pieceCount,
  pieceName,
  type ArtSeries,
} from "@/data/art";

const REST = "translate(2%, 2%) scale(.96)";
const BTN =
  "av-ui absolute grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-stone-200 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400";

interface ArtViewerProps {
  series: ArtSeries;
  /** Index of the piece to open on. */
  start: number;
  /** Element piece `i` should grow out of and shrink back into, if it is on screen. */
  origin: (i: number) => Element | null;
  /** The visitor stepped to another piece. */
  onChange: (i: number) => void;
  /** Closing has started; focus should go back to the page. */
  onClose: () => void;
  /** The closing animation has finished; unmount the viewer. */
  onExited: () => void;
}

/**
 * Full-screen zoom viewer for one series. The picture grows out of the element it was opened
 * from and shrinks back into it; those transforms are written straight to the DOM.
 */
export function ArtViewer({ series, start, origin, onChange, onClose, onExited }: ArtViewerProps) {
  const n = series.pieces.length;
  const [idx, setIdx] = useState(start);
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const api = useRef<{ close: () => void; go: (d: number) => void }>({
    close: () => {},
    go: () => {},
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    if (!root || !img) return;
    const btns = [...root.querySelectorAll<HTMLButtonElement>("button")];
    let at = start; // where the visitor is; the picture on screen catches up after the cross-fade
    let shown = start;
    let open = true;
    let tm = 0;

    const fit = () => {
      const vw = innerWidth,
        vh = innerHeight,
        padX = vw < 640 ? 12 : 84,
        top = 64,
        bottom = 84;
      const h = Math.min(vh - top - bottom, (vw - 2 * padX) / ART_ASPECT, 900),
        w = h * ART_ASPECT;
      return { left: (vw - w) / 2, top: top + (vh - top - bottom - h) / 2, width: w, height: h };
    };
    const place = () => {
      const f = fit();
      Object.assign(img.style, {
        left: `${f.left}px`,
        top: `${f.top}px`,
        width: `${f.width}px`,
        height: `${f.height}px`,
      });
    };
    const rectOf = (i: number) => {
      const r = origin(i)?.getBoundingClientRect();
      if (!r) return null;
      const offScreen =
        r.width < 2 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth;
      return offScreen ? null : r;
    };
    const toRect = (r: DOMRect) => {
      const f = fit();
      return `translate(${r.left - f.left}px, ${r.top - f.top}px) scale(${r.width / f.width}, ${r.height / f.height})`;
    };
    const swap = () => {
      if (shown === at) return;
      shown = at;
      flushSync(() => setIdx(at));
    };

    const close = () => {
      if (!open) return;
      open = false;
      clearTimeout(tm);
      swap();
      const to = rectOf(at);
      root.classList.remove("on");
      img.classList.add("anim");
      img.style.transform = to ? toRect(to) : REST;
      img.style.opacity = to ? "1" : "0";
      tm = window.setTimeout(onExited, 430);
      onClose();
    };
    const go = (d: number) => {
      if (!open) return;
      at = (at + d + n) % n;
      onChange(at);
      img.classList.add("anim");
      img.style.opacity = "0";
      img.style.transform = `translateX(${-d * 28}px)`;
      clearTimeout(tm);
      tm = window.setTimeout(() => {
        swap();
        img.classList.remove("anim");
        img.style.transform = `translateX(${d * 28}px)`;
        void img.offsetWidth;
        img.classList.add("anim");
        img.style.transform = "";
        img.style.opacity = "1";
      }, 160);
    };
    api.current = { close, go };

    let sx = 0,
      sy = 0;
    const down = (e: PointerEvent) => {
      sx = e.clientX;
      sy = e.clientY;
    };
    const up = (e: PointerEvent) => {
      if (!open || (e.target as Element).closest("button")) return;
      const dx = e.clientX - sx,
        dy = e.clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1);
      else if (dy > 70 && dy > Math.abs(dx)) close();
      else if (Math.abs(dx) < 6 && Math.abs(dy) < 6 && e.target === root) close();
    };
    const wheel = (e: WheelEvent) => e.preventDefault();
    // Capture phase, so the carousels' own arrow-key handling stays quiet while the viewer is open.
    const key = (e: KeyboardEvent) => {
      if (!open) return;
      const k = e.key;
      if (k === "Escape") close();
      else if (k === "ArrowRight") go(1);
      else if (k === "ArrowLeft") go(-1);
      else if (k === "Tab") {
        const i = btns.indexOf(document.activeElement as HTMLButtonElement);
        btns[(i + (e.shiftKey ? -1 : 1) + btns.length) % btns.length].focus();
      } else if ((k === " " || k === "Enter") && (e.target as Element).closest?.("button")) {
        return; // still presses the focused button
      } else if (![" ", "PageDown", "PageUp", "Home", "End", "ArrowUp", "ArrowDown"].includes(k)) {
        return; // the rest would scroll the page behind
      }
      e.preventDefault();
      e.stopPropagation();
    };
    const resize = () => {
      if (open) place();
    };

    root.addEventListener("pointerdown", down);
    root.addEventListener("pointerup", up);
    root.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key, true);
    window.addEventListener("resize", resize);

    place();
    const from = rectOf(at);
    img.classList.remove("anim");
    img.style.transform = from ? toRect(from) : REST;
    img.style.opacity = from ? "1" : "0";
    void img.offsetWidth;
    img.classList.add("anim");
    img.style.transform = "";
    img.style.opacity = "1";
    root.classList.add("on");
    btns[0].focus({ preventScroll: true });

    return () => {
      clearTimeout(tm);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key, true);
      window.removeEventListener("resize", resize);
      root.classList.remove("on");
    };
  }, [start, n, origin, onChange, onClose, onExited]);

  useEffect(() => {
    for (const j of [idx + 1, idx - 1]) new window.Image().src = series.pieces[(j + n) % n].src;
  }, [idx, n, series]);

  return createPortal(
    <div
      ref={rootRef}
      className="av"
      role="dialog"
      aria-modal="true"
      aria-label={`${series.title} viewer`}
    >
      <Image
        ref={imgRef}
        className="av-img"
        src={series.pieces[idx].src}
        alt={pieceAlt(series, idx)}
        {...ART_SIZE}
        loading="eager"
        draggable={false}
      />
      <div
        className="av-ui pointer-events-none absolute inset-x-[72px] bottom-5 text-center"
        aria-live="polite"
      >
        <p className="font-serif text-lg text-stone-200">{pieceName(series, idx)}</p>
        <p className="mt-0.5 font-mono text-[11px] text-stone-400">
          By {ARTIST} · {pieceCount(series, idx)}
        </p>
      </div>
      <button
        className={`${BTN} right-5 top-4`}
        aria-label="Close viewer"
        onClick={() => api.current.close()}
      >
        <X size={18} />
      </button>
      <button
        className={`${BTN} bottom-4 left-3 sm:bottom-auto sm:left-5 sm:top-1/2 sm:-mt-[22px]`}
        aria-label="Previous piece"
        onClick={() => api.current.go(-1)}
      >
        <ArrowLeft size={18} />
      </button>
      <button
        className={`${BTN} bottom-4 right-3 sm:bottom-auto sm:right-5 sm:top-1/2 sm:-mt-[22px]`}
        aria-label="Next piece"
        onClick={() => api.current.go(1)}
      >
        <ArrowRight size={18} />
      </button>
    </div>,
    document.body
  );
}
