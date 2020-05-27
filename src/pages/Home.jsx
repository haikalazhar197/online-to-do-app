import React from "react";
import { Button } from "react-bootstrap";

import AppHeader from "../components/AppHeader";
import Task from "../components/Task";
import AddNewTask from "../components/AddNewTask";

const Home = () => {
  return (
    <div>
      <AppHeader />
      {/* <section className="add-new-task">
        <Button style={{ margin: "30px" }} variant="success">
          Add New Task
        </Button>
      </section> */}
      <AddNewTask />
      <section className="center-child-row">
        <ul className="main-list">
          <li>
            <Task />
          </li>
          <li>
            <Task />
          </li>
        </ul>
      </section>
      <span>Home</span>
    </div>
  );
};

export default Home;
