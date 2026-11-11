import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  // Sections were designed as stacked blocks on one page; drop their top divider here
  return (
    <div className="mx-auto max-w-xl pb-20 pt-8 sm:pt-14 [&>section]:border-t-0 [&>section]:pt-0">
      <Contact />
    </div>
  );
}
