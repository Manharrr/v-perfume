import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/Axios";

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
    if (!formData.email.includes("@gmail.com")) return "Please enter a valid email";
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
      const users = await api.get("/users");
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      // ✅ ADD THIS CHECK: Check if user is blocked
      if (user.status === "blocked") {
        toast.error("Your account has been blocked. Please contact support.");
        setLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status // Also store status for future checks
      }));

      toast.success("Login successful");
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
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black cursor-pointer mb-2">
            V-PERFUMÉ
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-black"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-black"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-lg font-bold ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {loading ? "Signing In..." : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-black font-semibold hover:text-gray-700">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button onClick={() => navigate("/")} className="text-gray-600 hover:text-black">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;