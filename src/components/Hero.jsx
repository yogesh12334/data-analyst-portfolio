import React from 'react';

function Hero() {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12 py-12"
    >
      {/* Left Side: Intro Text */}
      <div className="flex-[1.2] flex flex-col space-y-6 text-left order-2 md:order-1">
        <span className="text-teal-400 font-medium tracking-wider text-sm sm:text-base uppercase">
          Hi, my name is
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-none">
          Yogesh Kumar.
        </h1>

        <h2 className="text-2xl sm:text-4xl font-bold text-slate-400 leading-snug">
          I build data-driven solutions.
        </h2>

        <p className="text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed">
          I&apos;m a Data Analytics enthusiast and developer specializing in
          turning complex datasets into actionable business intelligence
          dashboards and scalable web systems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="#projects"
            className="inline-block border border-teal-500 text-teal-400 font-medium px-6 py-3 rounded-lg
                       transition-all duration-200 hover:bg-teal-500/10 hover:border-teal-400
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                       focus:ring-offset-slate-900"
            aria-label="View my projects"
          >
            Check out my work!
          </a>

          <a
            href="/Yogesh_Kumar.pdf"
            download="Yogesh_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-6 py-3 rounded-lg
                       transition-all duration-200 shadow-md shadow-teal-500/20
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                       focus:ring-offset-slate-900"
            aria-label="Download Resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Right Side: Profile Image */}
      <div className="flex-1 flex justify-center items-center order-1 md:order-2">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-2xl bg-linear-to-tr from-teal-500/20 to-transparent blur-xl -z-10"
            aria-hidden="true"
          />

          {/* Profile Image (Ab yeh direct public/Profile.jpeg se load ho rahi hai) */}
          <img
            src="/Profile.jpeg"
            alt="Yogesh Kumar — Data Analytics Developer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover rounded-2xl bg-slate-800
                       grayscale-0 md:grayscale md:hover:grayscale-0
                       border-2 border-teal-500/30 hover:border-teal-400
                       shadow-2xl transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;