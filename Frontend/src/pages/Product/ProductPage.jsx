import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './productPage.css'
import { useProductContext } from '../../context/ProductContext.jsx'

function ProductPage() {
    const { productId } = useParams();

    const { allProductsContext, setcartCount, cartCount } = useProductContext();
    let product = allProductsContext.find((e) => e._id === (productId))

    const [quantity, setquantity] = useState(1)

    const addToCart = async (e) => {
        e.preventDefault();

        if (localStorage.getItem('userInfo')) {
            try {
                if (quantity > 0) {
                    const res = await axios.post("/api/v1/users/addtocart", { productId, quantity })
                    setcartCount(cartCount + 1)
                    alert("item added")
                } else {
                    alert("atleast 1 quantity required")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Login Required!")
        }
    }

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
        fetchCartCount();
    }, [])

    return (
        <>
            <div className='product-main-box'>
                <div className='product-layout'>
                    <div className='product-images'>
                        <div className='image-list'>
                            <img src={product.itemImage} alt="this is an image" />
                            <img src={product.itemImage} alt="this is an image" />
                            <img src={product.itemImage} alt="this is an image" />
                            <img src={product.itemImage} alt="this is an image" />
                        </div>
                        <div className='single-image'>
                            <img src={product.itemImage} alt="this is an image" />
                        </div>
                    </div>
                    <div className='product-content'>
                        <div className='product-name'>
                            <p>{product.title}</p>
                            <p>{product.description}</p>
                        </div>
                        <div className='product-price'>
                            <p className='product-new-price'>₹{product.newPrice}</p>
                            <p className='product-old-price'>₹{product.oldPrice}</p>
                        </div>
                        <div className='quantity'>
                            <label htmlFor="quantity">Quantity:
                                <input type="number"
                                    value={quantity}
                                    id="quantity"
                                    onChange={(e) => setquantity(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className='add-to-cart'><button onClick={addToCart}>Add to cart</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage