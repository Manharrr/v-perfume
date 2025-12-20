import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = async (item, change) => {
    const newQty = Math.max(1, item.quantity + change);

    await updateQuantity(item.id, newQty);
  };
  //price total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }


    navigate("/payment");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/product")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-6 border p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded"
                  />

                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.brand || "Premium Brand"}
                    </p>
                    <p className="text-xl font-bold mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="w-8 h-8 border rounded"
                      >
                        -
                      </button>

                      <span className="font-bold">{item.quantity}</span>

                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="w-8 h-8 border rounded"
                      >
                        +
                      </button>

                      <span className="text-gray-600">
                        Total: ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Total Amount</h2>
                <span className="text-2xl font-bold">₹{total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
