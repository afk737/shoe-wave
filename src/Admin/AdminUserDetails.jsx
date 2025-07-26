import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded order details
  const hardcodedOrders = [
    { id: 1, product: "T-Shirt", quantity: 2, total: 40, status: "Delivered" },
    { id: 2, product: "Shoes", quantity: 1, total: 60, status: "Pending" },
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading user details...</p>;
  if (!user) return <p className="text-center text-red-600">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/admin/users" className="text-blue-600 hover:underline mb-4 block">
        &larr; Back to Users
      </Link>
      <h1 className="text-2xl font-bold mb-4">User Details</h1>

      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="font-semibold">Name:</h2>
        <p>{user.name}</p>
        <h2 className="font-semibold mt-2">Email:</h2>
        <p>{user.email}</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-3">Order Details</h2>
        {hardcodedOrders.map((order) => (
          <div key={order.id} className="border-b py-2">
            <p>Order #{order.id}</p>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserDetails;
