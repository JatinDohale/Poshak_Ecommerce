import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

//components
import NewletterBox from '../components/NewletterBox'
import Tittle from '../components/Tittle'


const About = () => {

  return (

    <div>

      {/* Heading Text */}
      <div className='text-2xl text-center pt-8 border-t '>
        <Tittle text1={'ABOUT'} text2={'US'} />
      </div>

      {/* description */}
      <div className='my-10 flex flex-col md:flex-row gap-10'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />

        <div className='flex flex-col justify-center gap-6 md:2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, modi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, deserunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate suscipit porro obcaecati! Laborum consequuntur ducimus, laboriosam soluta provident odit ipsum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, necessitatibus!</p>
          <b className='text-gray-800 '>Our Mission</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident dolorum dicta illum at aut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, nemo!</p>
        </div>

      </div>


      {/* why choose us section title */}
      <div className='text-xl py-4'>
        <Tittle text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* why choose us section  */}
      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border border-gray-400 rounded-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assurancep</b>
          <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti facere doloremque quibusdam quae rerum tenetur?</p>
        </div>

        <div className='border border-gray-400 rounded-md  px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convinience:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti facere doloremque quibusdam quae rerum tenetur?</p>
        </div>

        <div className='border border-gray-400 rounded-md  px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti facere doloremque quibusdam quae rerum tenetur?</p>
        </div>

      </div>

      <NewletterBox />

    </div>
  )
}

export default About
