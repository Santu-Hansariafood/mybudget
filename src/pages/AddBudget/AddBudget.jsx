import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";

const AddBudget = () => {
  const [budget, setBudget] = useState({
    income: "",
    totalBudget: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [totalCategories, setTotalCategories] = useState(0);

  const [customFields, setCustomFields] = useState([
    { label: "Rent", value: "" },
    { label: "Groceries", value: "" },
    { label: "Travel", value: "" },
    { label: "Entertainment", value: "" },
    { label: "Savings", value: "" },
    { label: "Others", value: "" },
  ]);

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [showBudget, setShowBudget] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total of all categories
    const total = customFields.reduce((sum, field) => {
      return sum + (Number(field.value) || 0);
    }, 0);
    setTotalCategories(total);
  }, [customFields]);

  const validateForm = () => {
    const newErrors = {};

    if (!budget.income || isNaN(budget.income) || Number(budget.income) <= 0) {
      newErrors.income = "Please enter a valid income amount";
    }

    if (
      !budget.totalBudget ||
      isNaN(budget.totalBudget) ||
      Number(budget.totalBudget) <= 0
    ) {
      newErrors.totalBudget = "Please enter a valid total budget amount";
    }

    if (Number(budget.totalBudget) > Number(budget.income)) {
      newErrors.totalBudget = "Total budget cannot exceed income";
    }

    if (totalCategories > Number(budget.totalBudget)) {
      newErrors.categories = "Total of categories exceeds total budget";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);
    // Clear category error when user starts typing
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: "" }));
    }
  };

  const handleAddField = () => {
    if (newFieldLabel.trim() === "") {
      toast.error("Please enter a category name");
      return;
    }

    if (
      customFields.some(
        (field) => field.label.toLowerCase() === newFieldLabel.toLowerCase()
      )
    ) {
      toast.error("This category already exists");
      return;
    }

    setCustomFields([...customFields, { label: newFieldLabel, value: "" }]);
    setNewFieldLabel("");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const categories = customFields.map((field) => ({
      label: field.label,
      value: Number(field.value) || 0,
    }));

    const fullBudget = {
      income: Number(budget.income),
      totalBudget: Number(budget.totalBudget),
      categories,
    };

    try {
      await api.post("/budgets", fullBudget);
      toast.success("Budget submitted successfully!");
      setShowBudget(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Budget submission error:", err);
      const errorMsg = err.response?.data?.message || "Failed to submit budget";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Monthly Budget
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["income", "totalBudget"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold mb-1 capitalize">
                  {field === "income" ? "Monthly Income" : "Total Budget"}
                </label>
                <input
                  type="number"
                  name={field}
                  value={budget[field]}
                  onChange={handleBudgetChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
                    errors[field] ? "border-red-500" : ""
                  }`}
                  placeholder={`e.g. ${field === "income" ? "50000" : "40000"}`}
                  min="0"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            {customFields.map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-semibold mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) =>
                    handleCustomFieldChange(index, e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring"
                  min="0"
                />
              </div>
            ))}
          </div>

          {errors.categories && (
            <p className="text-red-500 text-sm">{errors.categories}</p>
          )}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="New Category Name"
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring"
            />
            <button
              type="button"
              onClick={handleAddField}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Field
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Total Categories: {formatCurrency(totalCategories)}
            </p>
            <p className="text-sm text-gray-600">
              Remaining Budget:{" "}
              {formatCurrency(Number(budget.totalBudget) - totalCategories)}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Budget"}
          </button>
        </form>

        {showBudget && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Submitted Budget</h3>
            <ul className="space-y-1">
              <li className="flex justify-between border-b pb-1">
                <span className="font-medium capitalize">Income:</span>
                <span>{formatCurrency(budget.income)}</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span className="font-medium capitalize">Total Budget:</span>
                <span>{formatCurrency(budget.totalBudget)}</span>
              </li>
              {customFields.map((field, index) => (
                <li key={index} className="flex justify-between border-b pb-1">
                  <span className="font-medium capitalize">{field.label}:</span>
                  <span>{formatCurrency(field.value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBudget;
