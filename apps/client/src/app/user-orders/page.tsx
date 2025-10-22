"use client";
import { useOrderStore } from "@/store/OrderStore";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
export type OrdersType = {
  _id: string;
  userId: string | null;
  email: string;
  amount: number;
  status: string;
  products: [
    {
      id: string | undefined;
      name: string;
      quantity: number;
      price: number;
    },
  ];
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  createdAt: Date;
};
function OrdersPage() {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState<OrdersType[]>();
  const setOrderCount = useOrderStore((s) => s.setOrderCount);
  console.log(orders);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
        setOrderCount(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [getToken]);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div key={order._id} className="shadow-sm border border-gray-200">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium text-gray-800">
                  Order ID: {order._id.slice(-6).toUpperCase()}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    order.status === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Amount: <span className="font-semibold">${order.amount}</span>
              </p>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <p className="text-sm font-medium mb-1">Products:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {order.products.map((p) => (
                    <li key={p.id}>
                      {p.name} × {p.quantity} (${p.price})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 mt-3 pt-2 text-sm text-gray-600">
                <p>
                  <strong>Ship to:</strong> {order.shipping.name},{" "}
                  {order.shipping.address}, {order.shipping.city}
                </p>
                <p>
                  <strong>Phone:</strong> {order.shipping.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
