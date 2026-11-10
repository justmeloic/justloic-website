"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 dark:bg-[#0F0E0E]/90 backdrop-blur border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="font-serif text-2xl tracking-tight font-medium hover:opacity-80 transition">
          Loïc
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-wider text-stone-600 dark:text-stone-400">
          <Link href="#projects" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Projects</Link>
          <Link href="#awards" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Awards</Link>
          <Link href="#art" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Art</Link>
          <Link href="#philosophy" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Philosophy</Link>
          <Link href="#publications" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Publications</Link>
          <Link href="#resume" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Resume</Link>
          <Link href="#contact" className="hover:text-stone-900 dark:hover:text-stone-100 transition">Contact</Link>
        </nav>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <a
            href="https://www.linkedin.com/in/lo%C3%AFc-muhirwa-b3a940242/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider font-mono border border-stone-300 dark:border-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-900 transition"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </header>
  );
}
