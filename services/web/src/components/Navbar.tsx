"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Gitlab, Linkedin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GITHUB_URL, GITLAB_URL, LINKEDIN_URL, RESUME_URL } from "@/data/site";


const LINKS = [
  { href: "/", label: "Timeline" },
  { href: "/art", label: "Art" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
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
              active ? "text-stone-900 dark:text-stone-100 underline underline-offset-8 decoration-rose-900 dark:decoration-rose-400" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap hover:text-stone-900 dark:hover:text-stone-100 transition"
      >
        Resume ↗
      </a>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 dark:bg-[#0F0E0E]/90 backdrop-blur border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight font-medium hover:opacity-80 transition">
          Loïc
        </Link>
        {nav("hidden md:flex items-center space-x-6 text-xs font-mono tracking-wider text-stone-600 dark:text-stone-400")}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <span className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-0.5" aria-hidden="true" />
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100 transition text-stone-600 dark:text-stone-300 inline-flex items-center justify-center"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100 transition text-stone-600 dark:text-stone-300 inline-flex items-center justify-center"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href={GITLAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100 transition text-stone-600 dark:text-stone-300 inline-flex items-center justify-center"
            aria-label="GitLab profile"
            title="GitLab"
          >
            <Gitlab size={15} />
          </a>
        </div>
      </div>
      {nav("md:hidden flex items-center gap-5 overflow-x-auto px-6 pb-3 text-xs font-mono tracking-wider text-stone-600 dark:text-stone-400")}
    </header>
  );
}
