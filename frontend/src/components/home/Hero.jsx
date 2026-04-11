// Packages
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Assests
import { assets } from '../../assets/frontend_assets/assets'
import SLIDES from '../../data/slide'
import { ArrowIcon } from '../../assets/icons/Icons'
import Stats from '../Stats'



// Slide Image Based On Current Slide
const SLIDES_IMG = [
  assets.Slide_one,
  assets.Slide_Two,
  assets.Slide_Three,
]

const Hero = ({ goToComponents, bestSellerRef, latestArrivalRef }) => {

  // States and Variable
  const [slide, setSlide] = useState(0)
  const [animIn, setAnimIn] = useState(true)

  const current = SLIDES[slide]
  const slideRef = [latestArrivalRef, bestSellerRef]

  // Go to specific slide with fade out/in animation
  const goTo = (idx) => {
    setAnimIn(false)
    setTimeout(() => { setSlide(idx); setAnimIn(true) }, 300)
  }

  // Useeffect for sliding interval
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((slide + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slide]);






  return (
    <section className="relative overflow-hidden border border-gray-100 rounded-2xl">
      <div className="relative flex flex-col sm:flex-row h-full sm:h-[87vh]">

        {/* ── Left: Text ── */}
        <div className="w-full sm:w-1/2 flex items-center justify-center px-10 py-14 sm:py-0 bg-[#faf9f7] relative">

          {/* Background number watermark */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[140px] font-bold text-gray-100 select-none pointer-events-none leading-none"
            style={{ fontFamily: 'Georgia, serif' }}>
            {String(slide + 1).padStart(2, '0')}
          </div>

          {/* Content */}
          {animIn && (
            <div className="relative z-10 max-w-xs">

              {/* Tag line */}
              <div className="hero-tag flex items-center gap-2 mb-5">
                <div className="w-6 h-0.5 bg-gray-400 hero-line" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {current.tag}
                </span>
              </div>

              {/* Heading */}
              <h1 style={{ fontFamily: 'Georgia, serif' }}>
                <span className="hero-h1-1 block text-5xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-none">
                  {current.heading[0]}
                </span>
                <span
                  className="hero-h1-2 block text-5xl sm:text-4xl lg:text-6xl font-bold leading-none mt-1"
                  style={{ color: current.accent }}
                >
                  {current.heading[1]}
                </span>
              </h1>

              {/* Subtext */}
              <p className="hero-sub text-sm text-gray-500 mt-4 leading-relaxed">
                {current.sub}
              </p>

              {/* Divider */}
              <div className="hero-sub flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* CTA buttons */}
              <div className="hero-cta flex items-center gap-5 flex-wrap">
                {slideRef[slide] && <button onClick={() => goToComponents(slideRef[slide])} className="cta-btn">
                  {current.cta}
                  <ArrowIcon />
                </button>}
                <Link to="/collection" className="cta-ghost">
                  View All
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* ── Right: Image ── */}
        <div className="w-full absolute sm:relative sm:w-1/2  overflow-hidden bg-gray-100 min-h-64 sm:min-h-0">
          {animIn && (
            <img
              src={SLIDES_IMG[slide]}
              alt="Hero"
              className="hero-img w-full h-full object-cover object-top"
              style={{ minHeight: 320 }}
            />
          )}

          {/* Gradient overlay on left edge to blend into text panel */}
          <div className="absolute inset-y-0 left-0 w-12 hidden sm:block"
            style={{ background: 'linear-gradient(to right, #faf9f7, transparent)' }} />


          {/* Prev / Next arrows */}
          <div className="absolute inset-y-0 left-3 flex items-center">
            <button
              onClick={() => goTo((slide - 1 + SLIDES.length) % SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-sm"
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button
              onClick={() => goTo((slide + 1) % SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-sm"
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 hero-scroll">
          <span className="text-[9px] uppercase tracking-widest text-red-400">Scroll</span>
          <div className="w-px h-6 bg-gray-300" />
        </div>
      </div>

      <div className='mt-5 px-5 md:px-20'>
      <Stats />
      </div>


    </section>
  )
}

export default Hero