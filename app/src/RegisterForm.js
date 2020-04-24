import React, { useState } from "react";
import { axiosWithAuth } from './utils/axiosWithAuth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

function RegisterForm() {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
});

  const [message, setMessage] = useState();

const handleChange = e => {
  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = e => {
  e.preventDefault();
  !credentials.username || !credentials.password
  ?setMessage('please provide both required fields.')
  :axiosWithAuth()
  .post('/api/auth/register', credentials)
  .then(res => {
    console.log('handleSubmit res:', res.data);
    setMessage(res.data.message);
    console.log(message)
    setCredentials({
      username: '',
      password: ''
    })
  })
  .catch(err => console.log(err));
}

  return (
    <MuiThemeProvider>
      <div className="App">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <TextField
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              hintText="enter your username"
              floatingLabelText="username"
              />
          </label>

          <br/>

          <label htmlFor="password">
            <TextField
              type="text"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              hintText="enter your password"
              floatingLabelText="password"
              />
          </label>

          <br/>

          <RaisedButton
           type="submit" next
           label="submit"
           primary={true}
          />
        </form>
      {message ? (<p>{message}</p>) : (<p></p>)}
      </div>
    </MuiThemeProvider>
  );
}

export default RegisterForm;