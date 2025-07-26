import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-blue-600 text-white text-center p-6 rounded-lg shadow hover:bg-blue-700"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/users"
          className="bg-green-600 text-white text-center p-6 rounded-lg shadow hover:bg-green-700"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
