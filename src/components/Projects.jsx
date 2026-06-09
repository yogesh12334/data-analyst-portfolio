import React, { useState, useRef, useEffect } from 'react';

/* ── GitHub SVG Icon ─────────────────────────────────── */
const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

/* ── External Link Icon ──────────────────────────────── */
const ExternalIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

/* ── Intersection Observer hook ─────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Project data ────────────────────────────────────── */
const projectList = [
  {
    tag: 'Machine Learning',
    title: 'Churn Intelligence System v3.0',
    description:
      'Modular ML pipeline using XGBoost to analyse 300k+ customer records and identify key churn drivers. SHAP-powered explainability layer gives transparent model insights. FastAPI backend integrated with a Streamlit dashboard.',
    techStack: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Streamlit'],
    metric: '300k+ records',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    github: 'https://github.com/yogesh12334/ai-driven-customer-retention-dashboard',
  },
  {
    tag: 'SQL & Analytics',
    title: 'Target Retail Data Analysis',
    description:
      'Analysed 100k+ rows of retail data using complex SQL JOINs and window functions to surface sales trends. Statistical analysis across supply chain delays reduced manual reporting effort by ~40%.',
    techStack: ['SQL', 'PostgreSQL', 'Statistical Analysis'],
    metric: '40% efficiency gain',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    github: 'https://github.com/yogesh12334/target-data-analysis-python-sql',
  },
  {
    tag: 'Business Intelligence',
    title: 'Uber Ride Analytics Dashboard',
    description:
      'A 7-page Power BI dashboard built on 93K+ ride records and revenue data. DAX-driven dynamic KPIs and time-series breakdowns improved analysis speed by ~30% over previous spreadsheet workflows.',
    techStack: ['Power BI', 'DAX', 'Power Query'],
    metric: '93K+ data points',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    github: 'https://github.com/yogesh12334/Uber-Analysis-Project',
  },
];

/* ── Tag color map ───────────────────────────────────── */
const tagColors = {
  'Machine Learning':    'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'SQL & Analytics':     'bg-sky-500/10    text-sky-400    border-sky-500/20',
  'Business Intelligence':'bg-amber-500/10 text-amber-400  border-amber-500/20',
};

/* ── Project Card ────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [cardRef, inView] = useInView(0.1);

  return (
    <article
      ref={cardRef}
      className="group relative bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden
                 flex flex-col shadow-xl
                 hover:border-teal-500/30 hover:-translate-y-2 hover:shadow-teal-500/5
                 transition-all duration-300"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms, border-color 0.3s, box-shadow 0.3s, translate 0.3s`,
      }}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-800 shrink-0">
        {/* Dark overlay fades out on hover */}
        <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/10 transition-all duration-500 z-10" />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />

        {/* Category badge — floats on image */}
        <span
          className={`absolute top-3 left-3 z-20 text-[10px] font-semibold tracking-wider uppercase
                      px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagColors[project.tag]}`}
        >
          {project.tag}
        </span>

        {/* Metric badge — floats bottom-right */}
        <span className="absolute bottom-3 right-3 z-20 text-[10px] font-mono text-teal-400
                         bg-slate-950/70 border border-teal-500/20 px-2 py-0.5 rounded backdrop-blur-sm">
          {project.metric}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-slate-100 leading-snug group-hover:text-teal-400 transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="text-slate-500 hover:text-teal-400 transition-colors duration-200 p-1 rounded-md hover:bg-teal-400/10"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title}`}
              className="text-slate-500 hover:text-teal-400 transition-colors duration-200 p-1 rounded-md hover:bg-teal-400/10"
            >
              <ExternalIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-4 group-hover:text-slate-400 transition-colors duration-200 flex-1">
          {project.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-slate-800/80" />

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono bg-slate-950 text-teal-400/80 px-2 py-0.5 rounded
                         border border-slate-800 hover:border-teal-500/30 hover:text-teal-400
                         transition-all duration-150 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ── Main Component ──────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-slate-900">
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <div className="flex items-center space-x-4 mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap">
            <span className="text-teal-400 font-mono text-xl mr-2">02.</span>
            Some Things I&apos;ve Built
          </h2>
          <div className="h-px bg-slate-800 flex-1 max-w-md" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://github.com/yogesh12334"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-teal-500/40 text-teal-400 text-sm
                       font-medium px-6 py-3 rounded-lg hover:bg-teal-500/10 hover:border-teal-400
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                       focus:ring-offset-slate-950 transition-all duration-200"
          >
            <GitHubIcon className="w-4 h-4" />
            View more on GitHub
          </a>
        </div>

      </div>
    </section>
  );
}

export default Projects;