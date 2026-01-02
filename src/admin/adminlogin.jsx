
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/Axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
//fetch
    try {
      const admins = await api.get(`/admins?email=${email}`);
      
      if (admins.length === 0) {
        toast.error("No admin found with this email");
        setLoading(false);
        return;
      }

      const admin = admins[0];
      
      if (admin.password !== password) {
        toast.error("Invalid password");
        setLoading(false);
        return;
      }

      
      localStorage.setItem("adminToken", "authenticated");
      localStorage.setItem("adminEmail", admin.email);
      localStorage.setItem("adminName", admin.name);
      localStorage.setItem("adminId", admin.id);
      
      toast.success("Login successful!");
      
      
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 500);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">V-PERFUMÉ</h1>
          <p className="text-gray-400">Admin Portal</p>
        </div>
        
        <form 
          onSubmit={handleLogin}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
   
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : "Sign In"}
            </button>
          </div>
          
       
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 V-PERFUMÉ Admin</p>
        </div>
      </div>
    </div>
  );
}