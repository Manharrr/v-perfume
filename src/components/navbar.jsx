import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false); //  mobile

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((t, i) => t + (i.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleProtectedNav = (path, msg) => {
    if (!user) {
      toast.error(msg);
      navigate("/login");
      return;
    }
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="w-full bg-black text-white px-6 md:px-12 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">

        
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          V-PERFUMÉ
        </h1>

       
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li onClick={() => navigate("/")} className="hover:text-gray-300 cursor-pointer">Home</li>
          <li onClick={() => navigate("/product")} className="hover:text-gray-300 cursor-pointer">Shop</li>
          <li onClick={() => navigate("/about")} className="hover:text-gray-300 cursor-pointer">About</li>
        </ul>

        
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm"> {user.username || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="border px-4 py-2 rounded"
            >
              Sign Up
            </button>
          )}

        
          <button onClick={() => handleProtectedNav("/cart", "Login to view cart")} className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => handleProtectedNav("/wishlist", "Login to view wishlist")} className="relative">
            ❤️
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>

     {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden mt-4 bg-black border-t border-gray-700">
          <ul className="flex flex-col gap-4 p-4 text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer">Home</li>
            <li onClick={() => navigate("/product")} className="cursor-pointer">Shop</li>
            <li onClick={() => navigate("/about")} className="cursor-pointer">About</li>

            <li onClick={() => handleProtectedNav("/cart", "Login to view cart")} className="cursor-pointer">
              Cart ({cartCount})
            </li>
            <li onClick={() => handleProtectedNav("/wishlist", "Login to view wishlist")} className="cursor-pointer">
              Wishlist ({wishlistCount})
            </li>

            {user ? (
              <li onClick={handleLogout} className="text-red-500 cursor-pointer">
                Logout
              </li>
            ) : (
              <li onClick={() => navigate("/register")} className="cursor-pointer">
                Sign Up
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
