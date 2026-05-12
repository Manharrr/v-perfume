import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const orders = await api.get("/api/admin/orders/");
      const foundOrder = orders.find(o => String(o.id) === String(id));
      
      if (!foundOrder) {
        alert("Order not found");
        navigate("/admin/orders");
        return;
      }
      
      setOrder(foundOrder);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await api.patch(`/api/admin/orders/${id}/update/`, { status: newStatus });
      setOrder(prev => ({ ...prev, status: newStatus }));
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Order not found</p>
        <button
          onClick={() => navigate("/admin/orders")}
          className="mt-4 px-4 py-2 bg-neutral-800 rounded"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-gray-400 hover:text-white mb-4"
          >
            ← Back to Orders
          </button>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-400">Order ID: {order.orderId || order.id}</p>
        </div>
        
        <div className="flex gap-4">
          <select
            value={order.status || 'PENDING'}
            onChange={(e) => updateStatus(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded px-4 py-2"
          >
            <option value="PENDING">Pending</option>
            <option value="PLACED">Placed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Customer Email</p>
                <p className="font-medium">{order.user_email || "Customer"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Order Date</p>
                <p className="font-medium">
                  {new Date(order.orderDate || order.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'DELIVERED' ? 'bg-green-400/20 text-green-400' :
                  order.status === 'SHIPPED' ? 'bg-blue-400/20 text-blue-400' :
                  order.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400' :
                  order.status === 'PLACED' ? 'bg-purple-400/20 text-purple-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {order.status || 'PENDING'}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Payment Method</p>
                <p className="font-medium">{order.payment_method === 'COD' ? 'Cash on Delivery' : 'Online'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Shipping Address</p>
              <p className="font-medium">{order.address || "No address provided"}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-neutral-800 pb-4">
                  <img
                    src={item.perfume_image || "https://placehold.co/80x80/1e1e1e/ffffff?text=No+Image"}
                    alt={item.perfume_name || "Product"}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.perfume_name}</p>
                    <p className="text-xs text-gray-500">{item.perfume_brand}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <p className="text-sm text-gray-400">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹0</span>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 text-sm">Payment Method</p>
              <p className="font-medium">{order.paymentMethod || "Cash on Delivery"}</p>
            </div>

            <button
              onClick={() => navigate("/admin/orders")}
              className="w-full mt-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}