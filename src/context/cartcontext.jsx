import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/cart/view/');
      // Map Django response to frontend expected format
      const formattedCart = (response.items || []).map(item => ({
        id: item.id,
        productId: item.perfume,
        name: item.product_name,
        price: item.product_price,
        image: item.product_image,
        quantity: item.quantity,
        brand: "Premium Brand" // Default fallback
      }));
      setCart(formattedCart);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Error fetching cart:", err);
      }
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post('/api/cart/add/', {
        perfume: product.id,
        quantity: quantity
      });
      await fetchCart(); // Refresh cart from server
      toast.success("Added to cart");
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to add to cart");
      } else {
        toast.error(error.response?.data?.error || "Failed to add to cart");
      }
      return false;
    }
  };

  // 🔹 Remove from cart
  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete(`/api/cart/delete/${cartItemId}/`);
      setCart(cart.filter(item => item.id !== cartItemId));
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove from cart");
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await api.put(`/api/cart/update/${cartItemId}/`, {
        quantity: Math.max(1, quantity)
      });
      await fetchCart(); // Refresh cart to get updated subtotal/total
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error(error.response?.data?.error || "Failed to update quantity");
    }
  };

  // 🔹 Clear cart (after payment)
  const clearCart = async () => {
    try {
      await api.delete('/api/cart/clear/');
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  // Calculate total
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      fetchCart,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);




















