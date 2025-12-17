import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import toast from "react-hot-toast"; // Add this import

function Women() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchWomenProducts();
  }, []);

  const fetchWomenProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const allProducts = await response.json();
      const womenProducts = allProducts.filter(p => 
        parseInt(p.id) >= 13 && parseInt(p.id) <= 20
      );
      setProducts(womenProducts);
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
      toast.error("Please login to add to cart"); // Change alert to toast
      navigate("/login");
      return;
    }
    
    const success = await addToCart(product);
    if (success) {
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const handleToggleWishlist = async (product, e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to manage wishlist"); // Change alert to toast
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
      toast.error("Please login to buy"); // Change alert to toast
      navigate("/login");
      return;
    }
    
    const success = await addToCart(product);
    if (success) {
      toast.success(`Added ${product.name} to cart`);
      navigate("/payment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2">Women's Collection</h1>
        <p className="text-gray-600 mb-8">
          Elegant fragrances for the modern woman
        </p>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition relative cursor-pointer bg-white"
              >
                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md z-10"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500 w-5 h-5" />
                  ) : (
                    <FaRegHeart className="text-gray-500 w-5 h-5 hover:text-red-500" />
                  )}
                </button>

                <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                    {product.brand}
                  </p>
                  <p className="font-bold text-xl mb-4">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="flex-1 border border-black text-black py-2 rounded hover:bg-gray-100 transition"
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