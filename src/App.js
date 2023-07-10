import "./App.css";
import React, { useEffect, useState } from "react";

import Text from "./Text";
import Files from "./File";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDTX5olg8yvhyMcmhWM86v6HjOMRu3mPNk",
  authDomain: "nearbys2.firebaseapp.com",
  projectId: "nearbys2",
  storageBucket: "nearbys2.appspot.com",
  messagingSenderId: "716662903466",
  appId: "1:716662903466:web:178014da41b59e39ba36d3"
};
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();


const auth = getAuth();


function App() {
  var [cp, setcp] = useState(0);
  var [user, setuser] = useState("No user");

  useEffect(()=>{
    var l = localStorage.getItem("user");
    if(l!=null){
      setuser(user = l);
    }
  }, [])

  function sign(){
    signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    setuser(user = result.user.email);
    localStorage.setItem("user", user.substring(0, user.indexOf('@')))

  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  return (
    <div className="App">
      <div className="container my-3">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Nearby 2.0</span>
          </div>
        </nav>

        <div className="d-grid gap-2">
          <button className="btn btn-light" type="button" onClick={sign}>
            {user}
          </button>
        </div>

        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a
              className={cp == 0 ? "nav-link active" : "nav-link"}
              onClick={() => setcp((cp = 0))}
            >
              Files
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cp == 1 ? "nav-link active" : "nav-link"}
              onClick={() => setcp((cp = 1))}
            >
              Text
            </a>
          </li>
        </ul>

        <div className="page my-3">{cp == 0 ? <Files /> : <Text />}</div>
      </div>
    </div>
  );
}

export default App;
