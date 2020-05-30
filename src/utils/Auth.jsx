import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
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

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
