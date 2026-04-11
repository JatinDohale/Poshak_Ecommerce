import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import { ShopContext } from '../context/ShopContext'
import Tittle from '../components/ui/Tittle'

// Status config — dot color + label
const STATUS_CONFIG = {
  'Order Placed':  { dot: 'bg-blue-400',   text: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100' },
  'Packing':       { dot: 'bg-yellow-400',  text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  'Shipped':       { dot: 'bg-purple-400',  text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  'Out for delivery': { dot: 'bg-orange-400', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  'Delivered':     { dot: 'bg-green-400',   text: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
}
const DEFAULT_STATUS = { dot: 'bg-gray-300', text: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-100' }

const Orders = () => {
  const { token, backendURL, currency } = useContext(ShopContext)
  const [ordersList, setOrdersList] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [mounted, setMounted]       = useState(false)
  const [tracking, setTracking]     = useState(null) // index being refreshed

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const fetchOrders = async (trackIdx = null) => {
    if (!token) return
    if (trackIdx !== null) setTracking(trackIdx)
    else setLoading(true)

    try {
      const res = await axios.post(
        backendURL + '/api/orders/userorders', {},
        { headers: { token } }
      )
      if (res.data.success) {
        const flat = []
        res.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            flat.push({
              ...item,
              status:        order.status,
              payment:       order.payment,
              paymentMethod: order.paymentMethod,
              date:          order.date,
            })
          })
        })
        setOrdersList(flat.reverse())
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
      setTracking(null)
    }
  }

  useEffect(() => { fetchOrders() }, [token])

  // ── Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] font-sans">
        <div className="pt-12 pb-6 px-4 sm:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Account</p>
          <Tittle text1="MY" text2="ORDERS" />
          <div className="w-10 h-[3px] bg-gray-900 mt-4 rounded-full mx-auto" />
        </div>
        <div className="px-4 sm:px-8 pb-24 max-w-4xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.05)]
              h-28 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] font-sans">

      {/* ── Page header */}
      <div className={`pt-12 pb-6 px-4 sm:px-8 text-center transition-all duration-700
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Account</p>
        <Tittle text1="MY" text2="ORDERS" />
        {ordersList && ordersList.length > 0 && (
          <p className="text-xs text-gray-400 mt-2 tracking-widest">
            {ordersList.length} {ordersList.length === 1 ? 'item' : 'items'}
          </p>
        )}
        <div className="w-10 h-[3px] bg-gray-900 mt-4 rounded-full mx-auto" />
      </div>

      <div className="px-4 sm:px-8 pb-24 max-w-4xl mx-auto">

        {/* ── Empty state */}
        {ordersList && ordersList.length === 0 ? (
          <div className={`bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)]
            flex flex-col items-center justify-center py-24 gap-4
            transition-all duration-700 delay-100
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100
              flex items-center justify-center mb-2">
              <BoxIcon className="w-7 h-7 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}>
              No orders yet
            </h2>
            <p className="text-xs text-gray-400 tracking-wide">
              Your placed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {ordersList && ordersList.map((item, index) => {
              const status = STATUS_CONFIG[item.status] || DEFAULT_STATUS
              const isTracking = tracking === index

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.05)]
                    overflow-hidden transition-all duration-500
                    ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  {/* Top progress bar — green when delivered */}
                  <div className="h-[3px] bg-gray-100">
                    <div className={`h-full rounded-full transition-all duration-500
                      ${item.status === 'Delivered' ? 'bg-green-400 w-full' :
                        item.status === 'Shipped' || item.status === 'Out for delivery' ? 'bg-yellow-400 w-3/4' :
                        item.status === 'Packing' ? 'bg-blue-300 w-1/2' :
                        'bg-gray-300 w-1/4'}`}
                    />
                  </div>

                  <div className="px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-5">

                    {/* Product image */}
                    {item.colorImages && item.color ? (
                      <img
                        src={item.colorImages[item.color]?.[0]}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl
                          border border-gray-100 shadow-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50
                        border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <BoxIcon className="w-6 h-6 text-gray-300" />
                      </div>
                    )}

                    {/* Order details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-gray-900 leading-tight truncate">
                        {item.name}
                      </p>

                      {/* Meta pills row */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs font-semibold text-gray-800">
                          {currency}{item.price}
                        </span>
                        <span className="text-gray-200">·</span>
                        <span className="text-[10px] uppercase tracking-widest text-gray-400">
                          Qty: {item.quantity}
                        </span>
                        {item.size && (
                          <>
                            <span className="text-gray-200">·</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                              Size: {item.size}
                            </span>
                          </>
                        )}
                        {item.color && (
                          <>
                            <span className="text-gray-200">·</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                              {item.color}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Date + Payment */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <p className="text-[11px] text-gray-400">
                          <span className="text-gray-300 uppercase tracking-widest text-[9px] mr-1">
                            Date
                          </span>
                          {new Date(item.date).toDateString()}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          <span className="text-gray-300 uppercase tracking-widest text-[9px] mr-1">
                            Via
                          </span>
                          {item.paymentMethod}
                        </p>
                        <p className="text-[11px]">
                          <span className="text-gray-300 uppercase tracking-widest text-[9px] mr-1">
                            Paid
                          </span>
                          <span className={item.payment ? 'text-green-500' : 'text-yellow-500'}>
                            {item.payment ? 'Yes' : 'Pending'}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right — Status + Track button */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                      {/* Status badge */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                        text-[10px] font-semibold uppercase tracking-widest border
                        ${status.bg} ${status.text} ${status.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
                        {item.status}
                      </span>

                      {/* Track Order button */}
                      <button
                        onClick={() => fetchOrders(index)}
                        disabled={isTracking}
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                          border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500
                          hover:border-gray-800 hover:text-gray-900
                          active:scale-95 transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isTracking ? (
                          <span className="w-3 h-3 rounded-full border-2 border-gray-300
                            border-t-gray-600 animate-spin inline-block" />
                        ) : (
                          <RefreshIcon className="w-3 h-3" />
                        )}
                        {isTracking ? 'Updating…' : 'Track Order'}
                      </button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Orders

// ─── Icons ────────────────────────────────────────────────────────────────────
const BoxIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.375c0 .621.504 1.125 1.125 1.125z" />
  </svg>
)
const RefreshIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
)