import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './index.css'
import Homepage from "./pages/Home/Homepage.jsx"
import Loginpage from "./pages/Login/Loginpage.jsx"
import Layout from './Layout.jsx'
import Signup from './pages/Signup/Signup.jsx'
import ShopCatetory from './components/ShopCategory/ShopCatetory.jsx'
import ProductPage from './pages/Product/ProductPage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'
import Paymentsucces from './pages/PaymentSuccess/Paymentsuccess.jsx'
import Myorders from './pages/MyOrders/Myorders.jsx'
import menBanner1 from './assets/Banners/menBanner1.jpg'
import womenBanner2 from './assets/Banners/womenBanner2.jpg'
import kidsBanner1 from './assets/Banners/kidsBanner1.jpg'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path="" element={<Homepage />} />
      <Route path='men' element={<ShopCatetory banner={menBanner1} category="men" />} />
      <Route path='women' element={<ShopCatetory banner={womenBanner2} category="women" />} />
      <Route path='Kids' element={<ShopCatetory banner={kidsBanner1} category="kids" />} />
      <Route path="login" element={<Loginpage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="product" element={<ProductPage />}>
        <Route path=":productId" element={<ProductPage />} />
      </Route>
      <Route path="Cartpage" element={<CartPage />} />
      <Route path="paymentsuccess" element={<Paymentsucces />} />
      <Route path="myorders" element={<Myorders />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
