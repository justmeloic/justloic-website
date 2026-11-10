export function Footer() {
  return (
    <footer className="pt-16 pb-12 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-stone-400 gap-4">
      <p>© Loïc Muhirwa, 2023</p>
      <div className="flex items-center space-x-6">
        <a
          href="https://www.linkedin.com/in/lo%C3%AFc-muhirwa-b3a940242/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-900 dark:hover:text-stone-100 transition"
        >
          LinkedIn
        </a>
        <a
          href="https://gitlab.com/justloic"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-900 dark:hover:text-stone-100 transition"
        >
          GitLab
        </a>
        <a
          href="#contact"
          className="hover:text-stone-900 dark:hover:text-stone-100 transition"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
