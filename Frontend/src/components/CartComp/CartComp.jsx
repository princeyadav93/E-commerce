import React, { useState } from 'react'
import './cartComp.css'
import axios from 'axios'
import { FiMinus } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'

function CartComp(props) {
  let [quantity, setquantity] = useState(props.quantity)

  let product = props.allProducts.find((e) => e._id === (props.prodouctId))

  let productId = props.prodouctId;

  const deleteCartItem = async () => {
    try {
      const res = await axios.delete("/api/v1/users/deletecartitem", { productId })
      console.log(res)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const increaseQuantity = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/users/addtocart", { productId })
    }
    catch (error) {
      console.log(error)
    }

  }

  const decreaseQuantity = async () => {
    try {
      if (props.quantity > 1) {
        const res = await axios.post("/api/v1/users/decreaseqty", { productId })
        console.log("Quantity decrease by 1")
      } else {
        console.log('delete cart item')
      }
    } catch (error) {
      console.log(error, "decrease quantity error")
    }
  }

  return (
    <>
      <div className='cart-container'>
        <div className='cart-image'>
          <Link to={`/product/${props.prodouctId}`}><img src={product.itemImage} alt="" /></Link>
        </div>
        <div className='cart-details'>
          <p className='cart-title'>{product.title}</p>
          <p className='cart-price'>{product.newPrice}</p>
          <div className='cart-quantity-icon'>
            <FiMinus className='minus-button' onClick={decreaseQuantity} /> <input type="number" className='cart-quantity' defaultValue={quantity} /><IoAddOutline className='plus-button' onClick={increaseQuantity} />
          </div>
          <button onClick={deleteCartItem}>delete</button>
        </div>
      </div>
    </>
  )
}

export default CartComp