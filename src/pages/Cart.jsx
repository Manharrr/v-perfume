// import React from 'react'

// function Cart() {
//   return (
//     <div>
//         <h1>
// this is carttt pgggg
//     </h1>
      
//     </div>
//   )
// }

// export default Cart

// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prev) => [...prev, product]);
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter(item => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);


// import React from "react";
// import { useCart } from "../context/CartContext";
// export default function Cart() {
//   const { cart, removeFromCart } = useCart();

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 && <p>Cart is empty</p>}

//       {cart.map(item => (
//         <div key={item.id} className="flex justify-between border-b py-3">
//           <span>{item.name}</span>
//           <button
//             onClick={() => removeFromCart(item.id)}
//             className="text-red-500"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
    setCartItems(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
    toast.success("Cart updated");
  };

  const removeFromCart = (id) => {
    const product = cartItems.find(item => item.id === id);
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
    toast.success(`${product?.name} removed from cart`);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    navigate("/payment");
  };

  const clearCart = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is already empty");
      return;
    }
    updateCart([]);
    toast.success("Cart cleared");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          
          {cartItems.length > 0 && (
            <div className="flex gap-4">
              <button 
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.brand}</p>
                      <p className="text-gray-900 font-bold text-lg mb-4">₹{item.price.toLocaleString()}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-all"
                          >
                            -
                          </button>
                          <span className="font-medium text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-all"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-500 ml-4">
                            Total: ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{cartItems.length > 0 ? "99" : "0"}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{(calculateTotal() * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{((calculateTotal() + 99 + (calculateTotal() * 0.18))).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={proceedToCheckout}
                  className="w-full bg-green-600 text-white py-3.5 rounded-lg font-bold hover:bg-green-700 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={() => navigate("/product")}
                  className="w-full mt-4 border-2 border-black text-black py-3 rounded-lg font-bold hover:bg-black hover:text-white transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <button 
              onClick={() => navigate("/product")}
              className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Cart;