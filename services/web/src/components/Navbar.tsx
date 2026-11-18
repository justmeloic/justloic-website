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
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

/** The links plus a single underline that slides to whichever one is current. */
function NavLinks({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
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
            onClick={onNavigate}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const menuButton = mobileMenuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenuRef.current?.querySelector("a")?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur transition-colors dark:bg-[#121211]/90">
        <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-serif text-2xl font-medium tracking-tight text-stone-400 transition hover:opacity-80 dark:text-stone-500"
          >
            Loïc
          </Link>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-stone-600 transition hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500 dark:text-stone-300 dark:hover:text-stone-100 md:hidden"
          >
            <span className="relative block h-6 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-7 rounded-full bg-current transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                  mobileMenuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-7 rounded-full bg-current transition-[opacity,transform] duration-200 ease-in-out motion-reduce:transition-none ${
                  mobileMenuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-7 rounded-full bg-current transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                  mobileMenuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </span>
          </button>
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
      </header>
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`fixed inset-x-0 bottom-0 top-[4.25rem] z-30 bg-[#FBF9F5] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none dark:bg-[#121211] md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <NavLinks
          onNavigate={() => setMobileMenuOpen(false)}
          className="flex h-full flex-col items-center justify-center gap-8 font-mono text-xl tracking-wider text-stone-600 dark:text-stone-400"
        />
      </div>
      {/* Outside the header: its backdrop blur would otherwise anchor the fixed button to it */}
      <ThemeToggle floating />
    </>
  );
}
