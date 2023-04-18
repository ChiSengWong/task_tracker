import React, { useState } from 'react';
import { doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./styles/login.css";

const usersRef = collection(db, 'Users');

console.log('Possible users: ');
getDocs(usersRef).then((querySnapshot) => {
  console.log('------------------------------------');
  querySnapshot.forEach((doc) => {
    console.log("Username: " + doc.id);
    console.log("Password: " + doc.data().password);
    console.log('------------------------------------');
  });
});

// Add the password field to each User document
// getDocs(usersRef).then((querySnapshot) => {
//   querySnapshot.forEach((userDoc) => {
//     const userId = userDoc.id;
//     const userRef = doc(usersRef, userId);
//     updateDoc(userRef, { password: 'password' });
//   });
//   console.log("Updated user passwords");
// });


function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userRef = doc(db, "Users", username);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.password === password) {
          // Correct login credentials, go to home task page 
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
      console.error("Error getting user document:", e);
      // show error message
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
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
        <button type="#">Sign up</button>
      </form>
    </div>
  );
}

export default LoginScreen;
