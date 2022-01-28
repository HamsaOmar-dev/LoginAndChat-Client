import React from "react";
import "firebase/compat/auth";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { ChatEngine } from "react-chat-engine";

function Home() {
  const { logout, user } = useAuth();
  const { username, secret } = useChat();

  console.log(user);

  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="logo-tab">SimpleCSCI</div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              <button type="submit" style={{position: 'absolute', right: "10px", top: "5px"}} onClick={logout}>
                LogOut
              </button>
            </form>
          </div>
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 40px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={username}
        userSecret={secret}
      />
    </div>
  );
}

export default Home;
