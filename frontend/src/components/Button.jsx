import React from "react";

const Button = ({ label, className = "", onclickFn, loading }) => {
  return (
    <button
      className={`text-white rose-gradient focus:outline-none font-medium rounded-lg text-base font-inter px-5 py-2.5 mb-2 w-full mt-4 cursor-pointer ${className}`}
      onClick={onclickFn}
      disabled={loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default Button;
