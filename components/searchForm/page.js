"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setData } from "@/redux/tollSlice";

const CustomTextFiled = ({ id, text, index, moveTextField, onTextChange }) => {
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
    <div
      ref={(node) => ref(drop(node))}
      className="bg-gray-100 border p-4 mb-4 rounded-md"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(index, e.target.value)}
        className="w-full bg-transparent border-none focus:outline-none"
      />
    </div>
  );
};

function SearchForm() {
  const [textFields, setTextFields] = useState([
    { id: 1, text: "Text Field 1" },
    { id: 2, text: "Text Field 2" },
  ]);
  const [formData, setFormData] = useState([]);

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
    // setFormData({
    //   from: textFields[0],
    //   to: textFields[textFields.length - 1],
    //   wayPoints: [textFields.slice(1, textFields.length - 1)],
    // });
    fetch("/api/toll", {
      method: "POST",
      body: JSON.stringify({
        from: {
          address: "Trivandrum, India",
        },
        to: {
          address: "thrissur,India",
        },
        waypoints: [],
        serviceProvider: "here",
        vehicle: {
          type: "2AxlesAuto",
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-md mx-auto mt-8">
        {textFields.map((textField, index) => (
          <CustomTextFiled
            key={textField.id}
            id={textField.id}
            text={textField.text}
            index={index}
            moveTextField={moveTextField}
            onTextChange={handleTextChange}
          />
        ))}
      </div>
      <button
        onClick={addOptionalTextField}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
      >
        Add Optional Field
      </button>
      {textFields.length > 2 && (
        <button
          onClick={() => removeOptionalTextField(textFields.length - 1)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Remove Optional Field
        </button>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </DndProvider>
  );
}

export default SearchForm;
