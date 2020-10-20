// App.js file
import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import Signup from "./components/signUp/Signup";
import Signin from "./components/SignIn/Signin";
import Home from "./components/Home/Home";
import Edit from "./components/Edit/Edit";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

axios.defaults.baseURL='http://127.0.0.1:8000/api';

export default class App extends Component {
  render() {
    let navLink = (
     <div> 
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/sign-in" activeClassName="activeLink" className="nav-link">
              Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="activeLink" className="nav-link"> 
              Sign Up
            </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    );

    const login = localStorage.getItem("isLoggedIn");
    

    return (
      <div >
        {login ? (
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
            <Route  path="/Edit/:id/edit" component={Edit} /> 
          </Router>
        ) : (
          <Router>
            {navLink}
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        )}
      </div>
    );
  }
}