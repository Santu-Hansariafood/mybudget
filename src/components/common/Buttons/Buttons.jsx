import React from 'react';

const Buttons = ({ label, onClick, variant = 'primary', size = 'md' }) => {
  const baseStyles = 'rounded-lg font-medium transition duration-200 ease-in-out';
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Buttons;
