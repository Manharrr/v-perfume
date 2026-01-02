import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { api } from "../../api/Axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/products");
      
      // Check if response is valid
      if (response && Array.isArray(response)) {
        setProducts(response);
      } else if (response && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Invalid response format:", response);
        setProducts([]);
        setError("Invalid data format received");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please check your connection.");
      toast.error("Failed to load products");
      setProducts([]);
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
    if (!product || !product.id) {
      toast.error("Invalid product");
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
    if (!product || !product.id) {
      toast.error("Invalid product");
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
    if (!product || !product.id) {
      toast.error("Invalid product");
      return;
    }
    navigate("/payment", { state: { product } });
  };

  // ✅ FIXED: Safe filtering with null checks
  const filteredProducts = products.filter((item) => {
    if (!item) return false;
    
    const name = item.name || "";
    const brand = item.brand || "";
    const searchTerm = search.toLowerCase();
    
    return (
      name.toLowerCase().includes(searchTerm) ||
      brand.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <div className="text-5xl mb-4">😞</div>
            <h2 className="text-2xl font-bold mb-2">Oops!</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-6">
          {filteredProducts.length} products found
        </p>

        <div className="mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search perfumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-full focus:border-black"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">
              {search ? "No products found for your search" : "No products available"}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-blue-500 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product?.id || Math.random()}
                onClick={() => product?.id && navigate(`/product/${product.id}`)}
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg relative"
              >
                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full z-10 hover:bg-gray-100"
                >
                  {isInWishlist(product?.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                <img
                  src={product?.image || "https://via.placeholder.com/300x300?text=No+Image"}
                  alt={product?.name || "Product"}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />

                <div className="p-4">
                  <h3 className="font-bold">{product?.name || "Unknown Product"}</h3>
                  <p className="text-sm text-gray-600">{product?.brand || "Unknown Brand"}</p>
                  <p className="font-bold text-lg mt-2">₹{product?.price || 0}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="flex-1 border py-2 rounded hover:bg-gray-100"
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