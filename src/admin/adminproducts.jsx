import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "10",
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, brandsData, categoriesData] = await Promise.all([
        api.get("/api/admin/products/"),
        api.get("/api/products/brands/"),
        api.get("/api/products/categories/")
      ]);
      setProducts(productsData);
      setBrands(brandsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load data");
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
      await api.patch(`/api/admin/products/${String(id)}/delete/`);
      setProducts(products.filter(p => String(p.id) !== String(id)));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.brand || !formData.category) {
      toast.error("Please fill required fields (Name, Price, Brand, Category)");
      return;
    }

    const productData = {
      name: formData.name,
      brand: parseInt(formData.brand),
      category: parseInt(formData.category),
      description: formData.description,
      image: formData.image,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    try {
      if (editingProduct) {
        const updated = await api.patch(`/api/admin/products/${String(editingProduct.id)}/edit/`, productData);
        setProducts(products.map(p => String(p.id) === String(editingProduct.id) ? updated : p));
        toast.success("Product updated");
      } else {
        const newProduct = await api.post("/api/admin/products/add/", productData);
        setProducts([...products, newProduct]);
        toast.success("Product added");
      }

      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.error || "Operation failed");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      category: "",
      price: "",
      stock: "10",
      description: "",
      image: ""
    });
    setEditingProduct(null);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand?.id || product.brand || "",
      category: product.category?.id || product.category || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
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
      <h1 className="text-3xl font-bold text-white mb-6">Products Management</h1>

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
          className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
        >
          Add Product
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-neutral-800 text-left">
              <th className="p-4">Product</th>
              <th className="p-4">Brand / Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  <div className="animate-pulse">Loading products...</div>
                </td>
              </tr>
            ) : filteredProducts.length ? (
              filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "https://placehold.co/48x48/1e1e1e/ffffff?text=No+Image"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-neutral-700"
                        onError={(e) => e.target.src = "https://placehold.co/48x48/1e1e1e/ffffff?text=No+Image"}
                      />
                      <div className="max-w-xs">
                        <p className="font-medium text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.description}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="text-white text-sm">{product.brand_name || "No Brand"}</p>
                    <p className="text-xs text-gray-500">{product.category_name || "No Category"}</p>
                  </td>

                  <td className="p-4 text-white font-semibold">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-400/10 text-green-400"
                        : "bg-red-400/10 text-red-400"
                    }`}>
                      {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button onClick={() => viewProduct(product.id)} className="text-blue-400 hover:text-blue-300">View</button>
                      <button onClick={() => startEdit(product)} className="text-green-400 hover:text-green-300">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Product Name *</label>
                  <input
                    required
                    placeholder="e.g. Valentino Donna"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Price (₹) *</label>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Brand *</label>
                  <select
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Image URL</label>
                  <input
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Description</label>
                <textarea
                  placeholder="Product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white focus:border-white outline-none transition-colors resize-none"
                />
              </div>

              {formData.image && (
                <div className="flex justify-center bg-neutral-800 p-4 rounded-lg">
                  <img 
                    src={formData.image} 
                    className="h-32 rounded-lg shadow-lg object-contain"
                    onError={(e) => e.target.src = "https://placehold.co/400x200/1e1e1e/ffffff?text=Preview+Unavailable"}
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}