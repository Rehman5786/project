import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginEmployee, loginManager } from '../utils/api';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      let response;

      if (role === 'employee') {
        response = await loginEmployee(credentials);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('role', 'employee');
        navigate('/employee-dashboard');
      } else {
        response = await loginManager(credentials);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('role', 'manager');
        navigate('/manager-dashboard');
      }

      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;