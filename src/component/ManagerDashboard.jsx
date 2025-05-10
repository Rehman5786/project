import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllEmployees, assignTask } from '../utils/api';
import '../styles/ManagerDashboard.css';

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
        setEmployees(response.data);
      } catch (error) {
        toast.error('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  const handleAssignTask = async () => {
    if (!selectedEmployee || !taskDescription) {
      toast.error('Please select an employee and enter task description');
      return;
    }

    try {
      await assignTask({
        email: selectedEmployee,
        task: taskDescription
      });
      toast.success('Task assigned successfully!');
      setTaskDescription('');
      setSelectedEmployee('');
    } catch (error) {
      toast.error('Failed to assign task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="manager-dashboard">
      <h1>Manager Dashboard</h1>
      
      <div className="assign-task-section">
        <h2>Assign Task</h2>
        
        <div className="form-group">
          <label>Task Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task details..."
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label>Assign To</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.email} value={employee.email}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>
        
        <button className="assign-button" onClick={handleAssignTask}>
          Assign Task
        </button>
      </div>
      
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ManagerDashboard;