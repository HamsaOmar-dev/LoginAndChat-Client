import React from "react";
import "firebase/compat/auth";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { ChatEngine } from "react-chat-engine";

function Home() {
  const { logout } = useAuth();
  const { username, secret } = useChat();

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
