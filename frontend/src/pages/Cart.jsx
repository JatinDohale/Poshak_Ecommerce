import { useEffect, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { ShieldIcon, BagIcon , TruckIcon, ReturnIcon } from '../assets/icons/Icons'

// components
import Tittle from '../components/ui/Tittle'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { cartItems, currency, products, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [mounted, setMounted] = useState(false)
  const [removingId, setRemovingId] = useState(null)

  // Build flat cartData from nested cartItems[prod][color][size]
  useEffect(() => {
    const tempData = []
    for (const prod in cartItems) {
      for (const color in cartItems[prod]) {
        for (const size in cartItems[prod][color]) {
          if (cartItems[prod][color][size] > 0) {
            tempData.push({
              id: prod,
              color,
              size,
              quantity: cartItems[prod][color][size],
            })
          }
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  // add animation when remove
  const handleRemove = (id, color, size) => {
    setRemovingId(`${id}-${color}-${size}`)
    setTimeout(() => {
      updateQuantity(id, color, size, 0)
      setRemovingId(null)
    }, 300)
  }

  // add animation when change quantity
  const handleQtyChange = (id, color, size, val) => {
    const n = parseInt(val, 10)
    if (!isNaN(n) && n >= 1) updateQuantity(id, color, size, n)
  }

  const itemCount = cartData.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="min-h-screen bg-[#f7f5f2] font-sans">

      {/* ── Page header */}
      <div className={`pt-12 pb-6 px-4 sm:px-8 transition-all duration-700
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-center">
          <Tittle text1="YOUR" text2="CART" />
        </div>
        {cartData.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-2 tracking-widest">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        )}
        <div className="w-10 h-[3px] bg-gray-900 mt-4 rounded-full mx-auto" />
      </div>

      <div className="px-4 sm:px-8 pb-24 max-w-5xl mx-auto">

        {/* ── Empty state */}
        {cartData.length === 0 ? (
          <div className={`bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)]
            flex flex-col items-center justify-center py-24 gap-4
            transition-all duration-700 delay-100
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100
              flex items-center justify-center mb-2">
              <BagIcon className="w-7 h-7 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Your cart is empty
            </h2>
            <p className="text-xs text-gray-400 tracking-wide">
              Looks like you haven't added anything yet.
            </p>
            <button
              onClick={() => navigate('/collection')}
              className="mt-4 bg-[#1a1a1a] text-white text-xs font-semibold uppercase tracking-widest
                px-8 py-3 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              Shop Now →
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Cart items card */}
            <div className={`flex-1 bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)]
              overflow-hidden transition-all duration-700 delay-100
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              {/* Top progress bar */}
              <div className="h-[3px] bg-gray-100">
                <div className="h-full bg-gray-900 rounded-full w-full" />
              </div>

              {/* Column labels */}
              <div className="grid grid-cols-[1fr_7rem_2.5rem] sm:grid-cols-[1fr_9rem_3rem]
                gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
                {['Product', 'Quantity', ''].map((h, i) => (
                  <span key={i}
                    className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {h}
                  </span>
                ))}
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {cartData.map((item, index) => {
                  const product = products.find((p) => p._id === item.id)
                  if (!product) return null

                  const rowKey = `${item.id}-${item.color}-${item.size}`
                  const isRemoving = removingId === rowKey

                  // Color hex — look up from product.colors array if available
                  const colorObj = product.colors?.find(
                    (c) => c.name?.toLowerCase() === item.color?.toLowerCase()
                  )
                  const colorHex = colorObj?.hex || null

                  return (
                    <div
                      key={index}
                      className={`grid grid-cols-[1fr_7rem_2.5rem] sm:grid-cols-[1fr_9rem_3rem]
                        gap-4 items-center px-6 py-5 hover:bg-gray-50/60
                        transition-all duration-300
                        ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    >
                      {/* Product info */}
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={product.colorImages[item.color][0]}
                            alt={product.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl
                              border border-gray-100 shadow-sm"
                          />
                          {/* Size badge */}
                          <span className="absolute -bottom-1.5 -right-1.5 text-[9px] font-bold
                            uppercase tracking-wide bg-[#1a1a1a] text-white
                            px-1.5 py-0.5 rounded-md shadow">
                            {item.size}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-semibold text-gray-900
                            leading-tight truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 tracking-wide">
                            {currency}{product.price}
                          </p>

                          {/* Color + Size row */}
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {/* Color swatch */}
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm flex-shrink-0"
                                style={{ background: colorHex || '#ccc' }}
                              />
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                                {item.color}
                              </span>
                            </div>
                            <span className="text-gray-200 text-xs">·</span>
                            {/* Size pill */}
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                              Size: {item.size}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleQtyChange(item.id, item.color, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-lg border border-gray-200 text-gray-500
                            flex items-center justify-center text-sm font-medium
                            hover:border-gray-800 hover:text-gray-900
                            disabled:opacity-30 disabled:cursor-not-allowed
                            transition-all duration-150"
                        >−</button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(item.id, item.color, item.size, e.target.value)}
                          className="w-9 h-7 text-center text-sm font-medium text-gray-800
                            border border-gray-200 rounded-lg outline-none
                            focus:border-gray-800 focus:ring-2 focus:ring-gray-100
                            transition-all duration-200
                            [appearance:textfield]
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => handleQtyChange(item.id, item.color, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-gray-200 text-gray-500
                            flex items-center justify-center text-sm font-medium
                            hover:border-gray-800 hover:text-gray-900
                            transition-all duration-150"
                        >+</button>
                      </div>

                      {/* Remove */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleRemove(item.id, item.color, item.size)}
                          title="Remove item"
                          className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                        >
                          <img
                            src={assets.bin_icon}
                            alt="Remove"
                            className="w-4 h-4 opacity-30 group-hover:opacity-80
                              transition-all duration-200"
                          />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Card footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-[10px] text-gray-300 tracking-widest uppercase">
                  Free shipping on orders above ₹999
                </p>
              </div>
            </div>

            {/* ── Order summary sidebar */}
            <div className={`w-full lg:w-80 flex-shrink-0 transition-all duration-700 delay-200
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden">
                <div className="h-[3px] bg-gray-100">
                  <div className="h-full bg-gray-900 rounded-full w-full" />
                </div>
                <div className="px-6 py-5">
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Summary</p>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: "'Georgia', serif" }}>
                    Order Total
                  </h2>

                  <CartTotal />

                  {/* Checkout */}
                  <button
                    onClick={() => navigate('/placedorders')}
                    className="w-full mt-5 bg-[#1a1a1a] text-white text-xs font-semibold
                      uppercase tracking-widest py-4 rounded-xl
                      hover:bg-gray-800 active:scale-[0.98]
                      transition-all duration-200 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                      bg-gradient-to-r from-transparent via-white/10 to-transparent
                      transition-transform duration-700 ease-in-out" />
                    <span className="relative">Proceed to Checkout →</span>
                  </button>

                  <button
                    onClick={() => navigate('/collection')}
                    className="w-full mt-3 text-xs font-medium tracking-widest uppercase
                      text-gray-400 py-2.5 border border-gray-200 rounded-xl
                      hover:border-gray-800 hover:text-gray-800 transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: <ShieldIcon />, label: 'Secure Payment' },
                  { icon: <TruckIcon />,  label: 'Fast Delivery' },
                  { icon: <ReturnIcon />, label: 'Easy Returns' },
                ].map((badge) => (
                  <div key={badge.label}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm
                      flex flex-col items-center gap-1.5 py-3 px-2">
                    <span className="text-gray-400">{badge.icon}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 text-center leading-tight">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Cart


