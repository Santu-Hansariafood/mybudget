import React, { useState } from 'react';

const DataDropdown = ({ options, label, multiple = false, onChange }) => {
  const [selected, setSelected] = useState(multiple ? [] : '');

  const handleChange = (event) => {
    const value = event.target.value;
    if (multiple) {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
      onChange && onChange(selected);
    } else {
      setSelected(value);
      onChange && onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <select
        multiple={multiple}
        value={selected}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DataDropdown;
