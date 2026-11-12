import { CoverFlow } from "./CoverFlow";
import { ART_SERIES } from "@/data/art";

export function ArtGallery() {
  return (
    <section id="art" className="space-y-20 border-t border-stone-200 pt-16 dark:border-stone-800">
      {ART_SERIES.map((series, k) => (
        <div key={series.id} id={series.anchor} className="scroll-mt-24 space-y-2">
          <div className="space-y-1 text-center">
            <h2 className="font-serif text-3xl text-stone-950 dark:text-stone-50">
              {series.title}
            </h2>
            {series.blurb && (
              <p className="text-sm font-light text-stone-500 dark:text-stone-400">
                {series.blurb}
              </p>
            )}
          </div>
          <CoverFlow series={series} eager={k === 0} />
        </div>
      ))}
    </section>
  );
}
