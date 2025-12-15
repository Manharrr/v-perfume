// // src/components/navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/home" className="text-xl font-bold">PerfumeShop</Link>

//         <div className="flex items-center gap-4">
//           <Link to="/home#showcase" className="text-gray-600 hover:text-gray-900">Shop</Link>
//           <Link to="/home#add" className="text-gray-600 hover:text-gray-900">Add Perfume</Link>

//           {user ? (
//             <>
//               <span className="text-sm text-gray-700">Hi, {user.username || user.email}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded">Login</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



// import React from "react";
// import { useNavigate } from "react-router-dom";


// function Navbar() {
//   const navigate=useNavigate();
//   return (
//     <nav className="w-full bg-black text-white px-8 py-4 flex items-center justify-between">
//       {/* Logo */}
//       <h1 className="text-2xl font-bold tracking-wide">V-PERFUMÉ</h1>

//       {/* Menu */}
//       <ul className="hidden md:flex gap-6 text-sm font-medium">
//         <li className="hover:text-gray-300 cursor-pointer" onClick={()=>navigate("/")}>Home</li>
//         <li  className="hover:text-gray-300 cursor-pointer" onClick={()=>navigate("/product")}>Shop</li>
//         {/* <li className="hover:text-gray-300 cursor-pointer">Unisex</li> */}
//         <li className="hover:text-gray-300 cursor-pointer">Exclusive</li>
//         <li className="hover:text-gray-300 cursor-pointer">About us</li>
//         {/* <li className="hover:text-gray-300 cursor-pointer">Home Fragrance</li>
//         <li className="hover:text-gray-300 cursor-pointer">Mini Perfumes</li>
//         <li className="hover:text-gray-300 cursor-pointer">New Arrivals</li> */}
//       </ul>

//       {/* Actions */}
//       <div className="flex gap-4 text-sm">
//         <button className="hover:text-gray-300" onClick={()=>navigate("/Login")}>Login</button>
//         <button className="hover:text-gray-300" onClick={()=>navigate("/Cart")}>Cart</button>
//         <button className="hover:text-gray-300" onClick={()=>navigate("/Wishlist")}>wishlistt</button>
//       </div>
//     </nav>
//   );
// }

// // export default Navbar;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth";
// import toast from "react-hot-toast";

// function Navbar() {
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
  
//   // Get auth context if available
//   const authContext = React.useContext(useAuth?.Context || React.createContext());
//   const user = authContext?.user;

//   useEffect(() => {
//     // Load cart and wishlist counts from localStorage
//     const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
//     const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
    
//     const totalCartItems = savedCart.reduce((total, item) => total + (item.quantity || 1), 0);
//     setCartCount(totalCartItems);
//     setWishlistCount(savedWishlist.length);
//   }, []);

//   // Listen for cart/wishlist updates
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
//       const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
      
//       const totalCartItems = savedCart.reduce((total, item) => total + (item.quantity || 1), 0);
//       setCartCount(totalCartItems);
//       setWishlistCount(savedWishlist.length);
//     };

//     window.addEventListener('storage', handleStorageChange);
//     // Also check on cart/wishlist page navigation
//     const interval = setInterval(handleStorageChange, 1000);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleCartClick = () => {
//     navigate("/cart");
//   };

//   const handleWishlistClick = () => {
//     navigate("/wishlist");
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const handleLogout = () => {
//     // Clear user data from localStorage
//     localStorage.removeItem('user');
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   // Check if user is logged in
//   const isLoggedIn = localStorage.getItem('user') || user;

//   return (
//     <nav className="w-full bg-black text-white px-6 md:px-12 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
//       {/* Logo */}
//       <h1 
//         className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         V-PERFUMÉ
//       </h1>

//       {/* Menu */}
//       <ul className="hidden md:flex gap-8 text-sm font-medium">
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/")}
//         >
//           Home
//         </li>
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/product")}
//         >
//           Shop
//         </li>
//         <li className="hover:text-gray-300 cursor-pointer transition duration-300">
//           Exclusive
//         </li>
//         <li className="hover:text-gray-300 cursor-pointer transition duration-300">
//           About us
//         </li>
//       </ul>

//       {/* Actions */}
//       <div className="flex items-center gap-6 text-sm">
//         {/* Login/Logout */}
//         {isLoggedIn ? (
//           <>
//             <div className="hidden md:flex items-center gap-3">
//               <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
//                 <span className="font-medium">
//                   {user?.username?.charAt(0).toUpperCase() || 
//                    user?.email?.charAt(0).toUpperCase() || 
//                    "U"}
//                 </span>
//               </div>
//               <button 
//                 onClick={handleLogout}
//                 className="text-red-400 hover:text-red-300 transition duration-300"
//               >
//                 Logout
//               </button>
//             </div>
//           </>
//         ) : (
//           <button 
//             onClick={handleLoginClick}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
//           >
//             Login
//           </button>
//         )}
        
//         {/* Cart Button with Count */}
//         <button 
//           onClick={handleCartClick}
//           className="relative hover:text-gray-300 transition duration-300 flex items-center gap-2"
//         >
//           <span className="text-xl">🛒</span>
//           <span className="hidden md:inline">Cart</span>
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//               {cartCount > 99 ? '99+' : cartCount}
//             </span>
//           )}
//         </button>
        
//         {/* Wishlist Button with Count */}
//         <button 
//           onClick={handleWishlistClick}
//           className="relative hover:text-gray-300 transition duration-300 flex items-center gap-2"
//         >
//           <span className="text-xl">❤️</span>
//           <span className="hidden md:inline">Wishlist</span>
//           {wishlistCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//               {wishlistCount > 99 ? '99+' : wishlistCount}
//             </span>
//           )}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load cart and wishlist counts
    const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
    
    const totalCartItems = savedCart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(totalCartItems);
    setWishlistCount(savedWishlist.length);
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
      
      const totalCartItems = savedCart.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartCount(totalCartItems);
      setWishlistCount(savedWishlist.length);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
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
          All Products
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
        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/exclusive")}
        >
          Exclusive
        </li>
        <li 
          className="hover:text-gray-300 cursor-pointer transition duration-300"
          onClick={() => navigate("/about")}
        >
          About Us
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
            {/* Login Button */}
            <button 
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Login
            </button>
            
            {/* Register Button */}
            <button 
              onClick={() => navigate("/register")}
              className="border border-white hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Register
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



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { cartAPI, wishlistAPI } from "../services/apiService";

// function Navbar() {
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Load user from localStorage
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       const userData = JSON.parse(savedUser);
//       setUser(userData);
//       loadCartAndWishlistCounts(userData.id);
//     }
//   }, []);

//   const loadCartAndWishlistCounts = async (userId) => {
//     try {
//       // Load cart from db.json
//       const cartData = await cartAPI.getCart(userId);
//       if (cartData && cartData.items) {
//         const totalItems = cartData.items.reduce((total, item) => total + (item.quantity || 1), 0);
//         setCartCount(totalItems);
//       }

//       // Load wishlist from db.json
//       const wishlistData = await wishlistAPI.getWishlist(userId);
//       if (wishlistData && wishlistData.items) {
//         setWishlistCount(wishlistData.items.length);
//       }
//     } catch (error) {
//       console.error("Error loading counts:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     setCartCount(0);
//     setWishlistCount(0);
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const handleCartClick = () => {
//     if (!user) {
//       toast.error("Please login to view cart");
//       navigate("/login");
//       return;
//     }
//     navigate("/cart");
//   };

//   const handleWishlistClick = () => {
//     if (!user) {
//       toast.error("Please login to view wishlist");
//       navigate("/login");
//       return;
//     }
//     navigate("/wishlist");
//   };

//   return (
//     <nav className="w-full bg-black text-white px-6 md:px-12 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
//       {/* Logo */}
//       <h1 
//         className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         V-PERFUMÉ
//       </h1>

//       {/* Menu */}
//       <ul className="hidden md:flex gap-8 text-sm font-medium">
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/")}
//         >
//           Home
//         </li>
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/product")}
//         >
//           All Products
//         </li>
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/men")}
//         >
//           Men
//         </li>
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/women")}
//         >
//           Women
//         </li>
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/exclusive")}
//         >
//           Exclusive
//         </li>
//         <li 
//           className="hover:text-gray-300 cursor-pointer transition duration-300"
//           onClick={() => navigate("/about")}
//         >
//           About Us
//         </li>
//       </ul>

//       {/* Actions */}
//       <div className="flex items-center gap-6 text-sm">
//         {user ? (
//           <>
//             {/* User Info */}
//             <div className="hidden md:flex items-center gap-3">
//               <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
//                 <span className="font-medium">
//                   {user.username?.charAt(0).toUpperCase() || 
//                    user.email?.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <div className="text-sm">
//                 <p className="font-medium">Hi, {user.username || user.email.split('@')[0]}</p>
//               </div>
//             </div>
            
//             {/* Logout Button */}
//             <button 
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             {/* Login Button */}
//             <button 
//               onClick={() => navigate("/login")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
//             >
//               Login
//             </button>
            
//             {/* Register Button */}
//             <button 
//               onClick={() => navigate("/register")}
//               className="border border-white hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg transition duration-300"
//             >
//               Register
//             </button>
//           </>
//         )}
        
//         {/* Cart Button */}
//         <button 
//           onClick={handleCartClick}
//           className="relative hover:text-gray-300 transition duration-300 flex items-center gap-2"
//         >
//           <span className="text-xl">🛒</span>
//           <span className="hidden md:inline">Cart</span>
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//               {cartCount > 99 ? '99+' : cartCount}
//             </span>
//           )}
//         </button>
        
//         {/* Wishlist Button */}
//         <button 
//           onClick={handleWishlistClick}
//           className="relative hover:text-gray-300 transition duration-300 flex items-center gap-2"
//         >
//           <span className="text-xl">❤️</span>
//           <span className="hidden md:inline">Wishlist</span>
//           {wishlistCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//               {wishlistCount > 99 ? '99+' : wishlistCount}
//             </span>
//           )}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;