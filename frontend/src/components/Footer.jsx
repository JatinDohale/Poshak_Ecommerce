import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { ShopContext } from '../context/ShopContext' // context file
import { FaceBookIcon, InstagramIcon, WhatsappIcon } from '../assets/icons/Icons'


const Footer = () => {

  // states and Variable
  const { Whatsup_message, Whatsup_number, Instagram, Facebook } = useContext(ShopContext)
  const waUrl = `https://wa.me/${Whatsup_number}?text=${encodeURIComponent(Whatsup_message)}`
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 border-t border-gray-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-10">

          {/* Brand column */}
          <div className="ft-anim" style={{ animationDelay: '.05s' }}>
            <Link to="/">
              <img
                src="src/assets/frontend_assets/logo.png"
                alt="Poshak"
                className="w-28 rounded-xl mb-4 object-contain"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-5">
              Experience the beauty of Indian traditions with luxurious ethnic wear designed for every grand occasion.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mb-5">
              {/* Instagram */}
              <a href={Instagram} target="_blank" rel="noreferrer" className="social-btn" title="Instagram">
                <InstagramIcon />
              </a>
              {/* Facebook */}
              <a href={Facebook} target="_blank" rel="noreferrer" className="social-btn" title="Facebook">
                <FaceBookIcon />
              </a>
              {/* Whatsup */}
              <a href={waUrl} target="_blank" rel="noreferrer" className="social-btn">
                <WhatsappIcon size={"14"} />
              </a>

            </div>
          </div>

          {/* Company links */}
          <div className="ft-anim" style={{ animationDelay: '.1s' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-5">Company</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Collection', to: '/collection' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="ft-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div className="ft-anim" style={{ animationDelay: '.15s' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-5">Support</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'FAQ', to: '/faq' },
                { label: 'Track Order', to: '/orders' },
                { label: 'Size Guide', to: '/guide' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="ft-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div className="ft-anim" style={{ animationDelay: '.2s' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-5">Get in Touch</p>

            <ul className="flex flex-col gap-3 mb-6">
              <li>
                <a href="tel:+919082170000" className="ft-link">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.11 6.11l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 90821 7XXXX
                </a>
              </li>
              <li>
                <a href="mailto:customerservice@poshak.com" className="ft-link">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  customerservice@poshak.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Mon–Sat, 10am–7pm IST
              </li>
            </ul>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            © {year} Poshak. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Payment icons placeholder */}
            {['Visa', 'MC', 'UPI', 'COD'].map(p => (
              <span key={p} className="text-[10px] font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Privacy</Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Terms</Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer