import React, { useContext, useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContxt";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img className="h-10 w-auto rounded-full" src={logo} alt="logo" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
              <Link key={cat} className="text-gray-600 hover:text-teal transition-colors font-medium uppercase text-sm" to={`/?cat=${cat}`}>
                {cat}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l pl-8 ml-4">
              <span className="text-sm font-semibold text-gray-700">{currentUser?.username}</span>
              {currentUser ? (
                <>
                  <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">Logout</button>
                  <Link to="/write" className="bg-teal-light text-teal-dark px-4 py-2 rounded-full text-sm font-medium hover:bg-teal hover:text-white transition-all">
                    Write
                  </Link>
                </>
              ) : (
                <Link className="bg-teal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-dark transition-all" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-teal focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
              <Link key={cat} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-teal hover:bg-gray-50 uppercase" to={`/?cat=${cat}`}>
                {cat}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-100">
              <div className="px-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">{currentUser?.username}</span>
                {currentUser ? (
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-sm text-red-500">Logout</button>
                ) : (
                  <Link onClick={() => setIsOpen(false)} className="text-teal font-bold" to="/login">Login</Link>
                )}
              </div>
              {currentUser && (
                <Link onClick={() => setIsOpen(false)} to="/write" className="block mt-3 text-center bg-teal text-white py-2 rounded-lg mx-3">
                  Write a Post
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
