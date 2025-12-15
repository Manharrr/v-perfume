// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate =useNavigate();

//   // Fetch products from json-server
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Search filter
//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">

//       {/* Top bar */}
//       <div className="mb-6">
//         <button onClick={()=>navigate("/")} className="text-sm text-gray-500 cursor-pointer hover:underline" >back to home</button>
          
        
//       </div>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search perfumes..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full mb-8 px-4 py-2 border rounded-lg outline-none
//                    focus:ring-2 focus:ring-gray-300"
//       />

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative"
//           >

//             {/* Wishlist */}
//             <div className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer">
//               ♥
//             </div>

//             {/* Image */}
//             <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-full object-contain"
//               />
//             </div>

//             {/* Name */}
//             <h3 className="font-semibold text-sm mb-1">
//               {product.name}
//             </h3>

//             {/* Brand */}
//             <p className="text-xs text-gray-500 mb-2">
//               {product.brand}
//             </p>

//             {/* Price + Button */}
//             <div className="flex items-center justify-between mt-3">
//               <span className="font-bold text-lg">
//                 ₹ {product.price}
//               </span>

//               <button
//                 className="bg-[#c49a6c] text-white text-sm px-4 py-2
//                            rounded-md hover:opacity-90"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredProducts.length === 0 && (
//         <p className="text-center text-gray-500 mt-10">
//           No products found
//         </p>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // Fetch products
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Search filter
//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 bg-white">

//       {/* Top bar */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate("/")}
//           className="text-sm text-black hover:underline"
//         >
//           ← Back to Home
//         </button>
//       </div>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search perfumes..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full mb-10 px-4 py-2 border border-gray-300 rounded-lg
//                    outline-none focus:ring-1 focus:ring-black"
//       />

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white border border-gray-200 rounded-xl
//                        hover:shadow-xl transition overflow-hidden"
//           >

//             {/* Image (FULL WIDTH – NO SIDE SPACE) */}
//             <div className="w-full h-56 bg-gray-100 overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-4 relative">

//               {/* Wishlist */}
//               <div className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer">
//                 ♥
//               </div>

//               {/* Name */}
//               <h3 className="font-semibold text-sm mb-1 text-black">
//                 {product.name}
//               </h3>

//               {/* Brand */}
//               <p className="text-xs text-gray-500 mb-3">
//                 {product.brand}
//               </p>

//               {/* Price + Button */}
//               <div className="flex items-center justify-between">
//                 <span className="font-bold text-lg text-black">
//                   ₹ {product.price}
//                 </span>

//                 <button
//                   className="bg-black text-white text-sm px-4 py-2 rounded-md
//                              hover:bg-gray-900 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredProducts.length === 0 && (
//         <p className="text-center text-gray-500 mt-12">
//           No products found
//         </p>
//       )}
//     </div>
//   );
// }





//////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load wishlist from localStorage
  const getWishlist = () => {
    return JSON.parse(localStorage.getItem('wishlist') || "[]");
  };

  // Load cart from localStorage
  const getCart = () => {
    return JSON.parse(localStorage.getItem('cart') || "[]");
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === productId);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    const cart = getCart();
    return cart.some(item => item.id === productId);
  };

  // Add/Remove from wishlist
  const toggleWishlist = (product) => {
    const wishlist = getWishlist();
    const isInList = wishlist.some(item => item.id === product.id);
    
    let updatedWishlist;
    if (isInList) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      toast.success("Removed from wishlist");
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success("Added to wishlist!");
    }
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // Trigger storage event to update navbar count
    window.dispatchEvent(new Event('storage'));
    
    // Force re-render to update heart icon
    fetchProducts(); // Or use a state update
  };

  // Add to cart
  const addToCart = (product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      toast.success(`Added another ${product.name} to cart`);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`${product.name} added to cart!`);
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Trigger storage event to update navbar count
    window.dispatchEvent(new Event('storage'));
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-grow">
        {/* Back Button */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 border-2 border-black rounded-full text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            ← Back to Home
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-14">
          <div className="relative w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search perfumes by name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-300 rounded-full text-base outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-4 right-4 text-3xl transition-all duration-300 p-2 rounded-full ${
                      isInWishlist(product.id)
                        ? "text-red-500 hover:text-red-600 bg-white/80"
                        : "text-gray-400 hover:text-red-500 bg-white/80"
                    }`}
                  >
                    {isInWishlist(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* Product Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1 text-black line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xl text-black">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {isInCart(product.id) && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ In cart
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isInCart(product.id)
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {isInCart(product.id) ? "Add More" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => {
                setSearch("");
                fetchProducts();
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 bg-white">

//       {/* TOP BAR */}
//       <div className="mb-10 flex items-center justify-between">

//         {/* Back to Home (ATTRACTIVE) */}
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 px-5 py-2
//                      border border-black rounded-full
//                      text-sm font-medium text-black
//                      hover:bg-black hover:text-white
//                      transition"
//         >
//           ← Back to Home
//         </button>

//       </div>

//       {/* SEARCH BAR */}
//       <div className="mb-14 flex justify-center">
//         <div className="relative w-full max-w-xl">
//           <input
//             type="text"
//             placeholder="Search perfumes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-14 pr-4 py-3 border border-gray-300
//                        rounded-full text-sm outline-none
//                        focus:ring-2 focus:ring-black focus:border-black"
//           />

          
//         </div>
//       </div>

//       {/* PRODUCTS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white border border-gray-200 rounded-2xl
//                        hover:shadow-2xl transition overflow-hidden"
//           >

//             {/* IMAGE */}
//             <div className="w-full h-56 bg-gray-100 overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-4 relative">

//               {/* WISHLIST (VERY BIG ❤️) */}
//               <div
//                 className="absolute top-4 right-4
//                            text-4xl text-gray-400
//                            cursor-pointer select-none
//                            hover:text-black transition"
//               >
//                 ♥
//               </div>

//               {/* NAME */}
//               <h3 className="font-semibold text-sm mb-1 text-black">
//                 {product.name}
//               </h3>

//               {/* BRAND */}
//               <p className="text-xs text-gray-500 mb-4">
//                 {product.brand}
//               </p>

//               {/* PRICE + BUTTON */}
//               <div className="flex items-center justify-between">
//                 <span className="font-bold text-lg text-black">
//                   ₹ {product.price}
//                 </span>

//                 <button
//                   className="bg-black text-white text-sm px-4 py-2 rounded-md
//                              hover:bg-gray-900 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
              

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* EMPTY STATE */}
//       {filteredProducts.length === 0 && (
//         <p className="text-center text-gray-500 mt-16">
//           No products found
//         </p>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { api } from "../Api/Axios";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     api.get("/products").then(res => setProducts(res.data));
//   }, []);

//   const filtered = products.filter(p =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       <input
//         placeholder="Search perfumes..."
//         className="border p-3 rounded-full w-full mb-10"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {filtered.map(p => (
//           <div key={p.id} className="border rounded-xl p-4">

//             <img src={p.image} className="h-40 w-full object-cover mb-3" />

//             <h3 className="font-semibold">{p.name}</h3>
//             <p className="text-sm text-gray-500">{p.brand}</p>

//             <div className="flex justify-between items-center mt-3">
//               <span className="font-bold">₹{p.price}</span>

//               <button
//                 onClick={() => addToCart(p)}
//                 className="bg-black text-white px-3 py-1 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <button
//               onClick={() => addToWishlist(p)}
//               className="text-3xl mt-2 text-gray-400 hover:text-red-500"
//             >
//               ♥
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { api } from "../Api/Axios";
// ////
// // import { useWishlist } from "../context/wishlistcontext";
// // import { useCart } from "../context/CartContext";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     api.get("/products").then(res => setProducts(res.data));
//   }, []);

//   const filtered = products.filter(p =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       <input
//         placeholder="Search perfumes..."
//         className="border p-3 rounded-full w-full mb-10"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {filtered.map(p => (
//           <div key={p.id} className="border rounded-xl p-4">

//             <img src={p.image} className="h-40 w-full object-cover mb-3" />

//             <h3 className="font-semibold">{p.name}</h3>
//             <p className="text-sm text-gray-500">{p.brand}</p>

//             <div className="flex justify-between items-center mt-3">
//               <span className="font-bold">₹{p.price}</span>

//               <button
//                 onClick={() => addToCart(p)}
//                 className="bg-black text-white px-3 py-1 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <button
//               onClick={() => addToWishlist(p)}
//               className="text-3xl mt-2 text-gray-400 hover:text-red-500"
//             >
//               ♥
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



