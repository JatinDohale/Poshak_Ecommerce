import { assets } from '../assets/frontend_assets/assets'

// Components
import NewsletterBox from '../components/ui/NewletterBox'
import Tittle from '../components/ui/Tittle'
import Stats from '../components/Stats'
import WhyUs from '../components/WhyUs'




const About = () => {
  return (
    <div className="border-t border-gray-100  px-5  md:px-20">


      {/* ── Header ── */}
      <div className="a-head text-center pt-10 pb-2">
        <Tittle text1="ABOUT" text2="US" />
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Our Story &amp; Values</p>
      </div>

      {/* ── Story section ── */}
      <div className="my-12 flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
        <div className="a-img w-full md:max-w-md xl:max-w-lg flex-shrink-0">
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={assets.about_img}
              alt="About Poshak"
              className="w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm">
              <p className="text-xs font-semibold text-gray-900">Est. 2020</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Crafting style since day one</p>
            </div>
          </div>
        </div>

        <div className="a-text flex flex-col gap-5 text-gray-600 flex-1">
          <p className="text-sm leading-relaxed">
            Poshak was born from a simple belief — that great fashion should be accessible to everyone. We started as a small team of designers and fabric enthusiasts, united by a passion for clothes that make people feel confident.
          </p>
          <p className="text-sm leading-relaxed">
            Over the years we have grown into a trusted destination for men's, women's and kids' fashion. Every product in our catalogue is thoughtfully selected, quality-tested and fairly priced. We believe style should never compromise on comfort or conscience.
          </p>

          <div className="mission-block">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Our Mission</p>
            <p className="text-sm leading-relaxed text-gray-700">
              To make premium fashion effortlessly available — from the first click to the last stitch — while building a community that celebrates individual expression.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <Stats/>

      {/* ── Why choose us ── */}
      <div className="mb-16">
        <div className="a-head text-xl mb-8">
          <Tittle text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         <WhyUs/>
        </div>
      </div>

      {/* ── Team note ── */}
      <div className="mb-16 rounded-2xl bg-[#f7f5f2] border border-[#ece9e4] p-8 text-center a-text">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">The Team</p>
        <p className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          People who care about what you wear
        </p>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          Our team of designers, stylists and customer advocates work every day to bring you the best experience — from the warehouse to your wardrobe.
        </p>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About