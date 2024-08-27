import React from 'react'
import { Link } from 'react-router-dom'
import './Items.css'

function Items(props) {
    return (
        <div className='containers'>
            <Link to={`/product/${props._id}`}><img src={props.itemImage} alt="this is an image" className='item-image' onClick={() => window.scrollTo(0, 0)} /></Link>
            <p>{props.title}</p>
            <div className='item-prices'>
                <div className='new-price'>
                    ${props.newPrice}
                </div>
                <div className='old-price'>
                    ${props.oldPrice}
                </div>
            </div>
        </div>
    )
}

export default Items