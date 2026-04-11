import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

// components
import RelatedProducts from '../components/RelatedProducts'


// Color hex map — matches AddProduct
  const COLOR_HEX = {
    Black: '#1a1a1a', 
    White: '#f5f5f0', 
    Navy: '#1e3a5f', 
    Red: '#c0392b',
    Olive: '#6b7c3e', 
    Beige: '#d4b896', 
    Burgundy: '#7b2d42', 
    Sky: '#5ba4cf',
    Mustard: '#d4a017', 
    Charcoal: '#4a4a4a', 
    Coral: '#e8734a', 
    Forest: '#2d6a4f',
  }


const Product = () => {
  const { productId } = useParams()
  const { products, addToCart, currency, navigate } = useContext(ShopContext);

  // states 
  const [image, setImage] = useState('')
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('')
  const [sizes, setSize] = useState('')
  const [relatedProductList, setRelatedProductList] = useState([])
  const [activeTab, setActiveTab] = useState('description')
  const [imgFading, setImgFading] = useState(false)
  const [addedAnim, setAddedAnim] = useState(false)
  const [thumbIndex, setThumbIndex] = useState(0)


  // Get photos for selected color 
  const getColorPhotos = (prod, color) => {
    if (!prod) return []
    if (prod.colorImages && color && prod.colorImages[color]) return prod.colorImages[color]
    if (prod.colorImages) {
      const firstKey = Object.keys(prod.colorImages)[0]
      return firstKey ? prod.colorImages[firstKey] : []
    }
  }

  // function for get how many colors in product
  const getColorKeys = (prod) => {
    if (!prod) return []
    if (prod.colorImages) return Object.keys(prod.colorImages)
    return []
  }

  // Function for change image
  const switchImage = (src, idx) => {
    if (src === image) return
    setImgFading(true)
    setTimeout(() => {
      setImage(src)
      setThumbIndex(idx)
      setImgFading(false)
    }, 180)
  }


  // useEffect for finding product
  useEffect(() => {
    const found = products.find(item => item._id === productId)
    setProduct(found || null)
  }, [productId, products])


  //useEffect if product exist then set states 
  useEffect(() => {
    if (product) {
      const colors = getColorKeys(product)
      const firstColor = colors[0] || ''
      setSelectedColor(firstColor)
      const photos = getColorPhotos(product, firstColor)
      setImage(photos[0] || '')
      setThumbIndex(0)

      const list = products
        .filter(item => item.category === product.category && item._id !== product._id)
        .filter(item => item.subCategory === product.subCategory)
        .slice(0, 5)
      setRelatedProductList(list)
    }
  }, [product, products])


  // function for changing images or data based on color
  const handleColorChange = (color) => {
    if (color === selectedColor) return
    setSelectedColor(color)
    setImgFading(true)
    setTimeout(() => {
      const photos = getColorPhotos(product, color)
      setImage(photos[0] || '')
      setThumbIndex(0)
      setImgFading(false)
    }, 180)
  }


  //function for handle cart
  const handleAddToCart = () => {
    addToCart(productId, sizes ,selectedColor)
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 1800)
  }

  const colorPhotos = getColorPhotos(product, selectedColor)
  const colorKeys = getColorKeys(product)



 return (!product) ? (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-400 text-sm tracking-widest uppercase">Product not found</p>
      <button onClick={() => navigate('/')}
        className="bg-gray-900 text-white px-8 py-3 text-xs tracking-widest uppercase hover:-translate-y-0.5 transition-transform">
        Back to Shop
      </button>
    </div>
  ) : (
    <div className="border-t border-gray-100 pt-10 px-5 md:px-20">

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* ── Left: Image Gallery ── */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3 anim-slideright">

          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[520px] sm:w-20 pb-1">
            {colorPhotos.map((src, idx) => (
              <div key={idx} className={`thumb-item flex-shrink-0 sm:w-full w-16 h-16 sm:h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200
                  ${thumbIndex === idx ? 'border-gray-900 shadow-md' : 'border-transparent'}`}
                onClick={() => switchImage(src, idx)}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-gray-50 relative" style={{ minHeight: 420 }}>
            <img
              src={image}
              alt={product.name}
              className={`w-full h-full object-contain transition-opacity duration-200 ${imgFading ? 'opacity-0' : 'opacity-100'}`}
              style={{ minHeight: 420, maxHeight: 580 }}
            />
            {/* Color badge on image */}
            {selectedColor && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                <div className="w-3 h-3 rounded-full border border-white/50 shadow-sm"
                  style={{ background: COLOR_HEX[selectedColor] || '#999' }} />
                <span className="text-xs font-medium text-gray-700">{selectedColor}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Name */}
          <div className="anim-fadeup" style={{ animationDelay: '.05s' }}>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{product.category} · {product.subCategory}</p>
            <h1 className="text-3xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 anim-fadeup" style={{ animationDelay: '.1s' }}>
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={assets.star_icon} className="w-3.5" alt="" />
            ))}
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <span className="text-sm text-gray-400 ml-1">(122 reviews)</span>
          </div>

          {/* Price */}
          <div className="anim-fadeup" style={{ animationDelay: '.15s' }}>
            <p className="text-4xl font-semibold text-gray-900">
              {currency}{product.price}
            </p>
            <p className="text-xs text-green-600 mt-1 font-medium">✓ In stock · Free delivery above ₹999</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed max-w-md anim-fadeup" style={{ animationDelay: '.18s' }}>
            {product.description}
          </p>

          <hr className="border-gray-100" />

          {/* Color selector */}
          {colorKeys.length > 0 && (
            <div className="anim-fadeup" style={{ animationDelay: '.22s' }}>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Color</p>
                {selectedColor && (
                  <span className="text-xs text-gray-700 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                    {selectedColor}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {colorKeys.map((color) => {
                  const isLight = ['White', 'Beige', 'Mustard'].includes(color)
                  const isActive = selectedColor === color
                  return (
                    <div key={color}
                      className="color-dot flex flex-col items-center gap-1"
                      onClick={() => handleColorChange(color)}
                      title={color}
                    >
                      <div className="w-8 h-8 rounded-full"
                        style={{
                          background: COLOR_HEX[color] || '#ccc',
                          border: isActive ? '3px solid #1a1a1a' : isLight ? '1.5px solid #d0cdc8' : '2px solid transparent',
                          boxShadow: isActive ? '0 0 0 2px #fff, 0 0 0 4px #1a1a1a' : '0 2px 5px rgba(0,0,0,.12)',
                        }}
                      />
                      <span className="text-[9px] uppercase tracking-wide text-gray-400">{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="anim-fadeup" style={{ animationDelay: '.26s' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Select Size</p>
              <button className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-700 transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`size-pill w-12 h-12 rounded-xl text-sm font-medium border transition-all duration-150
                    ${sizes === item
                      ? 'size-active bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            {!sizes && (
              <p className="text-xs text-amber-500 mt-2">Please select a size</p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3 mt-1 anim-fadeup" style={{ animationDelay: '.3s' }}>
            <button
              onClick={handleAddToCart}
              className={`cart-btn flex-1 bg-gray-900 text-white py-4 rounded-xl text-sm font-semibold uppercase tracking-widest
                ${addedAnim ? 'anim-cartpop' : ''}`}
            >
              {addedAnim ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 anim-fadeup" style={{ animationDelay: '.34s' }}>
            {[
              { icon: '✦', text: '100% Original' },
              { icon: '↩', text: '7-Day Returns' },
              { icon: '🚚', text: 'Cash on Delivery' },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl text-center">
                <span className="text-base">{b.icon}</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Description & Reviews Tabs ── */}
      <div className="mt-16 anim-fadeup" style={{ animationDelay: '.1s' }}>
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn pb-3 text-sm capitalize text-gray-400 ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'reviews' ? 'Reviews (122)' : 'Description'}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="anim-fadein max-w-2xl text-sm text-gray-500 leading-relaxed flex flex-col gap-3">
            <p>{product.description}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam quaerat, cum excepturi earum tenetur doloribus ipsam cupiditate alias nihil culpa quod facilis id, iste dolores tempore modi labore.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro magni eveniet quae inventore officiis possimus ab at perspiciatis consectetur deserunt.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="anim-fadein flex flex-col gap-5 max-w-2xl">
            {[
              { name: 'Priya S.', stars: 5, text: 'Absolutely love the quality! The fabric is soft and the fit is perfect.', date: '2 days ago' },
              { name: 'Rahul M.', stars: 4, text: 'Great product, fast delivery. Color exactly as shown.', date: '1 week ago' },
              { name: 'Anita K.', stars: 5, text: 'Ordered the Navy and it looks stunning. Will buy more colors!', date: '2 weeks ago' },
            ].map((r, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                      {r.name[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{r.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <img key={j} src={assets.star_icon} className="w-3" alt="" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Related Products ── */}
      <RelatedProducts realtedProductList={relatedProductList} />

      <ToastContainer />
    </div>
  )
}

export default Product