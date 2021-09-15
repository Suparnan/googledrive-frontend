import React from "react";
import { BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login.js"
import { Signup } from "./components/Signup.js";
import { Reset } from "./components/Reset.js";
import { Home } from "./components/Home.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} /> 
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
