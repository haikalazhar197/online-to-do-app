import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { AuthContext } from "../utils/Auth";

import app from "../utils/fire";

const db = app.firestore();

const AddNewTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subTasks, setSubTasks] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("Starting");
    return () => {
      console.log("Out");
    };
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const addToFirestore = () => {
    console.log("adding to firestore");
    // console.log(title);
    // console.log(subTasks);
    const newTask = {
      title: title || "odnfsd",
      owner: currentUser.uid,
      editors: [currentUser.uid],
      invites: [],
      created: app.firebase_.firestore.Timestamp.now(),
    };
    console.log(newTask, subTasks);
    db.collection("tasks")
      .add(newTask)
      .then((doc) => {
        console.log(doc.id);
        subTasks.forEach((subtask) => {
          db.collection(`tasks/${doc.id}/subtasks`)
            .add({
              name: subtask,
              completed: false,
              created: app.firebase_.firestore.Timestamp.now(),
            })
            .then(() => console.log("added"));
        });
      })
      .catch((err) => console.log(err));

    setTitle("");
    setSubTasks([]);
    setShowModal(false);
  };

  return (
    <section className="add-new-task">
      <Button style={{ margin: "30px" }} variant="success" onClick={openModal}>
        Add New Task
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            task={{ title, setTitle }}
            subTask={{ subTasks, setSubTasks }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addToFirestore}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

const TaskForm = ({
  task,
  subTask,
  // addToFirestore = (newTask, subTask) => console.log(newTask, subTask),
}) => {
  const [subTaskValue, setSubTaskValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    const newTask = {
      title: task.title || "odnfsd",
      owner: currentUser.uid,
      editors: [currentUser.uid],
      invites: [],
    };
    // addToFirestore(newTask, subTask.subTasks);
    console.trace(newTask, subTask.subTasks);
  };

  const removeSubtask = (index) => {
    const subTaskCopy = subTask.subTasks;
    const newSubtask = [...subTaskCopy];
    newSubtask.splice(index, 1);
    subTask.setSubTasks(newSubtask);
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (subTaskValue) {
      const subTaskCopy = subTask.subTasks;
      const newSubtask = [...subTaskCopy, subTaskValue];
      subTask.setSubTasks(newSubtask);
    }
    setIsAdding(false);
    setSubTaskValue("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            value={task.title}
            onChange={(e) => task.setTitle(e.target.value)}
          />
        </Form.Group>
      </Form>
      <ListGroup>
        {subTask.subTasks.map((task, index) => (
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
