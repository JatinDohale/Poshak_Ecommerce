import { useContext, useState, useEffect, useRef } from 'react'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

// Components
import Tittle from '../components/ui/Tittle'
import ProductItem from '../components/ProductItem'
import { SearchIcon } from '../assets/icons/Icons'

const Collection = () => {

  // states and variables
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [PriceSort, setPriceSort] = useState('relevent')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltering, setIsFiltering] = useState(false)
  const { products } = useContext(ShopContext)
  const prevCountRef = useRef(0)


  // arrow function for toggle category
  const toggleCategory = (e) => {
    const val = e.target.value
    setCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val])
  }

  // arrow function for toggle subvategory
  const toggleSubCategory = (e) => {
    const val = e.target.value
    setSubCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val])
  }

  // function for clear filter
  const clearFilters = () => {
    setCategory([])
    setSubCategory([])
    setPriceSort('relevent')
    setSearchQuery('')
  }

  // fucntion for set Image
  const getProductImage = (item) => {
    if (item.colorImages) {
      const firstKey = Object.keys(item.colorImages)[0]
      return firstKey ? item.colorImages[firstKey][0] : ''
    }
    return Array.isArray(item.image) ? item.image[0] : item.image
  }

  const activeFilterCount = category.length + subCategory.length + (PriceSort !== 'relevent' ? 1 : 0)

  // useEffect for set filters
  useEffect(() => {
    setIsFiltering(true)
    const timer = setTimeout(() => {
      let filtered = [...products]

      if (searchQuery.trim()) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      if (category.length) {
        filtered = filtered.filter(item => category.includes(item.category))
      }
      if (subCategory.length) {
        filtered = filtered.filter(item => subCategory.includes(item.subCategory))
      }
      if (PriceSort === 'high-low') filtered.sort((a, b) => b.price - a.price)
      if (PriceSort === 'low-high') filtered.sort((a, b) => a.price - b.price)

      setFilterProducts(filtered)
      setIsFiltering(false)
      prevCountRef.current = filtered.length
    }, 200)
    return () => clearTimeout(timer)
  }, [category, subCategory, products, PriceSort, searchQuery])



  return (
    <div className="border-t border-gray-100 pt-10 px-5  md:px-20">


      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">

        {/* ── LEFT: Filters ── */}
        <div className="w-full sm:w-56 flex-shrink-0">

          {/* Filter header */}
          <div className="flex items-center justify-between cursor-pointer mb-4  sm:cursor-default" onClick={() => setShowFilter(!showFilter)}>
            <div className="flex py-2 items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              <span className="font-semibold text-sm uppercase tracking-widest text-gray-800">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] flex items-center justify-center font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <div className='flex items-center gap-4'>

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-2.5 py-2  text-xs font-semibold uppercase tracking-widest text-gray-800 border border-gray-800 rounded-xl hover:border-gray-400 hover:text-gray-800 transition-all duration-200 anim-fadein"
                >
                  Clear
                </button>
              )}

            <img src={assets.dropdown_icon} alt=""
              className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`} />
            </div>
          </div>

          {/* Filter panels */}
          <div className={`flex flex-col gap-4 ${showFilter ? 'anim-sliddown' : 'hidden'} sm:flex sm:flex-col`}>

            {/* Search */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Search</p>
              <div className="relative">
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                  <SearchIcon size='13' />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white transition-all duration-200"
                />
              </div>
            </div>

            {/* Category */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Category</p>
              <div className="flex flex-col gap-1.5">
                {['Men', 'Women', 'Kids'].map(cat => (
                  <div key={cat} className="filter-check">
                    <input type="checkbox" id={`cat-${cat}`} value={cat} checked={category.includes(cat)} onChange={toggleCategory} />
                    <label htmlFor={`cat-${cat}`} className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0
                        ${category.includes(cat) ? 'bg-white border-white' : 'border-gray-300'}`}>
                        {category.includes(cat) && <span className="w-1.5 h-1.5 rounded-sm bg-gray-900 block" />}
                      </span>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Type</p>
              <div className="flex flex-col gap-1.5">
                {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
                  <div key={sub} className="filter-check">
                    <input type="checkbox" id={`sub-${sub}`} value={sub} checked={subCategory.includes(sub)} onChange={toggleSubCategory} />
                    <label htmlFor={`sub-${sub}`} className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0
                        ${subCategory.includes(sub) ? 'bg-white border-white' : 'border-gray-300'}`}>
                        {subCategory.includes(sub) && <span className="w-1.5 h-1.5 rounded-sm bg-gray-900 block" />}
                      </span>
                      {sub}
                    </label>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* ── RIGHT: Products ── */}
        <div className="flex-1 min-w-0">

          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 anim-fadeup">
            <div>
              <Tittle text1="ALL" text2="COLLECTION" />
              <p className="text-xs text-gray-400 mt-0.5">
                {isFiltering ? 'Filtering...' : `${filterProducts.length} product${filterProducts.length !== 1 ? 's' : ''} found`}
              </p>
            </div>

            <select
              onChange={(e) => setPriceSort(e.target.value)}
              value={PriceSort}
              className="sort-select border border-gray-200 text-sm px-3 py-2.5 rounded-xl bg-white text-gray-700 cursor-pointer hover:border-gray-400 transition-colors outline-none"
            >
              <option value="relevent">Relevant</option>
              <option value="high-low">Price: High → Low</option>
              <option value="low-high">Price: Low → High</option>
            </select>
          </div>

          {/* Product grid */}
          {isFiltering ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton aspect-[3/4]" />
              ))}
            </div>
          ) : filterProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center anim-fadein">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-medium text-gray-700 mb-1">No products found</p>
              <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search query</p>
              <button onClick={clearFilters}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:-translate-y-0.5 transition-transform">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item, index) => (
                <div
                  key={item._id || index}
                  className="product-grid-item product-card rounded-2xl overflow-hidden"
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
                >
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    image={getProductImage(item)}
                    prize={item.price}
                    colorImages={item.colorImages}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection