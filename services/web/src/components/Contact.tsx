"use client";

import { useState } from "react";
import Link from "next/link";

// Borderless fields: like the resume sheet, they lift off the page with a soft shadow
const FIELD =
  "w-full rounded-2xl bg-white px-4 py-2.5 text-sm shadow-[0_1px_2px_rgba(36,33,30,0.05),0_8px_20px_-8px_rgba(36,33,30,0.14)] transition focus:outline-none focus:ring-1 focus:ring-stone-900 dark:bg-[#181615] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_10px_24px_-8px_rgba(0,0,0,0.65)] dark:focus:ring-stone-100";

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
    <section
      id="contact"
      className="mx-auto max-w-xl space-y-10 border-t border-stone-200 pt-16 dark:border-stone-800"
    >
      <div className="space-y-2 text-center">
        <h2 className="font-serif text-3xl text-stone-950 dark:text-stone-50 md:text-4xl">
          Get in touch
        </h2>
        <p className="mx-auto max-w-md text-sm font-light text-stone-600 dark:text-stone-400">
          Have a question, collaboration idea, or inquiry? Send a note below or connect directly on
          LinkedIn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1 text-left">
            <label
              htmlFor="name"
              className="block font-mono text-xs uppercase tracking-wider text-stone-500"
            >
              Name
            </label>
            <input type="text" name="name" id="name" required className={FIELD} />
          </div>
          <div className="space-y-1 text-left">
            <label
              htmlFor="email"
              className="block font-mono text-xs uppercase tracking-wider text-stone-500"
            >
              Email
            </label>
            <input type="email" name="email" id="email" required className={FIELD} />
          </div>
        </div>

        <div className="space-y-1 text-left">
          <label
            htmlFor="message"
            className="block font-mono text-xs uppercase tracking-wider text-stone-500"
          >
            Message
          </label>
          <textarea name="message" id="message" rows={6} required className={FIELD}></textarea>
        </div>

        <div className="flex flex-col items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-2xl bg-stone-900 px-8 py-2.5 font-mono text-xs font-medium text-stone-100 transition hover:opacity-90 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-950 sm:w-auto"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="pt-1 text-center font-mono text-xs text-emerald-600 dark:text-emerald-400">
              ✓ Message sent successfully.
            </p>
          )}
          {status === "error" && (
            <p className="pt-1 text-center font-mono text-xs text-red-600 dark:text-red-400">
              ✕ Could not deliver message. Please try again or reach out on LinkedIn.
            </p>
          )}
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2 border-t border-stone-200 pt-6 font-mono text-xs dark:border-stone-800">
        <Link
          href="/"
          className="rounded-xl border border-stone-200 px-3 py-1.5 text-stone-500 transition hover:border-stone-400 dark:border-stone-800 dark:text-stone-400"
        >
          back to timeline
        </Link>
        <Link
          href="/art"
          className="rounded-xl border border-stone-200 px-3 py-1.5 text-stone-500 transition hover:border-stone-400 dark:border-stone-800 dark:text-stone-400"
        >
          back to art
        </Link>
        <Link
          href="/philosophy"
          className="rounded-xl border border-stone-200 px-3 py-1.5 text-stone-500 transition hover:border-stone-400 dark:border-stone-800 dark:text-stone-400"
        >
          back to philosophy
        </Link>
        <Link
          href="/resume"
          className="rounded-xl border border-stone-200 px-3 py-1.5 text-stone-500 transition hover:border-stone-400 dark:border-stone-800 dark:text-stone-400"
        >
          view resume
        </Link>
      </div>
    </section>
  );
}
