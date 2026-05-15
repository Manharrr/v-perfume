import { useEffect, useState } from "react";
import { 
  CurrencyRupeeIcon,
  CubeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  NoSymbolIcon
} from "@heroicons/react/24/outline";
import api from "../utils/api";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    blockedUsers: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const dashboardData = await api.get("/api/admin/dashboard/");
      const productsData = await api.get("/api/admin/products/");

      setStats({
        totalRevenue: dashboardData.total_revenue || 0,
        totalProducts: productsData.length || 0,
        totalUsers: dashboardData.total_users || 0,
        blockedUsers: 0, // Would require another API call or a specific field, defaulting to 0 for now
        totalOrders: dashboardData.total_orders || 0,
        blocked_users: dashboardData.blocked_users || 0  ,
      });

    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: "text-green-400"
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: CubeIcon,
      color: "text-blue-400"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: UserGroupIcon,
      color: "text-purple-400"
    },
    {
      title: "Blocked Users",
      value: stats.blocked_users,
      icon: NoSymbolIcon,
      color: "text-red-400"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBagIcon,
      color: "text-yellow-400"
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400">Key statistics </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {loading ? (
          // Loading skeleton
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg"></div>
                <div className="w-20 h-6 bg-neutral-800 rounded"></div>
              </div>
              <div className="mt-4">
                <div className="w-3/4 h-8 bg-neutral-800 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-neutral-800 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-neutral-800`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{card.value}</h3>
                <p className="text-gray-400 text-sm">{card.title}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}