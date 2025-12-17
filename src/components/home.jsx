


import React, { useEffect, useState } from "react";
import {api} from "../Api/Axios";
import Navbar from "./navbar";
import Footer from "./footer";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", price: "", image: "", description: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      // slice first 10 to showcase
      setProducts(Array.isArray(res.data) ? res.data.slice(0, 10) : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddPerfume(e) {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    try {
      await api.post("/products", form);
      toast.success("Perfume added");
      setForm({ name: "", brand: "", price: "", image: "", description: "" });
      fetchProducts();
    } catch (err) {
      toast.error("Error adding perfume");
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section id="showcase">
          <h2 className="text-2xl font-bold mb-4">Featured Perfumes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length ? products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded shadow">
                <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                  {p.image ? <img src={p.image} alt={p.name} className="max-h-full" /> : <span className="text-sm text-gray-400">No image</span>}
                </div>
                <h3 className="font-semibold">{p.name || p.title || "Untitled"}</h3>
                <p className="text-sm text-gray-500">{p.brand}</p>
                <div className="flex items-center justify-between mt-3">
                  <strong>₹{p.price || p.price === 0 ? p.price : "—"}</strong>
                  <button onClick={() => handleDelete(p.id)} className="text-sm text-red-500">Delete</button>
                </div>
              </div>
            )) : <p>No products yet.</p>}
          </div>
        </section>

        <section id="add" className="mt-12">
          <h2 className="text-xl font-bold mb-3">Add New Perfume</h2>
          <form onSubmit={handleAddPerfume} className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 rounded shadow">
            <input className="p-2 border rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            <input className="p-2 border rounded" placeholder="Brand" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} />
            <input className="p-2 border rounded" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
            <input className="p-2 border rounded" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
            <textarea className="p-2 border rounded md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded md:col-span-2">Add Perfume</button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
