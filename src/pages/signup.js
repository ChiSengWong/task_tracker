import React, { useState } from 'react';
import { doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./styles/forms.css";


function SignupScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleconfPasswordChange = (event) => {
        setconfPassword(event.target.value);
      };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Get the reference of the username/id in the database
      const userRef = doc(db, "Users", username);
      try {
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
  
          // If password for current user is correct ...
          if (userData.password === password) {
            // Go to task home page 
            window.location = './home';
            console.log("Login successful!");
          } else {
            // password doesn't match, show error message
            setErrorMessage("Incorrect password.");
          }
        } else {
          // user not found, show error message
          setErrorMessage("Incorrect username");
        }
      } catch (e) {
        // print error message
        console.error("Error getting user document:", e);
  
        // display error message
        setErrorMessage("An error occurred. Please try again later.");
      }
    };
  
    return (
      <div className="form-container">
        <h1>Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confPassword}
              onChange={handleconfPasswordChange}
            />
          </div>
          <button type="submit">Sign up</button>
          <div className='links'>
            <a href="./">Login</a>
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    );
  }
  
  export default SignupScreen;