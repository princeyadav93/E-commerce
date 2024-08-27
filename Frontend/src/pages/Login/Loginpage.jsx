import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, NavLink, Link } from "react-router-dom"
import "./login.css"

function Loginpage() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/users/login", { email, password })
            localStorage.setItem("userInfo", JSON.stringify(response.data))
            navigate("/")
        } catch (error) {
            seterror("Invalid email or password")
            console.log("run your backend server")
        }
    }

    return (
        <div className='container'>
            <div className='form-box'>
                <h1>User Login form</h1>
                {error && <p>{error}</p>}
                <form className="form-main" onSubmit={handleSubmit} method='post'>
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
                    <p>don't have an account? <Link to="/signup"><button>click here</button></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Loginpage