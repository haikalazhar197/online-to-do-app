//The Login Page
//Logs in the user using google signin available from firebase as an AuthProvider from app.firebase_.auth.GoogleAuthProvider

import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { AuthContext } from "../utils/Auth";

import app from "../utils/fire";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  //Google Signin function
  const signinGoogle = async () => {
    //Create new Auth Provider
    const googleAuthProvider = new app.firebase_.auth.GoogleAuthProvider();

    //Try to signin the user with redirect
    try {
      await app.auth().signInWithRedirect(googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  //if already signin go to home at path = /
  if (!!currentUser) {
    history.replace("/");
    return null;
  }

  return (
    <div className="login-page">
      <Card style={{ width: "400px", marginTop: "200px" }}>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>Login to ToDo App</div>
          <Link to="/">Back</Link>
        </Card.Header>
        <Card.Body style={{ margin: "0 auto" }}>
          <Button variant="outline-primary" size="sm" onClick={signinGoogle}>
            Google Signin
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

//Exports with Router to get history object
export default withRouter(Login);
