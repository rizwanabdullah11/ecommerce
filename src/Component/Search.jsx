import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ onCartClick, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAuthClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 p-2 shadow-sm">
      <div className="flex items-left justify-between max-w-7xl mx-auto">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Company Name
        </h1>

        <div className="flex border border-purple-200 rounded w-full mx-4 items-center">
          <input
            type="text"
            className="w-full px-4 py-2 text-purple-700 bg-white border-none focus:outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-purple-600"
          >
            Search
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer" onClick={onCartClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L6 21h12l-1-8M7 13h10M10 17h4"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>

          <div
            className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer"
            onClick={handleAuthClick}
          >
            Welcome! <span className="font-bold">Sign in | Register</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
