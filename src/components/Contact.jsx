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

/* ── Icons ───────────────────────────────────────────── */
const MailIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yogesh-kumar-saini/',
    icon: <LinkedInIcon />,
    color: 'hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/5',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yogesh12334',
    icon: <GitHubIcon />,
    color: 'hover:text-slate-200 hover:border-slate-500/40 hover:bg-slate-500/5',
  },
];

/* ── Main Component ──────────────────────────────────── */
function Contact() {
  const [sectionRef, inView] = useInView(0.15);
  
  // Form handling states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Updated Dynamic submission method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Dynamic submission structure
    const submissionData = {
      ...formData,
      access_key: "118463c5-3829-4c75-8029-01da4b0629eb" 
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(submissionData)
      }).then((res) => res.json());

      if (response.success) {
        console.log("Success", response);
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.log("Submission fail structure", response);
        setIsSubmitted(false);
      }
    } catch (err) {
      console.log("Network dynamic failure", err);
      setIsSubmitted(false);
    }

    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 border-t border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-2">
        
        {/* Dual Grid Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* ── LEFT SIDE: Header & Context Details ── */}
          <div 
            className="space-y-6 text-left"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0ms, transform 0.5s ease 0ms',
            }}
          >
            <div className="space-y-2">
              <span className="text-teal-400 font-mono text-sm tracking-widest uppercase block">
                04. What's Next?
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
                Get In Touch
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-mono pt-1">
                Currently open to&nbsp;
                <span className="text-teal-400">Data Analyst</span>
                &nbsp;&amp;&nbsp;
                <span className="text-teal-400">Business Analyst</span>
                &nbsp;roles
              </p>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
              Have an interesting dataset, a potential project opportunity, or just want to discuss machine learning pipelines? Fill out the form, or reach out directly through traditional channels!
            </p>

            {/* Direct Contact info inline stack */}
            <div className="space-y-3 pt-4 border-t border-slate-900 max-w-sm">
              <a href="mailto:yogeshkumar84192@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-teal-400 text-xs sm:text-sm transition-colors duration-200 w-fit">
                <span className="text-teal-400"><MailIcon /></span>
                yogeshkumar84192@gmail.com
              </a>
              <a href="tel:+918865064674" className="flex items-center gap-3 text-slate-400 hover:text-teal-400 text-xs sm:text-sm transition-colors duration-200 w-fit">
                <span className="text-teal-400"><PhoneIcon /></span>
                +91 88650 64674
              </a>
            </div>

            {/* Social Cards (Pinned to bottom of text grid) */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {socials.map(({ label, href, icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${label} profile`}
                  className={`inline-flex items-center gap-2 text-slate-500 text-xs font-medium
                              border border-slate-800/60 px-3.5 py-1.5 rounded-lg
                              transition-all duration-200 ${color}`}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE: Direct Message Card Box ── */}
          <div
            className="w-full bg-slate-900/20 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-xs relative overflow-hidden"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 180ms, transform 0.5s ease 180ms',
            }}
          >
            <h3 className="text-slate-200 font-semibold text-lg mb-4 flex items-center gap-2 font-mono">
              <span className="text-teal-500 text-xs">&gt;_</span> Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="flex flex-col text-left space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-slate-950/60 border border-slate-800 focus:border-teal-500/50 text-slate-200 text-sm p-3 rounded-xl outline-none transition-all w-full"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col text-left space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-slate-950/60 border border-slate-800 focus:border-teal-500/50 text-slate-200 text-sm p-3 rounded-xl outline-none transition-all w-full"
                />
              </div>

              {/* Message Box */}
              <div className="flex flex-col text-left space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">Message</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Hi Yogesh, I checked your Power BI dashboards..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-slate-950/60 border border-slate-800 focus:border-teal-500/50 text-slate-200 text-sm p-3 rounded-xl outline-none transition-all resize-none w-full leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold text-sm py-3.5 px-4 rounded-xl transition-all shadow-md shadow-teal-500/10 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Send Message
                <SendIcon />
              </button>
            </form>

            {/* Smooth Alert Toast Popup within Card */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col justify-center items-center transition-all duration-300">
                <div className="text-teal-400 text-3xl mb-2">✨</div>
                <p className="text-slate-100 font-bold text-base">Thank You!</p>
                <p className="text-slate-400 text-xs mt-1 font-mono">Your message has been received successfully.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;