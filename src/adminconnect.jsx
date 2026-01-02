
import React from "react";
import {  Routes, Route } from "react-router-dom";


import AdminLayout from "./admin/adminlayout";
import AdminLogin from "./admin/adminlogin";
import AdminDashboard from "./admin/admindash";
import AdminProducts from "./admin/adminproducts";
import AdminUsers from "./admin/adminuser";

function Adminconnect() {
  return (
   
      <Routes>

        <Route path="/adminlogin" element={<AdminLogin/>} />

      
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
       
        </Route>

      </Routes>
  
  );
}

export default Adminconnect;


