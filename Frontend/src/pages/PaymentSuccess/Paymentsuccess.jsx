import React, { useEffect } from 'react'
import './paymentsuccess.css'
import { Link } from 'react-router-dom'
import { useProductContext } from '../../context/ProductContext.jsx'

function Paymentsuccess() {
    const { setcartCount } = useProductContext()


    useEffect(() => {
        setcartCount(0)
    }, [])

    return (
        <>
            <div className="payment-box">
                <h1>Payment successful</h1>
                <p>Thankyou for shopping with us!</p>
                <button className='continue-shpping-btn'><Link to='/'>Continue shopping</Link></button>
            </div>
        </>
    )
}

export default Paymentsuccess