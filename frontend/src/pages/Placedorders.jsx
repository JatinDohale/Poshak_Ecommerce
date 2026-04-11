import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { TruckIcon , ShieldIcon , LockIcon } from '../assets/icons/Icons'

// componants
import Tittle from '../components/ui/Tittle'
import CartTotal from '../components/CartTotal'

// ─── Shared style tokens (project design system) ──────────────────────────────
const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2'
const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100 placeholder-gray-300'

const Placedorders = () => {

  // states ad variable
  const [method, setMethod] = useState('COD')
  const [mounted, setMounted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { navigate, backendURL, token, cartItems, setCartItems, getTotalAmount, deliveryFee, products, } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '',
    street: '', 
    city: '', 
    state: '',
    pincode: '', 
    country: '', 
    phone: '',
  })


  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (formData.pincode.length !== 6)  return toast.warn('Enter a valid 6-digit Pincode')
    if (formData.phone.length !== 10)   return toast.warn('Enter a valid 10-digit Phone number')

    setSubmitting(true)

    try {
      // Build order items from cartItems[prod][color][size]
      const orderItems = []
      for (const prod in cartItems) {
        for (const color in cartItems[prod]) {
          for (const size in cartItems[prod][color]) {
            if (cartItems[prod][color][size] > 0) {
              const itemInfo = structuredClone(products.find((p) => p._id === prod))
              if (itemInfo) {
                itemInfo.color    = color
                itemInfo.size     = size
                itemInfo.quantity = cartItems[prod][color][size]
                orderItems.push(itemInfo)
              }
            }
          }
        }
      }

      const ordersData = {
        items:   orderItems,
        address: formData,
        amount:  getTotalAmount() + deliveryFee,
      }

      switch (method) {
        case 'COD': {
          const res = await axios.post(
            backendURL + '/api/orders/place', ordersData, { headers: { token } }
          )
          if (res.data.success) { setCartItems({}); navigate('/orders') }
          else toast.error(res.data.message)
          break
        }
        case 'stripe': {
          const res = await axios.post(
            backendURL + '/api/orders/stripe', ordersData, { headers: { token } }
          )
          if (res.data.success) window.location.replace(res.data.session_url)
          else toast.error(res.data.message)
          break
        }
        default: break
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const PAYMENT_METHODS = [
    {
      id: 'stripe',
      label: null,
      img: assets.stripe_logo,
      available: true,
    },
    {
      id: 'razorpay',
      label: null,
      img: assets.razorpay_logo,
      available: false,
      badge: 'Coming Soon',
    },
    {
      id: 'COD',
      label: 'Cash on Delivery',
      img: null,
      available: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7f5f2] font-sans">

      {/* ── Page header */}
      <div className={`pt-12 pb-6 px-4 sm:px-8 text-center transition-all duration-700
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Final Step</p>
        <Tittle text1="CHECKOUT" text2="&amp; PAY" />
        <div className="w-10 h-[3px] bg-gray-900 mt-4 rounded-full mx-auto" />
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="px-4 sm:px-8 pb-24 max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start"
      >

        {/* ── LEFT — Delivery Info ─────────────────────────────────────── */}
        <div className={`flex-1 transition-all duration-700 delay-100
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden">

            {/* Top bar */}
            <div className="h-[3px] bg-gray-100">
              <div className="h-full bg-gray-900 rounded-full w-full" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5">

              {/* Section heading */}
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Step 1</p>
                <h2 className="text-2xl font-semibold text-gray-900"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  Delivery Information
                </h2>
                <div className="w-8 h-[2px] bg-gray-900 mt-2 rounded-full" />
              </div>

              {/* Name row */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelClass}>First Name</label>
                  <input
                    required name="firstName" type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Last Name</label>
                  <input
                    required name="lastName" type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  required name="email" type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={onChangeHandler}
                  className={inputClass}
                />
              </div>

              {/* Street */}
              <div>
                <label className={labelClass}>Street / Area</label>
                <input
                  required name="street" type="text"
                  placeholder="123 Main Street, Apt 4B"
                  value={formData.street}
                  onChange={onChangeHandler}
                  className={inputClass}
                />
              </div>

              {/* City + State */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelClass}>City</label>
                  <input
                    required name="city" type="text"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={onChangeHandler}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>State</label>
                  <input
                    required name="state" type="text"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={onChangeHandler}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Pincode + Country */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelClass}>Pin Code</label>
                  <input
                    required name="pincode" type="text"
                    inputMode="numeric" maxLength={6}
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={onChangeHandler}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Country</label>
                  <input
                    required name="country" type="text"
                    placeholder="India"
                    value={formData.country}
                    onChange={onChangeHandler}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  required name="phone" type="tel"
                  inputMode="numeric" maxLength={10}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  className={inputClass}
                />
              </div>

            </div>
          </div>
        </div>

        {/* ── RIGHT — Summary + Payment ────────────────────────────────── */}
        <div className={`w-full lg:w-80 flex-shrink-0 flex flex-col gap-5 transition-all duration-700 delay-200
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {/* Order summary card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden">
            <div className="h-[3px] bg-gray-100">
              <div className="h-full bg-gray-900 rounded-full w-full" />
            </div>
            <div className="px-6 py-5">
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Step 2</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "'Georgia', serif" }}>
                Order Total
              </h2>
              <CartTotal />
            </div>
          </div>

          {/* Payment method card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden">
            <div className="h-[3px] bg-gray-100">
              <div className="h-full bg-gray-900 rounded-full w-full" />
            </div>
            <div className="px-6 py-5">
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Step 3</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "'Georgia', serif" }}>
                Payment Method
              </h2>

              <div className="flex flex-col gap-2">
                {PAYMENT_METHODS.map((pm) => {
                  const isSelected = method === pm.id
                  const isDisabled = !pm.available
                  return (
                    <div
                      key={pm.id}
                      onClick={() => {
                        if (!pm.available) { toast.warn('Currently not available'); return }
                        setMethod(pm.id)
                      }}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border
                        transition-all duration-200 select-none
                        ${isDisabled
                          ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-100'
                          : isSelected
                            ? 'border-gray-900 bg-gray-50 cursor-pointer shadow-sm'
                            : 'border-gray-200 bg-white cursor-pointer hover:border-gray-400'
                        }`}
                    >
                      {/* Radio dot */}
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-200
                        flex items-center justify-center
                        ${isSelected ? 'border-gray-900' : 'border-gray-300'}`}>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-gray-900" />
                        )}
                      </div>

                      {/* Logo or text */}
                      {pm.img ? (
                        <img src={pm.img} alt={pm.id} className="h-5 object-contain" />
                      ) : (
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-700">
                          {pm.label}
                        </span>
                      )}

                      {/* Badge */}
                      {pm.badge && (
                        <span className="ml-auto text-[9px] uppercase tracking-widest font-semibold
                          bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                          {pm.badge}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Place Order button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-5 bg-[#1a1a1a] text-white text-xs font-semibold
                  uppercase tracking-widest py-4 rounded-xl
                  hover:bg-gray-800 active:scale-[0.98]
                  transition-all duration-200 relative overflow-hidden group
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  bg-gradient-to-r from-transparent via-white/10 to-transparent
                  transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2">
                  {submitting && (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-500
                      border-t-gray-200 animate-spin inline-block" />
                  )}
                  {submitting ? 'Placing Order…' : 'Place Order →'}
                </span>
              </button>

            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <ShieldIcon />, label: 'Secure' },
              { icon: <LockIcon />,   label: 'Encrypted' },
              { icon: <TruckIcon />,  label: 'Fast Ship' },
            ].map((b) => (
              <div key={b.label}
                className="bg-white rounded-xl border border-gray-100 shadow-sm
                  flex flex-col items-center gap-1.5 py-3 px-2">
                <span className="text-gray-400">{b.icon}</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 text-center">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Placedorders
