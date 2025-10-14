import React, { useState } from "react";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../service";

const Transaction = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstName = searchParams.get("firstname");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  async function handleTransferMoney() {
    setLoading(true);
    try {
      const response = await api.post("/account/transfer", {
        to: id,
        amount: Number(parseFloat(amount).toFixed(2)),
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <AuthWrapper>
      <Header label={"Send Money"} />
      <div className="mt-10 w-full space-y-2">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full flex items-center justify-center font-inter rose-gradient">
            <p className="text-white font-bold text-2xl font-nunito">
              {firstName[0].toUpperCase()}
            </p>
          </div>
          <span className="text-black font-bold text-2xl font-nunito">
            {firstName}
          </span>
        </div>
        <InputBox
          labelName={"Amount (in Rs)"}
          placeholder={"Enter amount"}
          type={"number"}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          label={"Initiate Transfer"}
          className="rose-gradient"
          onclickFn={handleTransferMoney}
          loading={loading}
        />
      </div>
    </AuthWrapper>
  );
};

export default Transaction;
