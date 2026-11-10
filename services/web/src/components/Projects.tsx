import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Diffeomorphic Registration and Lesion Segmentation of Neuroimages",
    description:
      "My thesis research considered a generative approach to simultaneous diffeomorphic registration and stroke lesion segmentation of neuroimages. Image registration and segmentation were integrated by parameterizing them as latent variables of a hierarchical Bayesian model. I also proposed an efficient deep learning algorithm to infer these latent variables.",
    tags: ["computer vision", "image segmentation", "image registration", "deep learning"],
    image: "/images/projects/brain2.png",
    link: "https://ruor.uottawa.ca/handle/10393/43733",
  },
  {
    title: "Dynamic Topic Modelling",
    description:
      "I led a project in which we applied topic modelling to the Canadian Coroner and Medical Examiner Database (CCMED) in order to detect emerging death circumstances in the Canadian population. I was the sole developer and maintainer for the initial releases and the methodology was entirely designed by me. The system includes an end-to-end data pipeline and an interactive dashboard front-end.",
    tags: ["natural language processing", "topic modelling", "data visualization"],
    image: "/images/projects/docs2.png",
    link: "https://www.statcan.gc.ca/en/data-science/network/topic-modelling",
  },
  {
    title: "Statistics Canada’s Responsible Machine Learning Framework",
    description:
      "I am a major contributor to a framework that aims to promote responsible Machine Learning (ML) system development at Statistics Canada. The framework consists of guidelines for responsible ML development and independent ethical and technical peer reviews. In addition, I am involved in explainable and interpretable ML research to help support the framework.",
    tags: ["responsible ml", "data ethics", "explainable & interpretable"],
    image: "/images/projects/rml-logo2.png",
    link: "https://www.statcan.gc.ca/en/data-science/network/machine-learning",
  },
  {
    title: "Data Collection Optimization",
    description:
      "I made significant contributions to a data collection optimization system that aims to prioritize collection units (Canadian businesses) by optimizing the quality of the estimates (economic statistics) produced. This was a large-scale system that was used by 65 federal business surveys that cover four major sectors: manufacturing, wholesale and retail trade, services (including culture) and capital expenditures.",
    tags: ["economic statistics", "data collection", "business survey", "optimization"],
    image: "/images/projects/data-collection.png",
    link: "https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf",
  },
];

export function Projects() {
  return (
    <section id="projects" className="space-y-10 border-t border-stone-200 dark:border-stone-800 pt-16">
      <div className="space-y-2">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-950 dark:text-stone-50">
          Professional Projects
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-light">
          selected professional projects that I either led or made major contributions to
        </p>
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
              see more
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
