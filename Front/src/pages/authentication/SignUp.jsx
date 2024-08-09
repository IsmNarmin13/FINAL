import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";
import Navbar from "../../components/navbar/Navbar";
import Footer from '../../components/footer/Footer'
export default function SignUp() {
    const home = `${config.frontHome}`
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        returnUrl: home
    })
    const [responseStatus, setResponseStatus] = useState(null)
    const [errorDetail, setErrorDetail] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${config.backApi}/users/register`, formData)
            setResponseStatus(response.status)
            if (response.status === 200) {

            }
        } catch (error) {
            if (error.response.status === 400 && error.response.data.detail) {
                setErrorDetail(error.response.data.detail)
            } else {
                setErrorDetail("An unexpected error occurred.")
            }
            setResponseStatus(error.response.status)
        }
    };

   

    return (
        <>
            <Navbar />
            <div className="reg animate__animated animate__zoomInDown">
                <div className="main">
                    <input
                        className="form-input"
                        type="checkbox"
                        id="chk"
                        aria-hidden="true"
                    />
                    <div className="signup">
                        <form onSubmit={handleRegisterSubmit}>
                            <label className="form-label" htmlFor="chk" aria-hidden="true">
                                Sign up
                            </label>
                            {responseStatus === 400 && <p className="errorDetail">Error Detail: {errorDetail}</p>}
                            {responseStatus === 500 && <p>Ошибка c БД</p>}
                            {responseStatus === 200 && <p>Регистрация прошла успешно. Проверьте свою почту для верификации почты</p>}
                            <input
                                className="form-input"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                required=""
                                onChange={handleChange}
                            ></input>
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
                            <input
                                className="form-input"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <button className="form-button" type="submit">
                                Sign up
                            </button>
                            <p className="authNav">Already have an account?<Link  to={'/signIn'}>Sign in</Link></p>
                        </form>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    );
}

