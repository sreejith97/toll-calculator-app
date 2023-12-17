"use client";
import React, { useState } from "react";
import DetailsModal from "../detailsModal/page";

function TollDetailsTable({ data }) {
  // console.log(data.summary.currency);
  // console.log(data);

  const tollLocations = data.routes[0].tolls.map((toll) => ({
    label: toll.name,
    cash: toll.cashCost,
    tag: toll.tagCost,
    currency: toll.currency,
  }));

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="relative overflow-x-auto mt-5">
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium">Toll (Tag)</th>
              <th className="text-left p-4 font-medium">Fuel</th>
              <th className="text-left p-4 font-medium">Total (Toll+Fuel)</th>
              <th className="text-left p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">{`${data.routes[0].costs.tag} ${data.summary.currency}`}</td>
              <td className="p-4 ">{`${data.routes[0].costs.fuel} ${data.summary.currency}`}</td>
              <td className="p-4 font-semibold">
                {`${data.routes[0].costs.tag + data.routes[0].costs.fuel} ${
                  data.summary.currency
                }`}
              </td>
              <td className="cursor-pointer" onClick={openModal}>
                Details
              </td>
            </tr>
          </tbody>
        </table>
        <DetailsModal isOpen={isModalOpen} onClose={closeModal} data={data}>
          <table className="table-auto w-full">
            <thead className="border-b">
              <tr className="bg-gray-100">
                <th className="text-left p-4 font-medium">Toll location</th>
                <th className="text-left p-4 font-medium">Tag</th>
                <th className="text-left p-4 font-medium">Cash</th>
                {/* <th className="text-left p-4 font-medium"></th> */}
              </tr>
            </thead>
            <tbody>
              {tollLocations.map((location, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{`${location.label}`}</td>
                  <td className="p-4 ">{`${location.tag} ${data.summary.currency}`}</td>
                  <td className="p-4 ">{`${location.cash} ${data.summary.currency}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={closeModal}
            className="mt-4 text-white py-2 px-4 rounded-md bg-red-400"
          >
            Close
          </button>
        </DetailsModal>
      </div>
    </>
  );
}

export default TollDetailsTable;
