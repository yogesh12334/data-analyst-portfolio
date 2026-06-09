import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer' 

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-teal-500/30 selection:text-teal-200 antialiased scroll-smooth flex flex-col justify-between">
      
      <div>
        {/* 1. Sticky Navigation */}
        <Navbar />

        {/* Main Content Containers */}
        <main className="max-w-7xl mx-auto px-6">
          
          {/* 2. Hero/Intro Section */}
          <Hero />

          {/* 3. About Me Section */}
          <About />

          {/* 4. Projects Portfolio Grid */}
          <Projects />

          {/* 5. Technical Skills Grid */}
          <Skills />

          {/* 6. Contact Form/Links */}
          <Contact />

        </main>
      </div>

      {/* 7. Bottom Full Width Footer */}
      <Footer />

    </div>
  )
}

export default App