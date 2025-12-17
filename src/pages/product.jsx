import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to add to cart");
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
      toast.error("Please login to manage wishlist");
      navigate("/login");
      return;
    }
    
    await toggleWishlist(product);
  };

  const handleBuyNow = async (product, e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to buy");
      navigate("/login");
      return;
    }
    
    const success = await addToCart(product);
    if (success) {
      toast.success(`Added ${product.name} to cart`);
      navigate("/payment");
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
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
        {/* Header and Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600 mb-6">
            {filteredProducts.length} products found
          </p>
          
          {/* Old Format Search Bar */}
          <div className="mb-8">
            <div className="relative w-full max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search perfumes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-2 border-gray-300 rounded-full text-base outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
              />
              {/* <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div> */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition relative cursor-pointer bg-white"
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
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
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No products found for "{search}"</p>
            {/* <button
              onClick={() => setSearch("")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Clear Search
            </button> */}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}