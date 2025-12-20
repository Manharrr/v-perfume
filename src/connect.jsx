import { Routes, Route, Navigate } from "react-router-dom";
import HomeConnect from "./components/HomeConnect";
import Products from "./pages/product";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Men from "./pages/mens";
import Women from "./pages/women";
import About from "./pages/about";
import Exclusive from "./pages/exclusive";
import ProductDetails from "./pages/productdetails";
import Payment from "./pages/payment";
import NotFound from "./pages/notfound";


export default function Connect() {
  return (
    <Routes>
      <Route path="/" element={<HomeConnect />} />
      <Route path="product" element={<Products />} />
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="men" element={<Men />} />
      <Route path="women" element={<Women />} />
      <Route path="about" element={<About />} />
      <Route path="exclusive" element={<Exclusive />} />

      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="payment" element={<Payment />} />
      <Route path="*" element={<NotFound />} />



    </Routes>

  );
}


