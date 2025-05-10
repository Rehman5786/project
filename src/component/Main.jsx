import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import About from './About';
import Blog from './Blog';
import '../styles/Main.css';

const Main = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Task Management System</div>
        <ul className="navbar-nav">
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">Blog</Link>
          </li>
          {user && (
            <>
              {role === 'manager' && (
                <li className="nav-item">
                  <Link to="/manager-dashboard" className="nav-link">Dashboard</Link>
                </li>
              )}
              {role === 'employee' && (
                <li className="nav-item">
                  <Link to="/employee-dashboard" className="nav-link">Dashboard</Link>
                </li>
              )}
              <li className="nav-item">
                <Link 
                  to="/" 
                  className="nav-link"
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('role');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
      </div>
  );
};

export default Main;