import React, { useState } from 'react';
import "./styles/login.css";

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login logic here
    window.location = './home'; // set the page URL to ./home
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign In</button>
        </form>
    </React.Fragment>
  );
}

export default LoginScreen;
