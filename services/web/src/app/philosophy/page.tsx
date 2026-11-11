import type { Metadata } from "next";
import { Philosophy } from "@/components/Philosophy";

export const metadata: Metadata = { title: "Philosophy" };

export default function PhilosophyPage() {
  // Sections were designed as stacked blocks on one page; drop their top divider here
  return (
    <div className="pt-12 pb-20 [&>section]:border-t-0 [&>section]:pt-0">
      <Philosophy />
    </div>
  );
}
