import React, { useState } from 'react';
import { doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./styles/forms.css";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const addUserToDatabase = async (username, password) => {
  const userRef = doc(collection(db, 'Users'), username);
  const userData = {
    password: password,
    tasks: []
  };

  try {
    await setDoc(userRef, userData);
    console.log(`User ${username} added to the database.`);
  } catch (error) {
    console.error(`Error adding user ${username}: ${error}`);
  }
};


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
      const userRef = doc(db, "Users", username.toLowerCase());
      try {
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          setErrorMessage("User already exists")
        } else {
            const userData = docSnap.data();
  
          // If both passwords match
          if (confPassword === password) {
            // Show success message
            setErrorMessage("Account Created")

            // Add the new user to the database
            await addUserToDatabase(username.toLowerCase(), password);

            // Go to login page
            sleep(2000);
            window.location = './';
          } else {
            setErrorMessage("Passwords do not match");
          }

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