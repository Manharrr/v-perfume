import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch user's orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/orders/history/');
      setOrders(response || []);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error fetching orders:", error);
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create new order 
  const createOrder = async (orderData, isBuyNow = false, buyNowProduct = null) => {
    try {
      let response;
      if (isBuyNow && buyNowProduct) {
        response = await api.post('/api/orders/buy-now/', {
          perfume: buyNowProduct.productId || buyNowProduct.id,
          quantity: buyNowProduct.quantity || 1,
          address: orderData.shippingAddress,
          payment_method: orderData.paymentMethod === "Cash on Delivery" ? "COD" : "ONLINE"
        });
      } else {
        response = await api.post('/api/orders/create/', {
          address: orderData.shippingAddress,
          payment_method: orderData.paymentMethod === "Cash on Delivery" ? "COD" : "ONLINE"
        });
      }

      await fetchOrders(); // Refresh orders
      toast.success("Order placed successfully!");
      return response; // Contains order_id
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.error || "Failed to place order");
      return null;
    }
  };

  // 🔹 Get single order by ID (user-specific)
  const getOrderById = async (orderId) => {
    // We can rely on local state or fetch from backend if available.
    // Assuming history returns full details
    const order = orders.find(order => String(order.id) === String(orderId));
    return order || null;
  };

  // 🔹 Cancel order
  const cancelOrder = async (orderId) => {
    try {
      await api.post(`/api/orders/cancel/${orderId}/`);
      toast.success("Order cancelled successfully");
      await fetchOrders();
      return true;
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.response?.data?.error || "Failed to cancel order");
      return false;
    }
  };

  // 🔹 Get orders count
  const getOrdersCount = () => orders.length;

  // 🔹 Get total spent
  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + (Number(order.total_amount) || 0), 0);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchOrders();
    }
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