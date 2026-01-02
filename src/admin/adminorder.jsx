
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/Axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const users = await api.get("/users");
      
      let allOrders = [];
      users.forEach(user => {
        if (user.orders) {
          allOrders = [...allOrders, ...user.orders.map(order => ({//Old orders + current user orders
            ...order,
            userName: user.username || user.email,//extra info add
            userEmail: user.email,
            userId: user.id
          }))];
        }
      });

      // Sort newest first
      allOrders.sort((a, b) => 
        new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt)
      );
      
      setOrders(allOrders);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);//else selected status

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const users = await api.get("/users");
      
      for (const user of users) {
        if (user.orders) {
          const orderIndex = user.orders.findIndex(o => o.id === orderId);
          if (orderIndex !== -1) {
            const updatedOrders = [...user.orders];
            updatedOrders[orderIndex] = {
              ...updatedOrders[orderIndex],
              status: newStatus
            };
            
            await api.patch(`/users/${user.id}`, { orders: updatedOrders });
            
            setOrders(prev => prev.map(order => 
              order.id === orderId ? { ...order, status: newStatus } : order
            ));
            
            alert(`Status updated to ${newStatus}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error updating:", error);
      alert("Update failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-400/20 text-green-400';
      case 'Shipped': return 'bg-blue-400/20 text-blue-400';
      case 'Pending': return 'bg-yellow-400/20 text-yellow-400';
      case 'Cancelled': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-gray-400">View and manage customer orders</p>
        </div>
        
        <div className="flex gap-4">
         
        
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
          >
            <option value="all">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold">
            {orders.filter(o => o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Shipped</p>
          <p className="text-2xl font-bold">
            {orders.filter(o => o.status === 'Shipped').length}
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Delivered</p>
          <p className="text-2xl font-bold">
            {orders.filter(o => o.status === 'Delivered').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-neutral-800">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                    <td className="p-4 font-mono text-sm">
                      {order.orderId || `#${order.id?.slice(0, 8)}`}
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.userName}</p>
                        <p className="text-sm text-gray-400">{order.userEmail}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(order.orderDate || order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold">₹{order.totalAmount?.toLocaleString() || "0"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <select
                          value={order.status || 'Pending'}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-sm"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

