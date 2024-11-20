import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="h-[70vh] rounded-xl overflow-x-hidden bg-white shadow-md overflow-y-scroll">
      <table className="w-full mx-3 table-auto overflow-x-hidden border-collapse">
        <thead className="top-0 sticky">
          <tr className="text-left bg-white">
            {columns.map((column, index) => (
              <th key={index} className="p-2">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="shadow-md rounded-lg last:border-none"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-2">
                  {column.render
                    ? column.render(row) // Custom render function
                    : row[column.field]}{" "}
                  {/* Regular data */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
