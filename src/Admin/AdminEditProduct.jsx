import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update product.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading product...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;

