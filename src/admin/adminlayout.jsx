
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./adminsidebar";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

export default function AdminLayout() {
  const { user } = useAuth();

  // If user is not logged in or is not staff, redirect to login
  if (!user || !user.is_staff) {
    return <Navigate to="/login" replace />;
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