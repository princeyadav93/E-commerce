import React, { useState, useEffect } from 'react';
import heroImage from "../../assets/pageImage/hero_image.jpg"
import './homePage.css'
import Newarrival from '../../components/NewArrival/Newarrival.jsx';
import axios from 'axios'
import { useProductContext } from '../../context/ProductContext.jsx'


const Homepage = () => {
    const [allProducts, setallProducts] = useState([])
    const { setallProductsContext, setcartCount } = useProductContext();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/v1/admin/product/userallproductdetails")
            setallProducts(response.data.data);
            setallProductsContext(response.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    const newProduct = allProducts.slice(0, 8)
    const fetchCartCount = async () => {
        if (localStorage.getItem('userInfo')) {
            try {
                const res = await axios.get("/api/v1/users/cartdetails")
                setcartCount(res.data.data.length)
            } catch (error) {
                console.log(error + "error")
            }
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCartCount();
    }, [])

    return (
        <>
            <section className='heroImage'>
                <img src={heroImage} alt="this is an image" />
                <h1>Welcome in unique fashion world</h1>
            </section>
            <Newarrival newProduct={newProduct} />

        </>
    );
};

export default Homepage;
