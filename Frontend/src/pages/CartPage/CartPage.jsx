import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './cartpage.css'
import axios from 'axios'
import CartComp from '../../components/CartComp/CartComp'
import { useProductContext } from '../../context/ProductContext.jsx'

function CartPage() {
    const [cartItems, setcartItems] = useState([]);
    const navigate = useNavigate();

    const { setallProductsContext, setcartCount,
        oldPriceTotal, setoldPriceTotal, newPriceTotal,
        setnewPriceTotal, allCartProducts, setallCartProducts, cartCount } = useProductContext();

    const [discountedAmount, setdiscountedAmount] = useState(0);
    const [item, setitem] = useState('item')

    const [allProducts, setallProducts] = useState([])

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get("/api/v1/admin/product/userallproductdetails")
            setallProducts(response.data.data);
            setallProductsContext(response.data.data);
        } catch (error) {
            console.log(error)

        }
    };

    const fetchCartDetails = async () => {
        if (localStorage.getItem('userInfo')) {
            try {
                const res = await axios.get("/api/v1/users/cartdetails")
                setcartItems(res.data.data);
            } catch (error) {
                console.log(error + "error")
            }
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

    const cartPrices = async () => {
        if (localStorage.getItem('userInfo')) {
            try {
                const res = await axios.get("/api/v1/users/carttotalprice")
                setallCartProducts(res.data.data.items)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const fetchBillDetails = () => {
        let oldPrice = 0;
        let newPrice = 0;
        allCartProducts.map((item) => {
            oldPrice += item.product.oldPrice * item.quantity;
            newPrice += item.product.newPrice * item.quantity;
        })
        setoldPriceTotal(oldPrice);
        setnewPriceTotal(newPrice);
        setdiscountedAmount(oldPriceTotal - newPriceTotal);
        if (cartCount > 1) {
            setitem('items')
        }
    }
    //RazorPay Payment Integration
    const checkOutHandler = async () => {
        try {
            const res = await axios.post("/api/v1/users/payment/createOrder")
            initPay(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const initPay = async (data) => {
        const res = await axios.get("/api/v1/users/payment/getrazorpaykeyid")
        const order_id = data.id;
        const options = {
            key: res.data.data,
            amount: data.amount,
            currency: data.currency,
            name: "Clothes",
            description: "Test",
            image: "",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const res = await axios.post("/api/v1/users/payment/verifypayment", response);
                    if (data) {
                        navigate('/paymentsuccess')
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            modal: {
                ondismiss: async function () {
                    await axios.delete("/api/v1/users/payment/cancelledorder", order_id);
                    alert("Payment canceled. Order has been deleted.");
                }
            },
            theme: {
                color: "#3399cc",
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    useEffect(() => {
        fetchBillDetails();
    }, [cartPrices])

    useEffect(() => {
        fetchCartDetails();
        fetchProductDetails();
        fetchCartCount();
        cartPrices();
    }, [])

    return (
        <div style={{ marginTop: "30px" }}>
            <div className='cart-page-names'>
                <p>Name</p>
                <p>Price</p>
                <p>Quantity</p>
            </div>
            {cartItems ? cartItems.map((items, i) => {
                return <CartComp key={i} quantity={items.quantity} prodouctId={items.product}
                    allProducts={allProducts} />
            }) : null}
            <div className='payment-container'>
                {localStorage.getItem('userInfo') ? <div className="total-price-details">
                    <div className='total-price-inner-box'>
                        <p style={{ borderBottom: '1px solid grey', padding: '8px', fontWeight: 'bolder' }}>PRICE DETAILS</p>
                        <div className='total-price-box'>
                            <p>Price({cartCount} {item})</p>
                            <p>₹{oldPriceTotal}</p>
                        </div>
                        <div className='total-price-box'>
                            <p>Discount</p>
                            <p style={{ color: 'green', fontWeight: "bolder" }}>-₹{discountedAmount}</p>
                        </div>
                        <div className='total-price-box' style={{ borderBottom: '1px dotted grey', paddingBottom: '10px' }}>
                            <p>Delivery Charges</p>
                            <p style={{ color: newPriceTotal > 500 ? 'green' : 'black' }}>{newPriceTotal > 500 ? 'Free' : '₹40'}</p>
                        </div>
                        <div className='total-price-box total-amount'>
                            <p>Total Amount</p>
                            <p>₹{newPriceTotal}</p>
                        </div>
                        <p style={{ color: 'green', marginTop: '4vh', fontWeight: 'bolder' }} >You will save ₹{discountedAmount} on this order</p>
                    </div>
                </div> : null}
                {localStorage.getItem('userInfo') ? <div className='checkOutHandler-box' >
                    <button className='checkOutHandler-btn' onClick={checkOutHandler}>Check out</button>
                </div> : null}
            </div>
        </div>
    )
}

export default CartPage