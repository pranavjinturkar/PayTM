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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    axios
      .post(`${BASE_URL}/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.status == "411") {
          setError(err.response.data.message);
        }
      });
    setFirstName("");
    setUsername("");
    setLastName("");
    setPassword("");
    setLoading(false);
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
      <Button label={"Sign Up"} onclickFn={handleSubmit} loading={loading} />
      <BottomWarning
        label={"Already have an account?"}
        buttonText={"Log In"}
        to={"/signin"}
      />
      {error.length > 0 && (
        <div className="text-lg text-center text-red-500">Error: {error}</div>
      )}
    </AuthWrapper>
  );
};

export default Signup;
