import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEmployeeByEmail } from '../utils/api';
import '../styles/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [task, setTask] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchEmployeeTask = async () => {
      try {
        if (user?.email) {
          const response = await getEmployeeByEmail(user.email);
          setTask(response.data.task || 'No task assigned');
        }
      } catch (error) {
        toast.error('Failed to fetch task');
      }
    };

    fetchEmployeeTask();
  }, [user?.email]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      
      <div className="task-section">
        <h2>Your Task</h2>
        <div className="task-display">
          {task}
        </div>
      </div>
      
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default EmployeeDashboard;