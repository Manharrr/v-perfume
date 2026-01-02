
import { useEffect } from "react";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./adminsidebar";
import { toast } from "react-hot-toast";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      if (!token && location.pathname !== "/adminlogin") {
        navigate("/adminlogin", { replace: true });
        toast.error("Please login to continue");
      }
    };

    checkAuth();
  }, [navigate, location]);

  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/adminlogin" replace />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}