//packages
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { ShopContext } from '../context/ShopContext'//context file

const COLOR_HEX = {
  Black: '#1a1a1a', White: '#f5f5f0', Navy: '#1e3a5f', Red: '#c0392b',
  Olive: '#6b7c3e', Beige: '#d4b896', Burgundy: '#7b2d42', Sky: '#5ba4cf',
  Mustard: '#d4a017', Charcoal: '#4a4a4a', Coral: '#e8734a', Forest: '#2d6a4f',
}

const ProductItem = ({ id, image, prize, name, colorImages, bestseller }) => {

  // stats and Variables
  const { currency } = useContext(ShopContext)
  const [hovered, setHovered] = useState(false)
  const [activeColor, setActiveColor] = useState(null)
  const [wishlist, setWishlist] = useState(false)

  // Resolve images — support both old image[] and new colorImages{}
  const getImages = () => {
    if (colorImages && Object.keys(colorImages).length > 0) {
      const colorKey = activeColor || Object.keys(colorImages)[0]
      return colorImages[colorKey] || []
    }
    if (Array.isArray(image)) return image
    if (typeof image === 'string') return [image]
    return []
  }

  const colorKeys = colorImages ? Object.keys(colorImages) : []
  const images = getImages()
  const mainImage = images[0] || ''
  // const hoverImage = images[1] || images[0] || ''

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image block ── */}
      <Link to={`/product/${id}`}>
        <div
          className="relative overflow-hidden rounded-xl bg-gray-50"
          style={{ aspectRatio: '3/4' }}
        >
          {/* Main image */}
          <img
            src={mainImage}
            alt={name}
            className="pi-img-main absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />



          {/* Bestseller badge */}
          {bestseller && (
            <div
              className="pi-badge"
              style={{ background: 'linear-gradient(135deg,#d4a017,#f59e0b)', color: '#fff' }}
            >
              ★ Bestseller
            </div>
          )}

          {/* New badge (no bestseller) */}
          {!bestseller && (
            <div
              className="pi-badge"
              style={{ background: '#1a1a1a', color: '#fff', opacity: 0.85 }}
            >
              New
            </div>
          )}

          {/* Wishlist button */}
          <button
            className={`pi-wishlist absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center
              ${wishlist ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 backdrop-blur-sm'}
              shadow-sm border border-white/50 ${wishlist ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setWishlist(w => !w)
            }}
          >
            <svg
              width="13" height="13"
              fill={wishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Quick add to cart bar */}
          <div className="pi-cart-btn">Quick Add +</div>
        </div>
      </Link>

      {/* ── Info block ── */}
      <div className="pt-3 px-0.5 pi-info">

        {/* Color dots */}
        {colorKeys.length > 0 && (
          <div className="flex gap-1.5 mb-2">
            {colorKeys.slice(0, 5).map(color => {
              const isLight = ['White', 'Beige', 'Mustard'].includes(color)
              const isActive = (activeColor || colorKeys[0]) === color
              return (
                <div
                  key={color}
                  className="pi-color-dot w-3.5 h-3.5 rounded-full"
                  title={color}
                  style={{
                    background: COLOR_HEX[color] || '#ccc',
                    border: isActive
                      ? '2px solid #1a1a1a'
                      : isLight ? '1px solid #d0cdc8' : '1.5px solid transparent',
                    boxShadow: isActive
                      ? '0 0 0 1.5px #fff, 0 0 0 3px #1a1a1a'
                      : '0 1px 3px rgba(0,0,0,.12)',
                  }}
                  onClick={() => setActiveColor(color)}
                />
              )
            })}
            {colorKeys.length > 5 && (
              <span className="text-[10px] text-gray-400 self-center">+{colorKeys.length - 5}</span>
            )}
          </div>
        )}

        {/* Name */}
        <Link to={`/product/${id}`}>
          <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2 hover:text-gray-900 transition-colors">
            {name}
          </p>
        </Link>

        {/* Price row */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-semibold text-gray-900">
            {currency}{prize}
          </p>
          {/* Star rating */}
          <div className="flex items-center gap-0.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-[10px] text-gray-400">4.8</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
