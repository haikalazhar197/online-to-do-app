import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

import ListIcon from "../icons/ListIcon";
import TickIcon from "../icons/TickIcon";
import CancelIcon from "../icons/CancelIcon";
import CircleIcon from "../icons/CircleIcon";

const AddSubTask = ({ closeForm }) => {
  const [formValue, setFormValue] = useState("");
  console.log(closeForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");
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

const SubTask = ({ children, id, completed }) => {
  const [isForm, setIsForm] = useState(false);
  const [formValue, setFormValue] = useState(children);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");
    setIsForm(false);
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
            style={{ textDecoration: completed ? "line-through" : "" }}
          >
            {children}
          </button>
          <div style={{ display: "flex" }}>
            <button className="icon-button">
              <CancelIcon />
            </button>
            <button className="icon-button">
              {completed ? <CircleIcon /> : <TickIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ShareSheet = ({ showModal, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inviteSearch, setInviteSearch] = useState("");

  const addInvite = (e) => {
    e.preventDefault();
    console.log(inviteSearch);
  };

  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: "1rem" }}>
          <Button size="sm" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "Done" : "Edit"}
          </Button>
        </div>
        <ListGroup>
          <ListGroupItem>
            <div className="flex-space-between">
              User
              <Button size="sm" variant="outline-primary" disabled>
                Owner
              </Button>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="flex-space-between">
              User
              {isEdit ? (
                <Button size="sm">Remove</Button>
              ) : (
                <Button size="sm" variant="outline-primary" disabled>
                  Editor
                </Button>
              )}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="flex-space-between">
              User
              {isEdit ? (
                <Button size="sm">Remove</Button>
              ) : (
                <Button size="sm" variant="outline-danger" disabled>
                  Invited
                </Button>
              )}
            </div>
          </ListGroupItem>
        </ListGroup>
        <div style={{ marginTop: "1rem" }}>
          <Form onSubmit={addInvite}>
            <Form.Group as={Row}>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
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
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="success" onClick={closeModal}>
          Add Task
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

const Task = ({ title = "Something" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([
    { subtask: "Do Somehting", id: 1, completed: true },
    { subtask: "Something Else", id: 2, completed: false },
  ]);

  return (
    <Card style={{ marginBottom: "25px", width: "400px" }}>
      <ShareSheet
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="btn-no-style" onClick={() => setIsOpen(!isOpen)}>
          {title}
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
            <Button variant="danger" block size="sm">
              REMOVE
            </Button>
          </Dropdown.Item>
        </DropdownButton>
      </Card.Header>
      {isOpen && (
        <Card.Body>
          <ListGroup>
            {data.map((task) => (
              <ListGroupItem key={task.id}>
                <SubTask id={task.id} completed={task.completed}>
                  {task.subtask}
                </SubTask>
              </ListGroupItem>
            ))}
            {isAdding && (
              <ListGroupItem>
                <AddSubTask closeForm={() => setIsAdding(false)} />
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
