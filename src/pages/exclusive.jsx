import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import toast from "react-hot-toast"; // Add this import

function Exclusive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchExclusiveProducts();
  }, []);

  const fetchExclusiveProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const allProducts = await response.json();
      const exclusiveProducts = allProducts.slice(-8);
      setProducts(exclusiveProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to add to cart"); // Changed from alert
      navigate("/login");
      return;
    }
    
    const success = await addToCart(product);
    if (success) {
      toast.success(`Added ${product.name} to cart`); // Add success toast
    }
  };

  const handleToggleWishlist = async (product, e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to manage wishlist"); // Changed from alert
      navigate("/login");
      return;
    }
    
    await toggleWishlist(product);
    // Toast is already handled in the context
  };

  const handleBuyNow = async (product, e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to buy"); // Changed from alert
      navigate("/login");
      return;
    }
    
    const success = await addToCart(product);
    if (success) {
      toast.success(`Added ${product.name} to cart`); // Add success toast
      navigate("/payment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Exclusive Collection</h1>
          <p className="text-gray-600">Limited edition premium fragrances</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition relative cursor-pointer"
              >
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  EXCLUSIVE
                </span>

                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500 w-5 h-5" />
                  ) : (
                    <FaRegHeart className="text-gray-500 w-5 h-5" />
                  )}
                </button>

                <div className="h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.brand}</p>
                  <p className="font-bold text-xl mb-4">₹{product.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="flex-1 border border-black py-2 rounded hover:bg-gray-100"
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

export default Exclusive;