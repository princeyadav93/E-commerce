import React from 'react'
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import { ProductContextProvider } from './context/ProductContext.jsx'

function Layout() {
    return (
        <ProductContextProvider>
            <Header />
            <Outlet />
            <Footer />
        </ProductContextProvider>
    )
}

export default Layout