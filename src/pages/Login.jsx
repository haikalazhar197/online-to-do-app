import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { AuthContext } from "../utils/Auth";

import app from "../utils/fire";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(app.firebase_);
    return () => {
      console.log("Im Out");
    };
  }, []);

  const signinGoogle = async () => {
    const googleAuthProvider = new app.firebase_.auth.GoogleAuthProvider();
    try {
      await app.auth().signInWithRedirect(googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  if (!!currentUser) {
    history.replace("/");
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

export default withRouter(Login);
