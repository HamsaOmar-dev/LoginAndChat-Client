import React, { useState, useContext } from "react";
import "firebase/compat/auth";
import { auth } from "../firebase";

const ChatContext = React.createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {

  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");

  const value = {
    username,
    setUsername,
    secret,
    setSecret
  };

  return (
    <ChatContext.Provider value={value}>
      { children }
    </ChatContext.Provider>
  );
}
