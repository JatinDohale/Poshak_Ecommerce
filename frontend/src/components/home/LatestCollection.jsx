import { useContext } from 'react' 

// Context File
import { ShopContext } from '../../context/ShopContext'

// components
import Tittle from '../ui/Tittle'
import ProductItem from '../ProductItem'
import { ArrowIcon } from '../../assets/icons/Icons'



const LatestCollection = ({latestArrivalRef}) => {

  // states and Variables
  const {products , getImage} = useContext(ShopContext)
  const latestProducts = products?.slice(-10).reverse() || []

  return (
    <div ref={latestArrivalRef} className="my-10 px-5 md:px-20">
      
      {/* Header */}
      <div className="text-center mb-5">
        <div className="lc-title flex justify-center">
          <span className="lc-badge">
            <span className="lc-badge-dot" />
            New Arrivals
          </span>
        </div>

        <div className="lc-title">
          <Tittle text1="LATEST" text2="COLLECTION" />
        </div>

        <p className="lc-desc w-3/4 mx-auto text-xs sm:text-sm text-gray-400 leading-relaxed mb-2 max-w-md">
          Discover our freshest styles — thoughtfully designed, carefully crafted for every occasion.
          
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 ">
          <div className="h-px w-12 bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <div className="h-px w-12 bg-gray-200" />
        </div>
      </div>

      {/* Product Grid */}
      {latestProducts.length === 0 ? (
        // Skeleton loading
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>
              <div className="bg-gray-200 rounded-2xl aspect-3/4 w-full mb-2" />
              <div className="bg-gray-300 h-3.5 w-3/4 mb-1.5" />
              <div className="bg-gray-300 h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, index) => (
            item._id ? (
              <div
                key={item._id}
                className="lc-card"
                style={{ animationDelay: `${Math.min(index * 0.06, 0.5)}s` }}
              >
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={getImage(item)}
                  prize={item.price}
                  colorImages={item.colorImages}
                />
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* View all link */}
      <div className="text-center mt-10" style={{ animation: 'fadeUp .5s .5s cubic-bezier(.22,1,.36,1) forwards', opacity: 0 }}>
        <a
          href="/collection"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 border border-gray-200 px-6 py-3 rounded-xl hover:border-gray-800 hover:text-gray-900 transition-all duration-200 hover:-translate-y-0.5"
        >
          View All Collection
          <ArrowIcon/>
        </a>
      </div>
    </div>
  )
}

export default LatestCollection