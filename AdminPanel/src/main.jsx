import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Addproducts from './Pages/Addproducts/Addproducts.jsx'
import Allproducts from './Pages/Allproducts/Allproducts.jsx'
import Adminlogin from './Pages/Adminlogin/Adminlogin.jsx'
import Adminsignup from './Pages/Adminlogin/Adminsignup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< App />} >
      <Route path='addproduct' element={<Addproducts />} />
      <Route path='allproduct' element={<Allproducts />} />
      <Route path='adminlogin' element={<Adminlogin />} />
      <Route path='adminsignup' element={<Adminsignup />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
