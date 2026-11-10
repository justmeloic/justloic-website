export function Philosophy() {
  return (
    <section id="philosophy" className="space-y-10 border-t border-stone-200 dark:border-stone-800 pt-16">
      <div className="max-w-2xl space-y-4">
        <span className="font-mono text-xs text-red-800 dark:text-red-400 uppercase tracking-widest font-semibold">
          03 / Reflections & Philosophy
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Epistemology, Intuition & Code
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
          Influenced by modern texts on pragmatism, self-actualization, and the philosophy of science—especially Jaynes’ <em>Probability Theory: The Logic of Science</em> and Harris’ <em>The Moral Landscape</em>.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <blockquote className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-4 shadow-sm">
          <p className="font-serif text-lg italic text-stone-800 dark:text-stone-200 leading-snug">
            “Intuition is not inherited, it is acquired. General Relativity is unintuitive for the same reason a probability distribution is unintuitive in first-year Statistics: you were simply not in the business of thinking about numbers this way.”
          </p>
          <cite className="text-xs font-mono text-stone-400 not-italic block">
            — Loïc Muhirwa, <em>Geometric Intuition</em>
          </cite>
        </blockquote>

        <blockquote className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-4 shadow-sm">
          <p className="font-serif text-lg italic text-stone-800 dark:text-stone-200 leading-snug">
            “A mathematician is a person who can find analogies between theorems; a better mathematician between proofs; the best between theories... the ultimate between analogies.”
          </p>
          <cite className="text-xs font-mono text-stone-400 not-italic block">
            — Stefan Banach
          </cite>
        </blockquote>

        <blockquote className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-4 shadow-sm">
          <p className="font-serif text-lg italic text-stone-800 dark:text-stone-200 leading-snug">
            “Code is more often read than written.”
          </p>
          <cite className="text-xs font-mono text-stone-400 not-italic block">
            — Guido van Rossum
          </cite>
        </blockquote>
      </div>

      {/* Essay reflection card */}
      <div className="p-8 rounded-2xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 space-y-3">
        <span className="text-xs font-mono text-red-800 dark:text-red-400 uppercase tracking-wider font-semibold">
          Epistemological Inquiry • The Mind Projection Fallacy
        </span>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
          “Common language has an almost universal tendency to disguise epistemological statements by putting them into a grammatical form which suggests an ontological statement. To interpret the first kind of statement in the ontological sense is to assert that one’s own private thoughts and sensations are realities existing externally in Nature. We call this the ‘mind projection fallacy’... as soon as it is pointed out, it becomes evident that much of the discourse of philosophers and attempts of physicists to explain quantum theory are reduced to nonsense by repeatedly falling into it.”
        </p>
        <cite className="text-xs font-mono text-stone-400 not-italic block">
          — Edwin T. Jaynes, <em>Probability Theory: The Logic of Science</em>
        </cite>
      </div>
    </section>
  );
}
