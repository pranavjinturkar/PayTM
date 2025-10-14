import React from "react";

const AuthWrapper = ({ children }) => {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-slate-300">
      <div className="flex flex-col items-center w-md gap-2 bg-white p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </section>
  );
};

export default AuthWrapper;
