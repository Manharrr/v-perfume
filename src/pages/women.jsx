// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import Navbar from "../components/navbar";
// // // import Footer from "../components/footer";
// // // import toast from "react-hot-toast";

// // // function Women() {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchWomenProducts();
// // //   }, []);

// // //   const fetchWomenProducts = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:3000/products");

// // //       // ✅ FILTER WOMEN + SLICE 10
// // //       const womenProducts = res.data
// // //         .filter((item) => item.category === "women")
// // //         .slice(0, 10);

// // //       setProducts(womenProducts);
// // //     } catch (error) {
// // //       toast.error("Failed to load women perfumes");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <Navbar />

// // //       <div className="max-w-7xl mx-auto px-6 py-10 flex-grow">

// // //         {/* PAGE TITLE */}
// // //         <h1 className="text-3xl font-bold mb-8">
// // //           Women’s Perfumes
// // //         </h1>

// // //         {/* LOADING */}
// // //         {loading && (
// // //           <p className="text-center text-gray-500">Loading perfumes...</p>
// // //         )}

// // //         {/* PRODUCTS GRID */}
// // //         {!loading && (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// // //             {products.map((product) => (
// // //               <div
// // //                 key={product.id}
// // //                 className="bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition"
// // //               >
// // //                 {/* IMAGE */}
// // //                 <div className="h-60 bg-gray-100">
// // //                   <img
// // //                     src={product.image}
// // //                     alt={product.name}
// // //                     className="w-full h-full object-cover"
// // //                   />
// // //                 </div>

// // //                 {/* CONTENT */}
// // //                 <div className="p-4">
// // //                   <h3 className="font-semibold text-lg">
// // //                     {product.name}
// // //                   </h3>

// // //                   <p className="text-sm text-gray-500 mb-3">
// // //                     {product.brand}
// // //                   </p>

// // //                   <div className="flex items-center justify-between">
// // //                     <span className="font-bold text-lg">
// // //                       ₹{product.price}
// // //                     </span>

// // //                     <button
// // //                       className="bg-black text-white px-4 py-2 text-sm rounded-md
// // //                                  hover:bg-gray-800 transition"
// // //                     >
// // //                       Add to Cart
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* EMPTY STATE */}
// // //         {!loading && products.length === 0 && (
// // //           <p className="text-center text-gray-500 mt-20">
// // //             No women perfumes available
// // //           </p>
// // //         )}
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // // export default Women;



// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../components/navbar";
// // import Footer from "../components/footer";
// // import toast from "react-hot-toast";
// // import { productsAPI, cartAPI, wishlistAPI } from "../services/apiService";

// // function Women() {
// //   const [products, setProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [user, setUser] = useState(null);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [wishlistItems, setWishlistItems] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Load user from localStorage
// //     const savedUser = localStorage.getItem('user');
// //     if (savedUser) {
// //       const userData = JSON.parse(savedUser);
// //       setUser(userData);
// //       loadUserData(userData.id);
// //     }
// //     fetchWomenProducts();
// //   }, []);

// //   const fetchWomenProducts = async () => {
// //     try {
// //       setLoading(true);
// //       // Get all products and filter for women's category
// //       const allProducts = await productsAPI.getAllProducts();
      
// //       // Filter products for women (category "women" or specific logic)
// //       const womenProducts = allProducts.filter(product => {
// //         return (
// //           product.category === "women" ||
// //           (product.id > 10 && product.id <= 20) || // IDs 11-20 for women
// //           product.name.toLowerCase().includes('women') ||
// //           product.name.toLowerCase().includes('femme') ||
// //           product.name.toLowerCase().includes('feminine') ||
// //           product.description?.toLowerCase().includes('women') ||
// //           product.description?.toLowerCase().includes('feminine')
// //         );
// //       }).slice(0, 10); // Limit to 10 products
      
// //       setProducts(womenProducts);
// //       setFilteredProducts(womenProducts);
// //     } catch (error) {
// //       console.error("Error fetching women's products:", error);
// //       toast.error("Failed to load women's collection");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadUserData = async (userId) => {
// //     try {
// //       // Load cart from db.json
// //       const cartData = await cartAPI.getCart(userId);
// //       if (cartData && cartData.items) {
// //         setCartItems(cartData.items);
// //       }

// //       // Load wishlist from db.json
// //       const wishlistData = await wishlistAPI.getWishlist(userId);
// //       if (wishlistData && wishlistData.items) {
// //         setWishlistItems(wishlistData.items);
// //       }
// //     } catch (error) {
// //       console.error("Error loading user data:", error);
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     const value = e.target.value;
// //     setSearch(value);
    
// //     if (value.trim() === "") {
// //       setFilteredProducts(products);
// //     } else {
// //       const filtered = products.filter((item) =>
// //         item.name.toLowerCase().includes(value.toLowerCase()) ||
// //         item.brand.toLowerCase().includes(value.toLowerCase())
// //       );
// //       setFilteredProducts(filtered);
// //     }
// //   };

// //   const checkLogin = () => {
// //     if (!user) {
// //       toast.error("Please login to add items");
// //       navigate("/login");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const toggleWishlist = async (product) => {
// //     if (!checkLogin()) return;
    
// //     try {
// //       const isInWishlist = wishlistItems.some(item => item.id === product.id);
// //       let updatedWishlist;
      
// //       if (isInWishlist) {
// //         updatedWishlist = wishlistItems.filter(item => item.id !== product.id);
// //         toast.success("Removed from wishlist");
// //       } else {
// //         updatedWishlist = [...wishlistItems, product];
// //         toast.success("Added to wishlist!");
// //       }
      
// //       setWishlistItems(updatedWishlist);
// //       await wishlistAPI.updateWishlist(user.id, updatedWishlist);
      
// //     } catch (error) {
// //       toast.error("Failed to update wishlist");
// //     }
// //   };

// //   const addToCart = async (product) => {
// //     if (!checkLogin()) return;
    
// //     try {
// //       const existingItem = cartItems.find(item => item.id === product.id);
// //       let updatedCart;
      
// //       if (existingItem) {
// //         updatedCart = cartItems.map(item =>
// //           item.id === product.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         );
// //         toast.success(`Added another ${product.name} to cart`);
// //       } else {
// //         updatedCart = [...cartItems, { ...product, quantity: 1 }];
// //         toast.success(`${product.name} added to cart!`);
// //       }
      
// //       setCartItems(updatedCart);
// //       await cartAPI.updateCart(user.id, updatedCart);
      
// //     } catch (error) {
// //       toast.error("Failed to add to cart");
// //     }
// //   };

// //   const isInWishlist = (productId) => {
// //     return wishlistItems.some(item => item.id === productId);
// //   };

// //   const isInCart = (productId) => {
// //     return cartItems.some(item => item.id === productId);
// //   };

// //   // Women's fragrance categories
// //   const categories = [
// //     { name: "Floral", icon: "🌸", count: 4 },
// //     { name: "Oriental", icon: "🕌", count: 3 },
// //     { name: "Fresh", icon: "🍃", count: 2 },
// //     { name: "Woody", icon: "🪵", count: 1 }
// //   ];

// //   // Top brands for women
// //   const topBrands = [
// //     { name: "Chanel", logo: "https://images.unsplash.com/photo-1590736969956-8fb8ff4d6d74" },
// //     { name: "Dior", logo: "https://images.unsplash.com/photo-1523293182086-7651a899d37f" },
// //     { name: "Gucci", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb" },
// //     { name: "YSL", logo: "https://images.unsplash.com/photo-1528747008808-b6f4be7ab0b8" }
// //   ];

// //   return (
// //     <div className="min-h-screen flex flex-col bg-white">
// //       <Navbar />
      
// //       <div className="flex-grow">
// //         {/* Hero Banner */}
// //         <div className="relative h-72 md:h-96 overflow-hidden">
// //           <img 
// //             src="https://images.unsplash.com/photo-1541643600914-78b084683601" 
// //             alt="Women's Fragrance Collection" 
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/50 flex items-center">
// //             <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
// //               <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
// //                 Women's Collection
// //               </h1>
// //               <p className="text-xl text-gray-200 max-w-2xl">
// //                 Elegant, captivating fragrances crafted for the sophisticated woman
// //               </p>
// //               <button 
// //                 onClick={() => navigate("/product")}
// //                 className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
// //               >
// //                 Shop All Women's Fragrances
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search Bar */}
// //         <div className="max-w-3xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
// //           <div className="relative bg-white rounded-full shadow-xl p-2">
// //             <div className="flex items-center">
// //               <div className="pl-4 text-gray-400">
// //                 🔍
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search women's fragrances..."
// //                 value={search}
// //                 onChange={handleSearch}
// //                 className="w-full px-4 py-3 outline-none text-gray-800"
// //               />
// //               {search && (
// //                 <button
// //                   onClick={() => {
// //                     setSearch("");
// //                     setFilteredProducts(products);
// //                   }}
// //                   className="pr-4 text-gray-400 hover:text-gray-600"
// //                 >
// //                   ✕
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Categories Section */}
// //         <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
// //           <h2 className="text-3xl font-bold mb-8 text-center">Browse by Scent Family</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             {categories.map((category, index) => (
// //               <div 
// //                 key={index}
// //                 className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
// //                 onClick={() => navigate("/product")}
// //               >
// //                 <div className="text-4xl mb-3">{category.icon}</div>
// //                 <h3 className="text-xl font-bold mb-2">{category.name}</h3>
// //                 <p className="text-gray-600">{category.count} fragrances</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Top Brands */}
// //         <div className="bg-gray-50 py-12">
// //           <div className="max-w-7xl mx-auto px-4 md:px-8">
// //             <h2 className="text-3xl font-bold mb-8 text-center">Featured Brands</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //               {topBrands.map((brand, index) => (
// //                 <div 
// //                   key={index}
// //                   className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
// //                   onClick={() => navigate("/product")}
// //                 >
// //                   <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
// //                     <img 
// //                       src={brand.logo} 
// //                       alt={brand.name}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   </div>
// //                   <h3 className="text-xl font-bold">{brand.name}</h3>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Products Section */}
// //         <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
// //           <div className="flex justify-between items-center mb-10">
// //             <div>
// //               <h2 className="text-3xl font-bold">Women's Fragrances</h2>
// //               <p className="text-gray-600 mt-2">
// //                 {filteredProducts.length} premium perfumes
// //               </p>
// //             </div>
// //             <button 
// //               onClick={() => navigate("/product")}
// //               className="text-black hover:text-gray-700 font-medium"
// //             >
// //               View All →
// //             </button>
// //           </div>

// //           {loading ? (
// //             <div className="text-center py-20">
// //               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto"></div>
// //               <p className="mt-6 text-gray-600">Loading fragrances...</p>
// //             </div>
// //           ) : filteredProducts.length > 0 ? (
// //             <>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //                 {filteredProducts.map((product) => (
// //                   <div
// //                     key={product.id}
// //                     className="bg-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
// //                   >
// //                     {/* Product Image */}
// //                     <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
// //                       <img
// //                         src={product.image}
// //                         alt={product.name}
// //                         className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
// //                       />
// //                       {/* Wishlist Button */}
// //                       <button
// //                         onClick={() => toggleWishlist(product)}
// //                         className={`absolute top-4 right-4 text-2xl transition-all duration-300 p-2 rounded-full ${
// //                           isInWishlist(product.id)
// //                             ? "text-red-500 hover:text-red-600 bg-white/90"
// //                             : "text-gray-400 hover:text-red-500 bg-white/90"
// //                         }`}
// //                       >
// //                         {isInWishlist(product.id) ? "❤️" : "🤍"}
// //                       </button>
// //                     </div>

// //                     {/* Product Content */}
// //                     <div className="p-6">
// //                       <h3 className="font-bold text-lg mb-1 text-black line-clamp-1">
// //                         {product.name}
// //                       </h3>
// //                       <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                      
// //                       {product.description && (
// //                         <p className="text-gray-600 text-sm mb-4 line-clamp-2">
// //                           {product.description}
// //                         </p>
// //                       )}

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <span className="font-bold text-xl text-black">
// //                             ₹{product.price.toLocaleString()}
// //                           </span>
// //                           {isInCart(product.id) && (
// //                             <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
// //                               <span>✓</span> In cart
// //                             </p>
// //                           )}
// //                         </div>
// //                         <button
// //                           onClick={() => addToCart(product)}
// //                           className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
// //                             isInCart(product.id)
// //                               ? "bg-green-600 text-white hover:bg-green-700"
// //                               : "bg-black text-white hover:bg-gray-800"
// //                           }`}
// //                         >
// //                           {isInCart(product.id) ? "Add More" : "Add to Cart"}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </>
// //           ) : (
// //             <div className="text-center py-20">
// //               <div className="text-6xl mb-6">👗</div>
// //               <h2 className="text-2xl font-bold mb-4">No Women's Fragrances Found</h2>
// //               <p className="text-gray-600 mb-8">
// //                 {search ? `No products matching "${search}"` : "We're updating our collection. Check back soon!"}
// //               </p>
// //               {search && (
// //                 <button
// //                   onClick={() => {
// //                     setSearch("");
// //                     setFilteredProducts(products);
// //                   }}
// //                   className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300"
// //                 >
// //                   Clear Search
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Best Sellers */}
// //         {filteredProducts.length > 0 && (
// //           <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
// //             <div className="max-w-7xl mx-auto px-4 md:px-8">
// //               <h2 className="text-3xl font-bold mb-8 text-center">Women's Best Sellers</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //                 {filteredProducts.slice(0, 3).map((product) => (
// //                   <div key={product.id} className="bg-white rounded-xl p-6 shadow-lg">
// //                     <div className="flex items-start gap-6">
// //                       <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
// //                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
// //                       </div>
// //                       <div className="flex-grow">
// //                         <h3 className="font-bold text-lg mb-1">{product.name}</h3>
// //                         <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
// //                         <p className="font-bold text-xl mb-4">₹{product.price.toLocaleString()}</p>
// //                         <div className="flex gap-3">
// //                           <button
// //                             onClick={() => addToCart(product)}
// //                             className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all"
// //                           >
// //                             Add to Cart
// //                           </button>
// //                           <button
// //                             onClick={() => toggleWishlist(product)}
// //                             className={`border px-4 py-2 rounded-lg text-sm transition-all ${
// //                               isInWishlist(product.id)
// //                                 ? "border-red-500 text-red-500"
// //                                 : "border-gray-300 text-gray-600 hover:border-black"
// //                             }`}
// //                           >
// //                             {isInWishlist(product.id) ? "❤️ In Wishlist" : "🤍 Wishlist"}
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* CTA Section */}
// //         <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
// //           <div className="bg-black text-white rounded-3xl p-12 text-center">
// //             <h2 className="text-4xl font-bold mb-6">Find Your Signature Scent</h2>
// //             <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
// //               Every woman deserves a fragrance that tells her story. Let us help you find yours.
// //             </p>
// //             <div className="flex flex-wrap gap-4 justify-center">
// //               <button 
// //                 onClick={() => navigate("/product")}
// //                 className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300"
// //               >
// //                 Browse All Fragrances
// //               </button>
// //               <button 
// //                 onClick={() => navigate("/login")}
// //                 className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300"
// //               >
// //                 Get Personalized Recommendations
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
      
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default Women;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import toast from "react-hot-toast";

// function Women() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load user from localStorage
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       const userData = JSON.parse(savedUser);
//       setUser(userData);
//       loadUserData(userData.id);
//     }
//     fetchWomenProducts();
//   }, []);

//   const fetchWomenProducts = async () => {
//     try {
//       setLoading(true);
//       // Fetch products directly from JSON server
//       const response = await fetch('http://localhost:3000/products');
//       const allProducts = await response.json();
      
//       // Filter products for women
//       const womenProducts = allProducts.filter(product => {
//         return (
//           product.category === "women" ||
//           (product.id > 10 && product.id <= 20) ||
//           product.name.toLowerCase().includes('women') ||
//           product.name.toLowerCase().includes('femme') ||
//           product.name.toLowerCase().includes('feminine') ||
//           (product.description && product.description.toLowerCase().includes('women')) ||
//           (product.description && product.description.toLowerCase().includes('feminine'))
//         );
//       }).slice(0, 10);
      
//       setProducts(womenProducts);
//       setFilteredProducts(womenProducts);
//     } catch (error) {
//       console.error("Error fetching women's products:", error);
//       toast.error("Failed to load women's collection");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUserData = (userId) => {
//     // Load cart from localStorage
//     const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '{"items": []}');
//     setCartItems(savedCart.items || []);

//     // Load wishlist from localStorage
//     const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || '{"items": []}');
//     setWishlistItems(savedWishlist.items || []);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     if (value.trim() === "") {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter((item) =>
//         item.name.toLowerCase().includes(value.toLowerCase()) ||
//         item.brand.toLowerCase().includes(value.toLowerCase())
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

//   const toggleWishlist = (product) => {
//     if (!checkLogin()) return;
    
//     const isInWishlist = wishlistItems.some(item => item.id === product.id);
//     let updatedWishlist;
    
//     if (isInWishlist) {
//       updatedWishlist = wishlistItems.filter(item => item.id !== product.id);
//       toast.success("Removed from wishlist");
//     } else {
//       updatedWishlist = [...wishlistItems, product];
//       toast.success("Added to wishlist!");
//     }
    
//     setWishlistItems(updatedWishlist);
//     localStorage.setItem(`wishlist_${user.id}`, JSON.stringify({ items: updatedWishlist }));
//   };

//   const addToCart = (product) => {
//     if (!checkLogin()) return;
    
//     const existingItem = cartItems.find(item => item.id === product.id);
//     let updatedCart;
    
//     if (existingItem) {
//       updatedCart = cartItems.map(item =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       toast.success(`Added another ${product.name} to cart`);
//     } else {
//       updatedCart = [...cartItems, { ...product, quantity: 1 }];
//       toast.success(`${product.name} added to cart!`);
//     }
    
//     setCartItems(updatedCart);
//     localStorage.setItem(`cart_${user.id}`, JSON.stringify({ items: updatedCart }));
//   };

//   const isInWishlist = (productId) => {
//     return wishlistItems.some(item => item.id === productId);
//   };

//   const isInCart = (productId) => {
//     return cartItems.some(item => item.id === productId);
//   };

//   // Rest of your women.jsx code remains the same...
//   // [Keep all the JSX code from the previous women.jsx example]


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";

// function Men() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/products")
//       .then(res => {
//         const menProducts = res.data
//           .filter(item => item.category === "men")
//           .slice(0, 8);
//         setProducts(menProducts);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8">Men’s Perfumes</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map(product => (
//             <div key={product.id} className="border rounded-2xl overflow-hidden hover:shadow-xl transition">
//               <div className="h-60 bg-gray-100">
//                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold">{product.name}</h3>
//                 <p className="text-sm text-gray-500">{product.brand}</p>

//                 <div className="flex justify-between items-center mt-3">
//                   <span className="font-bold">₹{product.price}</span>
//                   <button className="bg-black text-white px-4 py-2 text-sm rounded">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Men;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

function Women() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWomenProducts();
  }, []);

  const fetchWomenProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const allProducts = await response.json();
      
      // Get next 8 products for women (IDs 9-16)
      const womenProducts = allProducts.slice(8, 16);
      
      setProducts(womenProducts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
      toast.success("Added more to cart");
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success("Added to cart!");
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const buyNow = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2">Women's Collection</h1>
        <p className="text-gray-600 mb-8">Elegant fragrances for the modern woman</p>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.brand}</p>
                  <p className="font-bold mt-2">₹{product.price}</p>
                  
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => buyNow(product)}
                      className="flex-1 border border-black text-black py-2 rounded hover:bg-gray-100"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Women;