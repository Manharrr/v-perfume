import { useEffect, useState } from "react";
import { 
  UserGroupIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import api from "../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_orders: 0,
    total_revenue: 0,
    top_products: []
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [dashStats, orders] = await Promise.all([
        api.get("/api/admin/dashboard/"),
        api.get("/api/admin/orders/")
      ]);
      
      setStats(dashStats);
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: UserGroupIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Total Orders",
      value: stats.total_orders,
      icon: ShoppingCartIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.total_revenue || 0).toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-neutral-800">
                  <th className="pb-4 pr-4">Customer</th>
                  <th className="pb-4 pr-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-800/50">
                    <td className="py-4 pr-4">
                      <p className="font-medium text-sm">{order.user_email}</p>
                      <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 pr-4 font-bold text-sm">₹{order.total_amount}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-400/10 text-green-400' :
                        order.status === 'Shipped' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Top Selling Products</h2>
          <div className="space-y-6">
            {stats.top_products?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">
                    {idx + 1}
                  </div>
                  <p className="font-medium">{item.perfume__name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.total_sold}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Units Sold</p>
                </div>
              </div>
            ))}
            {(!stats.top_products || stats.top_products.length === 0) && (
              <p className="text-center text-gray-500 py-4">No data available yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
