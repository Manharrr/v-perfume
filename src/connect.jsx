import { Routes, Route } from "react-router-dom";
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
import Order from "./pages/order";
import OrderDetails from "./pages/orderdetails";
import NotFound from "./pages/notfound";

import AdminLayout from "./admin/adminlayout";
import AdminLogin from "./admin/adminlogin";
import AdminDashboard from "./admin/admindash";
import AdminProducts from "./admin/adminproducts";
import AdminUsers from "./admin/adminuser";
import AdminOrders from "./admin/adminorder";
import AdminOrderDetails from "./admin/adminorderdetails";
import Analytics from "./admin/analytics";
import AdminProductDetails from "./admin/adminproductdetails";
import UserDetails from "./admin/userdetails";

export default function Connect() {
  return (
    <Routes>
     
      <Route path="/" element={<HomeConnect />} />
      <Route path="/product" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/exclusive" element={<Exclusive />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order/:id" element={<OrderDetails />} />

      
      <Route path="/adminlogin" element={<AdminLogin />} />
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />
        <Route path="analytics" element={<Analytics/>}/>
        <Route path="products/:id" element={<AdminProductDetails/>}/>
        <Route path="/admin/users/:id" element={<UserDetails/>}/>

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}