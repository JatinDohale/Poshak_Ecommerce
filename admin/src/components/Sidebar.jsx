import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const NAV_ITEMS = [
  {
    to: '/add',
    label: 'Add Items',
    icon: (
      // Plus-in-box SVG (replaces lord-icon)
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8"  y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    to: '/list',
    label: 'List Items',
    icon: <img src={assets.order_icon} alt="" className="w-[18px] h-[18px] object-contain" />,
  },
  {
    to: '/orders',
    label: 'Orders',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
]

const Sidebar = () => {
  return (
    <aside className="w-[20%] md:w-full min-h-screen bg-white border-r border-gray-100 flex flex-col py-5">
      <style>{`
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .sb-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          margin: 0 10px;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          transition: all .18s ease;
          position: relative;
          white-space: nowrap;
          animation: slideRight .45s cubic-bezier(.22,1,.36,1) forwards;
          opacity: 0;
        }

        .sb-link:hover {
          background: #f7f5f2;
          color: #1a1a1a;
          transform: translateX(2px);
        }

        .sb-link.active {
          background: #1a1a1a;
          color: #fff;
          box-shadow: 0 4px 14px rgba(26,26,26,.2);
        }

        /* Make SVG strokes white when active */
        .sb-link.active svg { stroke: #fff; }

        /* Make img icons slightly brighter when active */
        .sb-link.active img { filter: brightness(10); }

        /* Active left accent bar */
        .sb-link.active::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #1a1a1a;
          border-radius: 0 3px 3px 0;
        }

        .sb-link:nth-child(1) { animation-delay: .05s; }
        .sb-link:nth-child(2) { animation-delay: .10s; }
        .sb-link:nth-child(3) { animation-delay: .15s; }

        .sb-divider {
          height: 1px;
          background: #f0ede8;
          margin: 12px 16px;
        }

        .sb-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #c4c0b8;
          padding: 0 24px;
          margin-bottom: 6px;
        }
      `}</style>

      {/* Section label */}
      <p className="sb-section-label">Menu</p>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sb-link ${isActive ? 'active' : ''}`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sb-divider" />

      {/* Bottom version tag */}
      <div className="hidden md:block mx-3 px-3 py-2.5 bg-[#f7f5f2] rounded-xl border border-[#ece9e4]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Version</p>
        <p className="text-xs text-gray-600 font-medium mt-0.5">Poshak Admin v1.0</p>
      </div>
    </aside>
  )
}

export default Sidebar