import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const ProfilePortal = () => {
    const navigate = useNavigate();
    const [showPortal, setShowPortal] = useState(false);
  
    return (
      <div className="relative">
      <img src='' alt="Profile" className="w-10 h-10 rounded-full" onClick={()=>setShowPortal(true)} />
        {showPortal && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-blue-100">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-500"
               
                >
                  Profile
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-blue-100">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-500"
               
                >
                  Dashboard
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-blue-100">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-500"
               
                >
                  My Donations
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-blue-100">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-500"
              
                >
                  Requests
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-blue-100">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-500"
               
                >
                  Admin Panel
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-blue-100">
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-blue-500"
              
                >
                  Signup
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-blue-100">
              
              </li>
              <li className="px-4 py-2 hover:bg-blue-100 flex items-center">
             
                <button
                  onClick={()=>navigate('/login')}
                  className="ml-2 text-gray-700 hover:text-blue-500"
              
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default ProfilePortal;