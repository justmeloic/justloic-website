import Image from "next/image";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="space-y-12 border-t border-stone-200 pt-16 dark:border-stone-800"
    >
      <div className="grid items-start gap-8 md:grid-cols-12">
        <div className="space-y-4 md:col-span-8">
          <div>
            <h2 className="font-serif text-3xl text-stone-950 dark:text-stone-50 md:text-4xl">
              Philosophy
            </h2>
            <h4 className="mt-1 font-serif text-sm italic text-stone-500 dark:text-stone-400">
              Loïc Muhirwa
            </h4>
          </div>

          <p className="hyphens-auto text-justify text-base font-light leading-relaxed text-stone-600 dark:text-stone-400">
            Much of my thinking about my personal and professional life has been influenced by
            modern and contemporary texts on a present-day understanding of morality, pragmatism,
            self-actualization and the philosophy of science. Most notably{" "}
            <em>The Moral Landscape</em>, <em>Probability Theory: The Logic of Science</em> and{" "}
            <em>Designing the Mind</em> by Sam Harris, E. T. Jaynes and Ryan Bush, respectively.
            Below I list some concepts I’ve been thinking about lately along with some emblematic
            quotes.
          </p>
        </div>

        <div className="md:col-span-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800">
            <Image src="/images/philo/cont_art-low-res.jpg" alt="" fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="space-y-8 divide-y divide-stone-200 dark:divide-stone-800">
        {/* Concept 1 */}
        <div className="space-y-2 pt-6">
          <h3 className="font-serif text-xl font-medium text-red-900 dark:text-red-400">
            Science & Philosophy
          </h3>
          <p className="hyphens-auto text-justify text-sm font-light leading-relaxed text-stone-700 dark:text-stone-300">
            I don&apos;t think there&apos;s an interesting boundary between philosophy and science.
            Science is totally beholden to philosophy. There are philosophical assumptions in
            science and there&apos;s no way to get around that.{" "}
            <strong className="font-semibold italic text-stone-900 dark:text-stone-100">
              — Sam Harris
            </strong>
          </p>
        </div>

        {/* Concept 2 */}
        <div className="space-y-2 pt-6">
          <h3 className="font-serif text-xl font-medium text-red-900 dark:text-red-400">
            Abstraction & Mathematicians
          </h3>
          <p className="hyphens-auto text-justify text-sm font-light leading-relaxed text-stone-700 dark:text-stone-300">
            A mathematician is a person who can find analogies between theorems; a better
            mathematician is one who can see analogies between proofs and the best mathematician can
            notice analogies between theories. One can imagine that the ultimate mathematician is
            one who can see analogies between analogies.{" "}
            <strong className="font-semibold italic text-stone-900 dark:text-stone-100">
              — Stefan Banach
            </strong>
          </p>
        </div>

        {/* Concept 3 */}
        <div className="space-y-2 pt-6">
          <h3 className="font-serif text-xl font-medium text-red-900 dark:text-red-400">
            Writing & Maintaining Code
          </h3>
          <p className="hyphens-auto text-justify text-sm font-light leading-relaxed text-stone-700 dark:text-stone-300">
            Code is more often read than written.{" "}
            <strong className="font-semibold italic text-stone-900 dark:text-stone-100">
              — Guido van Rossum
            </strong>
          </p>
        </div>

        {/* Concept 4 */}
        <div className="space-y-3 pt-6">
          <h3 className="font-serif text-xl font-medium text-red-900 dark:text-red-400">
            Mind Projection Fallacy
          </h3>
          <p className="hyphens-auto text-justify text-sm font-light leading-relaxed text-stone-700 dark:text-stone-300">
            We don&apos;t see things as they are, we see them as we are.{" "}
            <strong className="font-semibold italic text-stone-900 dark:text-stone-100">
              — Anaïs Nin
            </strong>
          </p>
          <p className="hyphens-auto text-justify text-sm font-light leading-relaxed text-stone-700 dark:text-stone-300">
            Common language – or, at least, the English language – has an almost universal tendency
            to disguise epistemological statements by putting them into a grammatical form which
            suggests to the unwary an ontological statement. A major source of error in current
            probability theory arises from an unthinking failure to perceive this. To interpret the
            first kind of statement in the ontological sense is to assert that one’s own private
            thoughts and sensations are realities existing externally in Nature. We call this the
            ‘mind projection fallacy’, and note the trouble it causes many times in what follows.
            But this trouble is hardly confined to probability theory; as soon as it is pointed out,
            it becomes evident that much of the discourse of philosophers and Gestalt psychologists,
            and the attempts of physicists to explain quantum theory, are reduced to nonsense by the
            author falling repeatedly into the mind projection fallacy.{" "}
            <strong className="font-semibold italic text-stone-900 dark:text-stone-100">
              — Edwin T. Jaynes
            </strong>
          </p>
        </div>

        {/* Concept 5 */}
        <div className="space-y-2 pt-6">
          <h3 className="font-serif text-xl font-medium text-red-900 dark:text-red-400">
            Privilege & Responsibility
          </h3>
          <p className="hyphens-auto text-justify text-sm font-light leading-relaxed text-stone-700 dark:text-stone-300">
            When we consider the responsibility of intellectuals, our basic concern must be their
            role in the creation and analysis of ideology.{" "}
            <strong className="font-semibold italic text-stone-900 dark:text-stone-100">
              — Noam Chomsky
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
