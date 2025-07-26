import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading products...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <Link
        to="/admin/add-product"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add New Product
      </Link>

      <table className="w-full mt-4 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2 space-x-2">
                <Link
                  to={`/admin/edit-product/${p.id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
