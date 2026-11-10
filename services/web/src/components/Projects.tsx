import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  linkLabel: string;
}

const projects: Project[] = [
  {
    title: "Diffeomorphic Registration & Lesion Segmentation",
    description:
      "M.Sc. Thesis at the University of Ottawa. Generative approach to simultaneous diffeomorphic registration and stroke lesion segmentation of neuroimages, integrated via hierarchical Bayesian latent variables and deep learning inference.",
    tags: ["Computer Vision", "Bayesian Latent Models", "Deep Learning"],
    image: "/images/projects/brain2.png",
    link: "https://ruor.uottawa.ca/handle/10393/43733",
    linkLabel: "Read Thesis Publication ↗",
  },
  {
    title: "Dynamic Topic Modelling for Public Health",
    description:
      "Led the system applying topic modeling to the Canadian Coroner and Medical Examiner Database (CCMED) to identify emerging circumstances of mortality across the Canadian population in real time.",
    tags: ["NLP", "Topic Modelling", "Epidemiology"],
    image: "/images/projects/docs2.png",
    link: "https://www.statcan.gc.ca/en/data-science/network/topic-modelling",
    linkLabel: "View Technical Review ↗",
  },
  {
    title: "Responsible Machine Learning Framework",
    description:
      "Major contributor to Statistics Canada’s national framework ensuring the ethical, transparent, and auditable deployment of production Machine Learning systems across federal departments.",
    tags: ["AI Governance", "Explainable AI", "Ethics"],
    image: "/images/projects/rml-logo2.png",
    link: "https://www.statcan.gc.ca/en/data-science/network/machine-learning",
    linkLabel: "Explore Framework Guidelines ↗",
  },
  {
    title: "Large-Scale Data Collection Optimization",
    description:
      "Engineered algorithmic prioritization for Canadian business surveys, maximizing statistical estimate quality across 65 economic sectors without inflating collection costs.",
    tags: ["Optimization", "Economic Statistics"],
    image: "/images/projects/data-collection.png",
    link: "https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf",
    linkLabel: "View FCSM Conference Paper ↗",
  },
];

export function Projects() {
  return (
    <section id="projects" className="space-y-10 border-t border-stone-200 dark:border-stone-800 pt-16">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="font-mono text-xs text-red-800 dark:text-red-400 uppercase tracking-widest font-semibold">
            01 / Engineering & Research
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-1 text-stone-950 dark:text-stone-50">
            Selected Systems & Research
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <article
            key={proj.title}
            className="p-8 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 hover:shadow-lg transition duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-44 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex items-center justify-center p-4 relative">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={240}
                  height={160}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-stone-500">
                {proj.tags.map((tag) => (
                  <span key={tag} className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-950 dark:text-stone-50">
                {proj.title}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                {proj.description}
              </p>
            </div>
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-red-800 dark:text-red-400 inline-flex items-center gap-1 hover:underline pt-2 border-t border-stone-100 dark:border-stone-800"
            >
              {proj.linkLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
