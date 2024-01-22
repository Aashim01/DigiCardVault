import React, { useEffect, useState, useRef } from 'react';
import facebookIcon from '../Assets/images/facebook.png';
import instagramIcon from '../Assets/images/instagram.png';
import linkedinIcon from '../Assets/images/linkedin.png';
import axios from 'axios';
import copy from 'clipboard-copy';
import { saveAs } from 'file-saver';
import { FcPhoneAndroid } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";



function Card() {
    const [responsedata, setResponsedata] = useState([]);
    const [copyMessage, setCopyMessage] = useState('');
    const [currentURL, setCurrentURL] = useState('');
    const cardContainerRef = useRef(null);

    const pathSegments = window.location.hash.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const trimmedSegment = lastSegment.trim();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:2000/fetch", {
                    params: {
                        user_name: trimmedSegment
                    }
                })
                if (response.status === 200) {
                    setResponsedata(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log(error);
                } else {
                    console.error("Error: ", error);
                }
            }
        };

        fetchData();
    }, [trimmedSegment]);

    const handleDownload = () => {
        if (responsedata.length === 0) {
            // Handle the case when responsedata is empty, e.g., show an error message
            console.error("No data available to download.");
            return;
        }
        const imageBaseUrl = window.location.origin + '/Assets/profile/';
        const imageFileName = responsedata[0].Profile_Pic;
        // Generate vCard data with proper formatting
        const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${responsedata[0].Name}
ORG:${responsedata[0].Company}
TEL;TYPE=CELL:${responsedata[0].Number}
EMAIL:${responsedata[0].Email}
END:VCARD`;

        // Convert the vCard data to a Blob
        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });

        // Dynamically generate the filename based on the user's name
        const fileName = `${responsedata[0].Name}.vcf`;

        // Use FileSaver.js or any other method to save the Blob as a file
        saveAs(blob, fileName);
    };

    // PHOTO;VALUE=URL:${imageBaseUrl}${imageFileName}


    const handleCopyLink = () => {
        const confirmShare = window.confirm('Where do you want to share the link?');
        if (confirmShare) {
            navigator.share({
                title: 'Share Profile Link',
                text: 'Check out this profile',
                url: currentURL + "/" + window.location.hash,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error));
        }
    };

    return (
        <div className="c-mobile_body c-mobile_body_home c-laptop_body">
            <div className='c-card-btn'>
                <div className="c-share-btn">
                    <button onClick={handleCopyLink} type="button" class="btn btn-dark btn-rounded" data-mdb-ripple-init>Share Link</button>
                    {copyMessage && <span className="copy-message">{copyMessage}</span>}
                </div>
                <div className="c-download-btn">
                    <button onClick={handleDownload} type="button" class="btn btn-dark btn-rounded" data-mdb-ripple-init>Add To Contact</button>
                </div>
            </div>
            {responsedata?.map((responsedata) => (

                <div key={responsedata.id}>

                    <section id="card-container" ref={cardContainerRef}>
                        <div className="c-profile-img">
                            <img src={`/Assets/profile/${responsedata.Profile_Pic}`} alt="" />
                        </div>
                        <div className="c-bio_user">
                            <h2>{responsedata.Name}</h2>
                            <a href={responsedata.Company}>{responsedata.Company}</a>
                            <p>{responsedata.Title}</p>
                        </div>

                        <div className="c-social_list">
                            <ul>
                                <li>
                                    <a href={`tel:${responsedata.Number}`}>
                                        <p className="c-social_list_item">
                                            <span className="c-social_list_img">
                                                <FcPhoneAndroid />
                                            </span>
                                            <span className="c-social_list_name">
                                                <span className="c-social_list_heading">
                                                    {responsedata.Number}
                                                </span>
                                            </span>
                                        </p>
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${responsedata.Email}`}>
                                        <p className="c-social_list_item">
                                            <span className="c-social_list_img">
                                                <MdEmail />
                                            </span>
                                            <span className="c-social_list_name">
                                                <span className="c-social_list_heading">
                                                    {responsedata.Email}
                                                </span>
                                            </span>
                                        </p>
                                    </a>
                                </li>
                                <li>
                                    <a href={responsedata.Website_Link} target='_blank'>
                                        <p className="c-social_list_item">
                                            <span className="c-social_list_img">
                                                <TbWorldWww />
                                            </span>
                                            <span className="c-social_list_name">
                                                <span className="c-social_list_heading">
                                                    {responsedata.Website_Link}
                                                </span>
                                            </span>
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="c-contact_d">
                            <ul>
                                <li>
                                    <a href={responsedata.Linkdin_Link} target='_blank'>
                                        <span className="c-social_list_img">
                                            <img src={linkedinIcon} alt="" />
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href={responsedata.Facebook_Link} target='_blank'>
                                        <span className="c-social_list_img">
                                            <img src={facebookIcon} alt="" />
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href={responsedata.Instagram_Link} target='_blank'>
                                        <span className="c-social_list_img">
                                            <img src={instagramIcon} alt="" />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            ))}
        </div>
    );
}

export default Card;