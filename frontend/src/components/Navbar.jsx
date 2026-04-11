import { useEffect, useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { ShopContext } from '../context/ShopContext' //context file 

// Assests
import { assets } from '../assets/frontend_assets/assets'
import { WhatsappIcon, SearchIcon, CartIcon, ProfileIcon, LogoutIcon, HamburgerIcon, HamburgerCloseIcon } from '../assets/icons/Icons'


const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {

  // States and Variable
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { Whatsup_message,
    Whatsup_number,
    cartItems,
    token,
    navigate,
    logout } = useContext(ShopContext)
  const waUrl = `https://wa.me/${Whatsup_number}?text=${encodeURIComponent(Whatsup_message)}`


  // Sticky shadow on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Cart item count
  useEffect(() => {
    let total = 0
    for (const p in cartItems)
      for (const c in cartItems[p])
        for (const s in cartItems[p][c])
          total += cartItems[p][c][s]
    setCartCount(total)
  }, [cartItems])



  return (
    <>
      {/* ── Navbar ── */}
      <nav className={`nb-fadein sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3 bg-white transition-all duration-300
        ${scrolled ? 'shadow-[0_2px_18px_rgba(0,0,0,.08)]' : 'border-b border-gray-100'}`}>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={assets.logo} alt="Poshak" className="w-28 sm:w-32 rounded-xl object-contain" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden sm:flex items-center gap-4 md:gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => `nl ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center  md:gap-1">

          {/* WhatsApp pill — desktop */}
          <a href={waUrl} target="_blank" rel="noreferrer" className="wa-pill hidden sm:inline-flex mr-2">
            {<WhatsappIcon />}
            <span className='hidden md:inline'>WhatsApp</span>
          </a>

          {/* Search */}
          <button className="ib flex" onClick={() => navigate('/collection')} title="Search">
            <SearchIcon />
          </button>

          {/* Cart */}
          {token && <NavLink to="/cart">
            <button className="ib flex" title="Cart">
              <CartIcon />
              {cartCount > 0 && (
                <span className="cb">{cartCount > 10 ? '10+' : cartCount}</span>
              )}
            </button>
          </NavLink>

          }


          {/* Profile dropdown */}
          <div className="relative">
            <button className="ib hidden sm:flex" onClick={() => setProfileOpen(p => !p)} title="Account">
              <ProfileIcon />
            </button>

            {profileOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="dd-open absolute right-0 top-11 w-44 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-50 py-1">
                  {token ? (
                    <>
                      <button className="dd-item" onClick={() => { navigate('/profile'); setProfileOpen(false) }}>
                        <ProfileIcon />
                        My Profile
                      </button>
                      <button className="dd-item" onClick={() => { navigate('/orders'); setProfileOpen(false) }}>
                        <CartIcon />
                        My Orders
                      </button>
                      <div className="h-px bg-gray-100 mx-3 my-1" />
                      <button className="dd-item danger" onClick={logout}>
                        <LogoutIcon />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="dd-item font-semibold text-gray-800" onClick={() => { navigate('/login'); setProfileOpen(false) }}>
                        Sign In
                      </button>
                      <button className="dd-item font-semibold text-gray-800" onClick={() => { navigate('/login'); setProfileOpen(false) }}>
                        Log In
                      </button>
                    </>

                  )}
                </div>
              </>
            )}
          </div>



          {/* Hamburger — mobile */}
          <button className="ib flex sm:hidden" onClick={() => setVisible(true)}>
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {visible && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setVisible(false)} />

          {/* Panel */}
          <div className="mob-open fixed top-0 right-0 bottom-0 z-[60] w-72 bg-white flex flex-col"
            style={{ boxShadow: '-4px 0 32px rgba(0,0,0,.12)' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link to="/" onClick={() => setVisible(false)}>
                <img src={assets.logo} alt="Poshak" className="w-24 rounded-lg" />
              </Link>
              <button
                onClick={() => setVisible(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <HamburgerCloseIcon />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col flex-1 overflow-y-auto py-2">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) => `ml ${isActive ? 'active' : ''}`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Footer — WhatsApp + auth */}
            <div className="p-5 border-t border-gray-100 flex flex-col gap-3">
              {!token && (
                <button
                  onClick={() => { navigate('/login'); setVisible(false) }}
                  className="w-full py-3 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </button>
              )}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="wa-pill w-full justify-center flex items-center"
                onClick={() => setVisible(false)}
              >
                <WhatsappIcon /> Chat on WhatsApp
              </a>
              <p className="text-[10px] text-gray-400 text-center">We reply within minutes ⚡</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar