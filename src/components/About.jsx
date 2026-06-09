import React, { useEffect, useRef, useState } from 'react';

/* ── Animated counter hook ───────────────────────────── */
function useCounter(target, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ── Intersection Observer hook ─────────────────────── */
function useInView(threshold = 0.2) {
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

/* ── Stat card ───────────────────────────────────────── */
function StatCard({ value, suffix = '', label, inView, delay }) {
  const count = useCounter(value, 1400, inView);
  return (
    <div
      className="flex flex-col items-center justify-center bg-slate-900/60 border border-slate-800/70
                 rounded-2xl p-5 gap-1 hover:border-teal-500/40 transition-all duration-300
                 hover:bg-slate-900/80 hover:-translate-y-0.5"
      style={{ animationDelay: delay }}
    >
      <span className="text-3xl font-extrabold text-teal-400 tracking-tight font-mono">
        {count}{suffix}
      </span>
      <span className="text-xs text-slate-500 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
}

/* ── Tech pill ───────────────────────────────────────── */
function TechPill({ name }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                 bg-teal-500/10 text-teal-400 border border-teal-500/20
                 hover:bg-teal-500/20 hover:border-teal-400/40 transition-all duration-200 cursor-default"
    >
      <span className="w-1 h-1 rounded-full bg-teal-400 inline-block" />
      {name}
    </span>
  );
}

/* ── Timeline item ───────────────────────────────────── */
function TimelineItem({ year, title, org, desc, isLast }) {
  return (
    <div className="flex gap-4">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-slate-900 mt-1 shrink-0 z-10" />
        {!isLast && <div className="w-px flex-1 bg-slate-800 mt-1" />}
      </div>
      {/* Content */}
      <div className={`pb-6 ${isLast ? '' : ''}`}>
        <span className="text-xs font-mono text-teal-400/70 tracking-wider">{year}</span>
        <p className="text-slate-200 font-semibold text-sm mt-0.5">{title}</p>
        <p className="text-teal-400/80 text-xs font-medium">{org}</p>
        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */
function About() {
  const [sectionRef, inView] = useInView(0.15);

  const techStack = [
    'Python', 'Pandas', 'NumPy', 'Power BI', 'Tableau',
    'SQL', 'Excel', 'React', 'JavaScript', 'Git',
  ];

  const timeline = [
    {
      year: '2026',
      title: 'Data Analytics Internship',
      org: 'Alfido Tech',
      desc: '45-day intensive internship — built data pipelines, created BI dashboards, and translated raw datasets into business strategy.',
    },
    {
      year: '2023 – 2026',
      title: 'Bachelor of Computer Applications',
      org: 'Teerthanker Mahaveer University',
      desc: 'Specialized in data systems, software development, and database management.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 border-t border-slate-900"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section Heading ── */}
        <div className="flex items-center space-x-4 mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap">
            <span className="text-teal-400 font-mono text-xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-px bg-slate-800 flex-1 max-w-md" />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: Bio + Tech Stack */}
          <div className="lg:col-span-3 space-y-8">

            {/* Bio paragraphs */}
            <div className="space-y-5 text-slate-400 text-base leading-relaxed">
              <p>
                Hello! I&apos;m{' '}
                <span className="text-slate-200 font-semibold">Yogesh</span>, a
                BCA graduate from Teerthanker Mahaveer University. My
                passion lies in working with data — uncovering patterns, building
                predictive models, and creating intuitive dashboards that solve
                real-world problems.
              </p>
              <p>
                Recently, I completed a{' '}
                <span className="text-teal-400 font-semibold">
                  45-day Data Analytics Internship at Alfido Tech
                </span>
                , where I sharpened my skills in processing datasets and
                translating numbers into meaningful business strategy.
              </p>
              <p>
                I love building end-to-end data pipelines and automation
                workflows, constantly shifting my focus from being just a
                developer to providing solid, data-backed proof of work.
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">
                Technologies I work with
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <TechPill key={tech} name={tech} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Stats + Timeline + Quick Facts */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard value={45}  suffix="+"  label="Days at Alfido"   inView={inView} delay="0ms"    />
              <StatCard value={10}  suffix="+"  label="Projects"         inView={inView} delay="100ms"  />
              <StatCard value={5}   suffix="+"  label="Tech Skills"      inView={inView} delay="200ms"  />
            </div>

            {/* Timeline */}
            <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-medium">
                Experience &amp; Education
              </p>
              <div>
                {timeline.map((item, i) => (
                  <TimelineItem
                    key={i}
                    {...item}
                    isLast={i === timeline.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Quick Facts card */}
            <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5 space-y-3">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                Quick Facts
              </p>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  ['🎓', 'BCA — Graduating 2026'],
                  ['💼', 'Alfido Tech — Data Analytics'],
                  ['📍', 'Rampur, Uttar Pradesh'],
                  ['🚀', 'Open to opportunities'],
                ].map(([icon, text]) => (
                  <li key={text} className="flex items-center gap-2.5">
                    <span className="text-base">{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;