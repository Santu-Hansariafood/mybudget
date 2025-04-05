import React from "react";

const Title = ({ text }) => {
  return (
    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-800 my-4">
      {text}
    </h2>
  );
};

export default Title;
