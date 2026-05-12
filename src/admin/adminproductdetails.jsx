import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { 
  ArrowLeftIcon, 
  PencilSquareIcon, 
  TrashIcon,
  TagIcon,
  ShoppingBagIcon,
  CubeIcon
} from "@heroicons/react/24/outline";

export default function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/api/admin/products/${id}/`);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.patch(`/api/admin/products/${id}/delete/`);
        navigate("/admin/products");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete product");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Products
      </button>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="bg-neutral-800 aspect-square">
            <img
              src={product.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                <p className="text-yellow-500 font-medium mt-1">{product.brand_name || "Premium Brand"}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/admin/products`)} // In a real app, this would open edit modal
                  className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 text-gray-300"
                  title="Edit Product"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-500"
                  title="Delete Product"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700/50">
                <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-1">
                  <CurrencyRupeeIcon className="w-3 h-3 mr-1" />
                  Price
                </div>
                <p className="text-2xl font-bold text-white">₹{product.price}</p>
              </div>

              <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700/50">
                <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-1">
                  <CubeIcon className="w-3 h-3 mr-1" />
                  Inventory
                </div>
                <p className="text-2xl font-bold text-white">{product.stock || 0} <span className="text-sm font-normal text-gray-400">units</span></p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                  <TagIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Category</p>
                  <p className="text-white font-medium">{product.category_name || "Uncategorized"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Description</p>
                  <p className="text-gray-300 text-sm leading-relaxed mt-1">
                    {product.description || "No description provided for this luxury fragrance."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-neutral-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last updated</span>
                <span className="text-gray-300">{new Date(product.updated_at || product.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing imports
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";