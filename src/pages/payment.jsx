import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useOrders } from "../context/ordercontext";
import { useAuth } from "../context/auth";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import api, { getMediaUrl } from "../utils/api";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, fetchCart } = useCart(); // ✅ clearCart remove cheythu, fetchCart add cheythu
  const { createOrder } = useOrders();
  const { user } = useAuth();

  const buyNowProduct = location.state?.product;
  const buyNowQty = location.state?.quantity || 1;
  const isBuyNow = !!buyNowProduct; // ✅ top level define cheythu

  const items = isBuyNow
    ? [{ ...buyNowProduct, quantity: buyNowQty }]
    : cart;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/product");
    }
  }, [user, items, navigate]);


  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (form.mobile.length !== 10) return "Valid 10-digit mobile number is required";
    if (!form.address.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.state.trim()) return "State is required";
    if (form.pincode.length !== 6) return "Valid 6-digit pincode is required";
    return null;
  };

  const handleRazorpayPayment = async (orderId) => {
    try {
      const res = await api.post("/api/payments/create/", { order_id: orderId });
      const { razorpay_order_id, amount, key } = res;

      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: "V-Perfumes",
        description: "Perfume Purchase",
        order_id: razorpay_order_id,
        handler: async (response) => {
          try {
            setLoading(true);
            await api.post("/api/payments/verify/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment Successful! 🎉");

            // ✅ Backend is_buy_now check cheythu cart clear cheyyunnu
            // Frontend clearCart() venam illa
            // Cart UI update cheyyaan fetchCart() mathram
            await fetchCart();

            navigate(`/order/${orderId}`);
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          contact: form.mobile,
          email: user?.email || "",
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      toast.error("Could not initiate Razorpay payment");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Processing...");

    try {
      const orderData = {
        shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Online",
        phone: form.mobile,
        customerName: form.name,
      };

      const response = await createOrder(orderData, isBuyNow, buyNowProduct);

      if (!response) {
        throw new Error("Failed to create order");
      }

      const orderId = response.order_id || response.id;

      if (paymentMethod === "online") {
        toast.dismiss(toastId);
        await handleRazorpayPayment(orderId);
      } else {
        // ✅ COD — backend already cart clear cheyyunnu (cart checkout aanel)
        // Buy now aanel backend clear cheyyilla — correct
        toast.dismiss(toastId);
        toast.success("Order placed successfully! 🎉");
        await fetchCart(); // Cart UI refresh
        navigate(`/order/${orderId}`);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Order error:", error);
      toast.error("Failed to place order");
      setLoading(false);
    }
  };

  if (!user || items.length === 0) return null;




// handler: async function (response) {

//   try {

//     await api.post(
//       "/api/payments/verify/",
//       {
//         razorpay_order_id:
//           response.razorpay_order_id,

//         razorpay_payment_id:
//           response.razorpay_payment_id,

//         razorpay_signature:
//           response.razorpay_signature,
//       }
//     );

//     alert("Payment Successful");

//     navigate("/order");

//   } catch (error) {

//     console.log(error);

//     alert("Payment verification failed");
//   }
// }



  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-black tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Street Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Flat/House No., Street, Area"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digits"
                      value={form.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-black bg-gray-50"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "cod" ? "border-black" : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 bg-black rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-black">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive</p>
                    </div>
                  </div>
                </label>

                <label
                  className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === "online"
                      ? "border-black bg-gray-50"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "online" ? "border-black" : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "online" && (
                        <div className="w-2.5 h-2.5 bg-black rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-black">Online Payment</p>
                      <p className="text-sm text-gray-500">Razorpay / Card / UPI</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {isBuyNow && (
                <div className="mb-4 px-3 py-1 bg-black text-white text-xs rounded-full inline-block">
                  Buy Now
                </div>
              )}

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={getMediaUrl(item.image)}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/60x60?text=Perfume";
                      }}
                    />
                    <div className="flex-grow min-w-0">
                      <p className="font-semibold text-sm truncate text-black">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                      <p className="text-sm font-bold text-black">
                        ₹{item.price * (item.quantity || 1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-extrabold text-2xl text-black pt-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-5 rounded-2xl font-bold mt-10 bg-black text-white hover:bg-neutral-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? "Processing..." : `Pay ₹${total}`}
              </button>

              <p className="text-center text-xs text-gray-400 mt-6">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useCart } from "../context/cartcontext";
// import { useOrders } from "../context/ordercontext";
// import { useAuth } from "../context/auth";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import api, { getMediaUrl } from "../utils/api";

// function Payment() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cart, clearCart } = useCart();
//   const { createOrder } = useOrders();
//   const { user } = useAuth();

//   // Buy now from product page
//   const buyNowProduct = location.state?.product;
//   const buyNowQty = location.state?.quantity || 1;

//   const items = buyNowProduct
//     ? [{ ...buyNowProduct, quantity: buyNowQty }]
//     : cart;

//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // Total price
//   const total = items.reduce(
//     (sum, item) => sum + item.price * (item.quantity || 1),
//     0
//   );

//   useEffect(() => {
//     if (!user) {
//       toast.error("Please login to continue");
//       navigate("/login");
//       return;
//     }

//     if (items.length === 0) {
//       toast.error("Your cart is empty");
//       navigate("/product");
//     }
//   }, [user, items, navigate]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     if (!form.name.trim()) return "Name is required";
//     if (form.mobile.length !== 10) return "Valid 10-digit mobile number is required";
//     if (!form.address.trim()) return "Address is required";
//     if (!form.city.trim()) return "City is required";
//     if (!form.state.trim()) return "State is required";
//     if (form.pincode.length !== 6) return "Valid 6-digit pincode is required";
//     return null;
//   };

//   const handleRazorpayPayment = async (orderId) => {
//     try {
//       // 1. Create Razorpay Order in Backend
//       const res = await api.post("/api/payments/create/", { order_id: orderId });
//       const { razorpay_order_id, amount, key } = res;

//       // 2. Configure Razorpay Options
//       const options = {
//         key: key,
//         amount: amount,
//         currency: "INR",
//         name: "V-Perfumes",
//         description: "Perfume Purchase",
//         order_id: razorpay_order_id,
//         handler: async (response) => {
//           try {
//             setLoading(true);
//             const verifyRes = await api.post("/api/payments/verify/", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });
            
//             toast.success("Payment Successful!");
//             clearCart();
//             navigate(`/order/${orderId}`);
//           } catch (err) {
//             console.error("Verification error:", err);
//             toast.error("Payment verification failed");
//           } finally {
//             setLoading(false);
//           }
//         },
//         prefill: {
//           name: form.name,
//           contact: form.mobile,
//           email: user?.email || "",
//         },
//         theme: {
//           color: "#000000",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Razorpay error:", err);
//       toast.error("Could not initiate Razorpay payment");
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const error = validateForm();
//     if (error) {
//       toast.error(error);
//       return;
//     }

//     setLoading(true);
//     const toastId = toast.loading("Processing...");

//     try {
//       const orderData = {
//         shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
//         paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Online",
//         phone: form.mobile,
//         customerName: form.name
//       };

//       const isBuyNow = !!buyNowProduct;
//       const response = await createOrder(orderData, isBuyNow, buyNowProduct);

//       if (!response) {
//         throw new Error("Failed to create order");
//       }

//       const orderId = response.order_id || response.id;

//       if (paymentMethod === "online") {
//         toast.dismiss(toastId);
//         await handleRazorpayPayment(orderId);
//       } else {
//         toast.dismiss(toastId);
//         toast.success("Order placed successfully!");
//         if (!isBuyNow) clearCart();
//         navigate(`/order/${orderId}`);
//       }
//     } catch (error) {
//       toast.dismiss(toastId);
//       console.error("Order error:", error);
//       toast.error("Failed to place order");
//       setLoading(false);
//     }
//   };

//   if (!user || items.length === 0) return null;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
//         <h1 className="text-4xl font-extrabold text-center mb-12 text-black tracking-tight">Checkout</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* Form Section */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                 <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
//                 Shipping Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Enter your full name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     placeholder="10-digit mobile number"
//                     value={form.mobile}
//                     onChange={handleChange}
//                     maxLength="10"
//                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
//                     required
//                   />
//                 </div>

//                 <div className="md:col-span-2 space-y-1">
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Street Address</label>
//                   <textarea
//                     name="address"
//                     placeholder="Flat/House No., Street, Area"
//                     value={form.address}
//                     onChange={handleChange}
//                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all min-h-[100px]"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="City"
//                     value={form.city}
//                     onChange={handleChange}
//                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">State</label>
//                     <input
//                       type="text"
//                       name="state"
//                       placeholder="State"
//                       value={form.state}
//                       onChange={handleChange}
//                       className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pincode</label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       placeholder="6-digits"
//                       value={form.pincode}
//                       onChange={handleChange}
//                       maxLength="6"
//                       className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                 <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
//                 Payment Method
//               </h2>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <label className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
//                   paymentMethod === "cod" ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-300"
//                 }`}>
//                   <input
//                     type="radio"
//                     name="payment"
//                     className="sr-only"
//                     checked={paymentMethod === "cod"}
//                     onChange={() => setPaymentMethod("cod")}
//                   />
//                   <div className="flex items-center gap-4">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-black" : "border-gray-300"}`}>
//                       {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
//                     </div>
//                     <div>
//                       <p className="font-bold text-lg text-black">Cash on Delivery</p>
//                       <p className="text-sm text-gray-500">Pay when you receive</p>
//                     </div>
//                   </div>
//                 </label>

//                 <label className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
//                   paymentMethod === "online" ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-300"
//                 }`}>
//                   <input
//                     type="radio"
//                     name="payment"
//                     className="sr-only"
//                     checked={paymentMethod === "online"}
//                     onChange={() => setPaymentMethod("online")}
//                   />
//                   <div className="flex items-center gap-4">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-black" : "border-gray-300"}`}>
//                       {paymentMethod === "online" && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
//                     </div>
//                     <div>
//                       <p className="font-bold text-lg text-black">Online Payment</p>
//                       <p className="text-sm text-gray-500">Razorpay / Card / UPI</p>
//                     </div>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
//               <h3 className="text-xl font-bold mb-6">Order Summary</h3>

//               <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
//                 {items.map((item, index) => (
//                   <div key={index} className="flex gap-4">
//                     <img 
//                       src={getMediaUrl(item.image)} 
//                       className="w-16 h-16 object-cover rounded-lg border border-gray-100" 
//                       alt={item.name}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://placehold.co/60x60?text=Perfume";
//                       }}
//                     />
//                     <div className="flex-grow min-w-0">
//                       <p className="font-semibold text-sm truncate text-black">{item.name}</p>
//                       <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
//                       <p className="text-sm font-bold text-black">₹{item.price * (item.quantity || 1)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-3 border-t border-gray-100 pt-6">
//                 <div className="flex justify-between text-gray-500">
//                   <span>Subtotal</span>
//                   <span>₹{total}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Shipping</span>
//                   <span className="text-green-600 font-medium">Free</span>
//                 </div>
//                 <div className="flex justify-between font-extrabold text-2xl text-black pt-4">
//                   <span>Total</span>
//                   <span>₹{total}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full py-5 rounded-2xl font-bold mt-10 bg-black text-white hover:bg-neutral-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
//               >
//                 {loading ? "Processing..." : `Pay ₹${total}`}
//               </button>

//               <p className="text-center text-xs text-gray-400 mt-6">
//                 Secure SSL Encrypted Payment
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Payment;