import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { cartItems, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);
  const isInCart = (id) => cartItems.some((item) => item.id === id);
 


  // ✅ Filter products (with search & category fix)
const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory =
    category === "all" || product.category.toLowerCase().includes(category.toLowerCase());
  return matchesSearch && matchesCategory;
});


  // ✅ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center animate-slideDown">
          Featured Products
        </h2>

        {/* ✅ Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-xl w-full sm:w-1/2 shadow focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-xl w-full sm:w-1/4 shadow focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <option value="all">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        {/* ✅ Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 overflow-hidden animate-fadeUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* ✅ Wishlist Toggle */}
              <button
                onClick={() => {
                  if (!isInWishlist(product.id)) {
                    addToWishlist(product);
                    toast.info(`❤️ ${product.name} added to wishlist!`, {
                      position: "top-right",
                      autoClose: 2000,
                      theme: "dark",
                    });
                  } else {
                    removeFromWishlist(product.id);
                    toast.warn(`❌ ${product.name} removed from wishlist`, {
                      position: "top-right",
                      autoClose: 2000,
                      theme: "colored",
                    });
                  }
                }}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${
                  isInWishlist(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isInWishlist(product.id) ? "fill-current animate-pulse" : ""
                  }`}
                />
              </button>

              <Link to={`/products/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              <div className="p-5">
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-4 capitalize">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-extrabold text-xl">${product.price}</span>
                  <button
                    onClick={() => {
                      if (!isInCart(product.id)) {
                        addToCart(product);
                        toast.success(`🛒 ${product.name} added to cart!`, {
                          position: "top-right",
                          autoClose: 2000,
                          theme: "dark",
                        });
                      } else {
                        toast.info(`${product.name} is already in the cart!`, {
                          position: "top-right",
                          autoClose: 2000,
                          theme: "colored",
                        });
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border hover:bg-blue-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
