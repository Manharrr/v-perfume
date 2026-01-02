
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  CheckCircleIcon, 
  XCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);//after search
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");//type txt
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, selectedStatus]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      
      // out.. admin 
      const regularUsers = data.filter(user => user.role !== "admin");
      setUsers(regularUsers);
    } catch (error) {
      toast.error("Failed to load users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
  let filtered = users;
  const term = searchTerm.trim().toLowerCase();

  if (term) {
    filtered = filtered.filter(user =>
      (user.name ?? "").toLowerCase().includes(term) ||  //coalescing op
      (user.email ?? "").toLowerCase().includes(term)
    );
  }

  if (selectedStatus !== "all") {
    filtered = filtered.filter(user => user.status === selectedStatus);//active /block
  }

  setFilteredUsers(filtered);
};


  const toggleUserStatus = async (user) => {
    //  blocking admin double-check
    if (user.role === "admin") {
      toast.error("Cannot modify admin user status");
      return;
    }

    // const newStatus = user.status === "active" ? "blocked" : "active";
    // const updatedUser = { ...user, status: newStatus };

    let newStatus;

       if (user.status === "active") {
        newStatus = "blocked";
       } else {
       newStatus = "active";
     }

     const updatedUser = {...user, status: newStatus};

    try {//update
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });

      setUsers(users.map(u => 
        u.id === user.id ? updatedUser : u
      ));

      toast.success(`User ${newStatus === "active" ? "activated" : "blocked"} successfully`);
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  };

  const viewUserDetails = (user) => {
  const ordersText =
    user.orders && user.orders.length > 0
      ? user.orders.map(order =>
          `Order #${order.orderId}: ₹${order.totalAmount} (${order.status})`
        ).join("\n")
      : "No orders";

  alert(
    `User Details:\n\n` +
    `Username: ${user.username}\n` +
    `Email: ${user.email}\n` +
    `Status: ${user.status}\n\n` +
    `Orders:\n${ordersText}`
  );
};

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-gray-400">Manage registered users</p>
      </div>

      {/* Filters */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedStatus === "all" 
                  ? "bg-white text-black" 
                  : "bg-neutral-800 border border-neutral-700 hover:bg-neutral-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus("active")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedStatus === "active" 
                  ? "bg-green-400/20 text-green-400 border border-green-400/30" 
                  : "bg-neutral-800 border border-neutral-700 hover:bg-neutral-700"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setSelectedStatus("blocked")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedStatus === "blocked" 
                  ? "bg-red-400/20 text-red-400 border border-red-400/30" 
                  : "bg-neutral-800 border border-neutral-700 hover:bg-neutral-700"
              }`}
            >
              Blocked
            </button>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-white mb-4"></div>
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  user.status === "active" 
                    ? "bg-green-400/20 text-green-400" 
                    : "bg-red-400/20 text-red-400"
                }`}>
                  {user.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-gray-400">Orders: </span>
                  <span>{user.orders?.length || 0}</span>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => viewUserDetails(user)}
                    className="flex-1 py-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition text-sm"
                  >
                    View Details
                  </button>
                  
                  {user.role !== "admin" && (
                    <button
                      onClick={() => toggleUserStatus(user)}
                      className={`flex-1 py-2 rounded-lg transition text-sm ${
                        user.status === "active"
                          ? "border border-red-400/50 text-red-400 hover:bg-red-400/10"
                          : "border border-green-400/50 text-green-400 hover:bg-green-400/10"
                      }`}
                    >
                      {user.status === "active" ? (
                        <span className="flex items-center justify-center">
                          <XCircleIcon className="w-4 h-4 mr-2" />
                          Block
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <CheckCircleIcon className="w-4 h-4 mr-2" />
                          Activate
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-medium mb-2">No users found</h3>
            <p className="text-gray-400">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {/* Stats */}
      {!loading && filteredUsers.length > 0 && (
        <div className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold mt-2">{users.length}</p>
            </div>
            <div className="text-center p-4">
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold mt-2">
                {users.filter(u => u.status === "active").length}
              </p>
            </div>
            <div className="text-center p-4">
              <p className="text-gray-400 text-sm">Blocked Users</p>
              <p className="text-2xl font-bold mt-2">
                {users.filter(u => u.status === "blocked").length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}