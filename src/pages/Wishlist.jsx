// // // import React from 'react'


// // // function Wishlist() {
// // //   return (
// // //     <div>
// // //         <h1>wish listtt page</h1>
  
// // //     </div>
// // //   )
// // // }

// // // export default Wishlist

// // // import { createContext, useContext, useState } from "react";

// // // const WishlistContext = createContext();

// // // export function WishlistProvider({ children }) {
// // //   const [wishlist, setWishlist] = useState([]);

// // //   const addToWishlist = (product) => {
// // //     setWishlist((prev) => [...prev, product]);
// // //   };

// // //   const removeFromWishlist = (id) => {
// // //     setWishlist((prev) => prev.filter(item => item.id !== id));
// // //   };

// // //   return (
// // //     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
// // //       {children}
// // //     </WishlistContext.Provider>
// // //   );
// // // }

// // // export const useWishlist = () => useContext(WishlistContext);

// // import { useWishlist } from "../context/wishlistcontext";

// // export default function Wishlist() {
// //   const { wishlist, removeFromWishlist } = useWishlist();

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

// //       {wishlist.length === 0 && <p>No wishlist items</p>}

// //       {wishlist.map(item => (
// //         <div key={item.id} className="flex justify-between border-b py-3">
// //           <span>{item.name}</span>
// //           <button
// //             onClick={() => removeFromWishlist(item.id)}
// //             className="text-red-500"
// //           >
// //             Remove
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import toast from "react-hot-toast";

// function Wishlist() {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
//     setWishlistItems(savedWishlist);
//   }, []);

//   // Function to update localStorage and trigger navbar update
//   const updateWishlist = (updatedWishlist) => {
//     setWishlistItems(updatedWishlist);
//     localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//     window.dispatchEvent(new Event('storage'));
//   };

//   const removeFromWishlist = (id) => {
//     const product = wishlistItems.find(item => item.id === id);
//     const updatedWishlist = wishlistItems.filter(item => item.id !== id);
//     updateWishlist(updatedWishlist);
//     toast.success(`${product?.name || 'Item'} removed from wishlist`);
//   };

//   const addToCartFromWishlist = (product) => {
//     // Get current cart
//     const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
//     const existingItem = savedCart.find(item => item.id === product.id);
    
//     let updatedCart;
//     if (existingItem) {
//       updatedCart = savedCart.map(item =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       toast.success(`Added another ${product.name} to cart`);
//     } else {
//       updatedCart = [...savedCart, { ...product, quantity: 1 }];
//       toast.success(`${product.name} added to cart!`);
//     }
    
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event('storage'));
//   };

//   const moveAllToCart = () => {
//     if (wishlistItems.length === 0) {
//       toast.error("Wishlist is empty");
//       return;
//     }
    
//     // Get current cart
//     const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
//     let updatedCart = [...savedCart];
    
//     // Add all wishlist items to cart
//     wishlistItems.forEach(product => {
//       const existingItem = updatedCart.find(item => item.id === product.id);
//       if (existingItem) {
//         updatedCart = updatedCart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedCart.push({ ...product, quantity: 1 });
//       }
//     });
    
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
    
//     // Clear wishlist
//     updateWishlist([]);
    
//     toast.success("All items moved to cart!");
//   };

//   const clearWishlist = () => {
//     if (wishlistItems.length === 0) {
//       toast.error("Wishlist is already empty");
//       return;
//     }
    
//     updateWishlist([]);
//     toast.success("Wishlist cleared");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-grow">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">My Wishlist</h1>
          
//           {wishlistItems.length > 0 && (
//             <div className="flex gap-4">
//               <button 
//                 onClick={moveAllToCart}
//                 className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300"
//               >
//                 Move All to Cart
//               </button>
//               <button 
//                 onClick={clearWishlist}
//                 className="border-2 border-red-600 text-red-600 px-6 py-2.5 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-300"
//               >
//                 Clear All
//               </button>
//             </div>
//           )}
//         </div>
        
//         {wishlistItems.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {wishlistItems.map((item) => (
//               <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
//                 {/* Product Image */}
//                 <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
//                   <img 
//                     src={item.image} 
//                     alt={item.name} 
//                     className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
//                   />
//                   {/* Remove Button */}
//                   <button
//                     onClick={() => removeFromWishlist(item.id)}
//                     className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-all duration-300 shadow-lg"
//                   >
//                     ❌
//                   </button>
//                 </div>
                
//                 {/* Product Details */}
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-1 text-black line-clamp-1">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-3">{item.brand}</p>
                  
//                   <div className="flex items-center justify-between">
//                     <span className="font-bold text-xl text-black">
//                       ₹{item.price.toLocaleString()}
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => addToCartFromWishlist(item)}
//                         className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
//                       >
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={() => removeFromWishlist(item.id)}
//                         className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300 text-sm font-medium"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-6">❤️</div>
//             <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
//             <p className="text-gray-600 mb-8">Save your favorite items here to purchase later!</p>
//             <button 
//               onClick={() => navigate("/product")}
//               className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300"
//             >
//               Browse Products
//             </button>
//           </div>
//         )}
        
//         {/* Quick Stats */}
//         {wishlistItems.length > 0 && (
//           <div className="mt-12 pt-8 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-600">Total items in wishlist</p>
//                 <p className="text-2xl font-bold">{wishlistItems.length}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Total value</p>
//                 <p className="text-2xl font-bold">
//                   ₹{wishlistItems.reduce((total, item) => total + item.price, 0).toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Estimated delivery</p>
//                 <p className="text-2xl font-bold">3-5 days</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <Footer />
//     </div>
//   );
// }

// export default Wishlist;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import toast from "react-hot-toast";
// import { productsAPI, cartAPI, wishlistAPI } from "../services/apiService";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       const userData = JSON.parse(savedUser);
//       setUser(userData);
//       loadUserData(userData.id);
//     }
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await productsAPI.getAllProducts();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUserData = async (userId) => {
//     try {
//       // Load cart from db.json
//       const cartData = await cartAPI.getCart(userId);
//       if (cartData && cartData.items) {
//         setCartItems(cartData.items);
//       }

//       // Load wishlist from db.json
//       const wishlistData = await wishlistAPI.getWishlist(userId);
//       if (wishlistData && wishlistData.items) {
//         setWishlistItems(wishlistData.items);
//       }
//     } catch (error) {
//       console.error("Error loading user data:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     if (value.trim() === "") {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter((item) =>
//         item.name.toLowerCase().includes(value.toLowerCase()) ||
//         item.brand.toLowerCase().includes(value.toLowerCase()) ||
//         (item.description && item.description.toLowerCase().includes(value.toLowerCase()))
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   const checkLogin = () => {
//     if (!user) {
//       toast.error("Please login to add items");
//       navigate("/login");
//       return false;
//     }
//     return true;
//   };

//   const toggleWishlist = async (product) => {
//     if (!checkLogin()) return;
    
//     try {
//       const isInWishlist = wishlistItems.some(item => item.id === product.id);
//       let updatedWishlist;
      
//       if (isInWishlist) {
//         updatedWishlist = wishlistItems.filter(item => item.id !== product.id);
//         toast.success("Removed from wishlist");
//       } else {
//         updatedWishlist = [...wishlistItems, product];
//         toast.success("Added to wishlist!");
//       }
      
//       setWishlistItems(updatedWishlist);
//       await wishlistAPI.updateWishlist(user.id, updatedWishlist);
      
//     } catch (error) {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const addToCart = async (product) => {
//     if (!checkLogin()) return;
    
//     try {
//       const existingItem = cartItems.find(item => item.id === product.id);
//       let updatedCart;
      
//       if (existingItem) {
//         updatedCart = cartItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         toast.success(`Added another ${product.name} to cart`);
//       } else {
//         updatedCart = [...cartItems, { ...product, quantity: 1 }];
//         toast.success(`${product.name} added to cart!`);
//       }
      
//       setCartItems(updatedCart);
//       await cartAPI.updateCart(user.id, updatedCart);
      
//     } catch (error) {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const isInWishlist = (productId) => {
//     return wishlistItems.some(item => item.id === productId);
//   };

//   const isInCart = (productId) => {
//     return cartItems.some(item => item.id === productId);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-grow">
//         {/* Back Button */}
//         <div className="mb-10">
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 px-6 py-3 border-2 border-black rounded-full text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-300"
//           >
//             ← Back to Home
//           </button>
//         </div>

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold">All Fragrances</h1>
//           <p className="text-gray-600 mt-2">
//             Discover our curated collection of premium perfumes
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-12">
//           <div className="relative w-full max-w-2xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search by name, brand, or description..."
//               value={search}
//               onChange={handleSearch}
//               className="w-full pl-14 pr-6 py-4 border-2 border-gray-300 rounded-full text-base outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
//             />
//             <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
//               🔍
//             </div>
//             {search && (
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setFilteredProducts(products);
//                 }}
//                 className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Products Count */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold">Featured Products</h2>
//           <p className="text-gray-600">
//             {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
//           </p>
//         </div>

//         {/* Products Grid */}
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto"></div>
//             <p className="mt-6 text-gray-600">Loading fragrances...</p>
//           </div>
//         ) : filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
//               >
//                 {/* Product Image */}
//                 <div 
//                   className="relative w-full h-64 bg-gray-100 overflow-hidden cursor-pointer"
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
//                   />
//                   {product.category && (
//                     <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
//                       {product.category}
//                     </span>
//                   )}
//                   {/* Wishlist Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleWishlist(product);
//                     }}
//                     className={`absolute top-3 right-3 text-2xl transition-all duration-300 p-2 rounded-full ${
//                       isInWishlist(product.id)
//                         ? "text-red-500 hover:text-red-600 bg-white/90"
//                         : "text-gray-400 hover:text-red-500 bg-white/90"
//                     }`}
//                   >
//                     {isInWishlist(product.id) ? "❤️" : "🤍"}
//                   </button>
//                 </div>

//                 {/* Product Content */}
//                 <div className="p-6">
//                   <h3 
//                     className="font-bold text-lg mb-1 text-black line-clamp-1 cursor-pointer hover:text-gray-700"
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  
//                   {product.description && (
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {product.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="font-bold text-xl text-black">
//                         ₹{product.price.toLocaleString()}
//                       </span>
//                       {isInCart(product.id) && (
//                         <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
//                           <span>✓</span> In cart
//                         </p>
//                       )}
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(product);
//                       }}
//                       className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
//                         isInCart(product.id)
//                           ? "bg-green-600 text-white hover:bg-green-700"
//                           : "bg-black text-white hover:bg-gray-800"
//                       }`}
//                     >
//                       {isInCart(product.id) ? "Add More" : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="text-6xl mb-6">🔍</div>
//             <h2 className="text-2xl font-bold mb-4">No products found</h2>
//             <p className="text-gray-600 mb-8">
//               We couldn't find any products matching "{search}"
//             </p>
//             <button
//               onClick={() => {
//                 setSearch("");
//                 setFilteredProducts(products);
//               }}
//               className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300"
//             >
//               View All Products
//             </button>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.id}`) || "[]");
      setWishlistItems(savedWishlist);
    }
  }, []);

  const removeFromWishlist = (productId) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
      setWishlistItems(updatedWishlist);
      localStorage.setItem(`wishlist_${userData.id}`, JSON.stringify(updatedWishlist));
      toast.success("Removed from wishlist");
    }
  };

  const addToCart = (product) => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const existing = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existing) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Added to cart!");
  };

  const clearWishlist = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setWishlistItems([]);
      localStorage.setItem(`wishlist_${userData.id}`, JSON.stringify([]));
      toast.success("Wishlist cleared");
    }
  };

  const moveAllToCart = () => {
    if (wishlistItems.length === 0) {
      toast.error("Wishlist is empty");
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please login");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    let updatedCart = [...cart];
    
    wishlistItems.forEach(product => {
      const existing = updatedCart.find(item => item.id === product.id);
      if (existing) {
        updatedCart = updatedCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    clearWishlist();
    toast.success("All items moved to cart!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600 mb-8">Save your favorite items here</p>
        
        {wishlistItems.length > 0 ? (
          <>
            <div className="flex gap-4 mb-6">
              <button 
                onClick={moveAllToCart}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Move All to Cart
              </button>
              <button 
                onClick={clearWishlist}
                className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50"
              >
                Clear Wishlist
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gray-100 relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-100"
                    >
                      ❌
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.brand}</p>
                    <p className="font-bold mt-2">₹{item.price}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => addToCart(item)}
                        className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => navigate("/cart")}
                        className="flex-1 border border-black text-black py-2 rounded hover:bg-gray-100"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {wishlistItems.length} items in wishlist
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">❤️</div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items here to purchase later!
            </p>
            <button 
              onClick={() => navigate("/product")}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Wishlist;