import React, { useEffect, useState } from 'react'
import './myorders.css'
import axios from 'axios'
import MyOrdersComp from '../../components/MyOrdersComp/MyOrdersComp.jsx'
import { useProductContext } from '../../context/ProductContext.jsx'

function Myorders() {
    const [Orders, setOrders] = useState([])
    const { allOrderedProduct } = useProductContext();
    let products = [];

    const fetchOrderDetails = async () => {
        if (localStorage.getItem('userInfo')) {
            const res = await axios.get("/api/v1/users/orders")
            setOrders(res.data.data)
        }
    }

    for (let i = 0; i < Orders.length; i++) {
        products.push(Orders[i].products)
    }

    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products[i].length; j++) {
            allOrderedProduct.push(products[i][j])
        }
    }

    useEffect(() => {
        fetchOrderDetails();
    }, [])
    return (
        <>
            <div className='name-plate'>
                <p>Name</p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Category</p>
                <p>Old Price</p>
                <p>New Price</p>
            </div>
            {allOrderedProduct.map((item, i) => {
                return <MyOrdersComp key={i} quantity={item.quantity} product={item.product} />
            })}
        </>
    )
}

export default Myorders