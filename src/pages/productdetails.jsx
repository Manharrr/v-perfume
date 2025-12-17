import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) throw new Error("Product not found");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }

    const success = await addToCart(product, quantity);
    if (success) {
      toast.success(`Added ${product.name} to cart (Quantity: ${quantity})`);
    }
  };

  const handleBuyNow = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to buy");
      navigate("/login");
      return;
    }

    const success = await addToCart(product, quantity);
    if (success) {
      toast.success(`Added ${product.name} to cart (Quantity: ${quantity})`);
      navigate("/payment");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button
            onClick={() => navigate("/product")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 flex-grow">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-black flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x800?text=No+Image";
              }}
            />
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.brand}</p>
              <p className="text-3xl font-bold mt-6">₹{product.price}</p>
              
              {product.description && (
                <div className="mt-6">
                  <h3 className="font-bold mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-bold mb-4">Quantity</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 border rounded-lg px-4 py-2">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    -
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-lg">
                  Total: ₹{product.price * quantity}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 border-2 border-black text-black py-4 rounded-lg font-bold hover:bg-gray-50"
              >
                Buy Now
              </button>
            </div>

            {/* Signup Prompt for Non-logged Users */}
            {!localStorage.getItem("user") && (
              <div className="mt-8 p-6 border border-gray-300 rounded-xl bg-gray-50">
                <h3 className="text-xl font-bold mb-3">Want to Shop?</h3>
                <p className="text-gray-600 mb-4">Sign up to add items to your cart and wishlist</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="border border-black text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-medium"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;
