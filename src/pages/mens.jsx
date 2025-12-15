// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import toast from "react-hot-toast";

// function Men() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/products");
//       const allProducts = response.data || [];
      
//       // Filter products for men (based on category or ID)
//       // Assuming men's products have IDs 1-10 or specific category
//       const menProducts = allProducts.filter(product => {
//         // Check if product has 'men' in category or based on ID range
//         const lowerName = product.name.toLowerCase();
//         const lowerBrand = product.brand.toLowerCase();
//         const lowerDescription = product.description?.toLowerCase() || '';
        
//         return (
//           product.id <= 10 || // First 10 products for men
//           lowerName.includes('men') ||
//           lowerName.includes('homme') ||
//           lowerName.includes('masculine') ||
//           lowerBrand.includes('dior') || // Example men's brands
//           lowerBrand.includes('versace') ||
//           lowerBrand.includes('armani') ||
//           lowerDescription.includes('men') ||
//           lowerDescription.includes('masculine')
//         );
//       }).slice(0, 10); // Limit to 10 products
      
//       setProducts(menProducts);
//       setFilteredProducts(menProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getWishlist = () => {
//     return JSON.parse(localStorage.getItem('wishlist') || "[]");
//   };

//   const getCart = () => {
//     return JSON.parse(localStorage.getItem('cart') || "[]");
//   };

//   const isInWishlist = (productId) => {
//     const wishlist = getWishlist();
//     return wishlist.some(item => item.id === productId);
//   };

//   const isInCart = (productId) => {
//     const cart = getCart();
//     return cart.some(item => item.id === productId);
//   };

//   const toggleWishlist = (product) => {
//     const wishlist = getWishlist();
//     const isInList = wishlist.some(item => item.id === product.id);
    
//     let updatedWishlist;
//     if (isInList) {
//       updatedWishlist = wishlist.filter(item => item.id !== product.id);
//       toast.success("Removed from wishlist");
//     } else {
//       updatedWishlist = [...wishlist, product];
//       toast.success("Added to wishlist!");
//     }
    
//     localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//     window.dispatchEvent(new Event('storage'));
//   };

//   const addToCart = (product) => {
//     const cart = getCart();
//     const existingItem = cart.find(item => item.id === product.id);
    
//     let updatedCart;
//     if (existingItem) {
//       updatedCart = cart.map(item =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       toast.success(`Added another ${product.name} to cart`);
//     } else {
//       updatedCart = [...cart, { ...product, quantity: 1 }];
//       toast.success(`${product.name} added to cart!`);
//     }
    
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event('storage'));
//   };

//   const categories = [
//     { name: "Fresh & Aquatic", count: 3 },
//     { name: "Woody & Spicy", count: 4 },
//     { name: "Citrus", count: 2 },
//     { name: "Oriental", count: 1 }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-grow">
//         {/* Hero Banner */}
//         <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
//           <img 
//             src="https://images.unsplash.com/photo-1581655353564-df123a1eb820" 
//             alt="Men's Collection" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
//             <div className="px-8 md:px-12">
//               <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 Men's Collection
//               </h1>
//               <p className="text-gray-200 text-lg max-w-2xl">
//                 Discover bold, sophisticated fragrances crafted for the modern man
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Category Navigation */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-bold mb-6">Browse by Scent Family</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {categories.map((category, index) => (
//               <div 
//                 key={index}
//                 className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
//                 onClick={() => navigate("/product")}
//               >
//                 <h3 className="font-bold text-lg mb-2">{category.name}</h3>
//                 <p className="text-gray-600 text-sm">{category.count} fragrances</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold">Featured Men's Fragrances</h2>
//             <p className="text-gray-600">{filteredProducts.length} products</p>
//           </div>

//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading fragrances...</p>
//             </div>
//           ) : filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
//                 >
//                   {/* Product Image */}
//                   <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
//                     />
//                     {/* Wishlist Button */}
//                     <button
//                       onClick={() => toggleWishlist(product)}
//                       className={`absolute top-4 right-4 text-3xl transition-all duration-300 p-2 rounded-full ${
//                         isInWishlist(product.id)
//                           ? "text-red-500 hover:text-red-600 bg-white/80"
//                           : "text-gray-400 hover:text-red-500 bg-white/80"
//                       }`}
//                     >
//                       {isInWishlist(product.id) ? "❤️" : "🤍"}
//                     </button>
//                   </div>

//                   {/* Product Content */}
//                   <div className="p-5">
//                     <h3 className="font-bold text-lg mb-1 text-black line-clamp-1">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                    
//                     {product.description && (
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {product.description}
//                       </p>
//                     )}

//                     <div className="flex items-center justify-between">
//                       <div>
//                         <span className="font-bold text-xl text-black">
//                           ₹{product.price.toLocaleString()}
//                         </span>
//                         {isInCart(product.id) && (
//                           <p className="text-xs text-green-600 mt-1">
//                             ✓ In cart
//                           </p>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => addToCart(product)}
//                         className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
//                           isInCart(product.id)
//                             ? "bg-green-600 text-white hover:bg-green-700"
//                             : "bg-black text-white hover:bg-gray-800"
//                         }`}
//                       >
//                         {isInCart(product.id) ? "Add More" : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-6">👔</div>
//               <h2 className="text-2xl font-bold mb-4">No Men's Fragrances Found</h2>
//               <p className="text-gray-600 mb-8">
//                 We're currently updating our men's collection. Check back soon!
//               </p>
//               <button 
//                 onClick={() => navigate("/product")}
//                 className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300"
//               >
//                 Browse All Products
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Best Sellers Section */}
//         <div className="bg-gray-50 rounded-2xl p-8 mb-10">
//           <h2 className="text-2xl font-bold mb-6">Men's Best Sellers</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {filteredProducts.slice(0, 3).map((product) => (
//               <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-xl">
//                 <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold">{product.name}</h3>
//                   <p className="text-sm text-gray-500">{product.brand}</p>
//                   <p className="font-bold mt-1">₹{product.price.toLocaleString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </div>
//   );
// }

// export default Men;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenProducts();
  }, []);

  const fetchMenProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const allProducts = await response.json();
      
      // Get first 8 products for men (IDs 1-8)
      const menProducts = allProducts.slice(0, 8);
      
      setProducts(menProducts);
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
        <h1 className="text-3xl font-bold mb-2">Men's Collection</h1>
        <p className="text-gray-600 mb-8">Premium fragrances for the modern man</p>
        
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

export default Men;