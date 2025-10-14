import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  return (
    <AuthWrapper>
      <Header label={"Sign In"} />
      <SubHeader label={"Enter your credentials to access your account"} />
      <InputBox
        labelName={"Email"}
        placeholder={"johndoe@example.com"}
        type={"email"}
      />
      <InputBox
        labelName={"Password"}
        placeholder={"123456"}
        type={"password"}
      />
      <Button label={"Sign In"} onclickFn={() => navigate("/dashboard")} />
      <BottomWarning
        label={"Don't have an account?"}
        buttonText={"Sign Up"}
        to={"/signup"}
      />
    </AuthWrapper>
  );
};

export default Signin;
