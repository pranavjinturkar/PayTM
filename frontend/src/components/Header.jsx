import React from "react";

const Header = ({ label }) => {
  return (
    <h1 className="text-black text-4xl font-bold font-nunito">
      {label}
    </h1>
  );
};

export default Header;
