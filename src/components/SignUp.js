import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebase";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

function SignUp() {
  const [error, setError] = useState("");
  const [style, setStyle] = useState({ visibility: "hidden" });

  const { signup } = useAuth();
  const { username, setUsername, secret, setSecret } = useChat();

  let navigate = useNavigate();

  function googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      name: data.FirstName + " " + data.LastName,
      email: data.Email,
      password: data.Password,
    };

    axios
      .post("https://loginandchat.herokuapp.com/signup", userData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    signup(data.Email, data.Password)
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
      });
  };

  return (
    <div className="auth-form">
      <h1>SignUp</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First name"
          {...register("FirstName", { required: "Required", maxLength: 80 })}
        />
        <p>{errors.FirstName?.message}</p>
        <input
          type="text"
          placeholder="Last name"
          {...register("LastName", { required: "Required", maxLength: 100 })}
        />
        <p>{errors.LastName?.message}</p>
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

        <button type="submit">SignUp</button>

        <button type="submit" onClick={googleAuth}>
          Sign Up with Google
        </button>

        <div className="auth-link-container">
          Have an account?
          <Link
            to="/login"
            style={{
              color: "gray",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </form>

      <div className="alert alert-danger" style={style}>
        {error}
      </div>
    </div>
  );
}

export default SignUp;
