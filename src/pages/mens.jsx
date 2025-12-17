import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import toast from "react-hot-toast"; // Add this import

function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchMenProducts();
  }, []);

  const fetchMenProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      const mensProducts = data.filter(p => 
        parseInt(p.id) >= 2 && parseInt(p.id) <= 12
      );
      setProducts(mensProducts);
    } catch (err) {
      console.error(err);
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
        <h1 className="text-3xl font-bold mb-2">Men's Collection</h1>
        <p className="text-gray-600 mb-8">
          Premium fragrances for the modern man
        </p>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition relative cursor-pointer"
              >
                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow z-10"
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
                  <h3 className="font-bold text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.brand}
                  </p>
                  <p className="font-bold text-xl mb-4">
                    ₹{product.price}
                  </p>

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

export default Men;