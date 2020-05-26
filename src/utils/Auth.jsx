import React, { useEffect, useState } from "react";
import app from "./fire";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  if (pending) {
    return <div>LOADING</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
