import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's orders
  const fetchUserOrders = async () => {
    if (!user) {
      throw new Error('User must be logged in to fetch orders');
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/orders?userId=${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const userOrders = await response.json();
      setOrders(userOrders);
      return userOrders;
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const createOrder = async (orderData) => {
    if (!user) {
      throw new Error('User must be logged in to create an order');
    }

    try {
      const newOrder = {
        ...orderData,
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const createdOrder = await response.json();
      
 
      setOrders(prev => [createdOrder, ...prev]);
      
      return { success: true, order: createdOrder };
      
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, message: error.message };
    }
  };


  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      
   
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      return { success: true, order: updatedOrder };
      
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, message: error.message };
    }
  };


  const cancelOrder = async (orderId) => {
    return updateOrderStatus(orderId, 'cancelled');
  };


  const getOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Order not found');
      }

      const order = await response.json();
      
  
      if (order.userId !== user?.id) {
        throw new Error('Access denied: This order does not belong to you');
      }
      
      return { success: true, order };
      
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, message: error.message };
    }
  };

 
  const reorder = async (orderId) => {
    try {
      const { success, order, message } = await getOrderById(orderId);
      
      if (!success) {
        return { success: false, message };
      }

   
      const reorderData = {
        items: order.items,
        total: order.total,
        shippingAddress: order.shippingAddress,
      
      };

      return await createOrder(reorderData);
      
    } catch (error) {
      console.error('Error reordering:', error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    orders,
    loading,
    fetchUserOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getOrderById,
    reorder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};