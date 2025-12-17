
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from db.json ONLY
  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setWishlist([]);
        return;
      }
      
      const response = await fetch(`http://localhost:3000/wishlist?userId=${user.id}`);
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Toggle wishlist in db.json ONLY
  const toggleWishlist = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("Please login to manage wishlist");
        return false;
      }

      // Check if product already in wishlist
      const response = await fetch(`http://localhost:3000/wishlist?userId=${user.id}&productId=${product.id}`);
      const existingItems = await response.json();

      if (existingItems.length > 0) {
        // Remove from wishlist
        await fetch(`http://localhost:3000/wishlist/${existingItems[0].id}`, {
          method: 'DELETE'
        });
        toast.success("Removed from wishlist");
      } else {
        // Add to wishlist
        await fetch('http://localhost:3000/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            addedAt: new Date().toISOString()
          })
        });
        toast.success("Added to wishlist");
      }

      await fetchWishlist(); // Refresh wishlist from db.json
      return true;
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
      return false;
    }
  };

  // Check if product is in wishlist (from db.json data)
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  // Remove from wishlist in db.json ONLY
  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await fetch(`http://localhost:3000/wishlist/${wishlistItemId}`, {
        method: 'DELETE'
      });
      toast.success("Removed from wishlist");
      await fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
      fetchWishlist,
      loading
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);






















