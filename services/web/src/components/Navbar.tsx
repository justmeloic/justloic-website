"use client";

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

export function Navbar() {
  const pathname = usePathname();

  const nav = (className: string) => (
    <nav className={className}>
      {LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap transition hover:text-stone-900 dark:hover:text-stone-100 ${
              active
                ? "text-stone-900 underline decoration-stone-900 underline-offset-8 dark:text-stone-100 dark:decoration-stone-300"
                : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur transition-colors dark:bg-[#121211]/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight transition hover:opacity-80"
        >
          Loïc
        </Link>
        {nav(
          "hidden md:flex items-center space-x-6 text-xs font-mono tracking-wider text-stone-600 dark:text-stone-400"
        )}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <span className="mx-0.5 h-4 w-px bg-stone-300 dark:bg-stone-700" aria-hidden="true" />
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
      {nav(
        "md:hidden flex items-center gap-5 overflow-x-auto px-6 pb-3 text-xs font-mono tracking-wider text-stone-600 dark:text-stone-400"
      )}
    </header>
  );
}
