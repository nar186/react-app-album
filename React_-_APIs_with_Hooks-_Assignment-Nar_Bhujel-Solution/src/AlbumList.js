import React, {useState, useEffect} from "react";

function AlbumList({ albums }) {
  if (albums.length== 0) {
  return <p>Please click on a user name to the left</p>;
}
  return <div>
    <ul className = "album-list">
      {albums.map((album) => (
      <li key = {album.id}>
          <h4>{album.id} - {album.title} </h4>
          </li>
      ))}
    </ul>
    </div>
}
export default AlbumList;
