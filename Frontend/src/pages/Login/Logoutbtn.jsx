import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./logout.css"

function Logoutbtn() {
    const navigate = useNavigate();
    const [userInfo, setuserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [isOpen, setisOpen] = useState(false)

    const userLogOut = async () => {
        const res = axios.post("/api/v1/users/logout")
        localStorage.removeItem("userInfo")
        navigate("/")
    }
    console.log(userInfo)
    const myFunction = () => {
        setisOpen(!isOpen)
    }
    const closeDropDwn = () => {
        setisOpen(false);
    }
    return (
        <div className="dropdown">
            <button onClick={myFunction} className="dropbtn"><i class="fa-regular fa-user"></i></button>
            <div className='dropdown-content' style={{ display: isOpen ? 'block' : 'none' }}>
                <li>{(userInfo.data.user.name)}</li>
                <li>{userInfo.data.user.email}</li>
                <li id='logoutbtn'><button className='logoutbtn' onClick={() => userLogOut()}>Logout</button></li>
                <li id='logoutbtn'><button className='closebtn' onClick={closeDropDwn}><i class="fa-regular fa-circle-xmark"></i></button></li>
            </div>
        </div>
    )
}

export default Logoutbtn