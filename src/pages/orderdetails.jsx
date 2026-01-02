
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useOrders } from "../context/ordercontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

function OrderDetails() {
  const { id } = useParams(); // Get order ID from URL
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();
  const { user } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    if (!user) {
      toast.error("Please login to view order details");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const orderData = await getOrderById(id);
      
      if (!orderData) {
        toast.error("Order not found");
        navigate("/order");
        return;
      }
      
      setOrder(orderData);
    } catch (error) {
      toast.error("Failed to load order details");
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const success = await cancelOrder(id);
      if (success) {
        navigate("/order");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-4">Order not found</p>
            <button
              onClick={() => navigate("/order")}
              className="bg-black text-white px-6 py-2 rounded"
            >
              Back to Orders
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

      <div className="max-w-6xl mx-auto px-4 py-8 flex-grow">
        <button 
          onClick={() => navigate("/order")} 
          className="mb-6 text-gray-600 hover:text-black flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Orders
        </button>

        <h1 className="text-3xl font-bold mb-6">Order Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="border rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Order #{order.orderId}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Placed on {new Date(order.orderDate || order.createdAt).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium mt-2 md:mt-0 ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod || "Cash on Delivery"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                  <p className="font-medium">{order.shippingAddress || "Not specified"}</p>
                </div>
                {order.phone && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contact Number</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                )}
                {order.customerName && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/100?text=Product";
                      }}
                    />
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.brand || "Premium Brand"}</p>
                      <p className="text-sm mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>

              {order.status === 'Pending' && (
                <button
                  onClick={handleCancelOrder}
                  className="w-full mt-6 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50 transition-colors"
                >
                  Cancel Order
                </button>
              )}

              <button
                onClick={() => navigate("/product")}
                className="w-full mt-3 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <p className="font-medium mb-2">Need help?</p>
                <p>Email: support@v-perfume.com</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OrderDetails;