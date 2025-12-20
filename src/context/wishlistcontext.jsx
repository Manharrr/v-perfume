import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = () => JSON.parse(localStorage.getItem("user"));

 
  const fetchWishlist = async () => {
    const user = getUser();
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/wishlist?userId=${user.id}`
      );
      const data = await res.json();
      setWishlist(data);
    } catch {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // whishlist clikkk
  const toggleWishlist = async (product) => {
    const user = getUser();
    if (!user) {
      toast.error("Please login to manage wishlist");
      return false;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/wishlist?userId=${user.id}&productId=${product.id}`
      );
      const existing = await res.json();

      if (existing.length > 0) {
        await fetch(`http://localhost:3000/wishlist/${existing[0].id}`, {
          method: "DELETE",//already undell delete
        });
        toast.success("Removed from wishlist");
      } else {
        await fetch("http://localhost:3000/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            addedAt: new Date().toISOString(),
          }),
        });
        toast.success("Added to wishlist");
      }

      fetchWishlist();
      return true;
    } catch {
      toast.error("Failed to update wishlist");
      return false;
    }
  };

  //  Check if in wishlist
  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId);

  // Remove item
  const removeFromWishlist = async (id) => {
    try {
      await fetch(`http://localhost:3000/wishlist/${id}`, {
        method: "DELETE",
      });
      fetchWishlist();
    } catch {
      toast.error("Failed to remove from wishlist");
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
