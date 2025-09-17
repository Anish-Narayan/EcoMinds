import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import hook

export default function Header({ title }) {
  const { role, logout } = useAuth();
  const navigate = useNavigate(); // Get navigate function

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {role && (
          <button
            onClick={handleLogout}
            className="bg-white text-green-700 font-semibold py-2 px-4 rounded hover:bg-green-100 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}