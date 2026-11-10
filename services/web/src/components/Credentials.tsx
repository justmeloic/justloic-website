export function Credentials() {
  return (
    <div className="space-y-16 border-t border-stone-200 dark:border-stone-800 pt-16">
      {/* Awards Section */}
      <section id="awards" className="space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Awards
        </h2>

        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-3 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-stone-950 dark:text-stone-50">
              2021 Agatha Chapman Innovation Award
            </h3>
            <h4 className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Awarded to an employee for outstanding commitment to the development of innovative ideas or initiatives that advance the Agency’s priorities with respect to access, relevance, quality or organizational efficiency.
            </h4>
            <div className="pt-2">
              <a
                href="https://drive.google.com/file/d/12vVGs3YS2pN9XxQs0QlXhazfKtvueadn/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-red-800 dark:text-red-400 hover:underline"
              >
                View Certificate ↗
              </a>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-3 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-stone-950 dark:text-stone-50">
              2020 Performance Recognition Award
            </h3>
            <h4 className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Awarded to an employee for outstanding performance.
            </h4>
            <div className="pt-2">
              <a
                href="https://drive.google.com/file/d/1lyOfGv76Noq_FL81XAw2rW4svcv5JuQe/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-red-800 dark:text-red-400 hover:underline"
              >
                View Certificate ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Publications
        </h2>

        <div className="space-y-4 divide-y divide-stone-200 dark:divide-stone-800">
          <div className="pt-3">
            <h3 className="font-serif text-lg text-red-900 dark:text-red-400">
              <a
                href="https://ruor.uottawa.ca/handle/10393/43733"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages
              </a>
            </h3>
          </div>

          <div className="pt-3">
            <h3 className="font-serif text-lg text-red-900 dark:text-red-400">
              <a
                href="https://www.statcan.gc.ca/en/data-science/network/topic-modelling"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Topic Modelling and Dynamic Topic Modelling : A Technical Review
              </a>
            </h3>
          </div>

          <div className="pt-3">
            <h3 className="font-serif text-lg text-red-900 dark:text-red-400">
              <a
                href="https://www.statcan.gc.ca/en/data-science/network/image-segmentation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Image Segmentation in Medical Imaging
              </a>
            </h3>
          </div>

          <div className="pt-3">
            <h3 className="font-serif text-lg text-red-900 dark:text-red-400">
              <a
                href="https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Increasing Data Quality for Business Surveys without Impacting Collection Effort
              </a>
            </h3>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Resume
        </h2>

        <div className="p-8 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-medium text-stone-950 dark:text-stone-50">
              Curriculum Vitae
            </h3>
            <p className="text-sm text-stone-500 font-light">
              View or download Loïc Muhirwa’s resume
            </p>
          </div>
          <a
            href="https://drive.google.com/file/d/1Zs2keVXymlPnDdYl7G1G5KmnuGWls2mP/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 font-mono text-xs rounded-lg hover:opacity-90 transition whitespace-nowrap"
          >
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
}
