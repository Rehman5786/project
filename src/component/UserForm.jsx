import React, { useState } from "react";

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a user object
    const userData = {
      email,
      name,
          };

    try {
    
      const response = await fetch("http://localhost:9000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("User added successfully");
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error!");
    }
  };

  return (
    <div>
      <h1>Create a User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;