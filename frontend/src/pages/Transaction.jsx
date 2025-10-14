import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const Transaction = () => {
  return (
    <AuthWrapper>
      <Header label={"Send Money"} />
      <div className="mt-10 w-full space-y-2">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full flex items-center justify-center font-inter rose-gradient">
            <p className="text-white font-bold text-2xl font-nunito">F</p>
          </div>
          <span className="text-black font-bold text-2xl font-nunito">
            Friend's Name
          </span>
        </div>
        <InputBox
          labelName={"Amount (in Rs)"}
          placeholder={"Enter amount"}
          type={"number"}
        />
        <Button
          label={"Initiate Transfer"}
          className="rose-gradient"
        />
      </div>
    </AuthWrapper>
  );
};

export default Transaction;
