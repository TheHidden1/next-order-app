"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { Order } from "../types/types";
import { AppDispatch, RootState } from "../redux/store";

export default function Home() {
  const [order, setOrder] = useState<Order>({ name: "", quantity: 1, price: 0 });
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.order);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(placeOrder(order));
  };

  return (
    <div className="p-8">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={order.name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="quantity" value={order.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input type="number" name="price" value={order.price} onChange={handleChange} placeholder="Price" required />
        <button type="submit" disabled={loading}>{loading ? "Placing Order..." : "Submit Order"}</button>
      </form>

      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
