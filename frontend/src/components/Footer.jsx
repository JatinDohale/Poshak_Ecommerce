import React from 'react'


const Footer = () => {

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Logo & description */}
        <div>
          <img src="src/assets/frontend_assets/logo.png" alt="" className='mb-5 w-32 rounded-2xl' />
          <p className='w-full sm:w-1/2 text-gray-600 '>
            Experience the Beauty of Indian Traditions with Luxurious Ethnic Wear Designed for Every Grand Occasion</p>
        </div>

        {/* company and related to company */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='text-gray-600 flex flex-col gap-1 '>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* contact info  */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='text-gray-600 flex flex-col gap-1 '>
            <li>+91 908217xxxx</li>
            <li>customerservise@poshak.com</li>
          </ul>
        </div>

      </div>

      {/* copyright line */}
      <div className='text-gray-700'>
        <hr />
        <p className='py-5 text-sm text-center'>copyright@2026 poshak.com all right reserved.</p>
      </div>

    </div>
  )
}

export default Footer
