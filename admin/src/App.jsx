/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

//Pages
import Add from "./pages/Add"
import Orders from "./pages/Orders"
import List from "./pages/LIst"

//Components
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Login from "./components/Login"


// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

function App() {

  //states and Variables
  const [token, setToken] = useState()


  // useEffect For set up token
  useEffect(() => {
    setToken(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  }, [])


  //useEffect for store token in local Storage
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (

    <div className="bg-gray-50 min-h-screen">
      {
        token === "" ?
          <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="flex w-fulll">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
      <ToastContainer />
    </div>
  )
}

export default App
