import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch {
      toast.error("Failed to load product");
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

    await addToCart(product, quantity);     
  };

  // buy
  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to buy");
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        product,
        quantity,
      },
    });
  };

  const decrease = () => quantity > 1 && setQuantity(quantity - 1);
  const increase = () => setQuantity(quantity + 1);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 flex-grow">
        <button onClick={() => navigate(-1)} className="mb-6">← Back</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <img src={product.image} alt={product.name} />

          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-3xl font-bold mt-4">₹{product.price}</p>

            {product.description && (
              <p className="mt-4 text-gray-700">{product.description}</p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <button onClick={decrease}>-</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
              <span className="font-bold">
                Total: ₹{product.price * quantity}
              </span>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-3 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="border border-black px-6 py-3 rounded"
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
