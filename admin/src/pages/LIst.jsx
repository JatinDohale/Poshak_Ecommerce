import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { currency, backendUrl } from '../App'

const List = ({ token }) => {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const getProductList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/getproductslist')
      if (response.data.success) {
        setProductList(response.data.productList.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (_id) => {
    try {
      setDeletingId(_id)
      setConfirmId(null)
      const response = await axios.post(
        backendUrl + '/api/product/removeproduct',
        { _id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        await getProductList()
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error('Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => { getProductList() }, [])

  // Get first image supporting both image[] and colorImages{}
  const getImage = (item) => {
    if (item.colorImages) {
      const firstKey = Object.keys(item.colorImages)[0]
      return firstKey ? item.colorImages[firstKey][0] : ''
    }
    return Array.isArray(item.image) ? item.image[0] : item.image || ''
  }

  // Get color swatches
  const getColors = (item) => {
    if (item.colorImages) return Object.keys(item.colorImages)
    return []
  }

  const COLOR_HEX = {
    Black: '#1a1a1a', White: '#f5f5f0', Navy: '#1e3a5f', Red: '#c0392b',
    Olive: '#6b7c3e', Beige: '#d4b896', Burgundy: '#7b2d42', Sky: '#5ba4cf',
    Mustard: '#d4a017', Charcoal: '#4a4a4a', Coral: '#e8734a', Forest: '#2d6a4f',
  }

  const filtered = productList
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="min-h-screen bg-[#f7f5f2] p-6">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        @keyframes scaleOut {
          from { opacity: 1; transform: scaleY(1); max-height: 80px; }
          to   { opacity: 0; transform: scaleY(0); max-height: 0; }
        }
        @keyframes popIn {
          0%   { transform: scale(.9); opacity: 0; }
          60%  { transform: scale(1.03); }
          100% { transform: scale(1); opacity: 1; }
        }

        .anim-fadeup  { animation: fadeUp  .5s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-fadein  { animation: fadeIn  .35s ease forwards; }
        .anim-slidein { animation: slideIn .45s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-popin   { animation: popIn   .3s cubic-bezier(.22,1,.36,1) forwards; }

        .product-row {
          opacity: 0;
          animation: fadeUp .45s cubic-bezier(.22,1,.36,1) forwards;
          transition: background .18s ease, box-shadow .18s ease;
        }
        .product-row:hover { background: #faf9f7 !important; box-shadow: 0 2px 12px rgba(0,0,0,.06); }

        .skeleton {
          background: linear-gradient(90deg, #ede9e3 25%, #e5e0d8 50%, #ede9e3 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 10px;
        }

        .delete-btn {
          transition: all .18s ease;
        }
        .delete-btn:hover { transform: scale(1.08); }

        .confirm-popover {
          animation: popIn .25s cubic-bezier(.22,1,.36,1) forwards;
        }

        .search-input:focus { outline: none; border-color: #1a1a1a; box-shadow: 0 0 0 3px rgba(26,26,26,.06); }

        .sort-select { appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px;
        }
        .badge {
          display: inline-flex; align-items: center;
          padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 500;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 anim-slidedin">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Admin Panel</p>
          <h1 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Product List
          </h1>
          <div className="w-8 h-[3px] bg-gray-900 mt-2 rounded-full" />
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-3 gap-4 mb-6 anim-fadeup" style={{ animationDelay: '.05s' }}>
          {[
            { label: 'Total Products', value: productList.length },
            { label: 'Showing', value: filtered.length },
            { label: 'Categories', value: [...new Set(productList.map(p => p.category))].length },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl px-4 py-3 border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-4 anim-fadeup" style={{ animationDelay: '.1s' }}>
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="13" height="13"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-all duration-200"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="sort-select border border-gray-200 text-sm px-3 py-2.5 rounded-xl bg-white text-gray-700 cursor-pointer outline-none hover:border-gray-400 transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="price-high">Price: High → Low</option>
            <option value="price-low">Price: Low → High</option>
            <option value="name">Name A–Z</option>
          </select>

          {/* Refresh */}
          <button
            onClick={getProductList}
            className="p-2.5 border border-gray-200 rounded-xl bg-white hover:border-gray-400 transition-colors"
            title="Refresh"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M8 16H3v5"/>
            </svg>
          </button>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm anim-fadeup" style={{ animationDelay: '.15s' }}>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[72px_1fr_120px_100px_100px_80px] gap-4 items-center px-5 py-3 border-b border-gray-100 bg-gray-50">
            {['Image', 'Product', 'Category', 'Colors', 'Price', 'Action'].map(h => (
              <p key={h} className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">{h}</p>
            ))}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="flex flex-col divide-y divide-gray-50">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <div className="skeleton w-14 h-14 rounded-lg flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="skeleton h-3.5 w-48 rounded" />
                    <div className="skeleton h-3 w-24 rounded" />
                  </div>
                  <div className="skeleton h-6 w-16 rounded-full" />
                  <div className="skeleton h-4 w-14 rounded" />
                  <div className="skeleton h-8 w-8 rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center anim-fadein">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-base font-medium text-gray-700">No products found</p>
              <p className="text-sm text-gray-400 mt-1">
                {searchQuery ? `No results for "${searchQuery}"` : 'Add your first product to get started'}
              </p>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="mt-4 text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors">
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Product rows */}
          {!loading && (
            <div className="divide-y divide-gray-50">
              {filtered.map((item, index) => {
                const colors = getColors(item)
                const isDeleting = deletingId === item._id
                const isConfirming = confirmId === item._id

                return (
                  <div
                    key={item._id || index}
                    className="product-row grid grid-cols-[72px_1fr] md:grid-cols-[72px_1fr_120px_100px_100px_80px] gap-4 items-center px-5 py-4 bg-white relative"
                    style={{ animationDelay: `${Math.min(index * 0.04, 0.35)}s` }}
                  >
                    {/* Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      <img src={getImage(item)} alt={item.name}
                        className="w-full h-full object-cover" />
                    </div>

                    {/* Name + meta (mobile stacks here) */}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="badge" style={{ background: '#f3f4f6', color: '#6b7280' }}>
                          {item.subCategory}
                        </span>
                        {item.bestseller && (
                          <span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                            ★ Bestseller
                          </span>
                        )}
                        {/* Mobile price */}
                        <span className="md:hidden text-sm font-semibold text-gray-900">{currency}{item.price}</span>
                      </div>
                    </div>

                    {/* Category */}
                    <p className="hidden md:block text-sm text-gray-600">{item.category}</p>

                    {/* Color dots */}
                    <div className="hidden md:flex flex-wrap gap-1">
                      {colors.length > 0 ? colors.slice(0, 5).map(c => (
                        <div key={c} title={c}
                          className="w-4 h-4 rounded-full border border-white shadow-sm"
                          style={{ background: COLOR_HEX[c] || '#ccc' }} />
                      )) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                      {colors.length > 5 && (
                        <span className="text-[10px] text-gray-400">+{colors.length - 5}</span>
                      )}
                    </div>

                    {/* Price */}
                    <p className="hidden md:block text-sm font-semibold text-gray-900">
                      {currency}{item.price}
                    </p>

                    {/* Delete action */}
                    <div className="flex items-center justify-end md:justify-center relative">
                      {isDeleting ? (
                        <div className="w-7 h-7 rounded-lg border-2 border-gray-200 border-t-gray-600 animate-spin" />
                      ) : isConfirming ? (
                        <div className="confirm-popover absolute right-0 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex flex-col gap-2 w-36">
                          <p className="text-[11px] text-gray-500 font-medium text-center">Delete this product?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => removeProduct(item._id)}
                              className="flex-1 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors font-medium"
                            >Yes</button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="flex-1 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >No</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="delete-btn w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-200 transition-all duration-150"
                          onClick={() => setConfirmId(item._id)}
                          title="Delete product"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
              <p className="text-xs text-gray-400">
                Showing {filtered.length} of {productList.length} products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List