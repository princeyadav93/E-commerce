import React from 'react'
import axios from 'axios'
import './productDetails.css'
function ProductDetails(props) {

    const deleteProduct = async (id) => {
        try {
            const res = await axios.post("/api/v1/admin/product/deleteproduct", { id })
            console.log(res.data)
            console.log("Product removed")
            location.reload();
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <>
            <div className="productDetails-box1">
                <div className='image-div'>
                    <img src={props.itemImage} alt="this is an image" />
                </div>
                <div className='title for-all'>
                    <p >{props.title}</p>
                </div>
                <div className='description for-all'>
                    <p >{props.description}</p>
                </div>
                <div className='categories for-all'>
                    <p>{props.category}</p>
                </div >
                <div className='old-price for-all'>
                    <p>${props.oldPrice}</p>
                </div>
                <div className='new-price for-all'>
                    <p>${props.newPrice}</p>
                </div>
                <div className='del-btn for-all'>
                    <button type="button" onClick={() => deleteProduct(props.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default ProductDetails