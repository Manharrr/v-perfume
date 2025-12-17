import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Use context hooks to get cart and wishlist data
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Calculate counts from context
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) {
      toast.error("Please login to view cart");
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!user) {
      toast.error("Please login to view wishlist");
      navigate("/login");
      return;
    }
    navigate("/wishlist");
  };

  return (
    <nav className="w-full bg-black text-white px-6 md:px-12 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <h1 
        className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer"
        onClick={() => navigate("/")}
      >
        V-PERFUMÉ
      </h1>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-sm font-medium">
        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </li>

        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/product")}
        >
          Shop
        </li>
        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/about")}
        >
          About Us
        </li>
        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/men")}
        >
          Men
        </li>
        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/women")}
        >
          Women
        </li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-6 text-sm">
        {user ? (
          <>
            {/* User Info */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="font-medium">
                  {user.username?.charAt(0).toUpperCase() || 
                   user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium">Hi, {user.username || user.email.split('@')[0]}</p>
              </div>
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Only Sign Up (Register) Button */}
            <button 
              onClick={() => navigate("/register")}
              className="bg-white-600 hover:bg-white-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </>
        )}
        
        {/* Cart Button */}
        <button 
          onClick={handleCartClick}
          className="relative hover:text-gray-300 transition duration-300 flex items-center gap-2"
        >
          <span className="text-xl">🛒</span>
          <span className="hidden md:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
        
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className="relative hover:text-gray-300 transition duration-300 flex items-center gap-2"
        >
          <span className="text-xl">❤️</span>
          <span className="hidden md:inline">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount > 99 ? '99+' : wishlistCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

































