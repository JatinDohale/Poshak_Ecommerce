import { useState } from 'react'
import axios from "axios"

import { toast } from 'react-toastify'
import { backendUrl } from "../App"


const Login = ({ setToken }) => {

    // states and Variables
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //  submit Handler
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendUrl + "/api/user/adminlogin", { email, password })

            if (response.data.success) {
                setToken(response.data.token)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (

        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>

                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

                <form onSubmit={onSubmitHandler}>

                    {/*admin email input */}
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Your Email Adress' required />
                    </div>

                    {/*admin Password input */}
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Enter Your Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Your Password' required />
                    </div>

                    {/* login button */}
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login
