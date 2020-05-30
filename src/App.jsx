//Main App component for the app
//Contains the Router component used to display different components based on paths
//Wraps all components with AuthProvider so all children can access AuthContext

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import utilities
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";

//Import Page components
import Home from "./pages/Home";
import Login from "./pages/Login";

//Import css and main bootstrap css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
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
