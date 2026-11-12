"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/site";

const LINKS = [
  { href: "/", label: "Timeline" },
  { href: "/art", label: "Art" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

/** The links plus a single underline that slides to whichever one is current. */
function NavLinks({ className }: { className: string }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const placeRef = useRef<(slide: boolean) => void>(() => {});
  const mounted = useRef(false);
  // Until the line is measured, the current link keeps a plain underline (also the no-JS fallback)
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    const line = lineRef.current;
    if (!nav || !line || typeof ResizeObserver === "undefined") return;

    placeRef.current = (slide) => {
      const link = nav.querySelector<HTMLElement>('[aria-current="page"]');
      const box = link?.getBoundingClientRect();
      if (!box?.width) {
        // No current link, or this nav is hidden at the current breakpoint
        line.style.opacity = "0";
        return;
      }
      const origin = nav.getBoundingClientRect();
      const x = box.left - origin.left + nav.scrollLeft;
      const y = box.bottom - origin.top + nav.scrollTop + 4;
      // Slide only between links; appear in place after a resize or when coming out of hiding
      line.style.transitionProperty = slide && line.style.opacity === "1" ? "" : "none";
      line.style.transform = `translate(${x}px, ${y}px) scaleX(${box.width})`;
      line.style.opacity = "1";
      setReady(true);
    };

    // Fires once on observe (first placement), then on resizes and when the web font swaps in
    const observer = new ResizeObserver(() => placeRef.current(false));
    observer.observe(nav);
    nav.querySelectorAll("a").forEach((a) => observer.observe(a));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mounted.current) placeRef.current(true);
    mounted.current = true;
  }, [pathname]);

  return (
    <nav ref={navRef} className={`relative ${className}`}>
      {LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap transition hover:text-stone-900 dark:hover:text-stone-100 ${
              active ? "text-stone-900 dark:text-stone-100" : ""
            } ${
              active && !ready
                ? "underline decoration-stone-900 underline-offset-8 dark:decoration-stone-300"
                : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
      <span
        ref={lineRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px origin-left bg-stone-900 opacity-0 transition-transform duration-300 ease-out motion-reduce:transition-none dark:bg-stone-300"
      />
    </nav>
  );
}

export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur transition-colors dark:bg-[#121211]/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-serif text-2xl font-medium tracking-tight transition hover:opacity-80"
          >
            Loïc
          </Link>
          <NavLinks className="hidden items-center gap-6 font-mono text-xs tracking-wider text-stone-600 dark:text-stone-400 md:flex" />
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <span
              className="mx-0.5 hidden h-4 w-px bg-stone-300 dark:bg-stone-700 md:block"
              aria-hidden="true"
            />
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 p-1.5 text-stone-600 transition hover:border-stone-900 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 p-1.5 text-stone-600 transition hover:border-stone-900 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
        {/* Centred; the auto margins give way so the row can still scroll if it ever overflows */}
        <NavLinks className="flex items-center gap-[clamp(0.625rem,3.5vw,1.25rem)] overflow-x-auto px-4 pb-3 font-mono text-xs tracking-wider text-stone-600 dark:text-stone-400 md:hidden [&>a:first-of-type]:ml-auto [&>a:last-of-type]:mr-auto" />
      </header>
      {/* Outside the header: its backdrop blur would otherwise anchor the fixed button to it */}
      <ThemeToggle floating />
    </>
  );
}
