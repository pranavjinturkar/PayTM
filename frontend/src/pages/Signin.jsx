import React, { useState } from "react";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLoginFn() {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setUsername("");
    setPassword("");
  }
  return (
    <AuthWrapper>
      <Header label={"Sign In"} />
      <SubHeader label={"Enter your credentials to access your account"} />
      <InputBox
        labelName={"Email"}
        placeholder={"johndoe@example.com"}
        type={"email"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputBox
        labelName={"Password"}
        placeholder={"123456"}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button label={"Sign In"} onclickFn={handleLoginFn} loading={loading} />
      <BottomWarning
        label={"Don't have an account?"}
        buttonText={"Sign Up"}
        to={"/signup"}
      />
      {error.length > 0 && (
        <div className="text-lg text-center text-red-500">Error: {error}</div>
      )}
    </AuthWrapper>
  );
};

export default Signin;
