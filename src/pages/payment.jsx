import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useOrders } from "../context/ordercontext";
import { useAuth } from "../context/auth";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  // Buy now from product page
  const buyNowProduct = location.state?.product;
  const buyNowQty = location.state?.quantity || 1;

  const items = buyNowProduct
    ? [{ ...buyNowProduct, quantity: buyNowQty }]
    : cart;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Total price
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [user, items, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (form.name.trim().length < 3) return "Name must be at least 3 characters";
    if (!form.mobile) return "Mobile number is required";
    if (form.mobile.length !== 10) return "Mobile number must be 10 digits";
    if (!form.address.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.state.trim()) return "State is required";
    if (!form.pincode) return "Pincode is required";
    if (form.pincode.length !== 6) return "Pincode must be 6 digits";
    if (paymentMethod === "upi" && !upiId.trim()) return "UPI ID is required";
    if (!upiId.includes("@") && paymentMethod === "upi") return "Enter valid UPI ID (e.g., name@upi)";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Placing your order...");

    try {
      // Create order data
      const orderData = {
        items: items.map(item => ({
          productId: item.productId || item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          brand: item.brand || "Unknown",
          quantity: item.quantity
        })),
        totalAmount: total,
        shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "UPI",
        phone: form.mobile,
        customerName: form.name,
        paymentDetails: paymentMethod === "upi" ? { upiId } : {}
      };

      // Create order using context
      const order = await createOrder(orderData);

      if (order) {
        // Clear cart if not buy now
        if (!buyNowProduct) {
          await clearCart();
        }

        toast.dismiss(toastId);
        toast.success("Order placed successfully!");

        // Navigate to order details
        navigate(`/order/${order.id}`);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Order error:", error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

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

      <div className="max-w-4xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Details */}
          <div>
            <div className="bg-white border p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-6">Delivery Details</h2>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="address"
                    placeholder="Delivery Address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    rows="3"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    maxLength="6"
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white border p-6 rounded-xl shadow">
              <h3 className="font-bold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border p-6 rounded-xl shadow">
              <h3 className="font-bold mb-3">Payment Method</h3>
              
              <div className="flex gap-4 mb-4">
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
                  placeholder="Enter UPI ID (e.g., name@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-3 border rounded mt-3"
                />
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded font-bold mt-6 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {loading ? "Placing Order..." : `Place Order ₹${total}`}
              </button>

              <button
                type="button"
                onClick={() => navigate(buyNowProduct ? -1 : "/cart")}
                className="w-full mt-3 border py-3 rounded"
              >
                ← Back to {buyNowProduct ? "Product" : "Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;