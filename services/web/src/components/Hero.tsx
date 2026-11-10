import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="about" className="grid md:grid-cols-12 gap-12 items-center pt-8">
      <div className="md:col-span-7 space-y-6">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-stone-950 dark:text-stone-50 font-normal">
          Loïc Muhirwa
        </h1>

        <div className="space-y-4 text-stone-600 dark:text-stone-400 text-base md:text-lg leading-relaxed font-light">
          <p>
            I design and develop AI solutions at{" "}
            <a
              href="https://ai.google/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-900 dark:text-stone-100 hover:text-red-900 dark:hover:text-red-400 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 transition"
            >
              Google
            </a>
            . Before joining Google, I led a team of Machine Learning Engineers, Data Engineers and Data Scientists for the{" "}
            <a
              href="https://www.statcan.gc.ca/en/data-science/network"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-900 dark:text-stone-100 hover:text-red-900 dark:hover:text-red-400 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 transition"
            >
              Government of Canada
            </a>
            ; we worked on cutting-edge AI research, engineering, and consultancy services for both internal and external federal clients.
          </p>

          <p>
            My academic background is in Mathematics and{" "}
            <a
              href="https://ruor.uottawa.ca/handle/10393/43733"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-900 dark:text-stone-100 hover:text-red-900 dark:hover:text-red-400 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 transition"
            >
              Computer Vision applied to Medical Neuroimaging
            </a>{" "}
            and I spent the equivalent of 2 years studying Biology, Chemistry and Computer Science.
          </p>

          <p>
            Outside professional life, my time is spent{" "}
            <Link href="#philosophy" className="underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:text-stone-900 dark:hover:text-stone-100 transition">
              reading
            </Link>
            ,{" "}
            <Link href="#philosophy" className="underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:text-stone-900 dark:hover:text-stone-100 transition">
              writing
            </Link>
            ,{" "}
            <Link href="#art" className="underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:text-stone-900 dark:hover:text-stone-100 transition">
              drawing
            </Link>
            ,{" "}
            <Link href="#art" className="underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:text-stone-900 dark:hover:text-stone-100 transition">
              painting
            </Link>{" "}
            and traveling.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
          <Link
            href="#projects"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            Projects
          </Link>
          <Link
            href="#awards"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            Awards
          </Link>
          <Link
            href="#art"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            Art
          </Link>
          <Link
            href="#philosophy"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            Philosophy
          </Link>
          <Link
            href="#resume"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            Resume
          </Link>
          <Link
            href="#publications"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            Publications
          </Link>
          <Link
            href="#contact"
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition"
          >
            contact
          </Link>
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="relative group">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-xl border border-stone-200/60 dark:border-stone-800 relative">
            <Image
              src="/images/homepage/cave_hike.JPEG"
              alt=""
              fill
              priority
              className="object-cover grayscale group-hover:grayscale-0 transition duration-700 scale-100 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
