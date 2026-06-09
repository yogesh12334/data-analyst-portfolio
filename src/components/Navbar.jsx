import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo / Name */}
        <div className="text-xl font-bold text-teal-400 tracking-wide cursor-pointer">
          Yogesh<span className="text-white">.Kumar</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-teal-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-teal-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-teal-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
        </div>

        {/* Desktop Right Buttons (Ab yahan sirf Hire Me bacha hai) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Hire Me Button */}
          <a
            href="#contact"
            className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-teal-500/10"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Yahan se bhi resume button clear kar diya) */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-4 text-center text-slate-300">
          <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-teal-400 py-2">Home</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-teal-400 py-2">About</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-teal-400 py-2">Projects</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-teal-400 py-2">Skills</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-teal-400 py-2">Contact</a>

          {/* Hire Me Mobile Button */}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-teal-500 text-slate-950 font-semibold mx-auto px-6 py-2 rounded-lg w-full max-w-xs"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;