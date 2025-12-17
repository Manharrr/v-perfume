import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  // Simple form fields
  const [form, setForm] = useState({
    username: "",
    mobile: "",
    address: "",
    pincode: ""
  });

  // Calculate total - NO TAX, FREE SHIPPING
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!form.username || !form.mobile || !form.address || !form.pincode) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Show loading
      toast.loading("Placing your order...");
      
      // Wait a moment to simulate processing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate order ID
      const orderId = `ORD${Date.now().toString().slice(-6)}`;
      
      // Clear cart
      await clearCart();
      
      // Show success message
      toast.dismiss();
      toast.success(
        <div>
          <p className="font-bold">Order Placed! 🎉</p>
          <p className="text-sm">Order ID: {orderId}</p>
        </div>,
        { duration: 2000 }
      );
      
      // Directly redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Order error:", error);
      toast.dismiss();
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/product")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Shop Now
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

      <div className="max-w-2xl mx-auto px-4 py-8 flex-grow w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
          {/* Simple Form */}
          <div className="space-y-4 mb-8">
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={form.username}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
            
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              maxLength="10"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
            
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
            
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              maxLength="6"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {/* Payment Options */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 text-xl">Payment Method</h3>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex-1 p-4 border rounded-lg text-center font-medium ${
                  paymentMethod === "cod" 
                    ? "border-black bg-black text-white" 
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                Cash on Delivery
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 p-4 border rounded-lg text-center font-medium ${
                  paymentMethod === "upi" 
                    ? "border-black bg-black text-white" 
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                UPI
              </button>
            </div>
            
            {paymentMethod === "upi" && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="UPI ID (username@upi)"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="font-bold mb-4 text-xl">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 text-sm ml-2">× {item.quantity || 1}</span>
                  </div>
                  <span className="font-medium">
                    ₹{item.price * (item.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-gray-200 pt-4 mt-4">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 rounded-lg font-bold text-lg mb-4 ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Placing Order..." : `Place Order - ₹${total}`}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="w-full border border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50"
          >
            ← Back to Cart
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;