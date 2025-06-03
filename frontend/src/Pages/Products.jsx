import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Health",
    price: "",
    stock: "",
    description: "",
    image: "",
    brand: "", // Add brand field
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // API URL - replace with your actual backend URL
  const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}api`;
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Error fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Debug: Log what user is typing
    if (name === "price") {
      console.log("User typed price:", value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes (for image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // For now, store the file name or handle file upload separately
    setFormData({
      ...formData,
      image: file ? file.name : "", // Store file name or URL after upload
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null); // Clear previous errors

    try {
      // Convert price and stock to numbers only when submitting
      const submitData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
      };

      console.log("=== FORM SUBMISSION START ===");
      console.log("Form data price:", formData.price);
      console.log("Submitting price:", submitData.price);
      console.log("Full submit data:", submitData);
      console.log("Edit mode:", editMode);
      console.log("Current product ID:", currentProductId);

      if (editMode) {
        const url = `${API_URL}/admin/products/${currentProductId}`;
        console.log("PUT request to:", url);

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries())
        );

        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          throw new Error("Invalid JSON response from server");
        }

        console.log("Parsed response data:", data);

        if (response.ok && data.success) {
          setProducts(
            products.map((product) =>
              product._id === currentProductId ? data.data : product
            )
          );
          resetForm();
          console.log("Product updated successfully");
        } else {
          const errorMsg =
            data.message || data.error || `Server error: ${response.status}`;
          setError(errorMsg);
          console.error("Update failed:", data);
        }
      } else {
        const url = `${API_URL}/admin/products`;
        console.log("POST request to:", url);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        console.log("Response status:", response.status);

        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          throw new Error("Invalid JSON response from server");
        }

        console.log("Parsed response data:", data);

        if (response.ok && data.success) {
          setProducts([...products, data.data]);
          resetForm();
          console.log("Product created successfully");
        } else {
          const errorMsg =
            data.message || data.error || `Server error: ${response.status}`;
          setError(errorMsg);
          console.error("Create failed:", data);
        }
      }
    } catch (err) {
      console.error("=== REQUEST ERROR ===");
      console.error("Error type:", err.name);
      console.error("Error message:", err.message);
      console.error("Full error:", err);

      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError(
          "Network error: Cannot connect to server. Please check if the backend is running."
        );
      } else {
        setError(err.message || "Error submitting form");
      }
    } finally {
      setSubmitting(false);
      console.log("=== FORM SUBMISSION END ===");
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`${API_URL}/admin/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.success) {
          // Remove the product from the state
          setProducts(products.filter((product) => product._id !== id));
        } else {
          setError("Failed to delete product");
        }
      } catch (err) {
        setError("Error deleting product");
        console.error("Error deleting product:", err);
      }
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    // Debug: Log the original price from database
    console.log("Original price from DB:", product.price);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(), // Keep original precision
      stock: product.stock.toString(),
      description: product.description || "",
      image: product.image || "",
      brand: product.brand || "", // Add brand field
    });
    setCurrentProductId(product._id);
    setEditMode(true);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      category: "Health",
      price: "",
      stock: "",
      description: "",
      image: "",
      brand: "", // Add brand field
    });
    setEditMode(false);
    setCurrentProductId(null);
    setShowForm(false);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mr-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Back to Dashboard"
        >
          <ArrowLeftIcon className="h-6 w-6 text-black" />
        </button>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl px-6 font-semibold">Product Details</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            {showForm ? "Cancel" : "Add New Product"}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Product Form */}
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {editMode ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                >
                  <option value="Health">Health</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Nutrition">Nutrition</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Price (₹)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price (e.g., 75 or 75.50)"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                  rows="3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange} // Use separate handler for file input
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white py-2 px-4 rounded"
              >
                {submitting
                  ? "Saving..."
                  : editMode
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price (₹)</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      ₹{Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;