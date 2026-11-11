"use client";

import Link from "next/link";
import { Download, Copy, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/site";
import { GOOGLE_WORDMARK_SVG, ORG_LOGOS } from "@/data/logos";

export default function ResumePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition w-fit"
        >
          <ArrowLeft size={14} />
          Back to Timeline
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-950 dark:hover:text-stone-100 transition"
            title="Copy shareable link"
          >
            {copied ? <Check size={13} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} />}
            {copied ? "Copied" : "Share link"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90 transition shadow-sm"
            title="Export or print PDF"
          >
            <Download size={13} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Main Resume Sheet / Card */}
      <article className="resume-sheet bg-white dark:bg-[#181615] rounded-2xl border border-stone-200/90 dark:border-stone-800/90 p-8 sm:p-14 shadow-sm space-y-9 sm:space-y-10 transition-colors">
        
        {/* Header / Identity */}
        <header className="space-y-3 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="font-serif text-3xl sm:text-5xl tracking-tight text-stone-950 dark:text-stone-50">
              Loïc Muhirwa
            </h1>
            <span className="font-mono text-xs text-stone-400 dark:text-stone-500">
              US &amp; CA
            </span>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 font-mono text-xs text-stone-500 dark:text-stone-400 pt-0.5">
            <a href="mailto:loic.muhirwa@gmail.com" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
              loic.muhirwa@gmail.com
            </a>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
            <a href="https://justloic.com" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
              justloic.com
            </a>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
              LinkedIn
            </a>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
              GitHub
            </a>
          </div>

          {/* Executive Summary */}
          <p className="text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed pt-2 max-w-3xl">
            Machine Learning Engineer and Applied Researcher with a graduate foundation in mathematics and medical computer vision.
            Specializing in architecting and shipping large-scale enterprise Generative AI systems, autonomous agents,
            and production inference platforms. Former federal ML team lead directing AI consultancy across domestic and international agencies.
          </p>
        </header>

        {/* Experience */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-semibold">
              01 / Experience
            </h2>
          </div>

          <div className="space-y-10">
            {/* Google Group */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <span
                    className="org-logo h-5 sm:h-6"
                    dangerouslySetInnerHTML={{ __html: GOOGLE_WORDMARK_SVG }}
                    aria-label="Google"
                    role="img"
                  />
                </div>
                <span className="font-mono text-xs text-stone-400">Apr 2024 – Present</span>
              </div>

              {/* FDE Role */}
              <div className="pl-6 border-l border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                      Forward Deployed Engineer, Generative AI
                    </h4>
                    <span className="font-mono text-[10px] text-stone-400">(Software Engineer)</span>
                  </div>
                  <span className="font-mono text-xs text-stone-400">Apr 2024 – Present</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Tech lead on multi-million dollar enterprise AI engagements, designing and shipping production-grade Generative AI agents.
                </p>
                <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400 pt-1">
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>Lead architecture and deployment for $XXXM enterprise Generative AI initiatives.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>Direct engineering teams in deploying autonomous agent systems into enterprise production environments.</span>
                  </li>
                </ul>
              </div>

              {/* Research Engineer 20% */}
              <div className="pl-6 border-l border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                      AI Research Engineer
                    </h4>
                    <span className="font-mono text-[10px] text-stone-400">(20% Project)</span>
                  </div>
                  <span className="font-mono text-xs text-stone-400">Oct 2025 – May 2026</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Translating cutting-edge research in agent inference and large-scale ML platform migrations into practical, high-impact enterprise solutions.
                </p>
              </div>
            </div>

            {/* Government of Canada Group */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <span
                    className="org-logo h-5 sm:h-6"
                    dangerouslySetInnerHTML={{ __html: ORG_LOGOS.goc.svg }}
                    aria-label="Government of Canada"
                    role="img"
                  />
                </div>
                <span className="font-mono text-xs text-stone-400">Jul 2017 – Feb 2024 · ~7 yrs</span>
              </div>

              {/* Staff MLE & Tech-Lead Manager */}
              <div className="pl-6 border-l border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Staff Machine Learning Engineer &amp; Tech-Lead Manager
                  </h4>
                  <span className="font-mono text-xs text-stone-400">May 2022 – Feb 2024</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Led a cross-functional team of AI &amp; ML Engineers and Data Scientists focused on research, system architecture, and consultancy for federal agencies.
                </p>
                <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400 pt-1">
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>Directed the overhaul of how cutting-edge AI research and production solutions were architected and delivered across domestic and foreign agencies.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>Championed team cohesion, mentorship, and high-velocity delivery through government-wide restructuring.</span>
                  </li>
                </ul>
              </div>

              {/* Senior MLE */}
              <div className="pl-6 border-l border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Senior Machine Learning Engineer
                  </h4>
                  <span className="font-mono text-xs text-stone-400">May 2021 – May 2022</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Senior engineer on production ML platforms, responsible machine learning frameworks, and Natural Language Processing pipelines at Statistics Canada.
                </p>
              </div>

              {/* Machine Learning Engineer */}
              <div className="pl-6 border-l border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Machine Learning Engineer
                  </h4>
                  <span className="font-mono text-xs text-stone-400">Dec 2019 – May 2021</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Sole methodology developer, pipeline engineer, and dashboard designer for the Dynamic Topic Modelling system applied to the Canadian Coroner and Medical Examiner Database (CCMED).
                </p>
              </div>

              {/* Mathematical Statistician */}
              <div className="pl-6 border-l border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Mathematical Statistician
                  </h4>
                  <span className="font-mono text-xs text-stone-400">Jul 2017 – Dec 2019</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Developed optimization models and adaptive data collection algorithms deployed across 65 federal business surveys, optimizing estimate precision while lowering respondent burden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-semibold">
              02 / Education
            </h2>
          </div>

          <div className="space-y-6">
            {/* uOttawa M.Sc. */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    MSc in Mathematics
                  </h3>
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">· University of Ottawa</span>
                </div>
                <span className="font-mono text-xs text-stone-400">2019 – 2022</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                Computer vision applied to medical neuroimaging, completed concurrently with full-time engineering. Grade of A+ across all coursework.
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                Thesis: <em>A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation of Neuroimages</em> (Supervisor: Dr. Tanya Schmah)
              </p>
            </div>

            {/* uWindsor B.Sc. */}
            <div className="space-y-1.5 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    BSc in Mathematics
                  </h3>
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">· University of Windsor</span>
                </div>
                <span className="font-mono text-xs text-stone-400">2012 – 2017</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                Concentration in pure and applied mathematics, with comprehensive foundational coursework across Computer Science, Biology, and Chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Publications & Research */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-semibold">
              03 / Selected Research &amp; Publications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <strong>A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion Segmentation</strong> · Master’s Thesis
              </span>
              <span className="font-mono text-xs text-stone-400 shrink-0">2022</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <strong>Image Segmentation in Medical Imaging</strong> · Data Science Network for the Federal Public Service
              </span>
              <span className="font-mono text-xs text-stone-400 shrink-0">2022</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <strong>Topic Modelling and Dynamic Topic Modelling: A Technical Review</strong> · Federal Data Science Network
              </span>
              <span className="font-mono text-xs text-stone-400 shrink-0">2021</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <strong>Increasing Data Quality for Business Surveys without Impacting Collection Effort</strong> · FCSM Conference
              </span>
              <span className="font-mono text-xs text-stone-400 shrink-0">2018</span>
            </div>
          </div>
        </section>

        {/* Selected Honors & Recognition */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-semibold">
              04 / Awards
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 space-y-1">
              <span className="font-mono text-[10px] text-[#B4884D] font-medium">Google · Jan 2026</span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">Business Impact Award, Gemini Enterprise</h4>
              <p className="text-xs text-stone-500 font-light">Recognized for key business and production impact on enterprise Gemini agents.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 space-y-1">
              <span className="font-mono text-[10px] text-[#B4884D] font-medium">Government of Canada · May 2022</span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">Agatha Chapman Innovation Award</h4>
              <p className="text-xs text-stone-500 font-light">Recognized by the Deputy Minister for innovative machine learning methodologies.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 space-y-1">
              <span className="font-mono text-[10px] text-[#B4884D] font-medium">Government of Canada · Sep 2021</span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">Performance Recognition Award</h4>
              <p className="text-xs text-stone-500 font-light">Awarded for high-impact technical leadership on production NLP systems.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 space-y-1">
              <span className="font-mono text-[10px] text-[#B4884D] font-medium">NSERC · 2019</span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">Canada Graduate Scholarship (CGS-M)</h4>
              <p className="text-xs text-stone-500 font-light">National research award recognizing academic excellence in mathematical graduate research.</p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
