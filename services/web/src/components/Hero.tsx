import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="about" className="grid md:grid-cols-12 gap-12 items-center pt-8">
      <div className="md:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-stone-200/60 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          AI Solutions @ Google
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-stone-950 dark:text-stone-50 font-normal">
          Building intelligence, exploring <span className="italic font-serif text-red-900 dark:text-red-400">geometry</span>, drawing the human form.
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-light">
          I design and develop AI solutions at <strong className="font-medium text-stone-900 dark:text-stone-100">Google</strong>. Previously, I led Machine Learning Engineers, Data Engineers, and Data Scientists for the <strong className="font-medium text-stone-900 dark:text-stone-100">Government of Canada</strong> on cutting-edge research and federal advisory.
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          My academic background is in Mathematics and Computer Vision applied to Medical Neuroimaging at the University of Ottawa. Beyond engineering, my time is committed to reading, writing, figurative drawing, and philosophy.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="#projects"
            className="px-5 py-2.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 text-xs font-mono rounded-lg hover:opacity-90 transition"
          >
            Explore Selected Projects
          </Link>
          <Link
            href="#art"
            className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-xs font-mono rounded-lg hover:border-stone-900 dark:hover:border-stone-100 transition"
          >
            View Artwork
          </Link>
        </div>
      </div>
      <div className="md:col-span-5">
        <div className="relative group">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-xl border border-stone-200/60 dark:border-stone-800 relative">
            <Image
              src="/images/homepage/cave_hike.JPEG"
              alt="Loïc Muhirwa"
              fill
              priority
              className="object-cover grayscale group-hover:grayscale-0 transition duration-700 scale-100 group-hover:scale-105"
            />
          </div>
          <p className="text-xs font-mono text-stone-400 mt-3 text-right">Hiking Expedition • Loïc</p>
        </div>
      </div>
    </section>
  );
}
