// Career timeline content (LinkedIn + justloic.com). Dates are "YYYY-MM" or "YYYY-MM-DD";
// end: null means "Present". Items marked approx have unconfirmed dates.

export type OrgKey = "google" | "goc" | "uottawa" | "uwindsor";
export type ItemType = "role" | "education" | "project" | "publication" | "award";

export interface Org {
  name: string;
  color: string;
}

export interface CareerItem {
  id: string;
  type: ItemType;
  org: OrgKey;
  title: string;
  short?: string;
  start?: string | null;
  end?: string | null;
  date?: string;
  approx?: boolean;
  location?: string;
  venue?: string;
  summary?: string;
  bullets?: string[];
  skills?: string[];
  link?: string;
}

export const ORGS: Record<OrgKey, Org> = {
  google: {
    name: "Google",
    color: "#B4884D"
  },
  goc: {
    name: "Government of Canada",
    color: "#881337"
  },
  uottawa: {
    name: "University of Ottawa",
    color: "#48433E"
  },
  uwindsor: {
    name: "University of Windsor",
    color: "#7A7068"
  }
};

export const TYPES: Record<ItemType, { label: string; singular: string }> = {
  role: {
    label: "Roles",
    singular: "Role"
  },
  education: {
    label: "Education",
    singular: "Education"
  },
  project: {
    label: "Projects",
    singular: "Project"
  },
  publication: {
    label: "Publications",
    singular: "Publication"
  },
  award: {
    label: "Awards",
    singular: "Award"
  }
};

export const CAREER: CareerItem[] = [
  {
    id: "google-fde",
    short: "FDE, Generative AI",
    type: "role",
    org: "google",
    title: "Forward Deployed Engineer, Generative AI",
    start: "2024-04",
    end: null,
    summary: "Tech lead on large-scale enterprise AI engagements, shipping agents to production.",
    bullets: [
      "Tech lead on $XXXM AI projects",
      "Agents in production"
    ],
    skills: [
      "Generative AI",
      "Agents",
      "Technical Leadership"
    ]
  },
  {
    id: "google-research",
    short: "AI Research Eng.",
    type: "role",
    org: "google",
    title: "AI Research Engineer",
    start: "2025-10",
    end: "2026-05",
    location: "Google 20% project",
    summary: "Turning state-of-the-art research into practical, high-impact solutions.",
    bullets: [
      "Agent inference",
      "Large-scale ML platform migration",
      "Google’s 20% project"
    ],
    skills: [
      "Research & Development"
    ]
  },
  {
    id: "goc-staff",
    short: "Staff MLE & TLM",
    type: "role",
    org: "goc",
    title: "Staff Machine Learning Engineer & Tech-Lead Manager",
    start: "2022-05",
    end: "2024-02",
    summary: "Led a team of AI & ML engineers and researchers delivering AI research, development and consultancy for federal clients.",
    bullets: [
      "Led a team of AI & ML Engineers and Researchers focused on research, development and consultancy services for federal clients",
      "Directed the overhaul of how cutting-edge AI research and solutions were designed and built for domestic and foreign government agencies",
      "Maintained team cohesion and performance through company-wide layoffs"
    ],
    skills: [
      "System Architecture",
      "Team Leadership"
    ]
  },
  {
    id: "goc-senior",
    short: "Senior MLE",
    type: "role",
    org: "goc",
    title: "Senior Machine Learning Engineer",
    start: "2021-05",
    end: "2022-05",
    summary: "Senior engineer on production ML systems, responsible ML and NLP at Statistics Canada.",
    bullets: [],
    skills: [
      "Production ML",
      "NLP",
      "Responsible ML"
    ]
  },
  {
    id: "goc-mle",
    short: "ML Engineer",
    type: "role",
    org: "goc",
    title: "Machine Learning Engineer",
    start: "2019-12",
    end: "2021-05",
    summary: "Built ML pipelines and products, including the dynamic topic modelling system for CCMED.",
    bullets: [],
    skills: [
      "Machine Learning",
      "Data Engineering"
    ]
  },
  {
    id: "goc-stat",
    short: "Math. Statistician",
    type: "role",
    org: "goc",
    title: "Mathematical Statistician",
    start: "2017-07",
    end: "2019-12",
    summary: "Statistical methods for economic surveys: recommender systems and data collection optimization at scale.",
    bullets: [
      "Recommender systems",
      "Data collection optimization (at scale)"
    ],
    skills: [
      "Statistics",
      "Optimization"
    ]
  },
  {
    id: "msc",
    short: "MSc, Mathematics",
    type: "education",
    org: "uottawa",
    title: "MSc, Mathematics",
    start: "2019-07",
    end: "2022-06",
    approx: true,
    summary: "Computer vision applied to medical neuroimaging, completed while working full-time. A+ in every course.",
    bullets: [
      "Thesis: A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages",
      "Supervisor: Tanya Schmah"
    ],
    skills: [
      "Computer Vision",
      "Bayesian Modelling",
      "Deep Learning"
    ],
    link: "https://ruor.uottawa.ca/handle/10393/43733"
  },
  {
    id: "bsc",
    short: "BSc, Mathematics",
    type: "education",
    org: "uwindsor",
    title: "BSc, Mathematics",
    start: null,
    end: "2017-06",
    approx: true,
    summary: "Mathematics, with minors in Biology, Chemistry & Computer Science.",
    bullets: [
      "Minors in Biology, Chemistry & Computer Science"
    ],
    skills: [
      "Mathematics"
    ]
  },
  {
    id: "proj-rml",
    short: "Responsible ML Framework",
    type: "project",
    org: "goc",
    title: "Responsible Machine Learning Framework",
    start: "2020-08",
    end: "2024-02",
    summary: "Core contributor to Statistics Canada’s framework for responsible ML: development guidelines plus independent ethical and technical peer reviews, backed by explainability research.",
    bullets: [],
    skills: [
      "Responsible ML",
      "Data Ethics",
      "Explainability"
    ],
    link: "https://www.statcan.gc.ca/en/data-science/network/machine-learning"
  },
  {
    id: "proj-topic",
    type: "project",
    org: "goc",
    title: "Dynamic Topic Modelling",
    start: "2020-03",
    end: "2024-02",
    summary: "Led topic modelling of the Canadian Coroner and Medical Examiner Database (CCMED) to detect emerging death circumstances. Sole developer and designer of the methodology, pipeline and dashboard.",
    bullets: [],
    skills: [
      "NLP",
      "Topic Modelling",
      "Data Visualization"
    ],
    link: "https://www.statcan.gc.ca/en/data-science/network/topic-modelling"
  },
  {
    id: "proj-thesis",
    short: "Thesis: Registration & Segmentation",
    type: "project",
    org: "uottawa",
    title: "Diffeomorphic Registration & Lesion Segmentation",
    start: "2019-07",
    end: "2022-04",
    summary: "Hierarchical Bayesian model treating registration and stroke-lesion segmentation as latent variables, with an efficient deep learning inference algorithm.",
    bullets: [],
    skills: [
      "Computer Vision",
      "Image Registration",
      "Deep Learning"
    ],
    link: "https://ruor.uottawa.ca/handle/10393/43733"
  },
  {
    id: "proj-dco",
    type: "project",
    org: "goc",
    title: "Data Collection Optimization",
    start: "2017-06",
    end: "2019-11",
    summary: "Prioritized collection of Canadian businesses by optimizing estimate quality. Used by 65 federal business surveys across manufacturing, trade, services and capital expenditures.",
    bullets: [],
    skills: [
      "Economic Statistics",
      "Optimization"
    ],
    link: "https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf"
  },
  {
    id: "pub-seg",
    type: "publication",
    org: "goc",
    title: "Image Segmentation in Medical Imaging",
    date: "2022-11-09",
    venue: "Data Science Network for the Federal Public Service",
    summary: "An overview of the methodology behind popular digital image segmentation methods for medical imaging.",
    link: "https://www.statcan.gc.ca/en/data-science/network/image-segmentation"
  },
  {
    id: "pub-thesis",
    type: "publication",
    org: "uottawa",
    title: "A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages",
    date: "2022-06-20",
    venue: "Master’s thesis, University of Ottawa",
    summary: "MSc thesis in Mathematics.",
    link: "https://ruor.uottawa.ca/handle/10393/43733"
  },
  {
    id: "pub-topic",
    type: "publication",
    org: "goc",
    title: "Topic Modelling and Dynamic Topic Modelling: A Technical Review",
    date: "2021-06-17",
    venue: "Data Science Network for the Federal Public Service",
    summary: "Technical review accompanying the CCMED topic modelling project.",
    link: "https://www.statcan.gc.ca/en/data-science/network/topic-modelling"
  },
  {
    id: "pub-fcsm",
    type: "publication",
    org: "goc",
    title: "Increasing Data Quality for Business Surveys without Impacting Collection Effort",
    date: "2018-12-13",
    venue: "Federal Committee on Statistical Methodology (FCSM)",
    summary: "Data collection optimization across 65 federal business surveys.",
    link: "https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf"
  },
  {
    id: "award-gemini",
    type: "award",
    org: "google",
    title: "Business Impact Award, Gemini Enterprise",
    date: "2026-01",
    venue: "Google",
    summary: "Recognized for business impact on Gemini Enterprise."
  },
  {
    id: "award-agatha",
    type: "award",
    org: "goc",
    title: "Agatha Chapman Innovation Award",
    date: "2021-12",
    venue: "Data Science Division, Statistics Canada",
    summary: "For outstanding commitment to innovative ideas or initiatives that advance the Agency’s priorities in access, relevance, quality or organizational efficiency."
  },
  {
    id: "award-perf",
    type: "award",
    org: "goc",
    title: "Performance Recognition Award",
    date: "2020-12",
    venue: "Economic Statistics Methods Division, Statistics Canada",
    summary: "Awarded for outstanding performance."
  }
];
