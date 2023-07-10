import React, { useEffect, useState } from "react";
import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDTX5olg8yvhyMcmhWM86v6HjOMRu3mPNk",
  authDomain: "nearbys2.firebaseapp.com",
  projectId: "nearbys2",
  storageBucket: "nearbys2.appspot.com",
  messagingSenderId: "716662903466",
  appId: "1:716662903466:web:178014da41b59e39ba36d3",
};
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default function Text() {
  var user = localStorage.getItem("user");

  var [rec, setrec] = useState(null);

  useEffect(()=>{
    if (user!= null) {
      onValue(ref(db, "users/" + user+"/text"), (snapshot) => {
        setrec((rec = snapshot.val()));
      });
    }
  }, [])

  function onSave() {
    var text = document.getElementById("text").value;
    if (user != null && text != "") {
      set(ref(db, "users/" + user+"/text"), text);

      alert("Saved");
    }
  }

  function onClear() {
    document.getElementById("text").value = "";
  }

  
  function onCopy() {
    var copyText = document.getElementById("text");
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    alert("Text copied");
  }


  return (
    <div className="">
      <div className="input-group mb-3">
        <span className="input-group-text">Text</span>
        <textarea
          className="form-control"
          id="text"
          aria-label="With textarea"
        ></textarea>
      </div>

      <div
        className="btn-group mb-3"
        role="group"
        aria-label="Basic outlined example"
      >
        <button type="button" className="btn btn-outline-danger" onClick={onClear}>
          Clear
        </button>
        <button type="button" className="btn btn-outline-dark" onClick={onSave}>
          Save
        </button>
      </div>

      {
        rec!=null?
        <div id="new" >
        <div className="alert alert-success" role="alert">
          <p>{rec}</p>
          <button type="button" className="btn btn-success" onClick={onCopy}>
            Copy
          </button>
        </div>
      </div>
      :""
      }
    </div>
  );
}
