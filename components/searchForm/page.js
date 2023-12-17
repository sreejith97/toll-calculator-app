"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setData } from "@/redux/tollSlice";
import OptionalSearchFields from "../optionalSearchForm/page";

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
      <label htmlFor="">{text}</label>
      <div
        ref={(node) => ref(drop(node))}
        className="bg-gray-100 border p-4 mb-4 rounded-md flex flex-row"
      >
        <input
          type="text"
          placeholder={text}
          onChange={(e) => onTextChange(index, e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none"
        />
        {isDeletable ? (
          <div onClick={() => removeOptionalTextField(textFields[index])}>
            s
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

function SearchForm() {
  const [textFields, setTextFields] = useState([
    { id: 1, text: "Trivandrum, India" },
    { id: 2, text: "thrissur,India" },
  ]);
  const [optionalFormData, setOptionalFormData] = useState({
    vehicleType: "2AxlesAuto",
    carModel: 2023,
    departureTime: Math.floor(new Date().getTime() / 1000),
  });

  const dispatch = useDispatch();

  const router = useRouter();

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
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setLoading(false);
      });

    // router.push("/dashboard/TollDetails");
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <DndProvider backend={HTML5Backend}>
            <div className="w-[90%] flex flex-col items-center justify-center">
              <div className="w-full my-8">
                {textFields.map((textField, index) => (
                  <CustomTextFiled
                    key={textField.id}
                    id={textField.id}
                    // text={textField.text}
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
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Add Optional Field
                </button>
                {textFields.length > 2 && (
                  <button
                    onClick={() =>
                      removeOptionalTextField(textFields.length - 1)
                    }
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Remove Optional Field
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
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
