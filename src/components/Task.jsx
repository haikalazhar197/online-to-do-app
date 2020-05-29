import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import TickIcon from "../icons/TickIcon";
import CancelIcon from "../icons/CancelIcon";
import CircleIcon from "../icons/CircleIcon";

import { AuthContext } from "../utils/Auth";

import ShareSheet from "./ShareSheet";

import app from "../utils/fire";

const db = app.firestore();

const defaultTask = {
  created: {
    nanoseconds: 0,
    seconds: 1590595200,
  },
  title: "Default",
  owner: "Default",
  editors: [],
  invites: [],
};

const defaultSubTask = {
  name: "defaul",
  completed: false,
};

const AddSubTask = ({ closeForm, subTaskRef }) => {
  const [formValue, setFormValue] = useState("");
  console.log(closeForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");
    if (subTaskRef && formValue) {
      db.collection(subTaskRef)
        .add({
          completed: false,
          name: formValue,
          created: app.firebase_.firestore.Timestamp.now(),
        })
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    }
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="sub-task-form">
      <input
        type="text"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        autoFocus
      />
      <Button size="sm" variant="success" onClick={handleSubmit}>
        Save
      </Button>
    </form>
  );
};

const SubTask = ({ subtask = defaultSubTask, subTaskRef }) => {
  const [isForm, setIsForm] = useState(false);
  const [formValue, setFormValue] = useState(subtask.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");
    if (subtask.id && formValue) {
      db.collection(subTaskRef)
        .doc(subtask.id)
        .update({
          name: formValue,
        })
        .then(() => console.log("updated"))
        .catch((err) => console.log(err));
    }
    setIsForm(false);
  };

  const removeSubTask = () => {
    if (subtask.id) {
      db.collection(subTaskRef)
        .doc(subtask.id)
        .delete()
        .then(() => console.log("deleted"))
        .catch((err) => console.log(err));
    }
  };

  const completeSubTask = () => {
    if (subtask.id) {
      db.collection(subTaskRef)
        .doc(subtask.id)
        .update({
          completed: !subtask.completed,
        })
        .then(() => console.log("Completed changed"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {isForm ? (
        <form onSubmit={handleSubmit} className="sub-task-form">
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            autoFocus
          />
          <Button size="sm" variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            className="btn-no-style"
            onClick={() => setIsForm(!isForm)}
            style={{ textDecoration: subtask.completed ? "line-through" : "" }}
          >
            {subtask.name}
          </button>
          <div style={{ display: "flex" }}>
            <button className="icon-button" onClick={removeSubTask}>
              <CancelIcon />
            </button>
            <button className="icon-button" onClick={completeSubTask}>
              {subtask.completed ? <CircleIcon /> : <TickIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Task = ({ data = defaultTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subtasks, setSubstasks] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const subTaskRef = `tasks/${data.id}/subtasks`;

  useEffect(() => {
    console.log("Starting");
    console.log(data.id);
    // console.log(app.firebase_.firestore.Timestamp.now());
    const unsubscribe = getSubtask();
    return () => {
      unsubscribe();
      console.log("Im Out");
    };
  }, [data]);

  const getSubtask = () => {
    console.log("Getting Subtasks", data.id);
    if (data.id) {
      return db
        .collection(subTaskRef)
        .orderBy("created")
        .onSnapshot(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((subtask) => ({
              ...subtask.data(),
              id: subtask.id,
            }));
            console.log(newData, data.id);
            setSubstasks(newData);
          },
          (err) => console.log(err)
        );
    }
  };

  const removeTask = () => {
    if (data.id) {
      if (currentUser.uid === data.owner) {
        db.collection("tasks")
          .doc(data.id)
          .delete()
          .then(() => console.log("I deleted My Self"))
          .catch((err) => console.log(err));
      } else {
        removeFromEditor();
      }
    }
  };

  const removeFromEditor = () => {
    const editorArray = data.editors;
    const indexOfMe = editorArray.indexOf(currentUser.uid);
    const newEditor = [...editorArray];
    newEditor.splice(indexOfMe, 1);
    console.log(newEditor);
    db.collection("tasks")
      .doc(data.id)
      .update({
        editors: newEditor,
      })
      .then(() => console.log("deleted as editor"))
      .catch((err) => console.log(err));
  };

  return (
    <Card style={{ marginBottom: "25px", width: "400px" }}>
      <ShareSheet
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        data={data}
      />
      <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="btn-no-style" onClick={() => setIsOpen(!isOpen)}>
          {data.title}
        </button>
        <DropdownButton
          id="dropdown-item-button"
          title="More"
          variant="outline-secondary"
          size="sm"
        >
          <Dropdown.Item as="div">
            <Button
              variant="outline-dark"
              block
              onClick={() => setShowModal(true)}
            >
              Share
            </Button>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="div">
            <Button variant="danger" block size="sm" onClick={removeTask}>
              REMOVE
            </Button>
          </Dropdown.Item>
        </DropdownButton>
      </Card.Header>
      {isOpen && (
        <Card.Body>
          <ListGroup>
            {subtasks.map((subtask, index) => (
              <ListGroupItem key={index}>
                <SubTask subtask={subtask} subTaskRef={subTaskRef} />
              </ListGroupItem>
            ))}
            {isAdding && (
              <ListGroupItem>
                <AddSubTask
                  closeForm={() => setIsAdding(false)}
                  subTaskRef={subTaskRef}
                />
              </ListGroupItem>
            )}
          </ListGroup>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsAdding(!isAdding)}
            >
              Add Sub Task
            </Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default Task;
