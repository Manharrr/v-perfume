// import React from 'react'

// function Login() {
//   return (
//     <div>
//       <h1>this is login pagggggg</h1>


//     </div>
//   )
// }

// export default Login
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.includes("@")) return "Please enter a valid email";
    if (!formData.password) return "Password is required";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      // Fetch users from JSON server
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data || [];
      
      // Find user with matching credentials
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));

      toast.success("Login successful! Redirecting...");
      
      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold text-black cursor-pointer mb-2"
            onClick={() => navigate("/")}
          >
            V-PERFUMÉ
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-black">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-lg font-bold transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-black font-semibold hover:text-gray-700 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2 font-medium">Demo Credentials:</p>
          <p className="text-xs text-gray-500">Email: user@example.com</p>
          <p className="text-xs text-gray-500">Password: password123</p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   async function handleLogin(e) {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:3000/users");
//       const user = res.data.find(
//         (u) => u.email === email && u.password === password
//       );

//       if (!user) {
//         toast.error("Invalid email or password");
//         return;
//       }

//       toast.success("Login successful");
//       navigate("/");
//     } catch (err) {
//       toast.error("Login failed");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-6"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-black text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// // import Login from "./pages/Login";


// function Login() {
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   async function handleLogin(e) {
//     e.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:3000/users");
//       const users = res.data;

//       // Check if email exists
//       const userFound = users.find(
//         (u) => u.email === email && u.password === password
//       );

//       if (!userFound) {
//         toast.error("Invalid email or password");
//         return;
//       }

//       toast.success("Login Successful!");
//       setTimeout(() => navigate("/home"), 1000);

//     } catch (err) {
//       toast.error("Error logging in");
//     }
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
//           Welcome Back
//         </h2>

//         <input
//           type="email"
//           placeholder="Gmail Address"
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none transition"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md"
//         >
//           Login
//         </button>

//         <p className="text-center mt-4 text-gray-600">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-600 font-medium cursor-pointer hover:underline"
//             onClick={() => navigate("/home")}
//           >
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import React, { useEffect, useState } from "react";
// import api from "../api/axiosInstance"; // or axios
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth";


// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { user, login } = useAuth();

//   // if already logged in, go to /home
//   useEffect(() => {
//     if (user) navigate("/home", { replace: true });
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return toast.error("Enter email and password");

//     try {
//       const res = await api.get("/users", { params: { email, password } });
//       if (res.data && res.data.length > 0) {
//         const found = res.data[0];
//         login(found);              // update context + localStorage via AuthProvider
//         toast.success("Login successful");
//         navigate("/home", { replace: true });
//       } else {
//         toast.error("Invalid credentials");
//       }
//     } catch (err) {
//       toast.error("Login failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded mb-3" />
//         <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded mb-4" />
//         <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">Login</button>
//       </form>
//     </div>
//   );
// }
