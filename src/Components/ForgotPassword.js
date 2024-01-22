import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Show the loading bar

    try {
      const response = await axios.post('https://localhost:2000/forgot-password', { email });

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        console.error('Unexpected server error', response.data);
        setMessage('Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('This email is not registered. Please enter a valid email.');
      console.log(error);
    } finally {
      setIsLoading(false); // Hide the loading bar after completion or error
    }
  };

  return (
    <div className="c-login-dive c-new-sign-up c-bg_pic">
      <div className='c-mobile_body'>
        <div>
          <div className="star-field">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>
        </div>
        <div className="c-login_des">
          {isLoading ? (
            <p style={{ color: 'white' }}>Loading...</p>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <div className="c-mobile_text">
                <h2>Forgot Password</h2>
              </div>
              <div className="c-input-box">
                <label htmlFor="email"><b>Email</b></label>
                <input type="email" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                {message && (
                  <p style={{ color: "red" }}>{message}</p>
                )}
                <button type="submit">Send Reset Link</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
