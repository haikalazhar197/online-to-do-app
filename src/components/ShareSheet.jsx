import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";

import app from "../utils/fire";
import { AuthContext } from "../utils/Auth";

const db = app.firestore();

const UserCard = ({
  userId = "CnLiM9ep4gR6ZVmEiD125qWZs",
  isEdit = false,
  type = "Editor",
  index,
  removeUser,
  owner,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "Haikal",
    uid: "SomeiDhere",
  });

  useEffect(() => {
    console.log("Starting to pull Data", index);
    console.log(currentUser.uid === userId, owner);
    const unsubsribe = getUser();
    return () => {
      unsubsribe();
      console.log("Im Out");
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
          console.log(doc.data());
          const newUserData = {
            ...doc.data(),
          };
          setUserData(newUserData);
        },
        (err) => console.log(err)
      );
  };

  return (
    <div className="flex-space-between">
      {userData.name}
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

  useEffect(() => {
    console.log(data);
    return () => {
      console.log("Im Out");
    };
  }, [data, showModal]);

  const addInvite = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("email", "==", inviteSearch)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length) {
          const userid = querySnapshot.docs[0].data().uid;
          console.log(userid);
          addToInviteList(userid);
        } else {
          setInviteSearch("");
          setPlaceholder("Please Enter User That Exist");
        }
      })
      .catch((err) => console.log(err));
    console.log(inviteSearch);
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
    console.log("deleting INvited user", index);
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
            <ListGroupItem>
              <UserCard
                userId={editor}
                isEdit={isEdit}
                type="Editor"
                key={index}
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
              <ListGroupItem>
                <UserCard
                  userId={invitee}
                  isEdit={isEdit}
                  type="Invited"
                  key={index}
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
