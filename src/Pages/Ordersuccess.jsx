import React from "react";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg">Thank you for your purchase.</p>
    </div>
  );
};

export default OrderSuccess;
