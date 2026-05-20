import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the authentication token from local storage
    localStorage.removeItem('token');
    
    // 2. (Optional) Clear other user-related data
    localStorage.removeItem('user');

    // 3. Redirect the user to the login screen
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;