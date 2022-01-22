import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from "../firebase";


function RequireAuth() {

  function Pending() {
    return(
      <div>loading...</div>
    )
  }

  const [authState, setAuthState] = useState({
    signedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState({ user: user, pending: false, signedIn: !!user });
      console.log(user);
    });
  }, []);

  if (authState.pending) {
    return <Pending />;
  }
  if (!authState.signedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
