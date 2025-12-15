import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../Api/Axios";
import { useCart } from "../context/cartcontext";
import { useWishlist } from "../context/wishlistcontext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  function checkLogin(action) {
    if (!user) {
      toast.error("Login first");
      navigate("/login");
      return;
    }
    action();
  }

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <img src={product.image} className="w-full h-96 object-cover rounded-xl" />

      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-gray-500">{product.brand}</p>
      <p className="text-2xl font-semibold mt-4">₹ {product.price}</p>

      <p className="mt-6 text-gray-600">
        {product.description}
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() =>
            checkLogin(() => {
              addToCart(product);
              toast.success("Added to cart");
            })
          }
          className="bg-black text-white px-8 py-3 rounded-full"
        >
          Add to Cart
        </button>

        <button
          onClick={() =>
            checkLogin(() => {
              addToWishlist(product);
              toast.success("Added to wishlist");
            })
          }
          className="border px-6 py-3 rounded-full"
        >
          ♥ Wishlist
        </button>
      </div>
    </div>
  );
}
