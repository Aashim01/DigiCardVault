import React from 'react';
import Xava from "../Assets/images/Xava-logo-final-file-1q 1.png";
import playstore from "../Assets/images/google-play-store.webp";
import appstore from "../Assets/images/app-store.webp";

const Footer = () => {
    return (
        <footer className="c-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="c-footer-one">
                            <div className="c-footer-one-logo">
                                <a href="http://"><img src={Xava} alt="" /></a>
                                <p>Join the revolution in business networking. Embrace the simplicity, convenience, and eco-friendliness of DigiCardVault. Sign up now and create your own digital business card!</p>
                            </div>
                            <div className="c-footer-one-button">
                                <a href="http://"><img src={playstore} alt="" /></a>
                                <a href="http://"><img src={appstore} alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div className='f-contact'>
                        <div className="col-md-4">
                            <div className="c-footer-two">
                                <h3>Our Links</h3>
                                <ul>
                                    <li><a href="http://">Home</a></li>
                                    <li><a href="http://">Services</a></li>
                                    <li><a href="http://">About Us</a></li>
                                    <li><a href="http://">Features</a></li>
                                    <li><a href="http://">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="c-footer-three">
                                <h3>Contact Us</h3>
                                <ul className="list-style-one">
                                    <li><i className="fas fa-envelope-open"></i> <a href="mailto:Info@webmail.com">Info@webmail.com</a></li>
                                    <li><i className="fas fa-phone"></i> <a href="callto:6845550102490">684 555-0102 490</a></li>
                                    <li><i className="fas fa-map-marked-alt"></i> 6391 Elgin St. Celina, NYC 10299</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
