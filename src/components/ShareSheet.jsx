import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";

import app from "../utils/fire";
import { AuthContext } from "../utils/Auth";

const db = app.firestore();

const defaultUser = {
  name: "Haikal",
  uid: "SomeiDhere",
  img:
    "https://lh3.googleusercontent.com/a-/AOh14Gg_y1WjT42C9jvK6TcRXBemMGJS7qhIrXHnvPnyvQ",
};

const UserCard = ({
  userId = "CnLiM9ep4gR6ZVmEiD125qWZs",
  isEdit = false,
  type = "Editor",
  index,
  removeUser,
  owner,
}) => {
  const [userData, setUserData] = useState(defaultUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubsribe = getUser();
    return () => {
      unsubsribe();
    };
  }, [userId]);

  const handleClick = () => {
    removeUser(index);
  };

  const getUser = () => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot(
        (doc) => {
          const newUserData = {
            ...doc.data(),
          };
          setUserData(newUserData);
          setIsLoading(false);
        },
        (err) => console.log(err)
      );
  };

  if (isLoading) {
    return (
      <div className="flex-center">
        <Spinner animation="border" role="status" variant="success">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="flex-space-between">
      <div className="user-sheet">
        <img src={userData.img} alt="user" />
        {userData.name}
      </div>
      {isEdit && userData.uid !== owner ? (
        <Button size="sm" onClick={handleClick}>
          Remove
        </Button>
      ) : (
        <Button size="sm" variant="outline-primary" disabled>
          {userData.uid === owner ? "Owner" : type}
        </Button>
      )}
    </div>
  );
};

const ShareSheet = ({ showModal, closeModal, data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inviteSearch, setInviteSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Email");
  const { currentUser } = useContext(AuthContext);

  const addInvite = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("email", "==", inviteSearch)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          const userid = querySnapshot.docs[0].data().uid;
          addToInviteList(userid);
        } else {
          setInviteSearch("");
          setPlaceholder("Please Enter User That Exist");
        }
      })
      .catch((err) => console.log(err));
  };

  const addToInviteList = (userid) => {
    const inviteArray = data.invites;
    const newInvites = [...inviteArray, userid];

    if (
      data.owner !== userid &&
      !data.invites.includes(userid) &&
      !data.editors.includes(userid)
    ) {
      db.collection("tasks")
        .doc(data.id)
        .update({
          invites: newInvites,
        })
        .then(() => console.log("Added Invite", userid))
        .catch((err) => console.log(err));
    } else {
      setPlaceholder("Try Again");
    }
    setInviteSearch("");
  };

  const deleteEditor = (index) => {
    console.log("deleting Editor", index);
    const editorArray = data.editors;
    const newEditors = [...editorArray];
    newEditors.splice(index, 1);
    db.collection("tasks")
      .doc(data.id)
      .update({
        editors: newEditors,
      })
      .then(() => console.log("Edited Editor List to:", newEditors))
      .catch((err) => console.log(err));
    // console.log(newEditors);
  };

  const deleteInvite = (index) => {
    console.log("deleting Invited user", index);
    const inviteArray = data.invites;
    const newInvites = [...inviteArray];
    newInvites.splice(index, 1);
    db.collection("tasks")
      .doc(data.id)
      .update({
        invites: newInvites,
      })
      .then(() => console.log("Edited Editor List to:", newInvites))
      .catch((err) => console.log(err));
  };

  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: "1rem" }}>
          {currentUser.uid === data.owner && (
            <Button size="sm" onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? "Done" : "Edit"}
            </Button>
          )}
        </div>
        <ListGroup>
          {data.editors.map((editor, index) => (
            <ListGroupItem key={index}>
              <UserCard
                userId={editor}
                isEdit={isEdit}
                type="Editor"
                index={index}
                removeUser={deleteEditor}
                owner={data.owner}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
        {!!data.invites.length && (
          <ListGroup>
            {data.invites.map((invitee, index) => (
              <ListGroupItem key={index}>
                <UserCard
                  userId={invitee}
                  isEdit={isEdit}
                  type="Invited"
                  index={index}
                  removeUser={deleteInvite}
                  owner={data.owner}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
        {currentUser.uid === data.owner && (
          <div style={{ marginTop: "1rem" }}>
            <Form onSubmit={addInvite}>
              <Form.Group as={Row}>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    placeholder={placeholder}
                    onChange={(e) => setInviteSearch(e.target.value)}
                    value={inviteSearch}
                  />
                </Col>
                <Button size="sm" onClick={addInvite}>
                  Invite
                </Button>
              </Form.Group>
            </Form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShareSheet;
