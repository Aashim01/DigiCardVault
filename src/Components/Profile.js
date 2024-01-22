import React from 'react';
import user from "../Assets/images/user.jpg";
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';



function Profile() {
    axios.defaults.withCredentials = true;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginemail = localStorage.getItem("loginemail");
    const cookies = new Cookies();
    const [username, setUsername] = useState();
    const [fullname, setFullname] = useState();
    const [companyname, setCompanyname] = useState();
    const [title, setTitle] = useState();
    const [website, setWebsite] = useState();
    const [number, setNumber] = useState();
    const [email, setEmail] = useState();
    const [linkdin, setLinkdin] = useState();
    const [facebook, setFacebook] = useState();
    const [instagram, setInstagram] = useState();
    const [errmsg, setErrmsg] = useState();
    const [loginid, setLoginid] = useState();
    const [profileImage, setProfileImage] = useState(user);
    const redirect = useNavigate();

    const handleUsernameChange = (e) => {
        const enteredUsername = e.target.value.trim();

        // Check if the entered username is within the limit and doesn't contain spaces
        if (enteredUsername.length <= 8 && !/\s/.test(enteredUsername)) {
            setUsername(enteredUsername);
            setErrmsg('');
        } else {
            setErrmsg('Enter a valid username (up to 8 characters without spaces)');
        }
    };

    const isValidURL = (url) => {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    };

    const handleSocialMediaChange = (e, socialMedia) => {
        const enteredURL = e.target.value.trim();
        if (isValidURL(enteredURL)) {
            switch (socialMedia) {
                case 'website':
                    setWebsite(enteredURL);
                    break;
                case 'linkdin':
                    setLinkdin(enteredURL);
                    break;
                case 'facebook':
                    setFacebook(enteredURL);
                    break;
                case 'instagram':
                    setInstagram(enteredURL);
                    break;
                default:
                    break;
            }
            setErrmsg('');
        } else {
            setErrmsg(`Enter a valid ${socialMedia === 'linkdin' ? 'LinkedIn' : socialMedia} URL`);
        }
    };


    const handleImageChange = (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        const allowedExtensions = /\.(jpg|jpeg|png)$/i;

        if (file && allowedExtensions.test(file.name)) {
            // Valid image selected
            console.log('Valid image selected:', file);

            // Display the selected image
            const profileImageElement = document.getElementById('imag');

            // Clear previous content
            profileImageElement.innerHTML = '';

            // Create an image element and set its source
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);

            // Append the image element to the container
            profileImageElement.appendChild(img);

            // Update state with the selected image URL
            console.log('Image:', file);
            setProfileImage(file);
        } else {
            // Invalid file type
            alert('Invalid file type. Please select an image file.');
            event.target.value = ''; // Clear the file input
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handle Submit ")

        const file = document.getElementById('getpic').files[0];

        if (
            !file ||
            !username ||
            !fullname ||
            !companyname ||
            !title ||
            !website ||
            !number ||
            !email ||
            !linkdin ||
            !facebook ||
            !instagram
        ) {
            setErrmsg("Enter Full Details");
            return;
        }
        else {
            try {
                console.log('Profile Image:', file);
                const formData = new FormData();
                formData.append('username', username);
                formData.append('profileImage', file);
                formData.append('fullname', fullname);
                formData.append('companyname', companyname);
                formData.append('title', title);
                formData.append('website', website);
                formData.append('number', number);
                formData.append('email', email);
                formData.append('linkdin', linkdin);
                formData.append('facebook', facebook);
                formData.append('instagram', instagram);
                formData.append('loginemail', loginemail);
                console.log("image is ", file)
                const response = await axios.post("http://localhost:2000/savedata",
                    formData
                );

                if (response.status === 200) {

                    setErrmsg("Data Submitted Successfully");
                    console.log("Data Submitted Successfully");
                    const user_name = username.split(' ')[0];
                    const Website = `digicardvault.com/virtualcard/${user_name}`;
                    redirect("/user");
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
    };


    const handleLogout = () => {
        // Clear the stored token from cookies
        cookies.remove("token");
        window.localStorage.removeItem("loginemail");
        // Redirect to the login page or any other desired page
        redirect("/login");
    };

    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            redirect("/signup");
        }
    }, []);

    return (

        <div className="c-login-dive c-new-sign-up" >
            <div className='c-mobile_body c-profile_page'>
                <div>
                    <div className="star-field">
                        <div className="layer"></div>
                        <div className="layer"></div>
                        <div className="layer"></div>
                    </div>
                </div>
                <div>
                    <button className='c-btn-logout' onClick={handleLogout}>LogOut</button>
                    <div className="c-login_des c-profile_des">
                        <div>
                            <input type='hidden' value={loginid} />
                            <div className="c-mobile_text">
                                <h2>Welcome</h2>
                                <p>Please Enter Your Details</p>
                            </div>
                            <div className="c-input-box">
                                <form onSubmit={(e) => e.preventDefault()} method='post' encType='multipart/form-data'>
                                    <div id="profile-upload">
                                        <div className="hvr-profile-img">
                                            <input
                                                accept="image/*"
                                                type="file"
                                                name="logo"
                                                id="getpic"
                                                className="upload w180"
                                                title="Dimensions 180 X 180"
                                                onChange={(e) => {
                                                    handleImageChange(e);
                                                    setProfileImage(e.target.files);
                                                }}
                                                required
                                            />
                                            <i className="fa fa-camera"></i>
                                        </div>
                                        <div id="imag" >
                                            <img src={profileImage} />
                                        </div>
                                    </div>
                                    <div className='c-profile_from'>
                                        <div className='c-profile_input'>
                                            <label htmlFor="username"><b>User Name</b></label>
                                            <input type="text" placeholder="Enter User Name" name="username"
                                                // onChange={(e) => { setUsername(e.target.value) }}
                                                onChange={handleUsernameChange}
                                                required />
                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="uname"><b>Full Name</b></label>
                                            <input type="text" placeholder="Enter Full Name" name="fullname" onChange={(e) => { setFullname(e.target.value) }} required />
                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="uname"><b>Company Name</b></label>
                                            <input type="text" placeholder="Enter Company Name" name="company" onChange={(e) => { setCompanyname(e.target.value) }} required />
                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="uname"><b>Title</b></label>
                                            <input type="text" placeholder="Enter Title" name="title" onChange={(e) => { setTitle(e.target.value) }} required />
                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="website"><b>Website URL</b></label>
                                            <input type="url" placeholder="Enter Website URL" name="website" onChange={(e) => handleSocialMediaChange(e, 'website')} required />

                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="uname"><b>Phone Number</b></label>
                                            <input type="tel" placeholder="Enter Phone Number With Country Code" name="number" onChange={(e) => { setNumber(e.target.value) }} required />
                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="uname"><b>Email</b></label>
                                            <input type="email" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} required />

                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="linkdin"><b>LinkedIn URL</b></label>
                                            <input type="url" placeholder="Enter LinkedIn URL" name="linkdin" onChange={(e) => handleSocialMediaChange(e, 'linkdin')} required />

                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="facebook"><b>Facebok URL</b></label>
                                            <input type="url" placeholder="Enter Facebok URL" name="facebook" onChange={(e) => handleSocialMediaChange(e, 'facebook')} required />
                                        </div>
                                        <div className='c-profile_input'>
                                            <label htmlFor="instagram"><b>Instagram URL</b></label>
                                            <input type="url" placeholder="Enter Instagram URL" name="instagram" onChange={(e) => handleSocialMediaChange(e, 'instagram')} required />
                                        </div>
                                    </div>


                                    {errmsg && (
                                        <p style={{ color: "red" }}>
                                            {<p style={{ color: "red" }}>{setErrmsg}</p>
                                            }
                                        </p>
                                    )}
                                    {errmsg && (
                                        <p style={{ color: "red" }}>{errmsg}</p>
                                    )}
                                    <button type="button" onClick={handleSubmit} >
                                        Save & Generate QR Code
                                    </button>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div >

        </div>
    );
}

export default Profile;

