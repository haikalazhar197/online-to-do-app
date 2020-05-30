import React, { useEffect, useState, useContext } from "react";

//Import bootstrap components
import { Spinner } from "react-bootstrap";

//Import components
import AppHeader from "../components/AppHeader";
import Task from "../components/Task";
import AddNewTask from "../components/AddNewTask";

//Import utilities
import app from "../utils/fire";
import { AuthContext } from "../utils/Auth";

//Assign database object
const db = app.firestore();

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    //Retieve data
    const unsubscribe = getData();

    return () => {
      console.trace("Im Out");

      //Detach the listener -- !!important
      unsubscribe();
    };
  }, []);

  //Function to attach data listener -- returns a unsubscribe method
  //onSnapshot receive and listens for data
  const getData = () => {
    if (currentUser.uid) {
      return db
        .collection("tasks")
        .orderBy("created")
        .where("editors", "array-contains", currentUser.uid)
        .onSnapshot(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((task) => ({
              ...task.data(),
              id: task.id,
            }));
            setData(newData);
            setIsLoading(false);
          },
          (err) => console.log(err)
        );
    }
  };

  return (
    <div>
      <AppHeader />
      <AddNewTask />
      {isLoading ? (
        <div className="flex-center">
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <section className="center-child-row">
          <ul className="main-list">
            {data.map((task, index) => (
              <li key={index}>
                <Task data={task} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Home;
