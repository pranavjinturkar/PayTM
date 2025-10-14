import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return <div className="flex justify-center py-2 text-base gap-2">
   <h3 className="font-inter">{label}</h3>
   <Link to={to} className="underline font-nunito font-medium">
      {buttonText}
   </Link>
  </div>;
};

export default BottomWarning;
