import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin-Dashboard", label: "Dashboard" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/add-product", label: "Add Product" },
    { path: "/admin/users", label: "Users" }
  ];

  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded ${
                location.pathname === item.path ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ✅ Content Area */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
