import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets.js";
import {useNavigate} from 'react-router-dom'


const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Foodingo delivers fresh food fast, anytime and anywhere. Order easily through our app, track deliveries in real-time, and enjoy safe packaging with reliable service. Get exclusive offers, earn rewards, and explore multiple cuisines for every craving. We also provide catering, partner with restaurants, and support sustainable practices. Stay connected through our blog, newsletter, and social media for the latest updates.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+92-420-420420</li>
            <li>contact@foodingo.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ Foodingo.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
