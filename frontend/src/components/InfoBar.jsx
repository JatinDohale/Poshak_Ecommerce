const INFO_ITEMS = [
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address',
    value: 'Mumbai, Maharashtra, India — 400001',
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.11 6.11l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+91 90825 XXXXX',
    href: 'tel:+919082500000',
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'support@poshak.in',
    href: 'mailto:support@poshak.in',
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Hours',
    value: 'Mon – Sat, 10am – 7pm IST',
  },
]

const InfoBar = () => {
  return (
          <div className="c-info bg-white rounded-2xl border border-gray-100 p-5"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Our Store</p>
            {INFO_ITEMS.map((item, i) => (
              <div key={i} className="info-row">
                <div className="info-icon">{item.icon}</div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-gray-700 hover:text-gray-900 transition-colors mt-0.5 block">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-700 mt-0.5">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
  )
}

export default InfoBar
