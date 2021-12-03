import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const[albums, setAlbums] = useState([]);
  const title = document.title;
  
  useEffect(() => {
    const abortController = new AbortController();
    async function loadUser() {
      try {
        const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {signal: abortController.signal}
        );
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI);
      }catch(error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        }
      }
    }
    loadUser();
    return() => abortController.abort();
  }, []);
  
  useEffect(() => {
    const abortController = new AbortController();
    const user = currentUser;
    setAlbums([]);
    document.title = "Awesome Album App";
    async function loadAlbums() {
      try {
        const response = await fetch(
         `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          {signal: abortController.signal}
        );
        const albumsFromAPI = await response.json();
        setAlbums(albumsFromAPI);
      }catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
      }
    }
  }
    loadAlbums();
  
  
  return () => {
    document.title = title;
    return abortController.abort()};
  }, [currentUser]);

  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}


  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList albums = {albums} />
      </div>
    </div>
  );
}

export default App;
