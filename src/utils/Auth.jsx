//Auth Provider Component -- Wraps entire app to enable access to user state
//Gets the user object from firebase sdk by using onAuthStateChange method

import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import app from "./fire";

//Create context to allow access from all child components
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //Listen to auth state change and assign it to currentUser state
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  //Waits for user state to loads
  if (pending) {
    return (
      <div
        className="flex-center"
        style={{ height: "100vh", marginTop: "300px" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  //Returns context provider with currentUser state accessible by all children
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
