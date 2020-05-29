import React, { useEffect, useState, useContext } from "react";

import AppHeader from "../components/AppHeader";
import Task from "../components/Task";
import AddNewTask from "../components/AddNewTask";

import app from "../utils/fire";
import { AuthContext } from "../utils/Auth";

const db = app.firestore();

const Home = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // console.log("Hello");
    // console.log(currentUser.uid);
    const unsubscribe = getData();
    return () => {
      console.trace("Im Out");
      unsubscribe();
    };
  }, []);

  const getData = () => {
    if (currentUser.uid) {
      return db
        .collection("tasks")
        .where("editors", "array-contains", currentUser.uid)
        .onSnapshot(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((task) => ({
              ...task.data(),
              id: task.id,
            }));
            setData(newData);
            console.log(newData);
          },
          (err) => console.log(err)
        );
    }
  };

  return (
    <div>
      <AppHeader />
      <AddNewTask />
      <section className="center-child-row">
        <ul className="main-list">
          {data.map((task, index) => (
            <li key={index}>
              <Task data={task} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
