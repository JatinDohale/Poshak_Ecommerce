import { useState, useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

import { ShopContext } from '../context/ShopContext'


const Login = () => {

  //states Variables
  const { backendURL, setToken, token, navigate } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')
  const [currentState, setCurrentState] = useState("Sign Up");

  //useEffect Hook for navigate to home 
  useEffect(() => {
    if (token) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  // Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (currentState == "Sign Up") {

        if (password !== conformPassword) {
          toast.error("password and conform password is not same");
        } else {
          const reponse = await axios.post(backendURL + "/api/user/signup", { name, email, password })

          if (reponse.data.success) {
            setToken(reponse.data.token)
            localStorage.setItem("token", reponse.data.token)
          } else { toast.error(reponse.data.message) }

        }
      } else {

        const reponse = await axios.post(backendURL + "/api/user/login", { email, password })

        if (reponse.data.success) {
          setToken(reponse.data.token)
          localStorage.setItem('token', reponse.data.token)
        } else {
          toast.error(reponse.data.message)
        }

      }
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }


  return (

    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' action="
    ">

      {/* Title */}
      <div className='inline-flex item-center gap-2 mb-2 mt-5'>
        <p className='prata-regular text-2xl'>{currentState}</p>
        <hr className='border-none h-[1.5 px] w-8 bg-gray-800' />
      </div>

      {/* Inputs */}
      {currentState === "Sign Up" && <input type="text" onChange={(e) => setName(e.target.value)} value={name} required className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}

      <input type="email" onChange={(e) => setemail(e.target.value)} value={email} required className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />

      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required className='w-full px-3 py-2 border border-gray-800' placeholder='password' />

      {currentState === "Sign Up" && <input type="text" onChange={(e) => setConformPassword(e.target.value)} value={conformPassword} required className='w-full px-3 py-2 border border-gray-800' placeholder='Confirm password' />}

      {/* forget password and switch functions */}
      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>forgot your password</p>
        {currentState === "Sign Up" ?
          <p className='cursor-pointer' onClick={() => { setCurrentState("Login") }}>login here</p> :
          <p className='cursor-pointer' onClick={() => { setCurrentState("Sign Up") }}>create account </p>}
      </div>

      {/* login/sign up button */}
      <button type='submit' className='bg-black mt-5 text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-slate-900'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>

      <ToastContainer />
    </form>
  )
}

export default Login
