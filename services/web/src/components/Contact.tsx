"use client";

import { useState } from "react";
import Link from "next/link";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xbjwkzqv", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-stone-200 dark:border-stone-800 pt-16 space-y-10 max-w-xl mx-auto">
      <div className="space-y-2 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Get in touch
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-light max-w-md mx-auto">
          Have a question, collaboration idea, or inquiry? Send a note below or connect directly on LinkedIn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 text-left">
            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-stone-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-[#181615] border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 transition"
            />
          </div>
          <div className="space-y-1 text-left">
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-stone-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-[#181615] border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 transition"
            />
          </div>
        </div>

        <div className="space-y-1 text-left">
          <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-stone-500">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={6}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-[#181615] border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 transition"
          ></textarea>
        </div>

        <div className="flex flex-col items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto px-8 py-2.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 font-medium text-xs font-mono rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-1 text-center">
              ✓ Message sent successfully.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs font-mono text-red-600 dark:text-red-400 pt-1 text-center">
              ✕ Could not deliver message. Please try again or reach out on LinkedIn.
            </p>
          )}
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2 pt-6 border-t border-stone-200 dark:border-stone-800 text-xs font-mono">
        <Link href="/" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400 transition">
          back to timeline
        </Link>
        <Link href="/art" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400 transition">
          back to art
        </Link>
        <Link href="/philosophy" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400 transition">
          back to philosophy
        </Link>
        <Link href="/resume" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400 transition">
          view resume
        </Link>
      </div>
    </section>
  );
}
