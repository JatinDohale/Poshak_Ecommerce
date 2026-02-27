import { assets } from "../assets/assets"

const Navbar = ({ setToken }) => {

  return (

    <div className='flex items-center py-2 px-[4%] justify-between'>

      <div>
        <img className='w-[max(10%,80px)] rounded-md relative left-2' src={assets.logo} alt="" />

        <div>
          <p><i className="text-red-500 font-bold font-">Admin </i>Panel</p>
        </div>

      </div>


      <button onClick={() => { setToken("") }} className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Log Out</button>

    </div>
  )
}

export default Navbar
