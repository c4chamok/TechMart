import React, { useEffect } from "react";

const TableComponent = ({ data, removedHeaders = [], dataPerpage , currentPage = 1,  }) => {

  if (!data?.length) return <h2 className="text-3xl">No data found</h2>;

  const defaultRemovedHeaders = ["_id", "__v", "createdAt", "updatedAt", "id", ...removedHeaders];
  const tableHeaders = [...Object.keys(data[0])];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">idx</th>
            {
              tableHeaders.map((dataKey, idx) => {
                if (!defaultRemovedHeaders.includes(dataKey)) {
                  return (<th key={idx} className="px-6 py-3">{dataKey}</th>)
                }
              })
            }
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row?._id} className="hover:bg-gray-50 border-b">
              <td className="px-6 py-4">{(idx + (dataPerpage? dataPerpage*(currentPage-1) : 0) ) + 1}</td>
              {
                tableHeaders.map((dataKey, idx) => {
                  if (!defaultRemovedHeaders.includes(dataKey)) {
                    return (<td key={idx} className="px-6 py-4">{row[dataKey]}</td>)
                  }
                })
              }
              <td className="px-6 py-4">
                <span
                  className={`flex gap-2`}
                >
                  <button className="px-2 py-1 border border-amber-300 cursor-pointer active:scale-95">Edit</button>
                  <button className="px-2 py-1 border border-red-500 cursor-pointer active:scale-95">Delete</button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
