import { GITHUB_URL, LINKEDIN_URL } from "@/data/site";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 pb-12 pt-16 font-mono text-xs text-stone-400 sm:flex-row">
      <p>© Loïc Muhirwa, 2026</p>
      <div className="flex items-center space-x-6">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-stone-900 dark:hover:text-stone-100"
        >
          LinkedIn
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-stone-900 dark:hover:text-stone-100"
        >
          GitHub
        </a>
        <a href="/contact" className="transition hover:text-stone-900 dark:hover:text-stone-100">
          Email
        </a>
      </div>
    </footer>
  );
}
