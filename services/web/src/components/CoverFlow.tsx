"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArtViewer } from "./ArtViewer";
import { ART_SIZE, pieceAlt, type ArtSeries } from "@/data/art";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * Where a cover sits when it is `d` places from the front. The front cover lies flat; its
 * neighbours swing 60° away, step back and bunch up like a record crate. Lengths are multiples
 * of the cover width (--cf-w, set in CSS), so the server-rendered markup is already laid out.
 */
function place(d: number) {
  const ad = Math.abs(d),
    a = Math.min(1, ad),
    s = Math.sign(d);
  const x = s * (a * 0.74 + Math.max(0, ad - 1) * 0.3);
  return {
    cover: {
      transform: `translate3d(calc(var(--cf-w) * ${x.toFixed(4)}), 0, 0) perspective(calc(var(--cf-w) * 3.2)) translateZ(calc(var(--cf-w) * ${(-a * 0.55).toFixed(4)})) rotateY(${(-s * a * 60).toFixed(2)}deg)`,
      zIndex: String(1000 - Math.round(ad * 10)),
      opacity: String(clamp(1 - (ad - 4) / 2.5, 0, 1)),
      visibility: ad > 6.5 ? "hidden" : "visible",
    },
    veil: { opacity: String(a * 0.3 + clamp((ad - 1) * 0.08, 0, 0.3)) },
  } as const;
}

interface Engine {
  go: (i: number) => void;
  step: (d: number) => void;
  /** Like go, but the scrubber keeps the value the visitor gave it while the covers catch up. */
  scrub: (i: number) => void;
  /** Move without animating. */
  jump: (i: number) => void;
  /** The front cover's picture, if `i` is the cover in front. */
  face: (i: number) => Element | null;
  front: () => number;
}

const IDLE: Engine = {
  go: () => {},
  step: () => {},
  scrub: () => {},
  jump: () => {},
  face: () => null,
  front: () => 0,
};

interface CoverFlowProps {
  series: ArtSeries;
  /** Load the pictures straight away rather than when they near the viewport. */
  eager?: boolean;
}

/**
 * One series as a cover flow: drag, swipe, scrub or use the arrow keys to flip through, and
 * click the cover in front to open it. Each instance keeps its own position.
 * The position is fractional while moving, so transforms are written straight to the DOM from
 * a rAF loop; React state only follows which cover is in front.
 */
export function CoverFlow({ series, eager = false }: CoverFlowProps) {
  const { pieces, title } = series;
  const n = pieces.length;
  // The covers start a few places in and sweep back to the first one as the stage scrolls into view.
  const start = Math.min(5, n - 1);
  const [current, setCurrent] = useState(start);
  const [viewing, setViewing] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLInputElement>(null);
  const engine = useRef<Engine>(IDLE);
  const rest = useMemo(() => pieces.map((_, i) => place(i - start)), [pieces, start]);

  useEffect(() => {
    const stage = stageRef.current;
    const scrub = scrubRef.current;
    if (!stage || !scrub) return;
    const covers = [...stage.querySelectorAll<HTMLElement>(".cf-cover")].map((el) => ({
      el,
      face: el.querySelector<HTMLElement>(".cf-face")!,
      veil: el.querySelector<HTMLElement>(".cf-veil")!,
    }));
    const still = matchMedia("(prefers-reduced-motion: reduce)");

    // pos is where the carousel is (fractional while moving), target is where it is heading.
    let pos = start,
      target = start,
      cur = -1,
      raf = 0,
      last = 0,
      dragging = false,
      scrubbing = false,
      entered = false;

    const render = () => {
      covers.forEach((c, i) => {
        const at = place(i - pos);
        Object.assign(c.el.style, at.cover);
        c.veil.style.opacity = at.veil.opacity;
      });
      const now = clamp(Math.round(pos), 0, n - 1);
      if (now !== cur) {
        cur = now;
        setCurrent(now);
      }
      if (!scrubbing) scrub.value = String(cur);
    };

    const tick = (t: number) => {
      const dt = clamp(t - last, 0, 50) / 1000;
      last = t;
      if (!dragging) {
        pos += (target - pos) * (1 - Math.exp(-dt * 9));
        if (Math.abs(target - pos) < 0.002) pos = target;
        if (pos === target) scrubbing = false;
      }
      render();
      raf = dragging || pos !== target ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const go = (i: number) => {
      entered = true;
      target = clamp(i, 0, n - 1);
      if (still.matches) pos = target;
      kick();
    };
    const jump = (i: number) => {
      entered = true;
      pos = target = clamp(i, 0, n - 1);
      render();
    };
    engine.current = {
      go,
      jump,
      step: (d) => go(target + d),
      scrub: (i) => {
        scrubbing = true;
        go(i);
      },
      face: (i) => (i === cur ? covers[i].face : null),
      front: () => cur,
    };

    // ── Drag / swipe, with a flick carrying on past the release point
    let sx = 0,
      sp = 0,
      moved = 0,
      px = 0,
      pt = 0,
      vel = 0,
      w = 1;
    const down = (e: PointerEvent) => {
      if (e.button) return;
      dragging = true;
      moved = 0;
      vel = 0;
      sx = px = e.clientX;
      sp = pos;
      pt = e.timeStamp;
      w = covers[0].el.offsetWidth || 1;
      stage.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      if (moved < 6) return;
      stage.dataset.dragging = "";
      pos = clamp(sp - dx / (w * 0.55), -0.35, n - 0.65);
      const dt = e.timeStamp - pt;
      if (dt > 0) vel = vel * 0.5 + (-(e.clientX - px) / (w * 0.55) / dt) * 0.5;
      px = e.clientX;
      pt = e.timeStamp;
      kick();
    };
    const release = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete stage.dataset.dragging;
      if (moved >= 6) {
        go(Math.round(pos + (e.timeStamp - pt < 80 ? vel * 220 : 0)));
      } else if (e.type === "pointerup") {
        // A plain click: the front cover opens, any other cover comes to the front.
        const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest(".cf-cover");
        const i = covers.findIndex((c) => c.el === hit);
        if (i === cur) setViewing(cur);
        else if (i >= 0) go(i);
      }
      // Anything else is the browser taking over a touch to scroll the page: leave the covers be.
    };

    // Sideways trackpad scroll steps through; vertical scroll is left alone so the page still scrolls.
    let acc = 0,
      wheelAt = 0;
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      acc += e.deltaX;
      if (Math.abs(acc) > 36 && e.timeStamp - wheelAt > 110) {
        go(target + Math.sign(acc));
        acc = 0;
        wheelAt = e.timeStamp;
      }
    };

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", release);
    stage.addEventListener("pointercancel", release);
    stage.addEventListener("wheel", wheel, { passive: false });

    // Entrance: sweep to the first cover once the stage is properly on screen.
    let io: IntersectionObserver | undefined;
    if (still.matches || typeof IntersectionObserver === "undefined") {
      jump(0);
    } else {
      render();
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          if (!entered) go(0);
        },
        { threshold: 0.4 }
      );
      io.observe(stage);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", release);
      stage.removeEventListener("pointercancel", release);
      stage.removeEventListener("wheel", wheel);
      engine.current = IDLE;
    };
  }, [n, start]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest("input")) return; // the scrubber handles its own arrow keys
    const onStage = el === stageRef.current;
    if (e.key === "ArrowLeft") engine.current.step(-1);
    else if (e.key === "ArrowRight") engine.current.step(1);
    else if (e.key === "Home" && onStage) engine.current.go(0);
    else if (e.key === "End" && onStage) engine.current.go(n - 1);
    else if (e.key === "Enter" && onStage) setViewing(engine.current.front());
    else return;
    e.preventDefault();
  };

  const origin = useCallback((i: number) => engine.current.face(i), []);
  const follow = useCallback((i: number) => engine.current.jump(i), []); // keep the carousel on the piece being viewed
  const refocus = useCallback(() => stageRef.current?.focus({ preventScroll: true }), []);
  const dismiss = useCallback(() => setViewing(null), []);

  return (
    <>
      <div onKeyDown={onKeyDown}>
        <div
          ref={stageRef}
          className="cf-stage"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`${title}. Left and right arrow keys browse, Enter opens the one in front.`}
        >
          {pieces.map((p, i) => (
            <div
              key={p.id}
              className="cf-cover"
              data-current={i === current ? "" : undefined}
              style={rest[i].cover}
            >
              <Image
                className="cf-face"
                src={p.src}
                alt={pieceAlt(series, i)}
                {...ART_SIZE}
                priority={eager && i === 0}
                loading={eager ? "eager" : "lazy"}
                draggable={false}
              />
              <Image
                className="cf-mirror"
                src={p.src}
                alt=""
                aria-hidden="true"
                {...ART_SIZE}
                loading={eager ? "eager" : "lazy"}
                draggable={false}
              />
              <span className="cf-veil" style={rest[i].veil} />
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-xl">
          <div>
            <input
              ref={scrubRef}
              className="cf-scrub w-full"
              type="range"
              min={0}
              max={n - 1}
              step={1}
              defaultValue={start}
              aria-label={`Scrub through ${title}`}
              aria-valuetext={`${current + 1} of ${n}`}
              onChange={(e) => engine.current.scrub(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {viewing !== null && (
        <ArtViewer
          series={series}
          start={viewing}
          origin={origin}
          onChange={follow}
          onClose={refocus}
          onExited={dismiss}
        />
      )}
    </>
  );
}
