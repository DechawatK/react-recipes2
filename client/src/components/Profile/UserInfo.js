import React from "react";
import { Link } from "react-router-dom";

const formDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div className="App">
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formDate(session.getCurrentUser.joinDate)}</p>
    <ul>
      <h3>{session.getCurrentUser.username}'s Favorites</h3>
      {session.getCurrentUser.favorites.map(favorite => (
        <li key={favorite._id}>
          <Link to={`/recipes/${favorite._id}`}>
            <p>{favorite.name}</p>
          </Link>
        </li>
      ))}
      {!session.getCurrentUser.favorites.length && (
        <p>You have no favorites currently. Go add some!</p>
      )}
    </ul>
  </div>
);

export default UserInfo;
