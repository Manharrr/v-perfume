import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/Axios";
const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get logged-in user from localStorage
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  // 🔹 Fetch user's orders
  const fetchOrders = async () => {
    const user = getUser();
    if (!user) {
      setOrders([]);
      return;
    }

    try {
      setLoading(true);
      const userData = await api.get(`/users/${user.id}`);
      // Ensure orders is an array, sort by latest first
      const userOrders = userData.orders || [];
      const sortedOrders = userOrders.sort((a, b) => 
        new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create new order 
  const createOrder = async (orderData) => {
    const user = getUser();
    if (!user) {
      toast.error("Please login to place order");
      return null;
    }

    try {
      // Get current user data
      const userData = await api.get(`/users/${user.id}`);
      const userOrders = userData.orders || [];
      
      // Create new order with unique ID
      const newOrder = {
        id: Date.now().toString(), // Unique ID
        orderId: `ORD${Date.now().toString().slice(-6)}`, // Shorter order ID
        ...orderData,
        userId: user.id,
        username: user.username || user.email,
        email: user.email,
        orderDate: new Date().toISOString(),
        status: "Pending",
        // Add tracking info
        trackingId: `TRK${Date.now().toString().slice(-8)}`,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      };

      // ADD the new order to existing orders (not replace)
      const updatedOrders = [...userOrders, newOrder];
      
      // Update user in DB with ALL orders
      await api.patch(`/users/${user.id}`, { 
        orders: updatedOrders 
      });
      
      // Update local state
      setOrders(updatedOrders);
      toast.success("Order placed successfully! ");
      
      return newOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order");
      return null;
    }
  };

  // 🔹 Get single order by ID (user-specific)
  const getOrderById = async (orderId) => {
    const user = getUser();
    if (!user) return null;

    try {
      const userData = await api.get(`/users/${user.id}`);
      const userOrders = userData.orders || [];
      const order = userOrders.find(order => order.id === orderId);
      return order || null;
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Failed to fetch order details");
      return null;
    }
  };

  // 🔹 Cancel order
  const cancelOrder = async (orderId) => {
    const user = getUser();
    if (!user) return false;

    try {
      const userData = await api.get(`/users/${user.id}`);
      const userOrders = userData.orders || [];
      
      const updatedOrders = userOrders.map(order => 
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      );
      
      await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      
      toast.success("Order cancelled successfully");
      setOrders(updatedOrders);
      return true;
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
      return false;
    }
  };

  // 🔹 Get orders count
  const getOrdersCount = () => orders.length;

  // 🔹 Get total spent
  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      fetchOrders,
      createOrder,
      getOrderById,
      cancelOrder,
      getOrdersCount,
      getTotalSpent
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);