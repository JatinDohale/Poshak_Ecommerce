import { Routes, Route, useLocation } from 'react-router-dom'

//Pages
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Placedorders from './pages/Placedorders'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Verify from './pages/Verify'

//Componnets
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const App = () => {
  const location = useLocation()
  

  return (
    <div >
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/collection' element={<Collection />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/product/:productId' element={<Product />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/placedorders' element={<Placedorders />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/verify' element={<Verify />}> </Route>
      </Routes>
      { location.pathname !== "/login" && <Footer />}

    </div>
  )
}

export default App
