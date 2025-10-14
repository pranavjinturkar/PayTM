import React from "react";

const Button = ({ label }) => {
  return (
    <button className="text-white bg-black hover:bg-black/90 transition-colors duration-200 focus:outline-none font-medium rounded-lg text-base font-inter px-5 py-2.5 mb-2 w-full mt-4 cursor-pointer">
      {label}
    </button>
  );
};

export default Button;
