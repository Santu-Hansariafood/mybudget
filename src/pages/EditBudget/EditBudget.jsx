import React, { useState } from 'react';

const EditBudget = () => {
  const [budget, setBudget] = useState({
    category: 'Food',
    total: 5000,
    spent: 2300,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget((prev) => ({
      ...prev,
      [name]: name === 'category' ? value : parseInt(value || 0),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle update logic or API request
    alert('Budget updated successfully!');
  };

  const remaining = budget.total - budget.spent;
  const percentSpent = Math.min((budget.spent / budget.total) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Budget</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={budget.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Total Budget (₹)</label>
            <input
              type="number"
              name="total"
              value={budget.total}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Amount Spent (₹)</label>
            <input
              type="number"
              name="spent"
              value={budget.spent}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-sm text-gray-700">
            <strong>Remaining:</strong> ₹{remaining}
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="h-3 rounded-full bg-green-500"
              style={{ width: `${percentSpent}%` }}
            ></div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;
