// import { useEffect, useState } from "react";
// import {
//   UserGroupIcon,
//   CubeIcon,
//   ShoppingCartIcon,
//   CurrencyRupeeIcon
// } from "@heroicons/react/24/outline";
// import api from "../../api/Axios";


// // Extract all orders + total revenue
// const extractOrdersAndRevenue = (users) => {
//   let orders = [];
//   let revenue = 0;

//   users.forEach(user => {
//     if (!Array.isArray(user.orders)) return;//empty return

//     user.orders.forEach(order => {
//       orders.push({
//         ...order,
//         userName: user.username || user.email,
//         userId: user.id
//       });

//       revenue += order.totalAmount || 0;
//     });
//   });

//   return { orders, revenue };
// };

// //  Current month revenue data ONLY
// const getCurrentMonthRevenue = (orders) => {
//   const now = new Date();
//   const currentMonth = now.getMonth();
//   const currentYear = now.getFullYear();

//   return orders.filter(order => {
//     const date = new Date(order.orderDate || order.createdAt);
//     return (
//       date.getMonth() === currentMonth &&
//       date.getFullYear() === currentYear
//     );
//   });
// };

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     products: 0,
//     orders: 0,
//     revenue: 0
//   });

//   const [recentOrders, setRecentOrders] = useState([]);
//   const [monthOrders, setMonthOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const users = await api.get("/users");
//       const products = await api.get("/products");

//       const { orders, revenue } = extractOrdersAndRevenue(users);

//       const regularUsers = users.filter(
//         u => u.role !== "admin"
//       );//no admin

//       const latestOrders = [...orders]
//         .sort(
//           (a, b) =>
//             new Date(b.orderDate || b.createdAt) -
//             new Date(a.orderDate || a.createdAt)
//         )
//         .slice(0, 5);

//       const currentMonthOrders = getCurrentMonthRevenue(orders);

//       setStats({
//         users: regularUsers.length,
//         products: products.length,
//         orders: orders.length,
//         revenue
//       });

//       setRecentOrders(latestOrders);
//       setMonthOrders(currentMonthOrders);
//     } catch (err) {
//       console.error("Dashboard error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     {
//       title: "Total Users",
//       value: stats.users,
//       icon: UserGroupIcon,
//       color: "text-blue-400",
//       bg: "bg-blue-400/10"
//     },
//     {
//       title: "Total Products",
//       value: stats.products,
//       icon: CubeIcon,
//       color: "text-green-400",
//       bg: "bg-green-400/10"
//     },
//     {
//       title: "Total Orders",
//       value: stats.orders,
//       icon: ShoppingCartIcon,
//       color: "text-purple-400",
//       bg: "bg-purple-400/10"
//     },
//     {
//       title: "Total Revenue",
//       value: `₹${stats.revenue.toLocaleString()}`,
//       icon: CurrencyRupeeIcon,
//       color: "text-yellow-400",
//       bg: "bg-yellow-400/10"
//     }
//   ];

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <p className="text-gray-400">
//           Welcome back, {localStorage.getItem("adminName") || "Admin"}
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {statCards.map((card, i) => {
//           const Icon = card.icon;

//           return (
//             <div
//               key={i}
//               className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-gray-400 text-sm">{card.title}</p>
//                   <h3 className="text-2xl font-bold mt-2">
//                     {card.value}
//                   </h3>
//                 </div>
//                 <div className={`${card.bg} p-3 rounded-lg`}>
//                   <Icon className={`w-6 h-6 ${card.color}`} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Current Month Revenue + Orders */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Current Month Revenue */}
//         <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Current Month Revenue
//           </h2>

//           {monthOrders.length ? (
//             monthOrders.map((order, i) => (
//               <div key={i} className="mb-3">
//                 <div className="flex justify-between text-sm">
//                   <span>{order.userName}</span>
//                   <span>₹{order.totalAmount}</span>
//                 </div>
//                 <div className="h-2 bg-yellow-500 rounded mt-1 w-full" />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">No orders this month</p>
//           )}
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
//           <div className="p-6 border-b border-neutral-800">
//             <h2 className="text-xl font-semibold">Recent Orders</h2>
//           </div>

//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-400 text-sm border-b border-neutral-800">
//                 <th className="p-4">Customer</th>
//                 <th className="p-4">Order</th>
//                 <th className="p-4">Amount</th>
//                 <th className="p-4">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : recentOrders.length ? (
//                 recentOrders.map(order => (
//                   <tr
//                     key={order.id}
//                     className="border-b border-neutral-800"
//                   >
//                     <td className="p-4">{order.userName}</td>
//                     <td className="p-4 text-sm">
//                       {order.orderId || order.id?.slice(0, 8)}
//                     </td>
//                     <td className="p-4">
//                       ₹{order.totalAmount || 0}
//                     </td>
//                     <td className="p-4 text-sm">
//                       {order.status || "Pending"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center">
//                     No orders found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { 
  UserGroupIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";
import api from "../../api/Axios"; // Use axios

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    growth: {
      users: 0,
      revenue: 0
    }
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      
      const users = await api.get("/users");
      
      
      const products = await api.get("/products");
      
      
      let allOrders = [];
      let totalRevenue = 0;
      //order
      users.forEach(user => {    
        if (user.orders && Array.isArray(user.orders)) {
          allOrders = [...allOrders, ...user.orders.map(order => ({
            ...order,
            userName: user.username || user.email,
            userId: user.id
          }))];
          
          // revenue
          user.orders.forEach(order => {
            if (order.totalAmount) {
              totalRevenue += order.totalAmount;
            }
          });
        }
      });

      // Sort orders by date 
      const sortedOrders = [...allOrders]
        .sort((a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt))
        .slice(0, 5);

      // Filter out admins 
      const regularUsers = users.filter(user => 
        !user.email?.includes("admin@") && user.role !== "admin"
      );

      // Calculate growth (simplified for demo)
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastMonthOrders = allOrders.filter(order => 
        new Date(order.orderDate || order.createdAt) >= lastMonth
      );
      const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => 
        sum + (order.totalAmount || 0), 0
      );
      const previousMonthRevenue = totalRevenue - lastMonthRevenue;
      const revenueGrowth = previousMonthRevenue > 0 
        ? Math.round(((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
        : 100;

      setStats({
        users: regularUsers.length,
        products: products.length,
        orders: allOrders.length,
        revenue: totalRevenue,
        growth: {
          users: Math.round(regularUsers.length * 0.12), // 12% growth for demo
          revenue: revenueGrowth
        }
      });
      
      setRecentOrders(sortedOrders);
      setChartData(generateMonthlyData(allOrders));
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMonthlyData = (orders) => {
    // Group orders by month
    const monthlyData = {};
    
    orders.forEach(order => {
      const date = new Date(order.orderDate || order.createdAt);
      const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          revenue: 0,
          orders: 0
        };
      }
      
      monthlyData[monthYear].revenue += order.totalAmount || 0;
      monthlyData[monthYear].orders += 1;
    });

    // Convert to array and get last 6 months
    const dataArray = Object.values(monthlyData);
    return dataArray.slice(-6);
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: UserGroupIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      growth: stats.growth.users
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: CubeIcon,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      growth: 5 // Static for demo
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingCartIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      growth: Math.round(stats.orders * 0.15) // 15% of total
    },
    {
      title: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      growth: stats.growth.revenue
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {localStorage.getItem("adminName") || "Admin"}! </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.growth >= 0;
          
          return (
            <div 
              key={index}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
                  
                  <div className="flex items-center mt-3">
                    <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{card.growth}%
                    </span>
                    <span className="text-gray-400 text-sm ml-2">from last month</span>
                  </div>
                </div>
                
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Revenue Overview</h2>
            <span className="text-sm text-gray-400">Last 6 months</span>
          </div>
          
          {chartData.length > 0 ? (
            <div className="space-y-4">
              {chartData.map((month, idx) => {
                const maxRevenue = Math.max(...chartData.map(m => m.revenue));
                const percentage = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
                
                return (
                  <div key={idx} className="flex items-center">
                    <div className="w-16 text-gray-400">{month.month}</div>
                    <div className="flex-1 ml-4">
                      <div className="flex items-center">
                        <div 
                          className="h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded"
                          style={{ width: `${percentage}%` }}
                        ></div>
                        <span className="ml-4 text-sm">₹{month.revenue.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {month.orders} orders
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No revenue data available
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <p className="text-sm text-gray-400 mt-1">Latest customer orders</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-neutral-800">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400">
                      Loading orders...
                    </td>
                  </tr>
                ) : recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 transition"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.userName}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.orderDate || order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {order.orderId || order.id?.slice(0, 8)}
                      </td>
                      <td className="p-4 font-medium">₹{order.totalAmount?.toLocaleString() || "0"}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' ? 'bg-green-400/20 text-green-400' :
                          order.status === 'Shipped' ? 'bg-blue-400/20 text-blue-400' :
                          order.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                          order.status === 'Cancelled' ? 'bg-red-400/20 text-red-400' :
                          'bg-gray-400/20 text-gray-400'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-neutral-800 text-center">
            <button 
              onClick={() => window.location.href = '/admin/orders'}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              View all orders →
            </button>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Chanel No. 5</span>
              <span className="font-medium">12 orders</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Valentino Born</span>
              <span className="font-medium">9 orders</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tom Ford Leather</span>
              <span className="font-medium">7 orders</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">User Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Users</span>
              <span className="font-medium text-green-400">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">New Signups</span>
              <span className="font-medium">{Math.round(stats.users * 0.08)} this month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg. Order Value</span>
              <span className="font-medium">
                ₹{stats.orders > 0 ? Math.round(stats.revenue / stats.orders) : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/admin/products'}
              className="w-full text-left p-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg transition"
            >
              Add New Product
            </button>
            <button 
              onClick={() => window.location.href = '/admin/users'}
              className="w-full text-left p-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg transition"
            >
              View All Users
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}
