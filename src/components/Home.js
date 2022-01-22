import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { ChatEngine } from "react-chat-engine";

function Home() {
  const { logout } = useAuth();
  const { username, setUsername, secret, setSecret } = useChat();

  // useEffect(() => {

  //   const user = firebase.auth().currentUser;
  //   user.providerData.map((userInfo) => {
  //     const userData = {
  //       name: userInfo.displayName,
  //       email: userInfo.email,
  //       uid: userInfo.uid,
  //     };
  //     console.log(userInfo.providerId);

  //     //Post to ChatEngine
  //     axios
  //       .put(
  //         "https://api.chatengine.io/users/",
  //         { username: userInfo.email, secret: userInfo.uid },
  //         {
  //           headers: {
  //             "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);

  //         setLoading(false);

  //         //Post to DB
  //         axios
  //           .post("http://localhost:5000/google/signup", userData)
  //           .then((res) => {
  //             console.log(res.data);
  //           })
  //           .catch((err) => console.log(err));

  //       })
  //       .catch((err) => console.log(err));
  //   });

  // }, [])

  return (
    <div>
      <button
        type="submit"
        onClick={logout}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        LogOut
      </button>
      <ChatEngine
        height="100vh"
        width="100vw"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={username}
        userSecret={secret}
      />
    </div>
  );
}

export default Home;
