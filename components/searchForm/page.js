"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setData, setLoading } from "@/redux/tollSlice";
import OptionalSearchFields from "../optionalSearchForm/page";
import ErrorModal from "../errorModal/page";

const CustomTextFiled = ({
  id,
  text,
  index,
  moveTextField,
  onTextChange,
  isDeletable,
}) => {
  const [, ref] = useDrag({
    type: "TEXT_FIELD",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "TEXT_FIELD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTextField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div>
      <label htmlFor="" className=" uppercase font-bold my-1">
        {text}
      </label>
      <div
        ref={(node) => ref(drop(node))}
        className="bg-gray-100 border p-4 mb-4 rounded-md flex flex-row"
      >
        <input
          type="text"
          placeholder={"Place, Country"}
          onChange={(e) => onTextChange(index, e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none"
        />
        {/* {isDeletable ? (
          <div onClick={() => removeOptionalTextField(textFields[index])}>
            s
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

function SearchForm() {
  const [textFields, setTextFields] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [optionalFormData, setOptionalFormData] = useState({
    vehicleType: "2AxlesAuto",
    carModel: 2023,
    departureTime: Math.floor(new Date().getTime() / 1000),
  });
  const [apiError, setApiError] = useState({
    error: "",
  });

  const dispatch = useDispatch();

  const moveTextField = (fromIndex, toIndex) => {
    const updatedTextFields = [...textFields];
    const [movedTextField] = updatedTextFields.splice(fromIndex, 1);
    updatedTextFields.splice(toIndex, 0, movedTextField);
    setTextFields(updatedTextFields);
  };

  const handleTextChange = (index, newText) => {
    const updatedTextFields = [...textFields];
    updatedTextFields[index].text = newText;
    setTextFields(updatedTextFields);
  };

  const addOptionalTextField = () => {
    setTextFields([...textFields, { id: textFields.length + 1, text: "" }]);
  };

  const removeOptionalTextField = (index) => {
    const updatedTextFields = [...textFields];
    updatedTextFields.splice(index, 1);
    setTextFields(updatedTextFields);
  };

  const handleSubmit = async () => {
    dispatch(setLoading(true));

    fetch("/api/toll", {
      method: "POST",
      body: JSON.stringify({
        from: {
          address: textFields[0].text,
        },
        to: {
          address: textFields[textFields.length - 1].text,
        },
        waypoints: textFields
          .slice(1, textFields.length - 1)
          .map((item) => ({ address: item.text })),
        serviceProvider: "here",
        vehicle: {
          type: optionalFormData.vehicleType,
          weight: {
            value: "20000",
            unit: "pound",
          },
          height: {
            value: "7.5",
            unit: "meter",
          },
          length: {
            value: "7.5",
            unit: "meter",
          },
          axles: "4",
          emissionClass: "euro_5",
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        dispatch(setData({ message: "Hello sucessfullss", data }));
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        dispatch(setLoading(false));
        setApiError({
          error:
            "The 'Origin' and 'Destination' locations cannot be empty / invalid ",
        });
        openModal();
      });
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setApiError({});
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2">
          <DndProvider backend={HTML5Backend}>
            <div className="md:w-[90%] flex flex-col items-center justify-center">
              <div className="w-full my-4 md:my-8">
                {textFields.map((textField, index) => (
                  <CustomTextFiled
                    key={textField.id}
                    id={textField.id}
                    text={
                      index === textFields.length - 1
                        ? "Destination"
                        : index === 0
                        ? "Origin"
                        : `waypoint ${index}`
                    }
                    index={index}
                    isDeletable={
                      index === textFields.length - 1 || index === 0
                        ? false
                        : true
                    }
                    moveTextField={moveTextField}
                    onTextChange={handleTextChange}
                  />
                ))}
              </div>
              <div className="flex flex-row justify-around">
                {" "}
                <button
                  onClick={addOptionalTextField}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md mr-2"
                >
                  Add Field
                </button>
                {textFields.length > 2 && (
                  <button
                    onClick={() =>
                      removeOptionalTextField(textFields.length - 1)
                    }
                    className="bg-red-500 text-white py-1 px-4 rounded-md"
                  >
                    Remove Field
                  </button>
                )}
              </div>
            </div>
          </DndProvider>
        </div>
        <OptionalSearchFields
          optionalFormData={optionalFormData}
          setOptionalFormData={setOptionalFormData}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={handleSubmit}
          disabled={
            textFields[0].text == "" || textFields[1].text == "" ? true : false
          }
          className={`mt-4 text-white py-2 px-4 rounded-md ${
            textFields[0].text == "" || textFields[1].text == ""
              ? "bg-slate-300"
              : "bg-green-500"
          }`}
        >
          Search
        </button>
      </div>

      <div>
        <ErrorModal isOpen={isModalOpen} onClose={closeModal}>
          {apiError && <h1>{apiError.error}</h1>}
          <button
            onClick={closeModal}
            className="mt-4 text-white py-2 px-4 rounded-md bg-red-400"
          >
            Close
          </button>
        </ErrorModal>
      </div>
    </div>
  );
}

export default SearchForm;
