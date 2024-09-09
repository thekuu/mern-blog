import React from "react";
import logo from "../img/logo.png";
import {Link} from "react-router-dom"; 
const Footer = () => {
    return (
        <footer>
            <div className="footer-above">
                <img src={logo} alt=""/>
                <span>Made with love and <b>React.js</b>.</span>
            </div>
            <hr/>
            <div className="footer-bottom">
                <p className="footer-bottom-left">© 2024 Zekaryas Geremew. All rights reserved.</p>
                <div className="footer-bottom-right">
                    <p>Term of Services</p>
                    <p>Privacy Policy</p>
                    <p>Connect with me</p>
                </div>
            </div>
        </footer>
    )
 }
 export default Footer