import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { 
  ArrowLeftIcon, 
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/api/admin/users/${id}/`);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate("/admin/users")}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Users
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center shadow-xl">
            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-neutral-700">
              <UserCircleIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{user.name || user.username}</h2>
            <p className="text-gray-500 text-sm">{user.is_staff ? "Administrator" : "Customer"}</p>
            
            <div className={`mt-4 inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              user.is_active ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
            }`}>
              {user.is_active ? 'Active Account' : 'Blocked'}
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Account Information</h3>
            
            <div className="flex items-center gap-4 text-sm">
              <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Email Address</p>
                <p className="text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Joined On</p>
                <p className="text-white">{new Date(user.created_at || user.date_joined).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <ShieldCheckIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Staff Status</p>
                <p className="text-white">{user.is_staff ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Orders Table */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-white">Order History</h3>
              </div>
              <span className="bg-neutral-800 px-3 py-1 rounded-lg text-xs text-gray-400">
                {user.orders?.length || 0} Total Orders
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-neutral-800">
                    <th className="p-6">Order ID</th>
                    <th className="p-6">Date</th>
                    <th className="p-6">Amount</th>
                    <th className="p-6">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {user.orders?.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition">
                      <td className="p-6 font-mono text-gray-300">#{order.id}</td>
                      <td className="p-6 text-gray-400">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="p-6 font-bold text-white">₹{order.total_amount}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          order.status === 'Delivered' ? 'bg-green-400/10 text-green-400' :
                          order.status === 'Cancelled' ? 'bg-red-400/10 text-red-400' :
                          'bg-yellow-400/10 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!user.orders || user.orders.length === 0) && (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-sm">This user hasn't placed any orders yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
