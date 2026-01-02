import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {api} from "../../api/Axios"; // Updated import

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  // 🔹 Fetch cart from user's cart array
  const fetchCart = async () => {
    const user = getUser();
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await api.get(`/users/${user.id}`);
      setCart(userData.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add to cart
  const addToCart = async (product, quantity = 1) => {
    const user = getUser();
    if (!user) {
      toast.error("Please login to add to cart");
      return false;
    }

    try {
      const userData = await api.get(`/users/${user.id}`);
      const userCart = userData.cart || [];
      
      // Check if product already exists
      const existingIndex = userCart.findIndex(item => item.productId === product.id);
      
      let updatedCart;
      if (existingIndex >= 0) {
        // Update quantity
        updatedCart = [...userCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + quantity,
          price: product.price
        };
      } else {
        // Add new item
        const newItem = {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand || "Unknown",
          quantity: quantity,
          addedAt: new Date().toISOString()
        };
        updatedCart = [...userCart, newItem];
      }

      // Update user's cart
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      
      setCart(updatedCart);
      toast.success("Added to cart");
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
      return false;
    }
  };

  // 🔹 Remove from cart
  const removeFromCart = async (cartItemId) => {
    const user = getUser();
    if (!user) return;

    try {
      const userData = await api.get(`/users/${user.id}`);
      const updatedCart = (userData.cart || []).filter(item => item.id !== cartItemId);
      
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove from cart");
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (cartItemId, quantity) => {
    const user = getUser();
    if (!user) return;

    try {
      const userData = await api.get(`/users/${user.id}`);
      const updatedCart = (userData.cart || []).map(item => 
        item.id === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  // 🔹 Clear cart (after payment)
  const clearCart = async () => {
    const user = getUser();
    if (!user) return;

    try {
      await api.patch(`/users/${user.id}`, { cart: [] });
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
    fetchCart();
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




















