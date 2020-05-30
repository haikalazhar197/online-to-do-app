import React, { useContext, useState, useEffect } from "react";
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

const db = app.firestore();

const AppHeader = () => {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const signOut = async () => {
    await app.auth().signOut();
  };

  const getData = () => {
    return db
      .collection("tasks")
      .where("invites", "array-contains", currentUser.uid)
      .onSnapshot(
        (querySnapshot) => {
          // console.log(querySnapshot.docs);
          const newData = querySnapshot.docs.map((data) => ({
            ...data.data(),
            id: data.id,
          }));
          // console.log(newData);
          setData(newData);
        },
        (err) => console.log(err)
      );
  };

  const acceptInvite = (index) => {
    // console.log("Accepting Invite", data[index].id);
    // const inviteArray = data[index].invites;
    const editorArry = data[index].editors;
    const newEditors = [...editorArry, currentUser.uid];
    console.log(editorArry, newEditors);
    db.collection("tasks")
      .doc(data[index].id)
      .update({
        editors: newEditors,
      })
      .then(declineInvite(index))
      .catch((err) => console.log(err));
  };

  const declineInvite = (index) => {
    // console.log("Declining INvite", data[index].id);
    const inviteArray = data[index].invites;
    const indexOfCurrentUser = inviteArray.indexOf(currentUser.uid);
    const newInvites = [...inviteArray];
    newInvites.splice(indexOfCurrentUser, 1);
    db.collection("tasks")
      .doc(data[index].id)
      .update({
        invites: newInvites,
      })
      .then(() => console.log("Declined"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = getData();
    return () => {
      unsubscribe();
    };
  }, []);

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
            {data.map((task, index) => (
              <ListGroupItem>
                <div className="flex-space-between">
                  {task.title}
                  <div style={{ display: "flex" }}>
                    <button
                      className="icon-button"
                      onClick={() => declineInvite(index)}
                    >
                      <CancelIcon />
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => acceptInvite(index)}
                    >
                      <TickIcon />
                    </button>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default AppHeader;
