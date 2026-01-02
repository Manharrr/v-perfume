import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {api} from "../../api/Axios";

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
      const users = await api.get("/users");
      
      let foundOrder = null;
      
      for (const user of users) {
        if (user.orders) {
          const userOrder = user.orders.find(o => o.id === id);
          if (userOrder) {
            foundOrder = {
              ...userOrder,
              userName: user.username || user.email,
              userEmail: user.email,
              userId: user.id
            };
            break;
          }
        }
      }
      
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
      const users = await api.get("/users");
      
      for (const user of users) {
        if (user.orders) {
          const orderIndex = user.orders.findIndex(o => o.id === id);
          if (orderIndex !== -1) {
            const updatedOrders = [...user.orders];
            updatedOrders[orderIndex] = {
              ...updatedOrders[orderIndex],
              status: newStatus
            };
            
            await api.patch(`/users/${user.id}`, { orders: updatedOrders });
            setOrder(prev => ({ ...prev, status: newStatus }));
            alert(`Status updated to ${newStatus}`);
            break;
          }
        }
      }
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
            value={order.status || 'Pending'}
            onChange={(e) => updateStatus(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded px-4 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
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
                <p className="text-gray-400 text-sm">Customer Name</p>
                <p className="font-medium">{order.userName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-medium">{order.userEmail}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Order Date</p>
                <p className="font-medium">
                  {new Date(order.orderDate || order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'Delivered' ? 'bg-green-400/20 text-green-400' :
                  order.status === 'Shipped' ? 'bg-blue-400/20 text-blue-400' :
                  order.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {order.status || 'Pending'}
                </span>
              </div>
            </div>
            
            {order.shippingAddress && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm">Shipping Address</p>
                <p className="font-medium">{order.shippingAddress}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-neutral-800 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.brand}</p>
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