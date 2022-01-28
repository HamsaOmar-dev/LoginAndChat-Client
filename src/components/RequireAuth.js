import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from './LoadingScreen';


function RequireAuth() {

  const { user } = useAuth();

  const [authState, setAuthState] = useState({
    signedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    setAuthState({ user: user, pending: false, signedIn: !!user });
  }, [user]);

  if (authState.pending) {
    return <LoadingScreen />;
  }
  if (!authState.signedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
