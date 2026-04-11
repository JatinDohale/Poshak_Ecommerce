import { useContext, useState } from 'react'

import { assets } from '../assets/frontend_assets/assets'
import { WhatsappIcon } from '../assets/icons/Icons'
import { ShopContext } from '../context/ShopContext'

// components
import Tittle from '../components/ui/Tittle'
import InfoBar from '../components/InfoBar'



const Contact = () => {
  // states and Variables
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const { Whatsup_url } = useContext(ShopContext)
  const waUrl = Whatsup_url


  // function for sumbit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="border-t border-gray-100 px-5 md:px-20">

      {/* ── Header ── */}
      <div className="c-head text-center pt-10 pb-2 ">
        <Tittle text1="CONTACT" text2="US" />
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">We'd love to hear from you</p>
      </div>

      {/* ── Main content ── */}
      <div className="my-12 flex flex-col md:flex-row gap-10 lg:gap-14 items-start">

        {/* Left — image + info */}
        <div className="c-img w-full md:max-w-sm xl:max-w-md flex-shrink-0 flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img src={assets.contact_img} alt="Contact Poshak" className="w-full h-full object-cover" />
          </div>

         <InfoBar/>
        </div>

        {/* Right — contact form + WhatsApp */}
        <div className="c-form flex-1 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>

            <p className="text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Send us a Message
            </p>
            <p className="text-xs text-gray-400 mb-6">We'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    className="contact-input"
                    type="text"
                    placeholder="Jatin Dohale"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    className="contact-input"
                    type="email"
                    placeholder="jatin@example.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                  Message
                </label>
                <textarea
                  className="contact-input"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  required
                  style={{ resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {sent ? (
                <div className="success-msg flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-sm flex-shrink-0">✓</div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">Message sent!</p>
                    <p className="text-xs text-green-600">We'll reply within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <button type="submit" className="send-btn" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="spin-anim w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>

          {/* WhatsApp card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <WhatsappIcon size={20} color='#25d366'/>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Prefer WhatsApp?</p>
                <p className="text-xs text-gray-400">We reply within minutes ⚡</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
                <span className="text-[10px] text-green-600 font-medium">Online</span>
              </div>
            </div>
            <a href={waUrl} target="_blank" rel="noreferrer" className="wa-btn">
              <WhatsappIcon size={16}/>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact