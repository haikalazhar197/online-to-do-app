import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const AddNewTask = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <section className="add-new-task">
      <Button style={{ margin: "30px" }} variant="success" onClick={openModal}>
        Add New Task
      </Button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closeModal}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [subTask, setSubTask] = useState([]);
  const [subTaskValue, setSubTaskValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.trace("Submitting");
  };

  const removeSubtask = (index) => {
    const newSubtask = [...subTask];
    newSubtask.splice(index, 1);
    setSubTask(newSubtask);
    console.log(newSubtask);
    console.log(index);
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (subTaskValue) {
      const newSubtask = [...subTask, subTaskValue];
      setSubTask(newSubtask);
    }
    setIsAdding(false);
    setSubTaskValue("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control type="text" placeholder="Title" />
        </Form.Group>
      </Form>
      <ListGroup>
        {subTask.map((task, index) => (
          <ListGroupItem key={index}>
            <div className="flex-space-between">
              {task}
              <Button size="sm" onClick={() => removeSubtask(index)}>
                Remove
              </Button>
            </div>
          </ListGroupItem>
        ))}
        {isAdding && (
          <ListGroupItem>
            <Form onSubmit={addSubtask}>
              <Form.Group as={Row}>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Sub Task"
                    onChange={(e) => setSubTaskValue(e.target.value)}
                    value={subTaskValue}
                    autoFocus
                  />
                </Col>
                <Button size="sm" onClick={addSubtask}>
                  Add Task
                </Button>
              </Form.Group>
            </Form>
          </ListGroupItem>
        )}
      </ListGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <Button variant="success" onClick={() => setIsAdding(!isAdding)}>
          Add Sub Task
        </Button>
      </div>
    </div>
  );
};

export default AddNewTask;
