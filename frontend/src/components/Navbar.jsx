import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'


const Navbar = () => {

  // States 
  const [visible, setVisible] = useState(false)
  const { cartItems, token, navigate, setToken, setCartItems } = useContext(ShopContext)
  const [count, setcount] = useState(10)

  //logout function
  const logout = () => {
    navigate("/login");
    setToken(undefined);
    localStorage.removeItem("token");
    setCartItems({});
  }

  //useEffect Hoop for calculate total item in cart
  useEffect(() => {
    let totolCount = 0
    for (const product in cartItems) {
      for (const size in cartItems[product]) {
        totolCount += cartItems[product][size]
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setcount(totolCount)
  }, [cartItems])



  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      {/* Logo Image */}
      <img src={assets.logo} alt="" className='w-36 rounded-2xl' />

      {/* Links for Navigations */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700  hidden' />
        </NavLink>

        <NavLink to="/collection" className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/about" className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/contact" className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>

      {/* icons */}
      <div className=' flex items-center gap-3  sm:gap-6 '>

        {/* profile Icon */}
        <div className='group relative'>
          <NavLink to='/login'>
            <lord-icon
              src="/profile_icon.json"
              trigger="hover"
              loop="true"
              speed="1.5"
              className="w-7 cursor-pointer">
            </lord-icon>
          </NavLink>

          {/* profile feature hover  */}
          {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 rounded w-36 py-3 px-5 bg-slate-100 text-gray-500 '>
              <p className='hover:text-black hover:font-bold cursor-pointer'>My Profile</p>
              <p onClick={() => navigate('/orders')} className='hover:text-black hover:font-bold cursor-pointer'>Orders</p>
              <p onClick={logout} className='hover:text-black hover:font-bold cursor-pointer'>Logout</p>
            </div>
          </div>
          }

        </div>

        {/* Cart Icon */}
        <NavLink to="/cart">
          <div className='relative' >
            <lord-icon
              src='/cart_icon.json'
              trigger="hover"
              loop="true"
              speed="1.5"
              className="w-7 cursor-pointer">
            </lord-icon>
            <p className='absolute -right-1.25 bottom-0 text-[8px] w-4 text-center leading-4 aspect-square bg-black rounded-full text-white '>{count}</p>
          </div>
        </NavLink>


        {/* menu icon for mobile screen */}
        <lord-icon
          src='/menu_icon.json'
          trigger="hover"
          loop="true"
          speed="1.5"
          className="w-7 cursor-pointer  sm:hidden "
          onClick={() => { setVisible(true) }}>
        </lord-icon>
      </div>

      {/* side menu bar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className='flex flex-col text-gray-700'>

          <div onClick={() => { setVisible(false) }} className='flex items-center gap-1 p-3 cursor-pointer'>
            <img src={assets.left_arrow_icon} alt="" className='h-4' />
            <p>Back</p>
          </div>

          <NavLink onClick={() => { setVisible(false) }} to="/" className="pl-6 p-2  hover:font-bold">HOME</NavLink>

          <NavLink onClick={() => { setVisible(false) }} to="/collection" className="pl-6 py-2 hover:font-bold">COLLECTION</NavLink>

          <NavLink onClick={() => { setVisible(false) }} to="/about" className="pl-6 py-2  hover:font-bold">ABOUT</NavLink>

          <NavLink onClick={() => { setVisible(false) }} to="/contact" className="pl-6 py-2 hover:font-bold">CONTACT</NavLink>

        </div>

      </div>

    </div>
  )
}

export default Navbar
