import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebase";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

function Login() {
  const [error, setError] = useState("");
  const [style, setStyle] = useState({ visibility: "hidden" });

  const { login, user } = useAuth();
  const { username, setUsername, secret, setSecret } = useChat();

  let navigate = useNavigate();

  function googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  if(user) {
    if (user.providerData[0].providerId === "google.com") {
      setUsername(user.email);
      setSecret(user.uid);
      console.log(username);
      console.log(secret);

      axios
        .put(
          "https://api.chatengine.io/users/",
          { username, secret },
          {
            headers: {
              "Private-Key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
            },
          }
        )
        .then((res) => {
          console.log(res);

          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    login(data.Email, data.Password)
      .then((userCred) => {
        const user = userCred.user;
        console.log(user);

        axios
          .put(
            "https://api.chatengine.io/users/",
            { username, secret },
            {
              headers: {
                "Private-Key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
              },
            }
          )
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        setError(error.message);
        setStyle({ visibility: "visible" });
        console.log(error);
      });
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          {...register("Email", {
            required: "Required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
            onChange: (e) => {
              setUsername(e.target.value);
            },
          })}
        />
        <p>{errors.Email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("Password", {
            required: "Required",
            minLength: { value: 8, message: "Must be at least 8 characters" },
            onChange: (e) => {
              setSecret(e.target.value);
            },
          })}
        />
        <p>{errors.Password?.message}</p>

        <button type="submit">Login</button>

        <button type="submit" onClick={googleAuth}>
          Login with Google
        </button>

        <div className="auth-link-container">
          Dont have an account?
          <Link
            to="/signup"
            style={{
              color: "gray",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            SignUp
          </Link>
        </div>
      </form>

      <div className="alert alert-danger" style={style}>
        {error}
      </div>
    </div>
  );
}

export default Login;
