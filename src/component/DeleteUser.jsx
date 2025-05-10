import React, { useState } from "react";
import axios from "axios";

const DeleteUser = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    if (!userId) {
      setMessage("Please provide a user ID.");
      return;
    }

    // Send a DELETE request with the user ID
    axios
      .delete(`http://localhost:9000/api/delete/${userId}`)
      .then((response) => {
        setMessage("User deleted successfully.");
        setUserId("");  // Clear the input field after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setMessage("Failed to delete user.");
      });
  };

  return (
    <div>
      <h2>Delete User by ID</h2>
      <div>
        <input
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleDelete}>Delete User</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUser;
