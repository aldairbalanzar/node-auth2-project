import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UsersList from './UsersList';
import './App.css';

function App() {

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/protected">protected page</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/protected" component={UsersList} />
          <RegisterForm path="/register" />
          <LoginForm path="/login" />
        </Switch>
      </div>
    </Router>
    
  )
}

export default App;
