import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/wishlist/view/');
      // Map Django response to frontend expected format
      const formattedWishlist = (response || []).map(item => ({
        id: item.id,
        productId: item.perfume,
        name: item.product_name || item.perfume_name,
        price: item.product_price || item.perfume_price,
        image: item.product_image || item.perfume_image,
        brand: item.product_brand || "Premium Brand"
      }));
      setWishlist(formattedWishlist);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error fetching wishlist:", error);
      }
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle wishlist (add/remove)
  const toggleWishlist = async (product) => {
    try {
      const response = await api.post('/api/wishlist/add/', {
        perfume: product.id || product.productId
      });
      await fetchWishlist(); // Refresh wishlist
      if (response.msg === "Removed from wishlist") {
        toast.success("Removed from wishlist");
      } else {
        toast.success("Added to wishlist");
      }
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to manage wishlist");
      } else {
        toast.error("Failed to update wishlist");
      }
      console.error("Error updating wishlist:", error);
      return false;
    }
  };

  // 🔹 Check if product is in wishlist
  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId);

  // 🔹 Remove from wishlist explicitly
  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await api.delete(`/api/wishlist/delete/${wishlistItemId}/`);
      setWishlist(wishlist.filter(item => item.id !== wishlistItemId));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
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
















