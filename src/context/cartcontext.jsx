
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from db.json ONLY
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setCart([]);
        return;
      }
      
      const response = await fetch(`http://localhost:3000/cart?userId=${user.id}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Add to cart in db.json ONLY
  const addToCart = async (product, quantity = 1) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("Please login to add to cart");
        return false;
      }

      // Check if product already in cart
      const response = await fetch(`http://localhost:3000/cart?userId=${user.id}&productId=${product.id}`);
      const existingItems = await response.json();

      if (existingItems.length > 0) {
        // Update quantity
        const existingItem = existingItems[0];
        await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: existingItem.quantity + quantity })
        });
      } else {
        // Add new item
        await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            quantity: quantity
          })
        });
      }

      await fetchCart(); // Refresh cart from db.json
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
      return false;
    }
  };

  // Remove from cart in db.json ONLY
  const removeFromCart = async (cartItemId) => {
    try {
      await fetch(`http://localhost:3000/cart/${cartItemId}`, { method: 'DELETE' });
      await fetchCart(); // Refresh from db.json
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove from cart");
    }
  };

  // Update quantity in db.json ONLY
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await fetch(`http://localhost:3000/cart/${cartItemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      await fetchCart(); // Refresh from db.json
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  // Clear cart from db.json ONLY
  const clearCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      // Get all cart items for user
      const response = await fetch(`http://localhost:3000/cart?userId=${user.id}`);
      const userCart = await response.json();
      
      // Delete each item
      for (const item of userCart) {
        await fetch(`http://localhost:3000/cart/${item.id}`, { method: 'DELETE' });
      }
      
      setCart([]); // Clear local state
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      fetchCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);























