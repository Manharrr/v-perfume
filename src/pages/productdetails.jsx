import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { api } from "../../api/Axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/products/${id}`);
      
      if (response && typeof response === 'object') {
        setProduct(response);
      } else {
        throw new Error("Invalid product data");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product. Please try again.");
      toast.error("Failed to load product");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (!product) {
      toast.error("Product not available");
      return;
    }
    await addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to buy");
      navigate("/login");
      return;
    }
    if (!product) {
      toast.error("Product not available");
      return;
    }
    navigate("/payment", { state: { product, quantity } });
  };

  const decrease = () => quantity > 1 && setQuantity(quantity - 1);
  const increase = () => setQuantity(quantity + 1);

  const handleRetry = () => {
    fetchProduct();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
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
          
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😞</div>
            <h3 className="text-2xl font-bold mb-2">Product Not Found</h3>
            <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/product")}
                className="border border-black text-black px-6 py-2 rounded hover:bg-gray-100"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 flex-grow">
        <button onClick={() => navigate(-1)} className="mb-6">← Back</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <img 
            src={product?.image || "https://via.placeholder.com/600x600?text=No+Image"} 
            alt={product?.name || "Product"} 
            className="rounded-lg w-full h-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
            }}
          />

          <div>
            <h1 className="text-4xl font-bold">{product?.name || "Unknown Product"}</h1>
            <p className="text-gray-600">{product?.brand || "Unknown Brand"}</p>
            <p className="text-3xl font-bold mt-4">₹{product?.price || 0}</p>

            {product?.description && (
              <p className="mt-4 text-gray-700">{product.description}</p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <button 
                onClick={decrease} 
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="font-bold">{quantity}</span>
              <button 
                onClick={increase} 
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                +
              </button>
              <span className="font-bold">
                Total: ₹{(product?.price || 0) * quantity}
              </span>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="border border-black px-6 py-3 rounded hover:bg-black hover:text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;