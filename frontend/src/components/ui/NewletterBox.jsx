
import { useState, useContext } from 'react'

import { ShopContext } from '../../context/ShopContext'
import { ArrowIcon, GmailIcon, WhatsappIcon } from '../../assets/icons/Icons'


const NewsletterBox = () => {

    // states and Variables
    const { Whatsup_number, Whatsup_message } = useContext(ShopContext)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

  

const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
    setEmail('')
}

return (
    <section className="py-5 px-4">

        <div className="nl-wrap max-w-xl mx-auto text-center">

            {/* Tag */}
            <div className="nl-tag flex items-center justify-center gap-2 mb-4">
                <div className="w-5 h-px bg-gray-300" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    Stay Connected
                </span>
                <div className="w-5 h-px bg-gray-300" />
            </div>

            {/* Heading */}
            <h2 className="nl-h2 text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug"
                style={{ fontFamily: 'Georgia, serif' }}>
                Subscribe & Get{' '}
                <span className="relative inline-block">
                    <span className="relative z-10">20% Off</span>
                    <span className="absolute bottom-0.5 left-0 right-0 h-2 bg-amber-200 opacity-60 -z-0 rounded" />
                </span>
            </h2>

            <p className="nl-sub text-sm text-gray-400 mt-3 leading-relaxed max-w-sm mx-auto">
                Join 50,000+ style lovers. Get early access to new drops, exclusive deals, and fashion tips.
            </p>

            {/* Success state */}
            {submitted ? (
                <div className="nl-success mt-8 flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-2xl">
                        ✓
                    </div>
                    <p className="text-sm font-semibold text-gray-800">You're in! Check your inbox.</p>
                    <p className="text-xs text-gray-400">Your 20% discount code is on its way.</p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 text-xs text-gray-400 underline underline-offset-2 hover:text-gray-700 transition-colors"
                    >
                        Subscribe another email
                    </button>
                </div>
            ) : (
                <>
                    {/* Email form */}
                    <form onSubmit={onSubmitHandler} className="nl-form mt-7">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1.5
                focus-within:border-gray-800 focus-within:ring-2 focus-within:ring-gray-100 transition-all duration-200">
                            {/* Mail icon */}
                            <div className="pl-2 text-gray-300 flex-shrink-0">
                               <GmailIcon/>
                            </div>
                            <input
                                className="nl-input"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="nl-subscribe-btn" disabled={loading}>
                                {loading ? (
                                    <span className="nl-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                                ) : (
                                    <>
                                        Subscribe
                                        <ArrowIcon/>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="nl-wa my-5">
                        <p className="divider-text">or connect on</p>
                    </div>

                    {/* WhatsApp button */}
                    <div className="nl-wa">
                        <a
                            href={`https://wa.me/${Whatsup_number}?text=${Whatsup_message}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wa-btn"
                        >
                           <WhatsappIcon/>
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Trust note */}
                    <p className="nl-note text-[11px] text-gray-300 mt-5 leading-relaxed">
                        🔒 No spam, ever. Unsubscribe anytime. We respect your privacy.
                    </p>
                </>
            )}
        </div>
    </section>
)
}

export default NewsletterBox;