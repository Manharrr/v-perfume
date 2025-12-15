import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

function Exclusive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExclusiveProducts();
  }, []);

  const fetchExclusiveProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const allProducts = await response.json();
      
      // Get last 8 products for exclusive (IDs 17-24 or whatever you have)
      // If less than 24 products, take from the end
      const exclusiveProducts = allProducts.slice(-8);
      
      setProducts(exclusiveProducts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const existing = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existing) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      toast.success("Added more to cart");
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success("Added to cart!");
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const buyNow = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Exclusive Collection</h1>
          <p className="text-gray-600">Limited edition premium fragrances</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition relative">
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  EXCLUSIVE
                </div>
                <div className="h-48 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.brand}</p>
                  <p className="font-bold mt-2 text-lg">₹{product.price}</p>
                  
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => buyNow(product)}
                      className="flex-1 border border-black text-black py-2 rounded hover:bg-gray-100"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Limited stock available. Order now!</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Exclusive;