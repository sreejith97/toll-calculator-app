import React from "react";

function TollDetailsTable({ data }) {
  // console.log(data.routes[0].costs.tag);
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium">Toll (Tag)</th>
              <th className="text-left p-4 font-medium">Fuel</th>
              <th className="text-left p-4 font-medium">Total (Toll+Fuel)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">{data.routes[0].costs.tag}</td>
              <td className="p-4 ">{data.routes[0].costs.fuel}</td>
              <td className="p-4 font-semibold">
                {data.routes[0].costs.tag + data.routes[0].costs.fuel}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TollDetailsTable;
