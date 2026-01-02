import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  HomeIcon, 
  CubeIcon, 
  UserGroupIcon, 
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const adminName = localStorage.getItem("adminName") || "Admin";

  const handleLogout = () => {
    // Clear all admin-related localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    
    toast.success("Logged out successfully");
    
    // Redirect to login with replace
    navigate("/adminlogin", { replace: true });
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: HomeIcon },
    { path: "/admin/products", label: "Products", icon: CubeIcon },
    { path: "/admin/orders", label: "Orders", icon: ShoppingCartIcon },
    { path: "/admin/users", label: "Users", icon: UserGroupIcon },
    { path: "/admin/analytics", label: "Analytics", icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold">V-PERFUMÉ</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Admin Info */}
      <div className="p-6 border-b border-neutral-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{adminName}</p>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition
                  ${isActive 
                    ? 'bg-white text-black font-medium' 
                    : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-neutral-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full py-3 border border-gray-600 rounded-lg hover:bg-white hover:text-black transition"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}