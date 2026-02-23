import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Link to="/">
              <img className="h-12 w-12 rounded-full brightness-110" src={logo} alt="logo" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              A modern space for sharing thoughts, stories, and ideas. Built with passion using the MERN stack.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/?cat=art" className="hover:text-teal transition-colors">Art</Link></li>
              <li><Link to="/?cat=science" className="hover:text-teal transition-colors">Science</Link></li>
              <li><Link to="/?cat=technology" className="hover:text-teal transition-colors">Technology</Link></li>
              <li><Link to="/?cat=food" className="hover:text-teal transition-colors">Food</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Connect</h3>
            <div className="flex space-x-4">
              <span className="bg-gray-800 p-2 rounded-full hover:bg-teal transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </span>
            </div>
            <p className="mt-6 text-sm">© {new Date().getFullYear()} MERN Blog. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
