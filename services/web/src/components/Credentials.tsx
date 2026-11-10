export function Credentials() {
  return (
    <section id="credentials" className="space-y-10 border-t border-stone-200 dark:border-stone-800 pt-16">
      <div>
        <span className="font-mono text-xs text-red-800 dark:text-red-400 uppercase tracking-widest font-semibold">
          04 / Credentials & Recognition
        </span>
        <h2 className="font-serif text-3xl md:text-4xl mt-1 text-stone-950 dark:text-stone-50">
          Honors & Publications
        </h2>
      </div>

      {/* Awards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-red-800 dark:text-red-400 font-semibold">FEDERAL HONOR</span>
            <span className="text-stone-400">2021</span>
          </div>
          <h3 className="font-serif text-xl font-medium text-stone-950 dark:text-stone-50">
            Agatha Chapman Innovation Award
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Awarded for outstanding commitment to the development of innovative ideas or initiatives that advance agency priorities with respect to access, relevance, quality, and organizational efficiency.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-red-800 dark:text-red-400 font-semibold">EXEMPLARY SERVICE</span>
            <span className="text-stone-400">2020</span>
          </div>
          <h3 className="font-serif text-xl font-medium text-stone-950 dark:text-stone-50">
            Performance Recognition Award
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Conferred to an employee for outstanding engineering execution, technical contribution, and leadership.
          </p>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-3 pt-2">
        <h3 className="font-mono text-xs uppercase tracking-wider text-stone-400">Selected Publications</h3>
        <div className="divide-y divide-stone-200 dark:divide-stone-800 border-t border-b border-stone-200 dark:border-stone-800">
          <div className="py-3.5 flex justify-between items-center gap-4 text-xs">
            <a
              href="https://ruor.uottawa.ca/handle/10393/43733"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-red-800 dark:hover:text-red-400 transition"
            >
              A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages
            </a>
            <span className="font-mono text-stone-400 text-[11px] whitespace-nowrap">uOttawa ↗</span>
          </div>

          <div className="py-3.5 flex justify-between items-center gap-4 text-xs">
            <a
              href="https://www.statcan.gc.ca/en/data-science/network/topic-modelling"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-red-800 dark:hover:text-red-400 transition"
            >
              Topic Modelling and Dynamic Topic Modelling : A Technical Review
            </a>
            <span className="font-mono text-stone-400 text-[11px] whitespace-nowrap">StatCan ↗</span>
          </div>

          <div className="py-3.5 flex justify-between items-center gap-4 text-xs">
            <a
              href="https://www.statcan.gc.ca/en/data-science/network/image-segmentation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-red-800 dark:hover:text-red-400 transition"
            >
              Image Segmentation in Medical Imaging
            </a>
            <span className="font-mono text-stone-400 text-[11px] whitespace-nowrap">StatCan ↗</span>
          </div>

          <div className="py-3.5 flex justify-between items-center gap-4 text-xs">
            <a
              href="https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-red-800 dark:hover:text-red-400 transition"
            >
              Increasing Data Quality for Business Surveys without Impacting Collection Effort
            </a>
            <span className="font-mono text-stone-400 text-[11px] whitespace-nowrap">FCSM ↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
