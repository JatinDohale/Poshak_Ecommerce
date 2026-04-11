// Packeges
import { useState, useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

//Components & Context files
import { ShopContext } from '../context/ShopContext'
import InputField from '../components/login/InputField'


const Login = () => {
  
  const { backendURL, setToken, token, navigate } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Sign Up') // login and signup Swaping
  const isSignUp = currentState === 'Sign Up' 

  // Form Inputs
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

  // For Animation
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  // useEffect for card Animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  // Navigate when use is Already Login
  useEffect(() => {
    if (token) navigate('/')
  }, [token])


  // function for empty input field when change Mode[eg. login/sign up -> sign up/login ]
  const switchMode = (mode) => {
    setCurrentState(mode)
    setName('')
    setEmail('')
    setPassword('')
    setConformPassword('')
  }

  // Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isSignUp) {
        if (password !== conformPassword) {
          toast.error('Password and confirm password do not match')
        } else {
          const response = await axios.post(backendURL + '/api/user/signup', { name, email, password })
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
          } else {
            toast.error(response.data.message)
          }
        }
      } else {
        const response = await axios.post(backendURL + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">

      {/* Card */}
      <div className={`w-full max-w-md bg-white border border-gray-200 shadow-lg px-8 py-10
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} >

        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-500 delay-100 
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-light tracking-widest text-gray-900 uppercase">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <div className="mt-3 mx-auto w-10 h-px bg-gray-300" />
          <p className="mt-2 text-xs tracking-widest text-gray-400 uppercase">
            {isSignUp ? 'Join us today' : 'Sign in to continue'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex border-b border-gray-200 mb-7 transition-all duration-500 delay-150 
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {['Sign Up', 'Login'].map((tab) => (

            <button key={tab} type="button" onClick={() => switchMode(tab)} className={`flex-1 pb-3 text-xs tracking-widest uppercase transition-all duration-300 relative 
            ${currentState === tab ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600'}`}>

              {tab}

              <span className={`absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gray-900 transition-all duration-300 origin-center 
                ${currentState === tab ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}/>
              
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">

          {/* Name — slides in/out */}
          <div className={`overflow-hidden transition-all ease-in-out 
            ${isSignUp ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`} 
            style={{ transitionDuration: '350ms' }}>
            
            <InputField
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
              autoComplete="name"
              delay="delay-200"
              visible={visible} />
          </div>

          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            delay="delay-[250ms]"
            visible={visible} />

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            delay="delay-[300ms]"
            visible={visible} />

          {/* Confirm Password — slides in/out */}
          <div
            className={`overflow-hidden transition-all ease-in-out
              ${isSignUp ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
            style={{ transitionDuration: '350ms' }}>

            <InputField
              type="password"
              placeholder="Confirm Password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              required={isSignUp}
              autoComplete="new-password"
              delay="delay-[350ms]"
              visible={visible}/>
          </div>

          {/* Forgot / Switch link */}
          <div className={`flex justify-between items-center pt-1 text-xs text-gray-400
            transition-all duration-500 delay-[400ms]
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

            {!isSignUp && (<button type="button" className="hover:text-gray-700 transition-colors duration-200 tracking-wide" onClick={()=>{toast.warn("Updated Soon")}} > Forgot password?</button>)}

            <div className="flex-1" />

            {isSignUp ? ( <button 
            type="button" 
            onClick={() => switchMode('Login')} 
            className="hover:text-gray-700 transition-colors duration-200 tracking-wide"> 
            Already have an account →
            </button>) : ( <button 
            type="button" 
            onClick={() => switchMode('Sign Up')} 
            className="hover:text-gray-700 transition-colors duration-200 tracking-wide">
            Create an account → 
            </button> )}
            
            </div>

          {/* Submit Button */}
          <div className={`pt-2 transition-all duration-500 delay-[450ms]
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3 bg-gray-900 text-white text-xs tracking-widest uppercase overflow-hidden group hover:bg-gray-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
              {/* Shimmer sweep on hover */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  bg-gradient-to-r from-transparent via-white/10 to-transparent
                  transition-transform duration-700 ease-in-out"
              />

              <span className="relative flex items-center justify-center gap-2">
                {isLoading && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {isLoading ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
              </span>

            </button>
          </div>

        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Login