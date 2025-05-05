import React from "react";

const TableComponent = ({data}) => {

  if(!data?.length) return <h2 className="text-3xl">No data found</h2>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
          <th className="px-6 py-3">idx</th>
            {
                Object.keys(data[0]).map((dataKey)=>
                  (<th className="px-6 py-3">{dataKey}</th>))
            }
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr key={user.id} className="hover:bg-gray-50 border-b">
              <td className="px-6 py-4">{idx + 1}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.description}</td>
              <td className="px-6 py-4">{user.price}</td>
              <td className="px-6 py-4">{user.stock}</td>
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
