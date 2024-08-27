import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './index.css'
import axios from 'axios';
import Logo from '../../assets/Banners/Logo2.jpeg'
import { useProductContext } from '../../context/ProductContext.jsx'
import Logoutbtn from '../../pages/Login/Logoutbtn.jsx';

function Header() {
    const navigate = useNavigate();
    const { cartCount, setcartCount } = useProductContext();

    const userLogOut = async () => {
        const res = axios.post("/api/v1/users/logout")
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    useEffect(() => {
        if (!localStorage.getItem('userInfo')) {
            setcartCount(0)
        }
    }, [userLogOut])

    return (
        <header>
            <nav>
                <div className='nav-left'>
                    <img src={Logo} alt="This is an image" />
                </div>
                <div className='nav-middle'>
                    <ul>
                        <li><NavLink>Home </NavLink></li>
                        <li><NavLink className='navLink' to="/men">Men</NavLink></li>
                        <li><NavLink className='navLink' to="/women">Women</NavLink></li>
                        <li><NavLink className='navLink' to="/kids">Kids</NavLink></li>
                    </ul>
                </div>
                <div className='nav-right'>
                    {localStorage.getItem("userInfo") ? <Logoutbtn /> : <NavLink to="/login"><button className='logIn-btn'>Login</button></NavLink>}
                    <div className='cart'>
                        <Link to="/Cartpage"><i className="fa-solid fa-cart-shopping"></i></Link>
                        <p>{cartCount}</p>
                    </div>
                </div>
                {/* <button onClick={() => userLogOut()} className='logIn-btn'>Logout</button>  */}
            </nav>
        </header>
    )
}

export default Header