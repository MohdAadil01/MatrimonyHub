import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePortal from "./ProfilePortal";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="bg-white border-b-2 border-gray-100 py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img src="/path/to/logo.png" alt="Logo" className="h-10" />
        </Link>
      </div>

      {/* Services */}
      <div className="hidden md:flex space-x-8">
        <Link
          to="/service1"
          className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all"
        >
          Our Services
        </Link>
        <Link
          to="/service2"
          className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all"
        >
          Meet Our Vendors
        </Link>
        <Link
          to="/service3"
          className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all"
        >
          About us
        </Link>
        <Link
          to="/service4"
          className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-100 transition-all"
        >
          Contact us
        </Link>
      </div>

      {/* User Profile or Login */}
      <div className="flex items-center space-x-10">
        {isLoggedIn ? (
          <>
            <Link
              to="/join-us"
              className="px-5 py-3 rounded-xl text-sm font-medium bg-violet-600 text-white border border-violet-600 hover:bg-violet-700 transition-all"
            >
              Join Us As Vendor
            </Link>
            <ProfilePortal />
          </>
        ) : (
          <Link
            to="/login"
            className="px-5 py-3 rounded-xl text-sm font-medium bg-indigo-600 text-white border border-indigo-600 hover:bg-indigo-700 transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
