import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      {/* <h1>My App</h1> */}
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
