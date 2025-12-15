// import { Navigate, Route, Routes } from 'react-router-dom'
// import React from 'react'

// import Homeconnect from './components/HomeConnect'
// import Products from './pages/product'
// import Login from './pages/login'
// import Cart from './pages/Cart'
// import Wishlist from './pages/Wishlist'


// const connect = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Homeconnect/>}/>
//         <Route path='product' element={<Products/>}/>
//         <Route path='login' element={<Login/>}/>
//         <Route path='cart' element={<Cart/>}/>
//        <Route path=' Wishlist' element={< Wishlist/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default connect

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


export default function Connect() {
  return (
    <Routes>
      <Route path="/" element={<HomeConnect />} />
   <Route path="product" element={<Products/>}/>
   <Route path="register" element={<Registration/>}/>
   <Route path="login" element={<Login/>}/>
   <Route path="cart" element={<Cart/>}/>
<Route path="wishlist" element={<Wishlist/>}/>
<Route path="men" element={<Men/>}/>
<Route path="women" element={<Women/>}/>
<Route path="about" element={<About/>}/>

<Route path="exclusive" element={<Exclusive/>}/>
   
    </Routes>
  );
}




// import React from 'react'
// import Login from './pages/login'
// import Registration from './pages/registration'

// import Home from './components/home'
// function Connect() {
//   return (
//     <div> 
      

//       <Routes>
//         <Route path='/' element={<Navigate to="/home" replace />} />
//         <Route path='/register' element={<Registration />} />
//         <Route path='/login' element={<Login/>}/>
//       </Routes>

// {/*             
        
//        <Route 
//        path='/home'
//        element={
//        }<rotectedRoute>
//        <Home/>


//  */}



//     </div>
//   )
// }

// export default Connect


