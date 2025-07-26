import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in user's orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) {
        setError("Please log in to view your orders");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/orders?userId=${user.id}`
        );

        if (!response.ok) throw new Error("Failed to fetch orders");

        const userOrders = await response.json();
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  // ✅ Cancel Order (Delete from JSON Server)
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "DELETE",
      });

      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));

      // ✅ Show success toast
      toast.success("Order cancelled successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });

    } catch (error) {
      console.error("Cancel error:", error);

      toast.error("Failed to cancel the order.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });

    }
  };




  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-400";
      case "processing":
        return "bg-blue-400";
      case "shipped":
        return "bg-indigo-400";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  if (loading) return <div className="text-center py-6">Loading your orders...</div>;
  if (error) return <div className="text-center text-red-600 py-6">{error}</div>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <p className="text-gray-600 mb-4">Total Orders: {orders.length}</p>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg shadow mb-6 bg-white"
        >
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Order #{order.id}</h2>
              <p className="text-gray-500 text-sm">
                Placed on {formatDate(order.createdAt || order.date)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-white text-sm rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <span className="font-bold text-lg">${order.total?.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold mb-2">Items:</h3>
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2 text-gray-700 items-center"
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span>{item.name}</span>
                </div>
                <span>
                  {item.quantity} x ${item.price}
                </span>
              </div>
            ))}

            {order.shippingAddress && (
              <div className="mt-4 text-gray-600">
                <h4 className="font-semibold">Shipping Address:</h4>
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.zipCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              {["pending", "processing"].includes(order.status?.toLowerCase()) && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel Order
                </button>
              )}


              {order.status === "delivered" && (
                <button
                  onClick={() => reorder(order)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default UserOrders;
