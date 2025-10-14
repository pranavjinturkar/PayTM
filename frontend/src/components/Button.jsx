import React from "react";

const Button = ({ label, className = "", onclickFn}) => {
  return (
    <button
      className={`text-white bg-gradient-to-r from-rose-800 via-rose-500 to-rose-800 hover:bg-gradient-to-r hover:from-rose-500 hover:via-rose-800 hover:to-rose-500 transition-colors focus:outline-none font-medium rounded-lg text-base font-inter px-5 py-2.5 mb-2 w-full mt-4 cursor-pointer ${className}`}
      onClick={onclickFn}
    >
      {label}
    </button>
  );
};

export default Button;
