/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

//Pages
import Add from "./pages/Add"
import Orders from "./pages/Orders"
import List from "./pages/LIst"

//Components
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Login from "./components/Login"
import HeroSlideManager from "./pages/HeroSlideManager"

// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

// Page transition wrapper
const PageWrapper = ({ children }) => {
  const location = useLocation()
  const [display, setDisplay] = useState(children)
  const [animKey, setAnimKey] = useState(location.pathname)

  useEffect(() => {
    setAnimKey(location.pathname)
    setDisplay(children)
  }, [location.pathname, children])

  return (
    <div
      key={animKey}
      style={{
        animation: 'pageIn .35s cubic-bezier(.22,1,.36,1) forwards',
        opacity: 0,
      }}
    >
      {display}
    </div>
  )
}

function App() {
  const [token, setToken] = useState(undefined)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? '')
  }, [])

  useEffect(() => {
    if (token !== undefined) {
      localStorage.setItem('token', token)
    }
  }, [token])

  // Still initialising
  if (token === undefined) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
          <p className="text-xs tracking-widest uppercase text-gray-400">Loading</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] font-sans">

      {token === '' ? (
        <div className="anim-fadein">
          <Login setToken={setToken} />
        </div>
      ) : (
        <div className="layout-wrapper flex flex-col h-screen overflow-hidden">

          {/* ── Navbar ── */}
          <div className="flex-shrink-0 z-30">
            <Navbar setToken={setToken} />
          </div>

          {/* ── Body ── */}
          <div className="flex flex-1 overflow-hidden">

            {/* ── Sidebar ── */}
            <div
              className={`flex-shrink-0 transition-all duration-300 ease-in-out anim-slideright ${sidebarCollapsed ? 'w-16' : 'w-56'}`}
              style={{ borderRight: '1px solid #ece9e4' }}
            >
              <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(p => !p)} />
            </div>

            {/* ── Main content ── */}
            <main className="flex-1 overflow-y-auto">
              {/* Breadcrumb bar */}
              <div className="sticky top-0 z-10 bg-[#f7f5f2]/80 backdrop-blur-sm border-b border-[#ece9e4] px-6 py-2.5 flex items-center gap-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Poshak Admin</span>
                <span className="text-gray-300 text-xs">›</span>
                <RouteLabel />
              </div>

              {/* Page content */}
              <div className="px-6 py-3">
                <Routes>
                  <Route path="/add"    element={<PageWrapper><Add    token={token} /></PageWrapper>} />
                  <Route path="/orders" element={<PageWrapper><Orders token={token} /></PageWrapper>} />
                  <Route path="/list"   element={<PageWrapper><List   token={token} /></PageWrapper>} />
                  <Route path="/hero"   element={<PageWrapper><HeroSlideManager   token={token} /></PageWrapper>} />
                  {/* Default redirect hint */}
                  <Route path="*" element={
                    <PageWrapper>
                      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <p className="text-5xl mb-4">🧵</p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                          Welcome to Poshak Admin
                        </h2>
                        <p className="text-sm text-gray-400">Select a section from the sidebar to get started</p>
                      </div>
                    </PageWrapper>
                  } />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        toastClassName="!rounded-xl !shadow-lg !text-sm !font-medium"
        progressClassName="!bg-gray-900"
      />
    </div>
  )
}

// Shows current route name in breadcrumb
function RouteLabel() {
  const location = useLocation()
  const map = { '/add': 'Add Product', '/list': 'Product List', '/orders': 'Orders', }
  const label = map[location.pathname] || 'Dashboard'
  return <span className="text-xs font-semibold text-gray-700 tracking-wide">{label}</span>
}

export default App