import React, { useContext, useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContxt";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img className="h-10 w-auto rounded-full" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
              <Link key={cat} className="text-slate-500 hover:text-teal-600 transition-colors font-semibold uppercase tracking-wider text-xs" to={`/?cat=${cat}`}>
                {cat}
              </Link>
            ))}

            <div className="flex items-center space-x-4 border-l border-white/60 pl-8 ml-4">
              <span className="text-sm font-semibold text-gray-700">{currentUser?.username}</span>
              {currentUser ? (
                <>
                  <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">Logout</button>
                  <Link to="/write" className="px-4 py-2 rounded-full text-sm font-medium transition-all border border-teal-600/40 text-teal-700 hover:text-white hover:border-transparent" style={{ background: "rgba(0,128,128,0.12)", backdropFilter: "blur(8px)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#008080"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(0,128,128,0.12)"}
                  >
                    Write
                  </Link>
                </>
              ) : (
                <Link to="/login" className="px-6 py-2 rounded-full text-sm font-medium text-white transition-all shadow-md" style={{ background: "#008080" }}>
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-teal-600 focus:outline-none">
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
        <div className="md:hidden border-t border-white/40" style={{ background: "rgba(255,255,255,0.70)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
              <Link key={cat} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-teal-600 hover:bg-white/50 rounded-lg uppercase" to={`/?cat=${cat}`}>
                {cat}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-white/40">
              <div className="px-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">{currentUser?.username}</span>
                {currentUser ? (
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-sm text-red-500">Logout</button>
                ) : (
                  <Link onClick={() => setIsOpen(false)} className="text-teal-600 font-bold" to="/login">Login</Link>
                )}
              </div>
              {currentUser && (
                <Link onClick={() => setIsOpen(false)} to="/write" className="block mt-3 text-center text-white py-2 rounded-xl mx-3 font-medium" style={{ background: "#008080" }}>
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
