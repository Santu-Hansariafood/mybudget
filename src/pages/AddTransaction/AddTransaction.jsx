import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";
import { motion } from "framer-motion";

const AddTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!transaction.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (
      !transaction.amount ||
      isNaN(transaction.amount) ||
      Number(transaction.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!transaction.category) {
      newErrors.category = "Category is required";
    }

    if (!transaction.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const transactionData = {
        ...transaction,
        amount: Number(transaction.amount),
      };

      await api.post("/transactions", transactionData);
      toast.success("Transaction added successfully!");

      // Reset form
      setTransaction({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });

      // Redirect to transactions list after 1.5 seconds
      setTimeout(() => {
        navigate("/transactions");
      }, 1500);
    } catch (err) {
      console.error("Transaction submission error:", err);
      const errorMsg =
        err.response?.data?.message || "Failed to add transaction";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Add New Transaction
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block font-medium mb-2 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={transaction.title}
              onChange={handleChange}
              placeholder="e.g., Grocery shopping"
              className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block font-medium mb-2 text-gray-700">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  value={transaction.amount}
                  onChange={handleChange}
                  placeholder="e.g., 1500"
                  className={`w-full pl-8 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.amount
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  min="0"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block font-medium mb-2 text-gray-700">
                Transaction Type
              </label>
              <select
                name="type"
                value={transaction.type}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block font-medium mb-2 text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={transaction.category}
                onChange={handleChange}
                className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.category
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                }`}
              >
                <option value="">Select Category</option>
                <option value="rent">Rent</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="salary">Salary</option>
                <option value="others">Others</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block font-medium mb-2 text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
                className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.date
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block font-medium mb-2 text-gray-700">
              Notes / Description
            </label>
            <textarea
              name="notes"
              value={transaction.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional details..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-6 bg-blue-50 rounded-xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-xl font-bold text-gray-800">
                  {transaction.amount
                    ? formatCurrency(Number(transaction.amount))
                    : "₹0"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p
                  className={`text-xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            type="submit"
            disabled={loading}
            className={`w-full mt-6 bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Transaction...</span>
              </div>
            ) : (
              "Add Transaction"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTransaction;
