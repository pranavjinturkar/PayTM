import React from "react";

const InputBox = ({ labelName, placeholder, type }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={labelName}
        className="text-black text-lg font-medium font-inter"
      >
        {labelName}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={labelName}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-200 focus:outline-none font-nunito"
      />
    </div>
  );
};

export default InputBox;
