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
    <section id="contact" className="border-t border-stone-200 dark:border-stone-800 pt-16 space-y-10">
      <div className="space-y-2">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Get in touch
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-stone-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-stone-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-stone-500">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={6}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-6 py-2.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 font-medium text-xs font-mono rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-1">
            ✓ Message sent successfully.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs font-mono text-red-600 dark:text-red-400 pt-1">
            ✕ Could not deliver message. Please try again or reach out on LinkedIn.
          </p>
        )}
      </form>

      {/* Back to section links from original site */}
      <div className="flex flex-wrap gap-2 pt-6 border-t border-stone-200 dark:border-stone-800 text-xs font-mono">
        <Link href="#projects" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400">
          back to Projects
        </Link>
        <Link href="#awards" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400">
          back to Awards
        </Link>
        <Link href="#art" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400">
          back to art
        </Link>
        <Link href="#philosophy" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400">
          back to philosophy
        </Link>
        <Link href="#publications" className="px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-500 dark:text-stone-400">
          back to publications
        </Link>
      </div>
    </section>
  );
}
