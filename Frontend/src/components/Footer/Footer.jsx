import React from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

function Footer() {
    return (
        <>
            <div className='footer-container'>
                <div className='social-icon'>
                    <ul>
                        <li><i className="fa-brands fa-facebook"></i></li>
                        <li><i className="fa-brands fa-square-instagram"></i></li>
                        <li><i className="fa-brands fa-twitter"></i></li>
                        <li><i className="fa-brands fa-youtube"></i></li>
                        <li><i className="fa-brands fa-google-plus-g"></i></li>
                    </ul>
                </div>
                <div className='link-tags'>
                    <ul>
                        <li><NavLink>Home </NavLink></li>
                        <li><NavLink to="/men">Men</NavLink></li>
                        <li><NavLink to="/women">Women</NavLink></li>
                        <li><NavLink to="/kids">Kids</NavLink></li>
                    </ul>
                </div>
                <div className='copy-right'>
                    <p>Copyright &copy;2024 : Made by Prince</p>
                </div>
            </div>
        </>
    )
}

export default Footer