import React, { useContext } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

import { AuthContext } from "../utils/Auth";
import app from "../utils/fire";

const AppHeader = () => {
  const { currentUser } = useContext(AuthContext);

  const signOut = async () => {
    await app.auth().signOut();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>My To Do List</Navbar.Brand>
      <Nav className="ml-auto">
        <Button style={{ marginRight: "10px" }} variant="outline-primary">
          {currentUser.displayName}
        </Button>
        <Button variant="primary" size="sm" onClick={signOut}>
          Sign Out
        </Button>
      </Nav>
    </Navbar>
  );
};

export default AppHeader;
