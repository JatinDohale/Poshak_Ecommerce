import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {

  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      <div>
        <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-500'>We offer hasle free exchange policy</p>
      </div>

      <div>
        <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>7 day return Policy</p>
        <p className='text-gray-500'>We provide 7 day free return policy</p>
      </div>

      <div>
        <img src={assets.support_img} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Best Custmer Support</p>
        <p className='text-gray-500'>We provide 24/7 Customer Support</p>
      </div>
    </div>
  )
}

export default OurPolicy
