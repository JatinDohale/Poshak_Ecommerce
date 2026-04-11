import { useContext } from 'react'

import { ShopContext } from '../../context/ShopContext' // contest file

// components
import Tittle from '../ui/Tittle'
import ProductItem from '../ProductItem'
import { ArrowIcon } from '../../assets/icons/Icons'
 
const BestSeller = ({bestSellerRef}) => {

  // states and Variable
  const { products,getImage } = useContext(ShopContext)
  const bestSell = products?.filter(item => item.bestseller).slice(0, 5) || []
 
 

 
  return (
    <div ref={bestSellerRef} className="my-16 px-20">
  
      {/* Header */}
      <div className="text-center mb-5">
        <div className="bs-header flex justify-center">
          <span className="bs-badge">
            ★ Bestsellers
          </span>
        </div>
 
        <div className="bs-header">
          <Tittle text1="BEST" text2="SELLER" />
        </div>
 
        <p className="bs-desc w-3/4 mx-auto text-xs sm:text-sm text-gray-400 leading-relaxed  max-w-md">
          Our most-loved pieces, chosen by customers who know great style when they see it.
        </p>
 
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-12 bg-amber-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          <div className="h-px w-12 bg-amber-200" />
        </div>
      </div>
 
      {/* Product Grid */}
      {bestSell.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
             <div key={i}>
              <div className="bg-gray-200 rounded-2xl aspect-3/4 w-full mb-2" />
              <div className="bg-gray-300 h-3.5 w-3/4 mb-1.5" />
              <div className="bg-gray-300 h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSell.map((item, index) => (
            <div
              key={item._id}
              className="bs-card relative"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
 
              <ProductItem
                id={item._id}
                name={item.name}
                image={getImage(item)}
                prize={item.price}
                colorImages={item.colorImages}
                bestseller={item.bestseller}
              />
 
            </div>
          ))}
        </div>
      )}
 
      {/* Bottom CTA */}
      <div
        className="text-center mt-10"
        style={{ animation: 'fadeUp .5s .45s cubic-bezier(.22,1,.36,1) forwards', opacity: 0 }}
      >
        <a
          href="/collection"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white bg-gray-900 px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Shop Bestsellers
          <ArrowIcon/>
        </a>
      </div>
    </div>
  )
}
 
export default BestSeller