import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h1>Task Management System</h1>
                    <div className="mt-4">
                        <Link to="/register" className="btn btn-primary me-2">
                            Register
                        </Link>
                        <Link to="/login" className="btn btn-success">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;