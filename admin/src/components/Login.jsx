import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { backendUrl } from "../App"
 
const Login = ({ setToken }) => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused]   = useState('')
 
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + "/api/user/adminlogin", { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center px-4">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0%   { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }
 
        .card-anim   { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) forwards; }
        .logo-anim   { animation: fadeIn .4s ease .1s forwards; opacity: 0; }
        .field-anim1 { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) .15s forwards; opacity: 0; }
        .field-anim2 { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) .22s forwards; opacity: 0; }
        .btn-anim    { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) .28s forwards; opacity: 0; }
        .spin-anim   { animation: spin .7s linear infinite; }
 
        .login-input {
          width: 100%; padding: 12px 16px;
          border-radius: 12px; font-size: 14px;
          border: 1.5px solid #e5e7eb;
          background: #faf9f7;
          color: #1a1a1a; outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .login-input:focus {
          border-color: #1a1a1a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,26,26,.06);
        }
        .login-input::placeholder { color: #c4c0b8; }
 
        .login-btn {
          width: 100%; padding: 13px;
          background: #1a1a1a; color: #fff;
          border: none; border-radius: 12px;
          font-size: 13px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
          cursor: pointer;
          transition: all .22s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .login-btn:hover:not(:disabled) {
          background: #2d2d2d;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,26,26,.22);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: .6; cursor: not-allowed; }
 
        .show-pass-btn {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #9ca3af; cursor: pointer;
          padding: 0; transition: color .15s ease;
        }
        .show-pass-btn:hover { color: #1a1a1a; }
 
        .deco-dot {
          position: absolute; border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
 
      {/* Decorative background dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="deco-dot w-64 h-64 bg-gray-100 opacity-60"
          style={{ top: '-60px', right: '-40px', animationDelay: '0s' }} />
        <div className="deco-dot w-40 h-40 bg-gray-200 opacity-40"
          style={{ bottom: '60px', left: '-30px', animationDelay: '1.5s' }} />
        <div className="deco-dot w-20 h-20 bg-gray-100 opacity-50"
          style={{ bottom: '30%', right: '10%', animationDelay: '0.8s' }} />
      </div>
 
      {/* Login card */}
      <div className="card-anim relative w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-gray-100 p-8"
          style={{ boxShadow: '0 8px 48px rgba(0,0,0,.09)' }}>
 
          {/* Logo / brand */}
          <div className="logo-anim flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-3"
              style={{ boxShadow: '0 4px 14px rgba(26,26,26,.25)' }}>
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>P</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 leading-none"
              style={{ fontFamily: 'Georgia, serif' }}>
              Poshak
            </h1>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
              <span className="text-red-500 font-semibold">Admin</span> Panel
            </p>
          </div>
 
          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium tracking-wide">Sign in to continue</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
 
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
 
            {/* Email */}
            <div className="field-anim1">
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  className="login-input"
                  style={{ paddingLeft: 40 }}
                  type="email"
                  placeholder="admin@poshak.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
 
            {/* Password */}
            <div className="field-anim2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  className="login-input"
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="show-pass-btn"
                  onClick={() => setShowPass(p => !p)}
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
 
            {/* Submit */}
            <div className="btn-anim mt-2">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spin-anim w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
 
          {/* Footer note */}
          <p className="text-center text-[11px] text-gray-300 mt-6">
            Restricted access — authorised personnel only
          </p>
        </div>
 
        {/* Card shadow accent */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gray-200 rounded-b-2xl -z-10 opacity-40 blur-sm" />
      </div>
    </div>
  )
}
 
export default Login