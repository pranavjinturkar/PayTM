import React from "react";

const SubHeader = ({ label }) => {
  return (
    <h1 className="text-slate-400 leading-tight text-base font-inter w-3/4 text-center mb-4">
      {label}
    </h1>
  );
};

export default SubHeader;
