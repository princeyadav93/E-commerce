import React, { useState } from 'react'
import './myorderscomp.css'


function OrdersComp(props) {
    const [product, setprouct] = useState(props.product);
    const [quantity, setquantity] = useState(props.quantity);
    return (
        <>
            <div className="productDetails-box1">
                <div className='image-div'>
                    <img src={product.itemImage} alt="this is an image" />
                </div>
                <div className='title for-all'>
                    <p >{product.title}</p>
                </div>
                <div className='description for-all'>
                    <p >{product.description}</p>
                </div>
                <div className='categories for-all'>
                    <p>{quantity}</p>
                </div >
                <div className='categories for-all'>
                    <p>{product.category}</p>
                </div >
                <div className='old-price for-all'>
                    <p>${product.oldPrice}</p>
                </div>
                <div className='new-price for-all'>
                    <p>${product.newPrice}</p>
                </div>
            </div>
        </>
    )
}

export default OrdersComp