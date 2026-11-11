/*
 * Career timeline data shared by all timeline-*.html previews.
 * Source: LinkedIn (Nov 2026), justloic.com, uOttawa thesis repository.
 * Dates are "YYYY-MM" (or "YYYY-MM-DD" for publications). end: null means "Present".
 * Fields marked `approx` are not yet confirmed — edit them here and every preview updates.
 */
window.CAREER = {
  now: "2026-11",

  orgs: {
    google: { name: "Google", short: "Google", sub: "Generative AI · Cloud", color: "#B4884D" },
    goc: { name: "Government of Canada", short: "Gov. of Canada", sub: "Statistics Canada", color: "#881337" },
    uottawa: { name: "University of Ottawa", short: "uOttawa", sub: "MSc, Mathematics", color: "#48433E" },
    uwindsor: { name: "University of Windsor", short: "UWindsor", sub: "BSc, Mathematics", color: "#7A7068" },
  },

  types: {
    role: { label: "Roles", singular: "Role" },
    education: { label: "Education", singular: "Education" },
    project: { label: "Projects", singular: "Project" },
    publication: { label: "Publications", singular: "Publication" },
    award: { label: "Awards", singular: "Award" },
  },

  items: [
    // ── Roles · Google ─────────────────────────────────────────────
    {
      id: "google-fde",
      short: "FDE, Generative AI",
      type: "role",
      org: "google",
      title: "Forward Deployed Engineer, Generative AI",
      start: "2024-04",
      end: null,
      level: 5,
      summary: "Tech lead on large-scale enterprise AI engagements, shipping agents to production.",
      bullets: ["Tech lead on $XXXM AI projects", "Agents in production"],
      skills: ["Generative AI", "Agents", "Technical Leadership"],
    },
    {
      id: "google-research",
      short: "AI Research Eng.",
      type: "role",
      org: "google",
      title: "AI Research Engineer",
      start: "2025-10",
      end: "2026-05",
      level: 5.5,
      side: true,
      location: "Google 20% project",
      summary: "Turning state-of-the-art research into practical, high-impact solutions.",
      bullets: ["Agent inference", "Large-scale ML platform migration", "Google’s 20% project"],
      skills: ["Research & Development"],
    },

    // ── Roles · Government of Canada ───────────────────────────────
    {
      id: "goc-staff",
      short: "Staff MLE & TLM",
      type: "role",
      org: "goc",
      title: "Staff Machine Learning Engineer & Tech-Lead Manager",
      start: "2022-05",
      end: "2024-02",
      level: 4,
      summary: "Led a team of AI & ML engineers and researchers delivering AI research, development and consultancy for federal clients.",
      bullets: [
        "Led a team of AI & ML Engineers and Researchers focused on research, development and consultancy services for federal clients",
        "Directed the overhaul of how cutting-edge AI research and solutions were designed and built for domestic and foreign government agencies",
        "Maintained team cohesion and performance through company-wide layoffs",
      ],
      skills: ["System Architecture", "Team Leadership"],
    },
    {
      id: "goc-senior",
      short: "Senior MLE",
      type: "role",
      org: "goc",
      title: "Senior Machine Learning Engineer",
      start: "2021-05",
      end: "2022-05",
      level: 3,
      summary: "Senior engineer on production ML systems, responsible ML and NLP at Statistics Canada.",
      bullets: [],
      skills: ["Production ML", "NLP", "Responsible ML"],
    },
    {
      id: "goc-mle",
      short: "ML Engineer",
      type: "role",
      org: "goc",
      title: "Machine Learning Engineer",
      start: "2019-12",
      end: "2021-05",
      level: 2,
      summary: "Built ML pipelines and products, including the dynamic topic modelling system for CCMED.",
      bullets: [],
      skills: ["Machine Learning", "Data Engineering"],
    },
    {
      id: "goc-stat",
      short: "Math. Statistician",
      type: "role",
      org: "goc",
      title: "Mathematical Statistician",
      start: "2017-07",
      end: "2019-12",
      level: 1,
      summary: "Statistical methods for economic surveys: recommender systems and data collection optimization at scale.",
      bullets: ["Recommender systems", "Data collection optimization (at scale)"],
      skills: ["Statistics", "Optimization"],
    },

    // ── Education ──────────────────────────────────────────────────
    {
      id: "msc",
      short: "MSc, Mathematics",
      type: "education",
      org: "uottawa",
      title: "MSc, Mathematics",
      start: "2019-07",
      end: "2022-06",
      approx: true,
      level: null,
      summary: "Computer vision applied to medical neuroimaging, completed while working full-time. A+ in every course.",
      bullets: [
        "Thesis: A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages",
        "Supervisor: Tanya Schmah",
      ],
      skills: ["Computer Vision", "Bayesian Modelling", "Deep Learning"],
      link: "https://ruor.uottawa.ca/handle/10393/43733",
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
      level: 0,
      summary: "Mathematics, with minors in Biology, Chemistry & Computer Science.",
      bullets: ["Minors in Biology, Chemistry & Computer Science"],
      skills: ["Mathematics"],
    },

    // ── Projects ───────────────────────────────────────────────────
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
      skills: ["Responsible ML", "Data Ethics", "Explainability"],
      link: "https://www.statcan.gc.ca/en/data-science/network/machine-learning",
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
      skills: ["NLP", "Topic Modelling", "Data Visualization"],
      link: "https://www.statcan.gc.ca/en/data-science/network/topic-modelling",
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
      skills: ["Computer Vision", "Image Registration", "Deep Learning"],
      link: "https://ruor.uottawa.ca/handle/10393/43733",
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
      skills: ["Economic Statistics", "Optimization"],
      link: "https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf",
    },

    // ── Publications ───────────────────────────────────────────────
    {
      id: "pub-seg",
      type: "publication",
      org: "goc",
      title: "Image Segmentation in Medical Imaging",
      date: "2022-11-09",
      venue: "Data Science Network for the Federal Public Service",
      summary: "An overview of the methodology behind popular digital image segmentation methods for medical imaging.",
      link: "https://www.statcan.gc.ca/en/data-science/network/image-segmentation",
    },
    {
      id: "pub-thesis",
      type: "publication",
      org: "uottawa",
      title: "A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages",
      date: "2022-06-20",
      venue: "Master’s thesis, University of Ottawa",
      summary: "MSc thesis in Mathematics.",
      link: "https://ruor.uottawa.ca/handle/10393/43733",
    },
    {
      id: "pub-topic",
      type: "publication",
      org: "goc",
      title: "Topic Modelling and Dynamic Topic Modelling: A Technical Review",
      date: "2021-06-17",
      venue: "Data Science Network for the Federal Public Service",
      summary: "Technical review accompanying the CCMED topic modelling project.",
      link: "https://www.statcan.gc.ca/en/data-science/network/topic-modelling",
    },
    {
      id: "pub-fcsm",
      type: "publication",
      org: "goc",
      title: "Increasing Data Quality for Business Surveys without Impacting Collection Effort",
      date: "2018-12-13",
      venue: "Federal Committee on Statistical Methodology (FCSM)",
      summary: "Data collection optimization across 65 federal business surveys.",
      link: "https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf",
    },

    // ── Awards ─────────────────────────────────────────────────────
    {
      id: "award-gemini",
      type: "award",
      org: "google",
      title: "Business Impact Award, Gemini Enterprise",
      date: "2026-01",
      venue: "Google",
      summary: "Recognized for business impact on Gemini Enterprise.",
    },
    {
      id: "award-agatha",
      type: "award",
      org: "goc",
      title: "Agatha Chapman Innovation Award",
      date: "2021-12",
      venue: "Data Science Division, Statistics Canada",
      summary: "For outstanding commitment to innovative ideas or initiatives that advance the Agency’s priorities in access, relevance, quality or organizational efficiency.",
    },
    {
      id: "award-perf",
      type: "award",
      org: "goc",
      title: "Performance Recognition Award",
      date: "2020-12",
      venue: "Economic Statistics Methods Division, Statistics Canada",
      summary: "Awarded for outstanding performance.",
    },
  ],

  chapters: [
    {
      id: "foundations",
      numeral: "I",
      title: "Foundations",
      span: "— 2017",
      start: null,
      end: "2017-06",
      lede: "Mathematics at the University of Windsor, with detours through Biology, Chemistry and Computer Science.",
      items: ["bsc"],
    },
    {
      id: "statistician",
      numeral: "II",
      title: "The Statistician",
      span: "2017 — 2019",
      start: "2017-07",
      end: "2019-12",
      lede: "Joining Statistics Canada to optimize how 65 federal business surveys collect their data.",
      items: ["goc-stat", "proj-dco", "pub-fcsm"],
    },
    {
      id: "engineer",
      numeral: "III",
      title: "Learning Machines",
      span: "2019 — 2022",
      start: "2019-12",
      end: "2022-05",
      lede: "Moving into machine learning by day and Bayesian computer vision by night, with an MSc earned while working full-time.",
      items: ["goc-mle", "goc-senior", "msc", "proj-topic", "proj-rml", "award-perf", "pub-topic", "award-agatha"],
    },
    {
      id: "lead",
      numeral: "IV",
      title: "Leading the Lab",
      span: "2022 — 2024",
      start: "2022-05",
      end: "2024-02",
      lede: "Leading a team of ML engineers and researchers serving federal clients, at home and abroad.",
      items: ["goc-staff", "pub-thesis", "pub-seg"],
    },
    {
      id: "google",
      numeral: "V",
      title: "Generative Frontier",
      span: "2024 — Now",
      start: "2024-02",
      end: null,
      lede: "At Google, building enterprise Generative AI and putting agents into production.",
      items: ["google-fde", "google-research", "award-gemini"],
    },
  ],
};

window.CareerUtil = (() => {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const C = window.CAREER;

  // Fractional year, e.g. "2021-07" -> 2021.5
  const toYear = (s) => {
    if (!s) return null;
    const [y, m = 1, d = 1] = s.split("-").map(Number);
    return y + (m - 1) / 12 + (d - 1) / 365;
  };
  const fmt = (s) => {
    if (!s) return "Present";
    const [y, m] = s.split("-").map(Number);
    return m ? `${MONTHS[m - 1]} ${y}` : `${y}`;
  };
  const fmtYear = (s) => (s ? s.slice(0, 4) : "Now");
  const startOf = (it) => it.start || it.date || null;
  const endOf = (it) => (it.date ? it.date : it.end || C.now);

  const range = (it) => {
    if (it.date) return fmt(it.date);
    const a = it.start ? fmt(it.start) : "Pre";
    return `${a} – ${it.end ? fmt(it.end) : "Present"}`;
  };

  const duration = (it) => {
    if (it.date || !it.start) return "";
    const [y1, m1] = it.start.split("-").map(Number);
    const [y2, m2] = (it.end || C.now).split("-").map(Number);
    const months = (y2 - y1) * 12 + (m2 - m1) + 1;
    const y = Math.floor(months / 12);
    const m = months % 12;
    return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
  };

  const byId = Object.fromEntries(C.items.map((it) => [it.id, it]));
  const sorted = () => [...C.items].sort((a, b) => toYear(endOf(b)) - toYear(endOf(a)) || toYear(startOf(b) || "1900") - toYear(startOf(a) || "1900"));

  // Everything active at a given fractional year
  const activeAt = (t) =>
    C.items.filter((it) => {
      if (it.date) return false;
      const s = it.start ? toYear(it.start) : -Infinity;
      const e = toYear(it.end || C.now) + 1 / 12;
      return t >= s && t < e;
    });

  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  return { toYear, fmt, fmtYear, range, duration, byId, sorted, activeAt, startOf, endOf, esc, MONTHS };
})();
