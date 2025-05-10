import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/EmpTable.css"

const EmpTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/get-all')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit clicked for ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:9000/api/delete/${id}`)
        .then(() => setEmployees(prev => prev.filter(emp => emp.id !== id)))
        .catch(error => console.error('Error deleting employee:', error));
    }
  };

  return (
    <div className="table-container">
      <h2 className="heading">Employee Table</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.empName}</td>
              <td>{emp.empSal}</td>
              <td>{emp.designation}</td>
              <td>
                {emp.image ? (
                  <img src={`data:image/jpeg;base64,${emp.image}`} alt={emp.empName} />
                ) : 'No Image'}
              </td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(emp.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr><td colSpan="5">No employees found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmpTable;
