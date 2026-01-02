import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    inStock: true,
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`http://localhost:3000/products/${String(id)}`, {
        method: "DELETE"
      });

      setProducts(products.filter(p => String(p.id) !== String(id)));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast.error("Please fill required fields");
      return;
    }

    const productData = {
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      image: formData.image,
      price: Number(formData.price),
      stock: formData.inStock ? true : false
    };
//update productdetails
    try {
      if (editingProduct) {
        await fetch(
          `http://localhost:3000/products/${String(editingProduct.id)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
          }
        );

        setProducts(products.map(p =>
          String(p.id) === String(editingProduct.id)
            ? { ...p, ...productData }
            : p
        ));

        toast.success("Product updated");
      } else {
        const res = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productData,
            id: Date.now().toString()
          })
        });

        const newProduct = await res.json();
        setProducts([...products, newProduct]);
        toast.success("Product added");
      }

      resetForm();
      setShowForm(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  //to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      inStock: true,
      description: "",
      image: ""
    });
    setEditingProduct(null);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand || "",
      price: product.price.toString(),
      inStock: product.stock > 0,
      description: product.description || "",
      image: product.image || ""
    });
    setShowForm(true);
  };

  const viewProduct = (id) => {
    navigate(`/admin/products/${id}`);
  };


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Products</h1>

      {/* Search + Add */}
      <div className="flex gap-4 mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white"
        />
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-white text-black px-6 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-neutral-800">
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length ? (
              filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-neutral-800">
                  <td className="p-4">
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {product.description}
                    </p>
                  </td>

                  <td className="p-4 text-white font-semibold">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 0
                        ? "bg-green-400/20 text-green-400"
                        : "bg-red-400/20 text-red-400"
                    }`}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3">
                    <button onClick={() => viewProduct(product.id)} className="text-blue-400">
                      View
                    </button>
                    <button onClick={() => startEdit(product)} className="text-green-400">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-400">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4 text-white">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-800 px-4 py-2 rounded text-white"
              />

              <input
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-neutral-800 px-4 py-2 rounded text-white"
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-neutral-800 px-4 py-2 rounded text-white"
              />

              <div className="flex gap-6 text-white">
                <label>
                  <input
                    type="radio"
                    checked={formData.inStock}
                    onChange={() => setFormData({ ...formData, inStock: true })}
                  /> In Stock
                </label>

                <label>
                  <input
                    type="radio"
                    checked={!formData.inStock}
                    onChange={() => setFormData({ ...formData, inStock: false })}
                  /> Out of Stock
                </label>
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-neutral-800 px-4 py-2 rounded text-white"
              />

              <input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-neutral-800 px-4 py-2 rounded text-white"
              />

              {formData.image && (
                <img src={formData.image} className="h-24 rounded object-cover" />
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="border px-4 py-2 rounded text-white"
              >
                Cancel
              </button>

              <button type="submit" className="bg-white text-black px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
