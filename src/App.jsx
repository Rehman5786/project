import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./component/UserForm";
import UserList from "./component/UserList";
import DeleteUser from "./component/DeleteUser";
import Main from "./component/Main";
import Login from "./component/Login";
import Registration from "./component/Register";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;