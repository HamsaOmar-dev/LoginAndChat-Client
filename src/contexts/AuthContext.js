import React, { useContext } from 'react';
import 'firebase/compat/auth';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  const value = {
    signup,
    login,
    logout
  };

  return(
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

