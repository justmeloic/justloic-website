"use client";

import { useState } from "react";

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
    <section id="contact" className="border-t border-stone-200 dark:border-stone-800 pt-16 space-y-8">
      <div className="max-w-xl space-y-3">
        <span className="font-mono text-xs text-red-800 dark:text-red-400 uppercase tracking-widest font-semibold">
          05 / Conversation
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Get in touch
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
          Open to research discussions, machine learning systems architecture, or scientific collaborations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 placeholder:text-stone-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 placeholder:text-stone-400"
          />
        </div>
        <textarea
          name="message"
          rows={4}
          placeholder="Your message..."
          required
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 placeholder:text-stone-400"
        ></textarea>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 font-medium text-xs font-mono rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "submitting" ? "Transmitting..." : "Send Message →"}
        </button>

        {status === "success" && (
          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-1">
            ✓ Message received. Thank you for reaching out!
          </p>
        )}
        {status === "error" && (
          <p className="text-xs font-mono text-red-600 dark:text-red-400 pt-1">
            ✕ Could not deliver message. Please reach out via LinkedIn.
          </p>
        )}
      </form>
    </section>
  );
}
