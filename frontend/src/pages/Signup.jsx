import React, { useState } from "react";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    axios
      .post(`${BASE_URL}/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      })
      .then((res) => {
        if (res.status(411)) {
          setError(res.data.message);
          // console.log(error)
        }
      })
      .catch((err) => {
        if (err.status == "411") {
          console.log(err.response.data.message);
        }
      });
    // console.log(response);
    // console.log({
    //   firstName,
    //   lastName,
    //   username,
    //   password,
    // });
    // navigate("/dashboard");
  }

  return (
    <AuthWrapper>
      <Header label={"Sign Up"} />
      <SubHeader label={"Enter your information to create an account"} />
      <InputBox
        onChange={(e) => setFirstName(e.target.value)}
        labelName={"First Name"}
        placeholder={"John"}
        type={"text"}
      />
      <InputBox
        onChange={(e) => setLastName(e.target.value)}
        labelName={"Last Name"}
        placeholder={"Doe"}
        type={"text"}
      />
      <InputBox
        onChange={(e) => setUsername(e.target.value)}
        labelName={"Email"}
        placeholder={"johndoe@example.com"}
        type={"email"}
      />
      <InputBox
        onChange={(e) => setPassword(e.target.value)}
        labelName={"Password"}
        placeholder={"123456"}
        type={"password"}
      />
      <Button label={"Sign Up"} onclickFn={handleSubmit} />
      <BottomWarning
        label={"Already have an account?"}
        buttonText={"Log In"}
        to={"/signin"}
      />
      {error.length > 0 && (
        <div className="text-2xl text-center font-inter rose-gradient">
          {error}
        </div>
      )}
    </AuthWrapper>
  );
};

export default Signup;
