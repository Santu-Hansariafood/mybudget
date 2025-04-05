import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import api from '../../api/api';
import toast from 'react-hot-toast';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    date: '',
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await api.get(`/transactions/${id}`);
        setTransaction({
          ...response.data,
          date: new Date(response.data.date).toISOString().split('T')[0],
        });
      } catch (err) {
        console.error('Error fetching transaction:', err);
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          navigate('/');
        } else {
          setError('Failed to fetch transaction details');
          toast.error('Failed to fetch transaction details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/transactions/${id}`, {
        ...transaction,
        amount: Number(transaction.amount),
      });
      toast.success('Transaction updated successfully');
      navigate('/transactions');
    } catch (err) {
      console.error('Error updating transaction:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/');
      } else {
        toast.error('Failed to update transaction');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigate('/transactions')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6"
    >
      <Motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <Motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mb-6 text-gray-800"
        >
          Edit Transaction
        </Motion.h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={transaction.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={transaction.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Income">Income</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              required
            />
          </div>

          <Motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Save Changes
          </Motion.button>

          <Motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/transactions')}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-all"
          >
            Cancel
          </Motion.button>
        </form>
      </Motion.div>
    </Motion.div>
  );
};

export default EditTransaction;
