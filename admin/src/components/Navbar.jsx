import { assets } from "../assets/assets"

const Navbar = ({ setToken }) => {
  return (
    <nav
      className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100"
      style={{ boxShadow: '0 1px 0 #f0ede8' }}
    >
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-anim { animation: fadeDown .45s cubic-bezier(.22,1,.36,1) forwards; }
        .logout-btn { transition: all .2s ease; }
        .logout-btn:hover {
          background: #fef2f2; color: #dc2626;
          border-color: #fecaca; transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220,38,38,.12);
        }
        .logout-btn:active { transform: translateY(0); }
      `}</style>

      {/* ── Brand ── */}
      <div className="nb-anim flex items-center gap-3">
        <div className="relative">
          <img
            src={assets.logo}
            alt="Poshak"
            className="w-10 h-10 rounded-xl object-cover"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,.12)' }}
          />
          {/* live indicator dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white block" />
        </div>

        <div>
          <p
            className="text-sm font-semibold text-gray-900 leading-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Poshak
          </p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5 leading-none">
            <span className="text-red-500 font-bold">Admin</span>&nbsp;Panel
          </p>
        </div>
      </div>

      {/* ── Right side ── */}
      <div className="nb-anim flex items-center gap-3">

        {/* Live status pill — hidden on small screens */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
          <span className="text-[11px] text-green-700 font-medium tracking-wide">Live</span>
        </div>

        {/* Logout button */}
        <button
          onClick={() => setToken("")}
          className="logout-btn flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl bg-white"
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
