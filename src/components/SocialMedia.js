import React from 'react'
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

const SocialMedia = () => {
    return (
        <div id="social-app-container">
            <div className="icons centered"><a href="https://instagram.com"><FaInstagram /></a></div>
            <div className="icons centered"><a href="https://twitter.com"><FaTwitter /></a></div>
            <div className="icons centered"><a href="https://facebook.com"><FaFacebookF /></a></div>
            <div className="icons centered"><a href="https://linkedin.com"><FaLinkedinIn /></a></div>
            <div className="icons centered"><a href="https://mail.google.com"><SiGmail /></a></div>
        </div>
    )
}

export default SocialMedia
