import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart();

  
  const buyNowProduct = location.state?.product;
  const buyNowQty = location.state?.quantity || 1;

  const items = buyNowProduct
    ? [{ ...buyNowProduct, quantity: buyNowQty }]
    : cart;//buy now prdt or cart full checkout

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");

  const [form, setForm] = useState({
    username: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  // total price
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.mobile || !form.address || !form.pincode) {
      toast.error("Please fill all fields");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter UPI ID");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Placing your order...");

    try {
      await new Promise((res) => setTimeout(res, 800));

      if (!buyNowProduct) {
        await clearCart(); // clear cart ONLY for cart checkout
      }

      toast.dismiss(toastId);
      toast.success("Order Placed success");

      navigate("/");
    } catch {
      toast.dismiss(toastId);
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-gray-600">No items to checkout</p>
            <button
              onClick={() => navigate("/product")}
              className="bg-black text-white px-6 py-2 rounded"
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

      <div className="max-w-2xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border p-6 rounded-xl shadow"
        >
         
          <div className="space-y-4 mb-6">
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              maxLength="10"
              className="w-full p-3 border rounded"
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              rows="3"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              maxLength="6"
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-3">Payment Method</h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex-1 p-3 border rounded ${
                  paymentMethod === "cod"
                    ? "bg-black text-white"
                    : "border-gray-300"
                }`}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 p-3 border rounded ${
                  paymentMethod === "upi"
                    ? "bg-black text-white"
                    : "border-gray-300"
                }`}
              >
                UPI
              </button>
            </div>

            {paymentMethod === "upi" && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-3 border rounded mt-3"
              />
            )}
          </div>

        
          <div className="border-t pt-4 mb-6">
            <h3 className="font-bold mb-3">Order Summary</h3>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="flex justify-between font-bold text-lg mt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded font-bold ${
              loading
                ? "bg-gray-400"
                : "bg-black text-white"
            }`}
          >
            {loading ? "Placing Order..." : `Place Order ₹${total}`}
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="w-full mt-3 border py-3 rounded"
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
