import React, { useContext, useState } from "react";
import {
  Nav,
  Navbar,
  Button,
  Modal,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { AuthContext } from "../utils/Auth";
import app from "../utils/fire";

import TickIcon from "../icons/TickIcon";
import CancelIcon from "../icons/CancelIcon";

const AppHeader = () => {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const signOut = async () => {
    await app.auth().signOut();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>My To Do List</Navbar.Brand>
      <Nav className="ml-auto">
        <Button
          style={{ marginRight: "10px" }}
          variant="outline-primary"
          onClick={() => setShowModal(true)}
        >
          {currentUser.displayName}
        </Button>
        <Button variant="primary" size="sm" onClick={signOut}>
          Sign Out
        </Button>
      </Nav>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Invites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroupItem>
              <div className="flex-space-between">
                Task
                <div style={{ display: "flex" }}>
                  <button className="icon-button">
                    <CancelIcon />
                  </button>
                  <button className="icon-button">
                    <TickIcon />
                  </button>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default AppHeader;
