
import { useState } from "react";
import Cookies from 'js-cookie'; 
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";
import Navbar from "../../components/navbar/Navbar";
import Footer from '../../components/footer/Footer'

export default function SignIn() {
    const home = `${config.frontHome}`

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        returnUrl: home
    })
    const [tokens, setTokens] = useState(null)
    const [errorDetail, setErrorDetail] = useState("")
    const [responseStatus, setResponseStatus] = useState(null)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${config.backApi}/users/login`, formData);
            setResponseStatus(response.status)
            if (response.status === 200) {
                window.location.href = home
                setTokens(response.data)
                Cookies.set('accessToken', response.data.token)
                Cookies.set('refreshToken', response.data.refreshToken)
            }
        } catch (error) {
            if (error.response.status === 400 && error.response.data.detail) {
                setErrorDetail(error.response.data.detail)
            } else {
                setErrorDetail("An unexpected error occurred.")
            }
            setResponseStatus(error.response.status)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    return (
        <>
            <Navbar />
            <div className="reg animate__animated animate__zoomInDown">
                <div className="main">
                    <div className="signIn">
                        <form onSubmit={handleLoginSubmit}>
                            <label className="form-label" htmlFor="chk" aria-hidden="true">
                                Sign In
                            </label>
                            {responseStatus === 400 && <p className="errorDetail">Error Detail: {errorDetail}</p>}
                            {/* {responseStatus === 200 && tokens && (
                                <div>
                                    <p>Tokens:</p>
                                    <p>Access Token: {tokens.token}</p>
                                    <p>Refresh Token: {tokens.refreshToken}</p>
                                </div>
                            )} */}
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <button className="form-button" type="submit">
                                Login
                            </button>
                            <p className="authNav">Don't have an account yet?<Link  to={'/signUp'}>Sign up</Link></p>
                            
                        </form>
                    </div>
                </div >
            </div>
            <Footer />
        </>
    )
}