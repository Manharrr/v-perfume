import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

function Exclusive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchExclusiveProducts();
  }, []);

  const fetchExclusiveProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data.slice(16,24));
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    await addToCart(product);
     toast.success("Added to cart");
  };

  const handleToggleWishlist = (product, e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to manage wishlist");
      navigate("/login");
      return;
    }
    toggleWishlist(product);
     
  };

  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to buy");
      navigate("/login");
      return;
    }
    navigate("/payment", { state: { product } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

    
      <div className="w-full bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Exclusive Collection</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover limited edition premium fragrances crafted for those who
            seek rarity, luxury, and distinction.
          </p>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl relative"
              >
                
                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full z-10"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <p className="font-bold text-lg mt-2">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-black text-white py-2 rounded"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="flex-1 border py-2 rounded"
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
