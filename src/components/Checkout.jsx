import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!address) {
      alert("Please enter your shipping address");
      return;
    }

    const newOrder = {
      userId: user.id,
      items: cartItems,
      total: totalAmount,
      address: address,
      status: "Pending",
      date: new Date().toLocaleString()
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });

      if (response.ok) {
        clearCart(); 
        navigate("/order-success"); 
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Order Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="bg-white shadow-md p-4 rounded mb-6">
            <h3 className="text-lg font-semibold mb-3">Your Items</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded mb-6">
            <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
            <textarea
              className="w-full border rounded p-2"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address..."
            />
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 text-white py-3 rounded text-lg font-bold hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
