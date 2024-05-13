import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase_client from "../resources/supabase_client";
import { LoginProps, User } from "../resources/types";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [labelText, setLabelText] = useState<string>("");
  const navigate = useNavigate();
  function signUp_click() {
    const signUp = async () => {
      const { data, error } = await supabase_client.auth.signUp({
        email,
        password,
      });
      setLabelText(
        error?.message ? error.message : data.user?.id + " was created."
      );
    };
    signUp();
  }
  function login_click() {
    const login = async () => {
      const { data, error } = await supabase_client.auth.signInWithPassword({
        email,
        password,
      });
      if (data && !error) {
        localStorage.setItem("userId", data?.user?.id!);
        navigate("/budgeting");
      } else {
        setLabelText("Incorrect credentials. If not a user please login.");
      }
    };
    login();
  }
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={signUp_click}>SignUp</button>
        <button onClick={login_click}>Login</button>
      </div>
      <div>
        <label id="text-output">{labelText}</label>
      </div>
    </div>
  );
}

export default Login;
