import React from "react";

const Tables = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 shadow-md">
        {/* Table Header */}
        <thead className="bg-blue-500 text-white">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left text-sm md:text-base">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"} text-sm md:text-base`}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border border-gray-300">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-2 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
