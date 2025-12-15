// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/auth";

// function Registration() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");

//   const navigate = useNavigate();

//   function validateForm() {
//     if (!username.trim()) return "Username is required";
//     if (username.trim().length < 3) return "Username must be at least 3 characters";
//     if (!email.trim()) return "Email is required";
//     if (!email.endsWith("@gmail.com")) return "Email must be a valid Gmail address";
//     if (!password) return "Password is required";
//     if (password.length < 6) return "Password must be at least 6 characters";
//     if (!confirmPass) return "Confirm password is required";
//     if (password !== confirmPass) return "Passwords do not match";
//     return null;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const error = validateForm();

//     if (error) {
//       toast.error(error);
//       return;
//     }

//     const newUser = { username, email, password };

//     try {
//       await axios.post("http://localhost:3000/users", newUser);
//       toast.success("Registration Successful!");

//       setTimeout(() => navigate("/login"), 1200);

//     } catch (err) {
//       toast.error("Error registering user");
//     }
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
//           Create Account
//         </h2>

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

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
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none transition"
//           value={confirmPass}
//           onChange={(e) => setConfirmPass(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md"
//         >
//           Register
//         </button>

//         <p className="text-center mt-4 text-gray-600">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 font-medium cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Registration;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    if (!formData.username.trim()) return "Username is required";
    if (formData.username.trim().length < 3) return "Username must be at least 3 characters";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.includes("@")) return "Please enter a valid email";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (!formData.confirmPassword) return "Confirm password is required";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return null;
  };

  const checkExistingUser = async (email) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data || [];
      return users.some(user => user.email === email);
    } catch (error) {
      console.error("Error checking existing user:", error);
      return false;
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

    try {
      // Check if user already exists
      const userExists = await checkExistingUser(formData.email);
      if (userExists) {
        toast.error("User with this email already exists");
        setLoading(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now(), // Generate unique ID
        username: formData.username,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      // Save to JSON server
      const response = await axios.post("http://localhost:3000/users", newUser);
      
      if (response.status === 201) {
        toast.success("Registration Successful!");
        
        // Store user in localStorage for auto-login
        localStorage.setItem('user', JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }));
        
        // Redirect to home after delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
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
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-black">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
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
                  placeholder="Enter password (min 6 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
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
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-black font-semibold hover:text-gray-700 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
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

export default Registration;
