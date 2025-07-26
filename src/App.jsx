import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Products from "./components/Products";

import Login from "./components/Login";
import Register from "./components/Register";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import About from "./Pages/About"
import ProductDetails from "./components/ProductDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./Pages/Contact";


import OrderSuccess from "./Pages/OrderSuccess";
import UserOrders from "./Pages/Order";
import UserProfile from "./Pages/UserPofile";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminAddProduct from "./Admin/AdminAddProduct";
import AdminEditProduct from "./Admin/AdminEditProduct";
import AdminUsers from "./Admin/AdminUsers";
import AdminUserDetails from "./Admin/AdminUserDetails";
import AdminLayout from "./components/AdminLayout";
import ProtectedAdminRoute from "./components/ProductedAdminRoute";








function App() {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
        Loading...
      </div>
    );

  }


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/checkout"
          element={isAuthenticated ? <Checkout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/wishlist"
          element={isAuthenticated ? <Wishlist /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/products/:id"
          element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" replace />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/Order" element={<UserOrders />} />
        <Route path="/UserProfile" element={<UserProfile />} />

        <Route path="/faq" element={<div>FAQ Page</div>} />

        <Route path="/admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/user/:id" element={<AdminUserDetails />} />

        <Route path="/admin" element={<AdminLayout />} />


        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />




      </Routes >

      <ToastContainer position="top-right" theme="dark" autoClose={2000} />

      <Footer />

    </>
  );
}

export default App;
