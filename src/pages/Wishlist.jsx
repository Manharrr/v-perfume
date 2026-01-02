import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useWishlist } from "../context/wishlistcontext";
import { useCart } from "../context/cartcontext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    const product = {
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      brand: item.brand,
    };
    
    await addToCart(product);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);//go detail pg
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/product")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div 
                  onClick={() => handleViewProduct(item.productId)}
                  className="cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover rounded-t-lg mb-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.brand}</p>
                  <p className="text-xl font-bold mt-2">₹{item.price}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
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

export default Wishlist;