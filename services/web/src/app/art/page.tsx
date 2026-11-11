import type { Metadata } from "next";
import { ArtGallery } from "@/components/ArtGallery";

export const metadata: Metadata = { title: "Art" };

export default function ArtPage() {
  // Sections were designed as stacked blocks on one page; drop their top divider here
  return (
    <div className="pb-20 pt-12 [&>section]:border-t-0 [&>section]:pt-0">
      <ArtGallery />
    </div>
  );
}
