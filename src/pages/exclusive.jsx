import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import api from "../../api/Axios";

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
      const data = await api.get("/products"); // Using axios
      setProducts(data.slice(16, 24));
    } catch (err) {
      console.error("Error fetching exclusive products:", err);
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

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Collection</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover limited edition premium fragrances crafted for those who
            seek rarity, luxury, and distinction.
          </p>
          <div className="mt-6">
            <span className="inline-block bg-red-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Limited Stock Available
            </span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading exclusive collection...</p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Premium Selection</h2>
              <p className="text-gray-600">
                {products.length} exclusive fragrances available
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl relative group transition-all duration-300"
                >
                  {/* Exclusive Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                    EXCLUSIVE
                  </div>

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
                  <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x400?text=Exclusive+Perfume";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{product.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-xl">₹{product.price}</p>
                      <span className="text-xs text-gray-500">Premium</span>
                    </div>

                    {product.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => handleBuyNow(product, e)}
                        className="flex-1 border border-black py-2 rounded hover:bg-black hover:text-white transition-colors font-medium"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              Our exclusive collection is being curated. Check back soon!
            </p>
            <button
              onClick={() => navigate("/product")}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Explore Regular Collection
            </button>
          </div>
        )}
      </div>

      {/* Info Section */}
      {!loading && products.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-10">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">What Makes It Exclusive?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-4">
                <div className="text-3xl mb-2"></div>
                <h4 className="font-bold mb-2">Limited Edition</h4>
                <p className="text-gray-600">Only a few bottles produced worldwide</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2"></div>
                <h4 className="font-bold mb-2">Unique Blends</h4>
                <p className="text-gray-600">Specially crafted rare ingredients</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2"></div>
                <h4 className="font-bold mb-2">Premium Packaging</h4>
                <p className="text-gray-600">Luxury presentation with each bottle</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Exclusive;