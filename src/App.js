import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register"
import UpdatePassword from "./Pages/UpdatePassword"
import ForgotPassword from "./Pages/ForgotPassword"
import System from "./Pages/System"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route path="/system" exact component={System} />
          <Route path="/changepassword" exact component={UpdatePassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
