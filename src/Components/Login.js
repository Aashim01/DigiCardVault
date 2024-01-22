import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mob from "../Assets/images/mobile-a.png"
import Cookies from "universal-cookie";



function Login() {

    axios.defaults.withCredentials = true;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setErrmsg] = useState('');
    const cookies = new Cookies();


    const redirect = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setErrmsg("Enter Full Details")
            return;
        } else {
            try {
                const response = await axios.post("http://localhost:2000/login", {
                    email: email,
                    password: password,
                })
                if (response.status === 200) {
                    setErrmsg(response.data.message)
                    window.localStorage.setItem("loginemail", email);
                    //cookies.set("access_token", response.data.token, { path: '/', secure: true, httpOnly: true });

                    if (response.data.message === "client") {

                        try {
                            const response = await axios.get("http://localhost:2000/fetchdata", {
                                params: {
                                    email: email,
                                }
                            });

                            if (response.status === 200) {
                                console.log("resp after fetch is",response)
                                if (!response.data[0]) { redirect("/profile"); }
                                else { redirect("/user"); }
                            }


                        } catch (error) {
                            setErrmsg("Something went wrong");
                            console.error("Error: ", error);
                        }
                        // redirect("/user");
                    }
                    else if (response.data.message === "admin") {
                        redirect("/admin")
                    }

                    // redirect("/profile");
                }

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrmsg(error.response.data.message);
                } else {
                    setErrmsg("Something went wrong");
                    console.error("Error: ", error);
                }
            }
        }
    }

    return (
        <div className=" c-login-dive c-new-sign-up c-bg_pic">
            <div class="c-login-dive-row">
                <div className="c-login-dive-row-col-5">
                    <div>
                        <img src={mob} alt="" />
                    </div>
                </div>
                <div className="c-login-dive-row-col-7">
                    <div className='c-mobile_body'>
                        <div>
                            <div className="star-field">
                                <div className="layer"></div>
                                <div className="layer"></div>
                                <div className="layer"></div>
                            </div>
                        </div>
                        <div className="c-login_des">
                            <form>
                                <div className="c-mobile_text">
                                    <h2>Welcome Back</h2>
                                    <p>Please Enter Your Email and Password</p>
                                </div>
                                <div className="c-input-box">
                                    <label htmlFor="email"><b>Email</b></label>
                                    <input type="email" placeholder="Enter Email" name="email" onChange={(e) => (setEmail(e.target.value))} required />

                                    <label htmlFor="psw"><b>Password</b></label>
                                    <input type="password" placeholder="Enter Password" name="psw" onChange={(e) => (setPassword(e.target.value))} required />
                                    {errmsg && (
                                        <p style={{ color: "red" }}>
                                            {setErrmsg}
                                        </p>
                                    )}
                                    {errmsg && (
                                        <p style={{ color: "red" }}>{errmsg}</p>
                                    )}
                                    <button onClick={handlelogin}>Login</button>
                                </div>
                                <div className="c-forget-pas">
                                    <div >
                                        <span className="psw"><Link to="/forgotpassword">Forgot password?</Link></span>
                                    </div>
                                    <div className="c-sign-up">
                                        <span className='' >
                                            <Link to="/signup" className=''>
                                                Sign Up
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
