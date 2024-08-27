import React from 'react'
import Items from '../Items/Items'
import './Newarrival.css'

function Newarrival(props) {

    return (
        <>
            <div className='box'>
                <h1>New Arrivals</h1>
                <hr />
                <div className='box-item'>
                    {props.newProduct.map((item, i) => {
                        return <Items key={i} _id={item._id} itemImage={item.itemImage} title={item.title}
                            newPrice={item.newPrice} oldPrice={item.oldPrice} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Newarrival