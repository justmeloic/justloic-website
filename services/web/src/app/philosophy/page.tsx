import type { Metadata } from "next";
import { Philosophy } from "@/components/Philosophy";

export const metadata: Metadata = { title: "Philosophy" };

export default function PhilosophyPage() {
  // Sections were designed as stacked blocks on one page; drop their top divider here
  return (
    <div className="pb-20 pt-12 [&>section]:border-t-0 [&>section]:pt-0">
      <Philosophy />
    </div>
  );
}
