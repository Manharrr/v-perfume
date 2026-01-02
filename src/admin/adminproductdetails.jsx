import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      const res = await fetch(`http://localhost:3000/products/${id}`);
      if (!res.ok) {
        throw new Error("Product not found");
      }
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Product not found");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Product not found</p>
        <button
          onClick={() => navigate("/admin/products")}
          className="mt-4 px-4 py-2 bg-neutral-800 rounded hover:bg-neutral-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/admin/products")}
        className="text-gray-400 hover:text-white mb-6"
      >
        ← Back to Products
      </button>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Product Image */}
          <div>
            <img
              src={product.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-300">Price</h3>
              <p className="text-2xl font-bold text-white">₹{product.price?.toLocaleString() || "0"}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-300">Stock Status</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.inStock !== false && (product.stock || 0) > 0 
                  ? 'bg-green-400/20 text-green-400' 
                  : 'bg-red-400/20 text-red-400'
              }`}>
                {product.inStock !== false && (product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-300">Description</h3>
              <p className="text-white mt-1">{product.description || "No description available"}</p>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              
              <button
                onClick={() => navigate("/admin/products")}
                className="px-6 py-2 border border-neutral-700 rounded-lg hover:bg-neutral-800"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}