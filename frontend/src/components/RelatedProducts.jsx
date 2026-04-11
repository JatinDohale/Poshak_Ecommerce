//components
import ProductItem from './ProductItem'
import Tittle from './ui/Tittle'

const RelatedProducts = ({ realtedProductList }) => {

    return (
        <div className='my-24'>
            <div className='text-center text-2xl py-2'>
                <Tittle text1={"REALTED"} text2={'PRODUCTS'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6 '>
                {realtedProductList.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} prize={item.price} colorImages={item.colorImages} />
                ))
                }
            </div>

        </div>
    )
}

export default RelatedProducts
