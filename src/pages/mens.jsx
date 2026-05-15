import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { api, getMediaUrl } from "../utils/api";

function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchMenProducts();
  }, []);

const fetchMenProducts = async () => {
  try {
    const response = await api.get(
      "/api/products/perfumes/?category=men"
    );

    setProducts(response);

  } catch (err) {
    console.error("Error fetching men products:", err);
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
  };

  const handleToggleWishlist = async (product, e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to manage wishlist");
      navigate("/login");
      return;
    }
    await toggleWishlist(product);
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
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl relative group"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500 text-lg" />
                  ) : (
                    <FaRegHeart className="text-lg" />
                  )}
                </button>

                {/* Product Image */}
                <div className="w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={getMediaUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300x400?text=Mens+Perfume";
                      }}
                    />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{product.brand?.name || product.brand}</p>
                  <p className="font-bold text-xl mt-2">₹{product.price}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="flex-1 border border-black py-2 rounded hover:bg-black hover:text-white transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products found in men's collection</p>
            <button
              onClick={() => navigate("/product")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Men;
