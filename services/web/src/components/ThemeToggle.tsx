"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const HEADER =
  "hidden rounded-full border border-stone-300 p-1.5 text-stone-600 transition hover:border-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 md:block";

// Phones get a round button hovering over the bottom-right corner instead
const FLOATING =
  "fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-white text-stone-600 shadow-[0_1px_2px_rgba(36,33,30,0.08),0_10px_24px_-6px_rgba(36,33,30,0.28)] transition active:scale-95 dark:bg-stone-800 dark:text-stone-200 dark:shadow-[0_1px_2px_rgba(0,0,0,0.6),0_10px_28px_-6px_rgba(0,0,0,0.9)] md:hidden";

export function ThemeToggle({ floating = false }: { floating?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return floating ? null : (
      <div className="hidden h-8 w-8 rounded-full border border-stone-200 dark:border-stone-800 md:block" />
    );
  }

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={floating ? FLOATING : HEADER}
      aria-label="Toggle theme"
    >
      <Icon size={floating ? 20 : 15} />
    </button>
  );
}
