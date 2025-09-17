import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = (userRole) => {
    login(userRole); // This sets the role in the context
    navigate(`/${userRole}`); // This redirects the user to the correct route
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Select Your Role</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleLogin('student')}
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login as Student
          </button>
          <button
            onClick={() => handleLogin('teacher')}
            className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Login as Teacher
          </button>
        </div>
      </div>
    </div>
  );
}