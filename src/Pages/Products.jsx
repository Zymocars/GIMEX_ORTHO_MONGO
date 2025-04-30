import React from "react";

const Products = () => {
  // Dummy product data (replace with real data or fetch from API)
  const products = [
    {
      id: 1,
      name: "Natural Ortho Powder",
      category: "Health",
      price: 249,
      stock: 50,
    },
    {
      id: 2,
      name: "Organic Hair Oil",
      category: "Beauty",
      price: 199,
      stock: 120,
    },
    {
      id: 3,
      name: "Herbal Tea Pack",
      category: "Wellness",
      price: 349,
      stock: 30,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Product Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price (₹)</th>
              <th className="px-6 py-3">Stock</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {products.map((product, index) => (
              <tr key={product.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
