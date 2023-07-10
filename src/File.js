import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, onValue, ref as ref2, set } from "firebase/database";

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

const storage = getStorage(app);
const db = getDatabase(app);

export default function File() {
  var user = localStorage.getItem("user");
  var [rec, setrec] = useState(null);
  var [file, setfile] = useState(null);

  useEffect(() => {
    if (user != null) {
      onValue(ref2(db, "users/" + user+"/file"), (snapshot) => {
        setrec(rec = snapshot.val());
      });
    }
  }, []);

  function onUploadinit() {
    document.getElementById("uploadbutton").disabled = true;
    onUpload();
  }

  function onUpload() {
    if (file != null && user != null) {
      const storageRef = ref(storage, "users/" + user);

      uploadBytes(storageRef, file).then((snapshot) => {
        set(ref2(db, "users/" + user+"/file"), file.name);
        alert("File uploaded");
        document.getElementById("uploadbutton").disabled = false;
      });
    } else {
      document.getElementById("uploadbutton").disabled = false;
    }
  }

  function onDownload() {
    if (user != null && rec != null) {
      const storageRef = ref(storage, "users/" + user);
      getDownloadURL(ref(storage, storageRef))
        .then((url) => {

          console.log(url);

          var link = document.createElement("a");
          link.download = rec;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }

  return (
    <div className="">
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          onChange={(event) => {
            setfile(event.target.files[0]);
          }}
        />
      </div>

      <div
        className="btn-group mb-3"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="btn btn-dark"
          onClick={onUploadinit}
          id="uploadbutton"
        >
          Upload
        </button>
      </div>

      {
        rec!=null?
        <div id="new" >
        <div className="alert alert-success" role="alert">
          <p>{rec}</p>
          <button type="button" className="btn btn-success" onClick={onDownload}>
            Download
          </button>
        </div>
      </div>
      :""
      }
    </div>
  );
}
