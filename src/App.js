import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from "./contexts/ChatContext";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
