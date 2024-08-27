import React, { useState, useEffect } from 'react'
import Items from '../Items/Items'
import './shopCategory.css'
import axios from 'axios'

import { useProductContext } from '../../context/ProductContext.jsx'

function ShopCatetory(props) {
    const { setallProductsContext } = useProductContext();
    const [allProducts, setallProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/v1/admin/product/userallproductdetails")
            setallProducts(response.data.data);
            setallProductsContext(response.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>
            <div className='shop-category-box'>
                <img className='banner-image' src={props.banner} alt="" />
                <h1>{props.category} collection</h1>
                <hr />
                <div className='shop-category-box-items'>
                    {allProducts.map((item, i) => {
                        if (props.category === item.category) {
                            return <Items key={i} _id={item._id} itemImage={item.itemImage} title={item.title}
                                newPrice={item.newPrice} oldPrice={item.oldPrice} />
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default ShopCatetory