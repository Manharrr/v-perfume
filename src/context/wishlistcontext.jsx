import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {api} from "../../api/Axios";// Updated import

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get logged-in user from localStorage
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  // 🔹 Fetch wishlist from user's wishlist array
  const fetchWishlist = async () => {
    const user = getUser();
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await api.get(`/users/${user.id}`);
      setWishlist(userData.wishlist || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle wishlist (add/remove)
  const toggleWishlist = async (product) => {
    const user = getUser();
    if (!user) {
      toast.error("Please login to manage wishlist");
      return false;
    }

    try {
      const userData = await api.get(`/users/${user.id}`);
      const userWishlist = userData.wishlist || [];
      
      const existingIndex = userWishlist.findIndex(item => item.productId === product.id);
      
      let updatedWishlist;
      if (existingIndex >= 0) {
        // Remove from wishlist
        updatedWishlist = userWishlist.filter((_, index) => index !== existingIndex);
        toast.success("Removed from wishlist");
      } else {
        // Add to wishlist
        const newItem = {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand || "Unknown",
          addedAt: new Date().toISOString()
        };
        updatedWishlist = [...userWishlist, newItem];
        toast.success("Added to wishlist");
      }

      // Update user's wishlist
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      setWishlist(updatedWishlist);
      return true;
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error("Error updating wishlist:", error);
      return false;
    }
  };

  // 🔹 Check if product is in wishlist
  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId);

  // 🔹 Remove from wishlist
  const removeFromWishlist = async (wishlistItemId) => {
    const user = getUser();
    if (!user) return;

    try {
      const userData = await api.get(`/users/${user.id}`);
      const updatedWishlist = (userData.wishlist || []).filter(item => item.id !== wishlistItemId);
      
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      setWishlist(updatedWishlist);
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
















