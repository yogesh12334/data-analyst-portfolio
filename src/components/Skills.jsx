import React, { useRef, useEffect, useState } from 'react';

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

/* ── Skill data from resume ──────────────────────────── */
const skillCategories = [
  {
    id: 'bi',
    icon: '📊',
    title: 'Data Analytics & BI',
    color: 'teal',
    skills: [
      { name: 'Power BI',        level: 95 },
      { name: 'Advanced DAX',    level: 90 },
      { name: 'Power Query',     level: 88 },
      { name: 'Tableau',         level: 80 },
      { name: 'Advanced Excel',  level: 85 },
      { name: 'ETL Pipelines',   level: 82 },
      { name: 'Data Modeling',   level: 80 },
    ],
  },
  {
    id: 'ml',
    icon: '🤖',
    title: 'Machine Learning & AI',
    color: 'violet',
    skills: [
      { name: 'Scikit-learn',         level: 80 },
      { name: 'XGBoost',              level: 82 },
      { name: 'SHAP Explainability',  level: 78 },
      { name: 'EDA',                  level: 88 },
      { name: 'Feature Engineering',  level: 80 },
      { name: 'Statistical Analysis', level: 85 },
      { name: 'Hypothesis Testing',   level: 75 },
    ],
  },
  {
    id: 'prog',
    icon: '💻',
    title: 'Programming & Databases',
    color: 'sky',
    skills: [
      { name: 'Python (Pandas, NumPy)', level: 90 },
      { name: 'Matplotlib & Seaborn',   level: 85 },
      { name: 'SQL',                    level: 88 },
      { name: 'PostgreSQL',             level: 82 },
      { name: 'MySQL',                  level: 80 },
      { name: 'Java',                   level: 65 },
      { name: 'R',                      level: 60 },
    ],
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: 'Tools & Frameworks',
    color: 'amber',
    skills: [
      { name: 'FastAPI',    level: 78 },
      { name: 'Streamlit',  level: 80 },
      { name: 'Git',        level: 85 },
      { name: 'GitHub',     level: 85 },
      { name: 'VS Code',    level: 90 },
      { name: 'HTML',       level: 70 },
    ],
  },
];

/* ── Certifications from resume ──────────────────────── */
const certifications = [
  {
    title: 'Big Data Computing',
    issuer: 'IIT Kanpur (NPTEL)',
    detail: 'Distributed Systems & Hadoop Ecosystem',
    date: 'Oct 2025',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    title: 'Microsoft Power BI',
    issuer: 'Simplilearn',
    detail: 'Advanced DAX, Visualization & Power Query',
    date: 'Dec 2025',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    title: 'Deloitte Data Analytics',
    issuer: 'Forage',
    detail: 'Data Cleaning, Modeling & Communication',
    date: 'Jun 2025',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
  {
    title: 'Tata GenAI Powered Analytics',
    issuer: 'Forage',
    detail: 'Data Analytics & AI Strategy',
    date: 'Jan 2025',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    title: 'Advanced Excel',
    issuer: 'Simplilearn',
    detail: 'Pivot Tables, VLOOKUP & Statistical Functions',
    date: 'Nov 2025',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    title: 'Data Analytics Internship',
    issuer: 'Alfido Tech',
    detail: 'Certificate of Completion',
    date: 'Aug 2025',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
];

/* ── Color maps ──────────────────────────────────────── */
const barColors = {
  teal:   'bg-teal-400',
  violet: 'bg-violet-400',
  sky:    'bg-sky-400',
  amber:  'bg-amber-400',
};
const borderColors = {
  teal:   'border-teal-500/30  hover:border-teal-500/60',
  violet: 'border-violet-500/30 hover:border-violet-500/60',
  sky:    'border-sky-500/30   hover:border-sky-500/60',
  amber:  'border-amber-500/30 hover:border-amber-500/60',
};
const titleColors = {
  teal:   'text-teal-400',
  violet: 'text-violet-400',
  sky:    'text-sky-400',
  amber:  'text-amber-400',
};

/* ── Animated Skill Bar ──────────────────────────────── */
function SkillBar({ name, level, color, inView, delay }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">{name}</span>
        <span className="text-[10px] font-mono text-slate-500">{level}%</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColors[color]} transition-all duration-700 ease-out`}
          style={{
            width: inView ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Skill Category Card ─────────────────────────────── */
function SkillCard({ category, index, inView: sectionInView }) {
  const [cardRef, cardInView] = useInView(0.1);
  const visible = sectionInView || cardInView;

  return (
    <div
      ref={cardRef}
      className={`bg-slate-900/40 border rounded-2xl p-5 flex flex-col gap-4
                  transition-all duration-300 ${borderColors[category.color]}`}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, border-color 0.3s`,
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
        <span className="text-lg" aria-hidden="true">{category.icon}</span>
        <h3 className={`font-semibold text-sm tracking-wide ${titleColors[category.color]}`}>
          {category.title}
        </h3>
      </div>

      {/* Skill bars */}
      <div className="space-y-3">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            inView={visible}
            delay={index * 100 + i * 60}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Cert Card ───────────────────────────────────────── */
function CertCard({ cert, index, inView }) {
  return (
    <div
      className={`border rounded-xl p-4 flex flex-col gap-1 transition-all duration-300
                  hover:-translate-y-0.5 ${cert.bg}`}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`text-xs font-semibold leading-snug ${cert.color}`}>{cert.title}</p>
        <span className="text-[10px] font-mono text-slate-500 shrink-0">{cert.date}</span>
      </div>
      <p className="text-[11px] text-slate-400 font-medium">{cert.issuer}</p>
      <p className="text-[10px] text-slate-500 leading-relaxed">{cert.detail}</p>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */
function Skills() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section id="skills" ref={sectionRef} className="py-24 border-t border-slate-900">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ── Section Heading ── */}
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap">
            <span className="text-teal-400 font-mono text-xl mr-2">03.</span>
            Technical Skills
          </h2>
          <div className="h-px bg-slate-800 flex-1 max-w-md" />
        </div>

        {/* ── Skills Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Certifications ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-lg font-semibold text-slate-200 whitespace-nowrap">
              Certifications &amp; Achievements
            </h3>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <CertCard key={cert.title} cert={cert} index={index} inView={inView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Skills;