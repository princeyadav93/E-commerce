import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, NavLink, Link } from "react-router-dom"
import './loginsignup.css'

function AdminLogin() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/admin/login", { email, password })
            localStorage.setItem("adminInfo", JSON.stringify(response.data))
            navigate("/")
        } catch (err) {
            alert("Invalid email or password")
            console.log("run your backend server")
            console.log(err)
        }
    }


    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Admin Login form</h1>
                <form className="form-main" onSubmit={handleSubmit}>
                    <div className='details'>
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
                    <div className='login'>
                        <button className='login-btn' type='submit'>login</button>
                    </div>
                </form>
                <div className='sign-up'>
                    <p>don't have an account? <Link to="/adminsignup"><button>click here</button></Link></p>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin