import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>

      <h2 className="mt-4 font-semibold">Orders</h2>

      {user.orders?.length > 0 ? (
        user.orders.map((o) => (
          <div key={o.orderId} className="border p-4 mt-3">
            <p>{o.product}</p>
            <p>₹ {o.price}</p>
          </div>
        ))
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
}
