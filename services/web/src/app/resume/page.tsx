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
    <div className="mx-auto max-w-4xl py-8 sm:py-12">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print mb-8 flex flex-col justify-between gap-4 pb-6 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 font-mono text-xs text-stone-500 transition hover:text-stone-900 dark:hover:text-stone-100"
        >
          <ArrowLeft size={14} />
          Back to Timeline
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1.5 font-mono text-xs text-stone-600 transition hover:border-stone-900 hover:text-stone-950 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
            title="Copy shareable link"
          >
            {copied ? (
              <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy size={13} />
            )}
            {copied ? "Copied" : "Share link"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-1.5 font-mono text-xs font-medium text-stone-100 shadow-sm transition hover:opacity-90 dark:bg-stone-100 dark:text-stone-900"
            title="Export or print PDF"
          >
            <Download size={13} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Main Resume Sheet / Card */}
      <article className="resume-sheet space-y-9 rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(36,33,30,0.04),0_10px_30px_-8px_rgba(36,33,30,0.10),0_30px_70px_-20px_rgba(36,33,30,0.18)] transition-colors dark:bg-[#181615] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_12px_32px_-8px_rgba(0,0,0,0.6),0_32px_80px_-20px_rgba(0,0,0,0.75)] sm:space-y-10 sm:p-14">
        {/* Header / Identity */}
        <header className="space-y-3 pb-0">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <h1 className="font-serif text-3xl tracking-tight text-stone-950 dark:text-stone-50 sm:text-5xl">
              Loïc Muhirwa
            </h1>
            <span className="font-mono text-xs text-stone-400 dark:text-stone-500">
              US &amp; CA
            </span>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5 font-mono text-xs text-stone-500 dark:text-stone-400">
            <a
              href="mailto:loic.muhirwa@gmail.com"
              className="transition hover:text-stone-900 dark:hover:text-stone-100"
            >
              loic.muhirwa@gmail.com
            </a>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">
              •
            </span>
            <a
              href="https://justloic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-stone-900 dark:hover:text-stone-100"
            >
              justloic.com
            </a>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">
              •
            </span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-stone-900 dark:hover:text-stone-100"
            >
              LinkedIn
            </a>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">
              •
            </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-stone-900 dark:hover:text-stone-100"
            >
              GitHub
            </a>
          </div>

          {/* Executive Summary */}
          <p className="max-w-3xl pt-2 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-300">
            Machine Learning Engineer and Applied Researcher with a graduate foundation in
            mathematics and medical computer vision. Specializing in architecting and shipping
            large-scale enterprise Generative AI systems, autonomous agents, and production
            inference platforms. Previously a Tech Lead Manager in the Government of Canada, leading
            the delivery of national-scale machine learning systems, from public health analytics
            across the Canadian population to economic statistics across the country’s businesses.
          </p>
        </header>

        {/* Experience */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
              Experience
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
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                      Forward Deployed Engineer, Generative AI
                    </h4>
                    <span className="font-mono text-[10px] text-stone-400">
                      (Software Engineer)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-stone-400">Apr 2024 – Present</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Tech lead on multi-million dollar enterprise AI engagements, designing and
                  shipping production-grade Generative AI agents.
                </p>
                <ul className="space-y-1 pt-1 text-xs text-stone-600 dark:text-stone-400">
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>
                      Lead architecture and deployment for $XXXM enterprise Generative AI
                      initiatives.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>
                      Direct engineering teams in deploying autonomous agent systems into enterprise
                      production environments.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Research Engineer 20% */}
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                      AI Research Engineer
                    </h4>
                    <span className="font-mono text-[10px] text-stone-400">(20% Project)</span>
                  </div>
                  <span className="font-mono text-xs text-stone-400">Oct 2025 – May 2026</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Translating cutting-edge research in agent inference and large-scale ML platform
                  migrations into practical, high-impact enterprise solutions.
                </p>
              </div>
            </div>

            {/* Bell Canada Group */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <span
                    className="org-logo org-logo-brand-bell h-4 sm:h-5"
                    dangerouslySetInnerHTML={{ __html: ORG_LOGOS.bell.svg }}
                    aria-label="Bell Canada"
                    role="img"
                  />
                </div>
                <span className="font-mono text-xs text-stone-400">Jul 2023 – Apr 2024</span>
              </div>

              {/* AI Model Post-Training */}
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                      AI Model Post-Training
                    </h4>
                    <span className="font-mono text-[10px] text-stone-400">(LLM Engineer)</span>
                  </div>
                  <span className="font-mono text-xs text-stone-400">Jul 2023 – Apr 2024</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Post-training of Bell&apos;s in-house custom models used in its call center
                  operations.
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
                <span className="font-mono text-xs text-stone-400">
                  Jul 2017 – Feb 2024 · ~7 yrs
                </span>
              </div>

              {/* Staff MLE & Tech-Lead Manager */}
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Staff Machine Learning Engineer &amp; Tech-Lead Manager
                  </h4>
                  <span className="font-mono text-xs text-stone-400">May 2022 – Feb 2024</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Led a cross-functional team of AI &amp; ML Engineers and Data Scientists focused
                  on research, system architecture, and consultancy for federal agencies.
                </p>
                <ul className="space-y-1 pt-1 text-xs text-stone-600 dark:text-stone-400">
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>
                      Directed the overhaul of how cutting-edge AI research and production solutions
                      were architected and delivered across domestic and foreign agencies.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-stone-400 dark:text-stone-500">—</span>
                    <span>
                      Championed team cohesion, mentorship, and high-velocity delivery through
                      government-wide restructuring.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Senior MLE */}
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Senior Machine Learning Engineer
                  </h4>
                  <span className="font-mono text-xs text-stone-400">May 2021 – May 2022</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Senior engineer on production ML platforms, responsible machine learning
                  frameworks, and Natural Language Processing pipelines at Statistics Canada.
                </p>
              </div>

              {/* Machine Learning Engineer */}
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Machine Learning Engineer
                  </h4>
                  <span className="font-mono text-xs text-stone-400">Dec 2019 – May 2021</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Sole methodology developer, pipeline engineer, and dashboard designer for the
                  Dynamic Topic Modelling system applied to the Canadian Coroner and Medical
                  Examiner Database (CCMED).
                </p>
              </div>

              {/* Mathematical Statistician */}
              <div className="space-y-2 border-l border-stone-200 pl-6 dark:border-stone-800">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h4 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    Mathematical Statistician
                  </h4>
                  <span className="font-mono text-xs text-stone-400">Jul 2017 – Dec 2019</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                  Developed optimization models and adaptive data collection algorithms deployed
                  across 65 federal business surveys, optimizing estimate precision while lowering
                  respondent burden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {/* uOttawa M.Sc. */}
            <div className="space-y-1.5">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    MSc in Mathematics
                  </h3>
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    · University of Ottawa
                  </span>
                </div>
                <span className="font-mono text-xs text-stone-400">2019 – 2022</span>
              </div>
              <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                Computer vision applied to medical neuroimaging, completed concurrently with
                full-time engineering. Grade of A+ across all coursework.
              </p>
              <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
                Thesis:{" "}
                <em>
                  A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion
                  Segmentation of Neuroimages
                </em>{" "}
                (Supervisor: Dr. Tanya Schmah)
              </p>
            </div>

            {/* uWindsor B.Sc. */}
            <div className="space-y-1.5 pt-2">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-base font-medium text-stone-900 dark:text-stone-100">
                    BSc in Mathematics
                  </h3>
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    · University of Windsor
                  </span>
                </div>
                <span className="font-mono text-xs text-stone-400">2012 – 2017</span>
              </div>
              <p className="text-xs font-light leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
                Concentration in pure and applied mathematics, with comprehensive foundational
                coursework across Computer Science, Biology, and Chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Publications & Research */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
              Selected Research &amp; Publications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col justify-between gap-1 text-xs sm:flex-row sm:items-baseline sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <a
                  href="https://ruor.uottawa.ca/handle/10393/43733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-900 hover:underline dark:hover:text-red-400"
                >
                  <strong>
                    A Generative Approach to Simultaneous Diffeomorphic Registration and Lesion
                    Segmentation
                  </strong>
                </a>{" "}
                · Master’s Thesis
              </span>
              <span className="shrink-0 font-mono text-xs text-stone-400">2022</span>
            </div>
            <div className="flex flex-col justify-between gap-1 text-xs sm:flex-row sm:items-baseline sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <a
                  href="https://www.statcan.gc.ca/en/data-science/network/image-segmentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-900 hover:underline dark:hover:text-red-400"
                >
                  <strong>Image Segmentation in Medical Imaging</strong>
                </a>{" "}
                · Data Science Network for the Federal Public Service
              </span>
              <span className="shrink-0 font-mono text-xs text-stone-400">2022</span>
            </div>
            <div className="flex flex-col justify-between gap-1 text-xs sm:flex-row sm:items-baseline sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <a
                  href="https://www.statcan.gc.ca/en/data-science/network/topic-modelling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-900 hover:underline dark:hover:text-red-400"
                >
                  <strong>Topic Modelling and Dynamic Topic Modelling: A Technical Review</strong>
                </a>{" "}
                · Federal Data Science Network
              </span>
              <span className="shrink-0 font-mono text-xs text-stone-400">2021</span>
            </div>
            <div className="flex flex-col justify-between gap-1 text-xs sm:flex-row sm:items-baseline sm:text-sm">
              <span className="text-stone-800 dark:text-stone-200">
                <a
                  href="https://nces.ed.gov/FCSM/pdf/C_1_Andrews_2018FCSM.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-900 hover:underline dark:hover:text-red-400"
                >
                  <strong>
                    Increasing Data Quality for Business Surveys without Impacting Collection Effort
                  </strong>
                </a>{" "}
                · FCSM Conference
              </span>
              <span className="shrink-0 font-mono text-xs text-stone-400">2018</span>
            </div>
          </div>
        </section>

        {/* Selected Honors & Recognition */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
              Awards
            </h2>
          </div>

          <div className="grid gap-4 text-xs sm:grid-cols-2 sm:text-sm">
            <div className="space-y-1 rounded-xl border border-stone-200/80 p-3.5 dark:border-stone-800/80">
              <span className="font-mono text-[10px] font-medium text-[#B4884D]">
                Google · Jan 2026
              </span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">
                Business Impact Award, Gemini Enterprise
              </h4>
              <p className="text-xs font-light text-stone-500">
                Recognized for key business and production impact on enterprise Gemini agents.
              </p>
            </div>
            <div className="space-y-1 rounded-xl border border-stone-200/80 p-3.5 dark:border-stone-800/80">
              <span className="font-mono text-[10px] font-medium text-[#B4884D]">
                Government of Canada · May 2022
              </span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">
                Agatha Chapman Innovation Award
              </h4>
              <p className="text-xs font-light text-stone-500">
                Recognized by the Deputy Minister for innovative machine learning methodologies.
              </p>
            </div>
            <div className="space-y-1 rounded-xl border border-stone-200/80 p-3.5 dark:border-stone-800/80">
              <span className="font-mono text-[10px] font-medium text-[#B4884D]">
                Government of Canada · Sep 2021
              </span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">
                Performance Recognition Award
              </h4>
              <p className="text-xs font-light text-stone-500">
                Awarded for high-impact technical leadership on production NLP systems.
              </p>
            </div>
            <div className="space-y-1 rounded-xl border border-stone-200/80 p-3.5 dark:border-stone-800/80">
              <span className="font-mono text-[10px] font-medium text-[#B4884D]">NSERC · 2019</span>
              <h4 className="font-medium text-stone-900 dark:text-stone-100">
                Canada Graduate Scholarship (CGS-M)
              </h4>
              <p className="text-xs font-light text-stone-500">
                National research award recognizing academic excellence in mathematical graduate
                research.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
