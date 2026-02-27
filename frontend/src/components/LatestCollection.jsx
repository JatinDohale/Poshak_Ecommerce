
//components
import Tittle from './Tittle'
import ProductItem from './ProductItem'


const LatestCollection = ({ products }) => {

  //states and variables
  const latestProducts = products?.reverse().slice(0, 10);

  return (

    <div className='my-10'>

      {/* latest colletion title and description */}
      <div className='text-center py-8 text-3xl'>
        <Tittle text1={"LATEST"} text2={"COLLECTION"} />
        <p className='w-3/4 text-xs m-auto sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, itaque?</p>
      </div>

      {/* Rendiring products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={(item._id == undefined ? console.log("wait data is loading") : item._id)} name={item.name} image={item.image} prize={item.price} />
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection
