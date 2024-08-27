import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './loginsignup.css'

function AdminSignup() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/admin/register", { name, email, password })
            localStorage.setItem("registerUser", JSON.stringify(response.data))
            console.log(name, email, password)
            console.log(response.data)
            navigate("login")
        } catch (error) {
            alert("user with this email is already exists")
            console.log("run your backend server")
        }
    }
    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Admin Sign-Up form</h1>
                <form className="form-main" onSubmit={handleSubmit}>
                    <div className='details'>
                        <div>
                            <label htmlFor='Name'>Name:</label>
                            <input type="text"
                                id='Name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                                placeholder='enter your name'
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email:</label>
                            <input type="email"
                                id='email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                                placeholder='enter your email'
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>password:</label>
                            <input type="password"
                                id='password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                required
                                placeholder='enter your password'
                            />
                        </div>
                    </div>
                    <div className='signup'>
                        <button type='submit'>Sign-up</button>
                    </div>
                </form>
                <div className='sign-up'>
                    <p>already have an account? <Link to="/adminlogin"><button>click here</button></Link></p>
                </div>
            </div>
        </div>
    )
}

export default AdminSignup