import { assets } from '../assets/frontend_assets/assets'

//components
import Tittle from '../components/Tittle'
import NewletterBox from '../components/NewletterBox'

const Contact = () => {

  return (

    <div>

      {/* heading title */}
      <div className='text-center text-2xl pt-10 border-t '>
        <Tittle text1={'CONTACT'} text2={'US'} />
      </div>

      {/* company Information */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
        <img className='w-full md:max-w-112.5' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-l text-gray-600'>Our Store</p>
          <p className='text-gray-500'>address : Mummbai , Maharastra , India - 400001</p>
          <div>
            <p className='text-gray-500'>Tel: 9082xxxxxx </p>
            <hr className='text-gray-500' />
            <p className='text-gray-500'>Email: admin@forever</p>
          </div>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our Team And Job Openings</p>
          <button className='bg-white mt-5  px-8 py-3 text-sm border border-black hover:bg-black hover:text-white transition-all duration-400'>Explore Jobs</button>
        </div>
      </div>

      <NewletterBox />

    </div>
  )
}

export default Contact
