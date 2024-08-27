import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductDetails from '../../Compnents/Listingproduct/ProductDetails';
import './allproduct.css'


function Allproducts() {
    const [listingAllProduct, setlistingAllProduct] = useState([])

    const fetchProductDetails = async () => {
        if (localStorage.getItem("adminInfo")) {
            try {
                const response = await axios.get("/api/v1/admin/product/allproductdetails")
                setlistingAllProduct(response.data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Login required!")
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [])

    return (
        <>
            <div className='allproduct-main-box'>
                <div className='name-plate'>
                    <p>Name</p>
                    <p>Description</p>
                    <p>Category</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                </div>
                <div className='all-product-box'>
                    {listingAllProduct.map((item, index) => {
                        return <ProductDetails key={index} id={item._id} itemImage={item.itemImage} title={item.title} newPrice={item.newPrice} oldPrice={item.oldPrice} category={item.category} description={item.description} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Allproducts