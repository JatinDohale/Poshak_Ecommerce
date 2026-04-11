const WHYS = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Quality Assurance',
    desc:  'Every garment passes a rigorous multi-point inspection before it reaches you. We source only the finest fabrics and work with skilled artisans.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Convenience',
    desc:  'From seamless browsing to doorstep delivery, we have designed every step of your journey to be effortless and enjoyable.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Exceptional Support',
    desc:  'Our customer care team is available 7 days a week. Whether it is a size query or a return, we respond fast and resolve faster.',
  },
]



const WhyUs = () => {
  return (
    <>
    {WHYS.map((w, i) => (
        <div
        key={i}
        className="why-card a-why"
        style={{ animationDelay: `${0.1 + i * 0.1}s` }}
        >
              <div className="why-icon">{w.icon}</div>
              <p className="text-sm font-semibold text-gray-900">{w.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{w.desc}</p>
            </div>
          ))}
    </>
  )
}

export default WhyUs
