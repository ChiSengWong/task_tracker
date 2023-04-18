import React, { useState } from 'react';
import { doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./styles/forms.css";

const usersRef = collection(db, 'Users');

console.log('Possible users: ');
getDocs(usersRef).then((querySnapshot) => {
  console.log('------------------------------------');
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    console.log("Username: " + doc.id);
    console.log("Password: " + doc.data().password);
    console.log('------------------------------------');
  });
});

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const goToSignup = () => {
    window.location = './signup';
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the reference of the username/id in the database
    const userRef = doc(db, "Users", username.toLowerCase());
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
      <h1>Login</h1>
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
        <button type="submit">Sign In</button>
        <div className='links'>
          <a href="./signup">Sign Up</a>
          <a href="#">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
