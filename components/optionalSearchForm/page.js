import React, { useState } from "react";

function OptionalSearchFields({ optionalFormData, setOptionalFormData }) {
  const vehicleTypeOptions = [
    {
      id: 1,
      Description: "Car, Jeep, Van, SUV",
      vehicleType: "2AxlesAuto",
    },
    {
      id: 2,
      Description: "Car, SUV towing 1-axle trailer",
      vehicleType: "3AxlesAuto",
    },
    {
      id: 3,
      Description: "Car, SUV towing 2-axle trailer",
      vehicleType: "4AxlesAuto",
    },
    {
      id: 4,
      Description: "Taxi",
      vehicleType: "2AxlesTaxi",
    },
    {
      id: 5,
      Description: "Pickup truck, Light Commercial Vehicles",
      vehicleType: "2AxlesLCV",
    },
    {
      id: 6,
      Description: "Bus",
      vehicleType: "2AxlesBus",
    },
    {
      id: 7,
      Description: "Bike",
      vehicleType: "2AxlesMotorcycle",
    },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2010 },
    (_, index) => currentYear - index
  );

  return (
    <>
      <div className="border-l-2 w-1/2  p-4">
        <div className="w-full ">
          <h1 className="items-center text-center text-[16px] uppercase font-bold">
            Optional Info
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="text" className="">
              Select Vehicle type
            </label>
            <select
              onChange={(e) => {
                setOptionalFormData((prevData) => ({
                  ...prevData,
                  vehicleType: e.target.value,
                }));
              }}
              className="border mt-1 border-gray-300 w-full p-2 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select your Car type
              </option>
              {vehicleTypeOptions.map((vehicle) => (
                <option key={vehicle} value={vehicle.vehicleType}>
                  {vehicle.Description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="text" className="">
              Select your model (year)
            </label>
            <select
              onChange={(e) => {
                setOptionalFormData((prevData) => ({
                  ...prevData,
                  carModel: e.target.value,
                }));
              }}
              className="border mt-1 border-gray-300 w-full p-2 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select a year (1999 or later)
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="bg-gray-100 border p-4 mb-4 rounded-md flex flex-row">
              <input
                type="text"
                placeholder={"NOW"}
                // onChange={(e) => onTextChange(index, e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none"
              />
            </div> */}
        </div>
      </div>
    </>
  );
}

export default OptionalSearchFields;
