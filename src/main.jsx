import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/cartcontext.jsx'
import { WishlistProvider } from './context/wishlistcontext.jsx'

// import { AuthProvider } from './context/auth.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      {/* <AuthProvider> */}

      <CartProvider>
        <WishlistProvider>

          <App />
          
        </WishlistProvider>
      </CartProvider>


      {/* </AuthProvider> */}

    </BrowserRouter>
  </StrictMode>,
)

