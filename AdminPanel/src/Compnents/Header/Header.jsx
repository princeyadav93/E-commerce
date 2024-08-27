import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './header.css'

function Header() {
    const navigate = useNavigate();
    const userLogOut = async () => {
        const res = axios.post("/api/v1/admin/logout")
        localStorage.removeItem("adminInfo")
        navigate("/")
    }
    return (
        <>
            <nav className='nav-bar'>
                <ul>
                    <li><Link to='allproduct'>All-Product-List</Link></li>
                    <li><Link to='addproduct'>Add-Product</Link></li>
                </ul>
                <div className='login-btn-div'>
                    {localStorage.getItem("adminInfo") ? <button onClick={() => userLogOut()} className='admin-login-btn'>Logout</button> : <Link to="/adminlogin"><button className='admin-login-btn'>Login</button></Link>}
                </div>
            </nav>
        </>
    )
}

export default Header