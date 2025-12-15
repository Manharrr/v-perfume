import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/auth.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}

    </BrowserRouter>
  </StrictMode>,
)


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// // import { AuthProvider } from "./context/auth";
// // import { CartProvider } from "./context/cartcontext";
// // import { WishlistProvider } from "./context/wishlistcontext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           <WishlistProvider>
//             <App />
//           </WishlistProvider>
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
